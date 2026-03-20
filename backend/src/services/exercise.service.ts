import { prisma } from "../infrastructure/prisma";
import { RunCodeInput, SubmitCodeInput } from "../schemas/exercise.schema";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

const sqsClient = new SQSClient({ region: process.env["AWS_REGION"] ?? "us-east-1" });

export async function getAllExercises() {
  return prisma.challenge.findMany({
    where: { isActive: true },
    include: {
      subject: {
        select: { name: true, slug: true, iconUrl: true },
      },
      _count: {
        select: { submissions: true },
      },
    },
    orderBy: [{ difficulty: "asc" }, { createdAt: "asc" }],
  });
}

export async function getExerciseBySlug(slug: string) {
  return prisma.challenge.findUnique({
    where: { slug },
    include: {
      subject: {
        select: { name: true, slug: true, iconUrl: true },
      },
      testCases: {
        where: { isPublic: true },
        orderBy: { orderIndex: "asc" },
        select: {
          id: true,
          input: true,
          expected: true,
          orderIndex: true,
        },
      },
    },
  });
}

export async function runCode(slug: string, input: RunCodeInput) {
  const exercise = await prisma.challenge.findUnique({
    where: { slug },
    include: {
      testCases: {
        where: { isPublic: true },
        orderBy: { orderIndex: "asc" },
      },
    },
  });

  if (!exercise) throw new Error("EXERCISE_NOT_FOUND");

  const { execSync } = await import("child_process");
  const fs = await import("fs");
  const path = await import("path");
  const os = await import("os");

  const results = [];

  for (const testCase of exercise.testCases) {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "run-"));

    try {
      const wrappedCode = wrapCode(input.code, input.language, testCase.input);
      const ext = input.language === "python" ? "py" : input.language === "typescript" ? "ts" : "js";
      const filePath = path.join(tmpDir, `solution.${ext}`);
      fs.writeFileSync(filePath, wrappedCode);

      const command = getCommand(input.language, filePath);
      const output = execSync(command, {
        timeout: exercise.timeLimit * 1000,
        maxBuffer: 1024 * 1024,
      }).toString().trim();

      const passed = output === testCase.expected;
      results.push({
        testCaseId: testCase.id,
        passed,
        output,
        expected: testCase.expected,
      });
    } catch (error: unknown) {
      const err = error as { signal?: string; stderr?: Buffer; message?: string };
      results.push({
        testCaseId: testCase.id,
        passed: false,
        error: err.signal === "SIGTERM"
          ? "TIME_LIMIT_EXCEEDED"
          : err.stderr?.toString() ?? "RUNTIME_ERROR",
      });
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  }

  return {
    results,
    passedTests: results.filter((r) => r.passed).length,
    totalTests: results.length,
  };
}

export async function submitCode(cognitoId: string, slug: string, input: SubmitCodeInput) {
  const user = await prisma.user.findUniqueOrThrow({
    where: { cognitoId },
    select: { id: true },
  });

  const exercise = await prisma.challenge.findUnique({
    where: { slug },
    include: {
      testCases: {
        orderBy: { orderIndex: "asc" },
      },
    },
  });

  if (!exercise) throw new Error("EXERCISE_NOT_FOUND");

  const submission = await prisma.submission.create({
    data: {
      userId: user.id,
      challengeId: exercise.id,
      code: input.code,
      language: input.language,
      status: "PENDING",
      passedTests: 0,
      totalTests: exercise.testCases.length,
    },
  });

  await sqsClient.send(
    new SendMessageCommand({
      QueueUrl: process.env["SQS_QUEUE_URL"],
      MessageBody: JSON.stringify({
        submissionId: submission.id,
        isRun: false,
        code: input.code,
        language: input.language,
        timeLimit: exercise.timeLimit,
        memoryLimit: exercise.memoryLimit,
        testCases: exercise.testCases.map((tc) => ({
          id: tc.id,
          input: tc.input,
          expected: tc.expected,
        })),
      }),
    })
  );

  return {
    submissionId: submission.id,
    status: "PENDING",
    message: "Tu código está siendo evaluado",
  };
}

export async function getSubmission(submissionId: string, cognitoId: string) {
  const user = await prisma.user.findUniqueOrThrow({
    where: { cognitoId },
    select: { id: true },
  });

  const submission = await prisma.submission.findFirst({
    where: { id: submissionId, userId: user.id },
    include: {
      challenge: {
        select: { title: true, slug: true, difficulty: true, points: true },
      },
    },
  });

  if (!submission) throw new Error("SUBMISSION_NOT_FOUND");

  return submission;
}

function wrapCode(code: string, language: string, input: string): string {
  const escapedInput = JSON.stringify(input);

  switch (language) {
    case "javascript":
    case "typescript":
      return `
${code}

const __input = ${escapedInput};
const __lines = __input.split('\\n');
const __result = solution(...__lines.map(l => {
  try { return JSON.parse(l); } catch { return l; }
}));
console.log(JSON.stringify(__result));
`;
    case "python":
      return `
import json

${code}

__input = ${escapedInput}
__lines = __input.split('\\n')
def __parse(s):
    try:
        return json.loads(s)
    except:
        return s

__args = [__parse(l) for l in __lines]
__result = solution(*__args)
print(json.dumps(__result))
`;
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
}

function getCommand(language: string, filePath: string): string {
  switch (language) {
    case "javascript": return `node ${filePath}`;
    case "typescript": return `ts-node ${filePath}`;
    case "python": return `python3 ${filePath}`;
    default: throw new Error(`Unsupported language: ${language}`);
  }
}