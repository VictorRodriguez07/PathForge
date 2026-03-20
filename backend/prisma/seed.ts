import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding learning paths...");

  await seedSubjects();
  await seedPathTemplates();

  console.log("Seed completed successfully.");
  await seedExercises();
  console.log("Exercises seeded successfully.");

}

async function seedSubjects() {
  const subjects = [
    {
      name: "JavaScript",
      slug: "javascript",
      description: "El lenguaje de programación más usado en la web",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "TypeScript",
      slug: "typescript",
      description: "JavaScript con tipado estático para proyectos escalables",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "React",
      slug: "react",
      description: "La librería más popular para construir interfaces de usuario",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Node.js",
      slug: "nodejs",
      description: "Runtime de JavaScript para construir backends escalables",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Python",
      slug: "python",
      description: "Lenguaje versátil ideal para data science, IA y backend",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "AWS",
      slug: "aws",
      description: "La plataforma cloud más usada en la industria",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    },
  ];

  for (const subject of subjects) {
    await prisma.subject.upsert({
      where: { slug: subject.slug },
      update: subject,
      create: subject,
    });
  }

  console.log(`✅ ${subjects.length} subjects seeded`);
}

async function seedPathTemplates() {
  const javascript = await prisma.subject.findUniqueOrThrow({
    where: { slug: "javascript" },
  });
  const typescript = await prisma.subject.findUniqueOrThrow({
    where: { slug: "typescript" },
  });
  const react = await prisma.subject.findUniqueOrThrow({
    where: { slug: "react" },
  });
  const nodejs = await prisma.subject.findUniqueOrThrow({
    where: { slug: "nodejs" },
  });
  const python = await prisma.subject.findUniqueOrThrow({
    where: { slug: "python" },
  });
  const aws = await prisma.subject.findUniqueOrThrow({
    where: { slug: "aws" },
  });

  const paths = [
    {
      title: "JavaScript desde Cero",
      slug: "javascript-beginner",
      description: "Aprende los fundamentos de JavaScript desde cero hasta poder construir aplicaciones web interactivas",
      level: "BEGINNER" as const,
      goal: "frontend",
      weeklyHours: 10,
      subjectId: javascript.id,
      modules: [
        {
          title: "Fundamentos de JavaScript",
          orderIndex: 1,
          durationDays: 14,
        },
        {
          title: "Funciones y Scope",
          orderIndex: 2,
          durationDays: 10,
        },
        {
          title: "Arrays y Objetos",
          orderIndex: 3,
          durationDays: 12,
        },
        {
          title: "DOM y Eventos",
          orderIndex: 4,
          durationDays: 14,
        },
        {
          title: "Asincronismo y APIs",
          orderIndex: 5,
          durationDays: 14,
        },
        {
          title: "Proyecto Final",
          orderIndex: 6,
          durationDays: 10,
        },
      ],
    },
    {
      title: "TypeScript Profesional",
      slug: "typescript-intermediate",
      description: "Domina TypeScript para escribir código más seguro y mantenible en proyectos profesionales",
      level: "INTERMEDIATE" as const,
      goal: "fullstack",
      weeklyHours: 12,
      subjectId: typescript.id,
      modules: [
        {
          title: "Tipos Básicos y Sistema de Tipos",
          orderIndex: 1,
          durationDays: 10,
        },
        {
          title: "Interfaces y Types",
          orderIndex: 2,
          durationDays: 8,
        },
        {
          title: "Generics",
          orderIndex: 3,
          durationDays: 10,
        },
        {
          title: "Decoradores y Metadata",
          orderIndex: 4,
          durationDays: 8,
        },
        {
          title: "TypeScript con React",
          orderIndex: 5,
          durationDays: 12,
        },
      ],
    },
    {
      title: "React para Frontend Developers",
      slug: "react-frontend",
      description: "Conviértete en un Frontend Developer profesional dominando React y su ecosistema",
      level: "INTERMEDIATE" as const,
      goal: "frontend",
      weeklyHours: 15,
      subjectId: react.id,
      modules: [
        {
          title: "Fundamentos de React",
          orderIndex: 1,
          durationDays: 10,
        },
        {
          title: "Hooks Esenciales",
          orderIndex: 2,
          durationDays: 12,
        },
        {
          title: "Estado Global con Zustand",
          orderIndex: 3,
          durationDays: 8,
        },
        {
          title: "React Router y Navegación",
          orderIndex: 4,
          durationDays: 7,
        },
        {
          title: "Formularios con React Hook Form",
          orderIndex: 5,
          durationDays: 7,
        },
        {
          title: "Optimización y Performance",
          orderIndex: 6,
          durationDays: 10,
        },
        {
          title: "Proyecto: App Full-Stack",
          orderIndex: 7,
          durationDays: 14,
        },
      ],
    },
    {
      title: "Node.js Backend Developer",
      slug: "nodejs-backend",
      description: "Construye APIs robustas y escalables con Node.js, Express y PostgreSQL",
      level: "INTERMEDIATE" as const,
      goal: "backend",
      weeklyHours: 15,
      subjectId: nodejs.id,
      modules: [
        {
          title: "Node.js Core y Módulos",
          orderIndex: 1,
          durationDays: 8,
        },
        {
          title: "Express.js y REST APIs",
          orderIndex: 2,
          durationDays: 12,
        },
        {
          title: "Base de Datos con Prisma",
          orderIndex: 3,
          durationDays: 10,
        },
        {
          title: "Autenticación y Seguridad",
          orderIndex: 4,
          durationDays: 10,
        },
        {
          title: "Testing con Jest",
          orderIndex: 5,
          durationDays: 8,
        },
        {
          title: "Deploy y DevOps Básico",
          orderIndex: 6,
          durationDays: 10,
        },
      ],
    },
    {
      title: "Python para Data Science",
      slug: "python-data-science",
      description: "Aprende Python aplicado al análisis de datos, visualización y machine learning",
      level: "BEGINNER" as const,
      goal: "data_science",
      weeklyHours: 12,
      subjectId: python.id,
      modules: [
        {
          title: "Python Fundamentals",
          orderIndex: 1,
          durationDays: 12,
        },
        {
          title: "NumPy y Pandas",
          orderIndex: 2,
          durationDays: 14,
        },
        {
          title: "Visualización con Matplotlib",
          orderIndex: 3,
          durationDays: 10,
        },
        {
          title: "Machine Learning con Scikit-learn",
          orderIndex: 4,
          durationDays: 16,
        },
        {
          title: "Proyecto: Análisis de Dataset Real",
          orderIndex: 5,
          durationDays: 14,
        },
      ],
    },
    {
      title: "AWS Cloud Practitioner",
      slug: "aws-cloud-practitioner",
      description: "Domina los servicios core de AWS y prepárate para la certificación Cloud Practitioner",
      level: "BEGINNER" as const,
      goal: "devops",
      weeklyHours: 10,
      subjectId: aws.id,
      modules: [
        {
          title: "Fundamentos de Cloud y AWS",
          orderIndex: 1,
          durationDays: 8,
        },
        {
          title: "Compute: EC2 y Lambda",
          orderIndex: 2,
          durationDays: 10,
        },
        {
          title: "Storage: S3 y EBS",
          orderIndex: 3,
          durationDays: 8,
        },
        {
          title: "Networking: VPC y Route 53",
          orderIndex: 4,
          durationDays: 10,
        },
        {
          title: "Seguridad: IAM y KMS",
          orderIndex: 5,
          durationDays: 8,
        },
        {
          title: "Bases de Datos en AWS",
          orderIndex: 6,
          durationDays: 8,
        },
        {
          title: "Preparación para el Examen",
          orderIndex: 7,
          durationDays: 14,
        },
      ],
    },
  ];

  for (const pathData of paths) {
    const { modules, ...pathInfo } = pathData;

    const path = await prisma.pathTemplate.upsert({
      where: { slug: pathInfo.slug },
      update: { ...pathInfo },
      create: { ...pathInfo },
    });

    for (const module of modules) {
      await prisma.pathModule.upsert({
        where: {
          pathTemplateId_orderIndex: {
            pathTemplateId: path.id,
            orderIndex: module.orderIndex,
          },
        },
        update: module,
        create: {
          ...module,
          pathTemplateId: path.id,
        },
      });
    }

    console.log(`✅ Path seeded: ${pathInfo.title}`);
  }
}
async function seedExercises() {
  const javascript = await prisma.subject.findUniqueOrThrow({
    where: { slug: "javascript" },
  });

  const python = await prisma.subject.findUniqueOrThrow({
    where: { slug: "python" },
  });

  const exercises = [
    {
      title: "Two Sum",
      slug: "two-sum",
      description: `Dado un array de enteros \`nums\` y un entero \`target\`, retorna los índices de los dos números que suman el target.

Puedes asumir que cada input tiene exactamente una solución, y no puedes usar el mismo elemento dos veces.

**Ejemplo 1:**
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
\`\`\`

**Ejemplo 2:**
\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\``,
      difficulty: "EASY" as const,
      points: 10,
      timeLimit: 5,
      memoryLimit: 128,
      subjectId: javascript.id,
      testCases: [
        { input: "[2,7,11,15]\n9", expected: "[0,1]", isPublic: true, orderIndex: 1 },
        { input: "[3,2,4]\n6", expected: "[1,2]", isPublic: true, orderIndex: 2 },
        { input: "[3,3]\n6", expected: "[0,1]", isPublic: false, orderIndex: 3 },
        { input: "[1,2,3,4,5]\n9", expected: "[3,4]", isPublic: false, orderIndex: 4 },
      ],
    },
    {
      title: "Palindrome Check",
      slug: "palindrome-check",
      description: `Escribe una función que determine si una cadena de texto es un palíndromo.

Un palíndromo es una palabra que se lee igual de izquierda a derecha que de derecha a izquierda.

**Ejemplo 1:**
\`\`\`
Input: "racecar"
Output: true
\`\`\`

**Ejemplo 2:**
\`\`\`
Input: "hello"
Output: false
\`\`\``,
      difficulty: "EASY" as const,
      points: 10,
      timeLimit: 5,
      memoryLimit: 128,
      subjectId: javascript.id,
      testCases: [
        { input: "racecar", expected: "true", isPublic: true, orderIndex: 1 },
        { input: "hello", expected: "false", isPublic: true, orderIndex: 2 },
        { input: "madam", expected: "true", isPublic: false, orderIndex: 3 },
        { input: "world", expected: "false", isPublic: false, orderIndex: 4 },
      ],
    },
    {
      title: "FizzBuzz",
      slug: "fizzbuzz",
      description: `Dado un número entero \`n\`, retorna un array de strings del 1 al n donde:
- Los múltiplos de 3 se reemplazan por "Fizz"
- Los múltiplos de 5 se reemplazan por "Buzz"  
- Los múltiplos de ambos se reemplazan por "FizzBuzz"

**Ejemplo:**
\`\`\`
Input: 5
Output: ["1","2","Fizz","4","Buzz"]
\`\`\``,
      difficulty: "EASY" as const,
      points: 10,
      timeLimit: 5,
      memoryLimit: 128,
      subjectId: javascript.id,
      testCases: [
        { input: "5", expected: '["1","2","Fizz","4","Buzz"]', isPublic: true, orderIndex: 1 },
        { input: "15", expected: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]', isPublic: true, orderIndex: 2 },
        { input: "1", expected: '["1"]', isPublic: false, orderIndex: 3 },
        { input: "3", expected: '["1","2","Fizz"]', isPublic: false, orderIndex: 4 },
      ],
    },
    {
      title: "Reverse String",
      slug: "reverse-string",
      description: `Escribe una función que invierta una cadena de texto.

**Ejemplo 1:**
\`\`\`
Input: "hello"
Output: "olleh"
\`\`\`

**Ejemplo 2:**
\`\`\`
Input: "PathForge"
Output: "egrофтаP"
\`\`\``,
      difficulty: "EASY" as const,
      points: 10,
      timeLimit: 5,
      memoryLimit: 128,
      subjectId: python.id,
      testCases: [
        { input: "hello", expected: "olleh", isPublic: true, orderIndex: 1 },
        { input: "PathForge", expected: "egrофтаP", isPublic: true, orderIndex: 2 },
        { input: "abcde", expected: "edcba", isPublic: false, orderIndex: 3 },
        { input: "a", expected: "a", isPublic: false, orderIndex: 4 },
      ],
    },
    {
      title: "Maximum Subarray",
      slug: "maximum-subarray",
      description: `Dado un array de enteros, encuentra el subarray contiguo con la mayor suma y retorna esa suma.

**Ejemplo 1:**
\`\`\`
Input: [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explicación: [4,-1,2,1] tiene la mayor suma = 6
\`\`\`

**Ejemplo 2:**
\`\`\`
Input: [1]
Output: 1
\`\`\``,
      difficulty: "MEDIUM" as const,
      points: 25,
      timeLimit: 5,
      memoryLimit: 128,
      subjectId: javascript.id,
      testCases: [
        { input: "[-2,1,-3,4,-1,2,1,-5,4]", expected: "6", isPublic: true, orderIndex: 1 },
        { input: "[1]", expected: "1", isPublic: true, orderIndex: 2 },
        { input: "[5,4,-1,7,8]", expected: "23", isPublic: false, orderIndex: 3 },
        { input: "[-1,-2,-3]", expected: "-1", isPublic: false, orderIndex: 4 },
      ],
    },
    {
      title: "Valid Parentheses",
      slug: "valid-parentheses",
      description: `Dado un string con los caracteres \`(\`, \`)\`, \`{\`, \`}\`, \`[\`, \`]\`, determina si el string es válido.

Un string es válido si:
- Cada paréntesis abierto tiene su correspondiente cierre del mismo tipo
- Los paréntesis se cierran en el orden correcto

**Ejemplo 1:**
\`\`\`
Input: "()"
Output: true
\`\`\`

**Ejemplo 2:**
\`\`\`
Input: "()[]{}"
Output: true
\`\`\`

**Ejemplo 3:**
\`\`\`
Input: "(]"
Output: false
\`\`\``,
      difficulty: "MEDIUM" as const,
      points: 25,
      timeLimit: 5,
      memoryLimit: 128,
      subjectId: javascript.id,
      testCases: [
        { input: "()", expected: "true", isPublic: true, orderIndex: 1 },
        { input: "()[]{}", expected: "true", isPublic: true, orderIndex: 2 },
        { input: "(]", expected: "false", isPublic: false, orderIndex: 3 },
        { input: "([)]", expected: "false", isPublic: false, orderIndex: 4 },
      ],
    },
  ];

  for (const exerciseData of exercises) {
    const { testCases, ...exerciseInfo } = exerciseData;

    const exercise = await prisma.challenge.upsert({
      where: { slug: exerciseInfo.slug },
      update: { ...exerciseInfo },
      create: { ...exerciseInfo },
    });

    for (const tc of testCases) {
      await prisma.testCase.upsert({
        where: {
          challengeId_orderIndex: {
            challengeId: exercise.id,
            orderIndex: tc.orderIndex,
          },
        },
        update: tc,
        create: { ...tc, challengeId: exercise.id },
      });
    }

    console.log(`✅ Exercise seeded: ${exerciseInfo.title}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });