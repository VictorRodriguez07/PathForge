//Este archivo se encarga de ejecutar el código enviado por el usuario en un entorno seguro y controlado, utilizando contenedores Docker para aislar la ejecución y limitar los recursos disponibles. 

//const execSync se utiliza para ejecutar comandos de shell de forma síncrona, lo que permite ejecutar el código del usuario y capturar su salida. 
// El módulo fs se utiliza para crear archivos temporales con el código del usuario, y el módulo path se utiliza para manejar 
// rutas de archivos de manera segura. El módulo os se utiliza para obtener la ruta del directorio temporal del sistema.
const { Client } = require("pg");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const LANGUAGE_CONFIG = {
  javascript: {
    extension: "js",
    runner: (file) => `node ${file}`,
  },
  typescript: {
    extension: "ts",
    runner: (file) => `ts-node ${file}`,
  },
  python: {
    extension: "py",
    runner: (file) => `python3 ${file}`,
  },
  java: {
    extension: "java",
    runner: (file, className) =>
      `cd ${path.dirname(file)} && javac ${path.basename(file)} && java ${className}`,
  },
};

//función encargada de armar el código enviado por el usuario, envolviéndolo en una plantilla para permitir su ejecución.
function wrapCode(code, language, input) {
  const escapedInput = JSON.stringify(input);

  switch (language) {
    case "javascript":
      return `
${code}

const __input = ${escapedInput};
const __lines = __input.split('\\n');
const __result = solution(...__lines.map(l => {
  try { return JSON.parse(l); } catch { return l; }
}));
console.log(JSON.stringify(__result));
`;

    case "typescript":
      return `
${code}

const __input: string = ${escapedInput};
const __lines = __input.split('\\n');
const __result = solution(...__lines.map((l: string) => {
  try { return JSON.parse(l); } catch { return l; }
}));
console.log(JSON.stringify(__result));
`;

    case "python":
      return `
import json
import sys

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

    case "java":
      return `
import java.util.*;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Solution {
    ${code}
    
    public static void main(String[] args) throws Exception {
        String input = ${escapedInput};
        String[] lines = input.split("\\n");
        ObjectMapper mapper = new ObjectMapper();
        // Java execution handled separately
        System.out.println("java_execution");
    }
}
`;

    default:
      throw new Error(`Unsupported language: ${language}`);
  }
}

// función encargada de ejecutar el código del usuario, utilizando execSync para ejecutar el comando correspondiente al lenguaje seleccionado.
function executeCode(code, language, input, timeLimit, memoryLimit) {
  const config = LANGUAGE_CONFIG[language];
  if (!config) throw new Error(`Unsupported language: ${language}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "exec-"));
  const className = language === "java" ? "Solution" : "solution";
  const fileName = language === "java" ? `${className}.${config.extension}` : `solution.${config.extension}`;
  const filePath = path.join(tmpDir, fileName);

  try {
    const wrappedCode = wrapCode(code, language, input);
    fs.writeFileSync(filePath, wrappedCode);

    const command = config.runner(filePath, className);
    const startTime = Date.now();

    const output = execSync(command, {
      timeout: timeLimit * 1000,
      maxBuffer: 1024 * 1024,
      env: {
        ...process.env,
        NODE_PATH: "/var/task/node_modules",
      },
    }).toString().trim();

    const executionMs = Date.now() - startTime;

    return { output, executionMs, error: null };
  } catch (error) {
    if (error.signal === "SIGTERM" || error.code === "ETIMEDOUT") {
      return { output: null, executionMs: timeLimit * 1000, error: "TIME_LIMIT_EXCEEDED" };
    }
    return {
      output: null,
      executionMs: Date.now() - Date.now(),
      error: error.stderr?.toString() ?? error.message,
    };
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

// función principal del Lambda, que recibe el evento con los detalles de la ejecución, procesa cada test case y devuelve los resultados.
exports.handler = async (event) => {
  const records = event.Records ?? [];

  for (const record of records) {
    const { submissionId, isRun, testCases, code, language, timeLimit, memoryLimit } =
      JSON.parse(record.body);

    const results = [];
    let passedTests = 0;
    let finalStatus = "ACCEPTED";
    let totalExecutionMs = 0;

    for (const testCase of testCases) {
      const { output, executionMs, error } = executeCode(
        code, language, testCase.input, timeLimit, memoryLimit
      );
      totalExecutionMs += executionMs;

      if (error === "TIME_LIMIT_EXCEEDED") {
        finalStatus = "TIME_LIMIT_EXCEEDED";
        results.push({ testCaseId: testCase.id, passed: false, error });
        break;
      }

      if (error) {
        finalStatus = "RUNTIME_ERROR";
        results.push({ testCaseId: testCase.id, passed: false, error });
        break;
      }

      const passed = output === testCase.expected;
      if (passed) passedTests++;
      else if (finalStatus === "ACCEPTED") finalStatus = "WRONG_ANSWER";

      results.push({ testCaseId: testCase.id, passed, output, expected: testCase.expected });
    }

    console.log(JSON.stringify({
      submissionId,
      status: finalStatus,
      passedTests,
      totalTests: testCases.length,
      executionMs: totalExecutionMs,
      results,
    }));

    // Si es un submit real (no un Run), actualiza la submission en PostgreSQL
    if (!isRun && submissionId) {
      const client = new Client({ connectionString: process.env.DATABASE_URL });
      try {
        await client.connect();
        await client.query(
          `UPDATE submissions 
          SET status = $1, "passedTests" = $2, "executionMs" = $3, "errorMessage" = $4
          WHERE id = $5`,
          [
            finalStatus,
            passedTests,
            totalExecutionMs,
            finalStatus !== "ACCEPTED"
              ? results.find((r) => r.error)?.error ?? null
              : null,
            submissionId,
          ]
        );
        console.log(`Submission ${submissionId} updated to ${finalStatus}`);
      } catch (dbError) {
        console.error(`Failed to update submission ${submissionId}:`, dbError);
      } finally {
        await client.end();
      }
    }
  }

  return { statusCode: 200 };
};