import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding learning paths...");

  // await seedSubjects();
  // console.log("Subjects seeded successfully.");
  // await seedPathTemplates();
  // console.log("Path templates seeded successfully.");

  // console.log("Seed completed successfully.");
  // await seedExercises();
  // console.log("Exercises seeded successfully.");
  await seedConcepts();
  console.log("Concepts seeded successfully.");

}

async function seedSubjects() {
  const subjects = [
    {
      name: "HTML/CSS",
      slug: "html-css",
      description: "Estructura y estilos para construir páginas web",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
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
      description: "Librería para construir interfaces modernas",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Vue",
      slug: "vue",
      description: "Framework progresivo para interfaces web",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    },
    {
      name: "Angular",
      slug: "angular",
      description: "Framework para aplicaciones web empresariales",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
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
      description: "Lenguaje versátil para backend, automatización y data science",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "AWS",
      slug: "aws",
      description: "La plataforma cloud más usada en la industria",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    },
    {
      name: "Git",
      slug: "git",
      description: "Sistema de control de versiones distribuido",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "Linux",
      slug: "linux",
      description: "Sistema operativo esencial para desarrollo y DevOps",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    },
    {
      name: "Docker",
      slug: "docker",
      description: "Plataforma para crear y ejecutar contenedores",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    },
    {
      name: "SQL",
      slug: "sql",
      description: "Lenguaje para trabajar con bases de datos relacionales",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    },
    {
      name: "PostgreSQL",
      slug: "postgresql",
      description: "Base de datos relacional robusta y escalable",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    {
      name: "MongoDB",
      slug: "mongodb",
      description: "Base de datos NoSQL orientada a documentos",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "Java",
      slug: "java",
      description: "Lenguaje orientado a objetos muy usado en backend y mobile",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    },
    {
      name: "Kubernetes",
      slug: "kubernetes",
      description: "Plataforma de orquestación de contenedores",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    },
    {
      name: "React Native",
      slug: "react-native",
      description: "Framework para aplicaciones móviles con React",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    // ── NUEVOS ──────────────────────────────────────────────
    {
      name: "Next.js",
      slug: "nextjs",
      description: "Framework full stack para React con SSR y App Router",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "CI/CD",
      slug: "cicd",
      description: "Integración y despliegue continuo con GitHub Actions",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
    {
      name: "Algoritmos",
      slug: "algorithms",
      description: "Estructuras de datos y algoritmos fundamentales",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
  ];

  for (const subject of subjects) {
    await prisma.subject.upsert({
      where: { slug: subject.slug },
      update: subject,
      create: subject,
    });
  }
  console.log(`  ✅ ${subjects.length} subjects seeded`);
}

async function seedPathTemplates() {
  const s = async (slug: string) =>
    prisma.subject.findUniqueOrThrow({ where: { slug } });

  const htmlCss     = await s("html-css");
  const javascript  = await s("javascript");
  const typescript  = await s("typescript");
  const react       = await s("react");
  const vue         = await s("vue");
  const angular     = await s("angular");
  const nodejs      = await s("nodejs");
  const python      = await s("python");
  const aws         = await s("aws");
  const git         = await s("git");
  const linux       = await s("linux");
  const docker      = await s("docker");
  const sql         = await s("sql");
  const postgresql  = await s("postgresql");
  const mongodb     = await s("mongodb");
  const java        = await s("java");
  const kubernetes  = await s("kubernetes");
  const reactNative = await s("react-native");
  const nextjs      = await s("nextjs");
  const cicd        = await s("cicd");
  const algorithms  = await s("algorithms");

  const paths = [

    // ══════════════════════════════════════
    // BEGINNER
    // ══════════════════════════════════════

    {
      title: "HTML y CSS desde Cero",
      slug: "html-css-beginner",
      description:
        "Construye páginas web reales desde cero. Aprenderás HTML semántico, CSS moderno con Flexbox y Grid, diseño responsivo y animaciones CSS. Al terminar tendrás un sitio web multi-página publicado y listo para tu portafolio.",
      level: "BEGINNER" as const,
      goal: "frontend",
      weeklyHours: 10,
      subjectId: htmlCss.id,
      modules: [
        {
          title: "Cómo funciona la web y HTML semántico",
          orderIndex: 1,
          durationDays: 10,
        },
        {
          title: "Texto, enlaces, listas, tablas e imágenes",
          orderIndex: 2,
          durationDays: 8,
        },
        {
          title: "Formularios HTML y validación nativa",
          orderIndex: 3,
          durationDays: 8,
        },
        {
          title: "CSS: selectores, cascada, especificidad y tipografía",
          orderIndex: 4,
          durationDays: 10,
        },
        {
          title: "Box model, colores y unidades CSS",
          orderIndex: 5,
          durationDays: 10,
        },
        {
          title: "Layouts modernos con Flexbox",
          orderIndex: 6,
          durationDays: 10,
        },
        {
          title: "Layouts de dos dimensiones con CSS Grid",
          orderIndex: 7,
          durationDays: 10,
        },
        {
          title: "Diseño responsivo: mobile-first y media queries",
          orderIndex: 8,
          durationDays: 10,
        },
        {
          title: "Transiciones, animaciones y pseudo-clases avanzadas",
          orderIndex: 9,
          durationDays: 8,
        },
        {
          title: "Proyecto: sitio web responsivo completo",
          orderIndex: 10,
          durationDays: 14,
        },
      ],
    },

    
    

    {
      title: "Git Esencial",
      slug: "git-beginner",
      description:
        "Domina el control de versiones para trabajar en equipo como desarrollador profesional. Commits, branches, merge, rebase, GitHub y el flujo de trabajo con Pull Requests. Habilidad obligatoria en cualquier empleo de desarrollo.",
      level: "BEGINNER" as const,
      goal: "fullstack",
      weeklyHours: 6,
      subjectId: git.id,
      modules: [
        {
          title: "Qué es Git y cómo funciona internamente",
          orderIndex: 1,
          durationDays: 6,
        },
        {
          title: "Commits: registrar cambios con significado",
          orderIndex: 2,
          durationDays: 6,
        },
        {
          title: "Branches, merge y resolución de conflictos",
          orderIndex: 3,
          durationDays: 8,
        },
        {
          title: "GitHub: repositorios remotos y colaboración",
          orderIndex: 4,
          durationDays: 8,
        },
        {
          title: "Rebase, stash y reescritura de historial",
          orderIndex: 5,
          durationDays: 8,
        },
        {
          title: "Estrategias de branching: Git Flow y GitHub Flow",
          orderIndex: 6,
          durationDays: 6,
        },
        {
          title: "Proyecto: flujo profesional de colaboración",
          orderIndex: 7,
          durationDays: 6,
        },
      ],
    },

    {
      title: "Linux Esencial para DevOps",
      slug: "linux-beginner",
      description:
        "Domina la terminal Linux para trabajar en servidores y cloud. Navegación, permisos, procesos, networking, Bash scripting y administración del sistema. Habilidad indispensable para cualquier rol de backend, DevOps o cloud.",
      level: "BEGINNER" as const,
      goal: "devops",
      weeklyHours: 8,
      subjectId: linux.id,
      modules: [
        {
          title: "Terminal y sistema de archivos de Linux",
          orderIndex: 1,
          durationDays: 8,
        },
        {
          title: "Permisos, usuarios y grupos",
          orderIndex: 2,
          durationDays: 8,
        },
        {
          title: "Procesos, servicios y systemd",
          orderIndex: 3,
          durationDays: 8,
        },
        {
          title: "Pipes, redirecciones y procesamiento de texto",
          orderIndex: 4,
          durationDays: 8,
        },
        {
          title: "Networking, SSH y firewall básico",
          orderIndex: 5,
          durationDays: 8,
        },
        {
          title: "Bash scripting: automatización del servidor",
          orderIndex: 6,
          durationDays: 10,
        },
        {
          title: "Almacenamiento, logs y monitoreo del sistema",
          orderIndex: 7,
          durationDays: 8,
        },
        {
          title: "Proyecto: servidor web configurado y asegurado",
          orderIndex: 8,
          durationDays: 10,
        },
      ],
    },

    {
      title: "SQL y Bases de Datos Relacionales",
      slug: "sql-beginner",
      description:
        "Aprende SQL para consultar, transformar y modelar datos de forma profesional. JOINs, agregaciones, subqueries, CTEs, transacciones y diseño de esquemas. La habilidad de datos más demandada en el mercado, independientemente del stack.",
      level: "BEGINNER" as const,
      goal: "backend",
      weeklyHours: 8,
      subjectId: sql.id,
      modules: [
        {
          title: "Bases de datos relacionales y SELECT",
          orderIndex: 1,
          durationDays: 8,
        },
        {
          title: "JOINs: combinando datos de múltiples tablas",
          orderIndex: 2,
          durationDays: 10,
        },
        {
          title: "Agregaciones y GROUP BY",
          orderIndex: 3,
          durationDays: 8,
        },
        {
          title: "Subqueries y CTEs",
          orderIndex: 4,
          durationDays: 10,
        },
        {
          title: "INSERT, UPDATE, DELETE y transacciones",
          orderIndex: 5,
          durationDays: 8,
        },
        {
          title: "Diseño de esquemas y DDL",
          orderIndex: 6,
          durationDays: 10,
        },
        {
          title: "Índices y performance básica",
          orderIndex: 7,
          durationDays: 8,
        },
        {
          title: "Window functions y SQL analítico",
          orderIndex: 8,
          durationDays: 10,
        },
        {
          title: "Proyecto: base de datos de e-commerce con análisis",
          orderIndex: 9,
          durationDays: 12,
        },
      ],
    },

    {
      title: "AWS Cloud Practitioner",
      slug: "aws-cloud-practitioner",
      description:
        "Entiende los servicios core de AWS y prepárate para la certificación Cloud Practitioner (CLF-C02). IAM, EC2, S3, Lambda, RDS, VPC, CloudWatch y gestión de costos. El punto de entrada al ecosistema cloud más usado del mundo.",
      level: "BEGINNER" as const,
      goal: "devops",
      weeklyHours: 10,
      subjectId: aws.id,
      modules: [
        {
          title: "Fundamentos de cloud computing",
          orderIndex: 1,
          durationDays: 8,
        },
        {
          title: "IAM: identidad y control de acceso",
          orderIndex: 2,
          durationDays: 10,
        },
        {
          title: "Compute: EC2, Lambda y opciones serverless",
          orderIndex: 3,
          durationDays: 10,
        },
        {
          title: "Storage: S3, EBS y EFS",
          orderIndex: 4,
          durationDays: 8,
        },
        {
          title: "Networking: VPC, subnets y security groups",
          orderIndex: 5,
          durationDays: 10,
        },
        {
          title: "Bases de datos gestionadas: RDS y DynamoDB",
          orderIndex: 6,
          durationDays: 10,
        },
        {
          title: "CloudWatch, billing y gestión de costos",
          orderIndex: 7,
          durationDays: 8,
        },
        {
          title: "Preparación para el examen CLF-C02",
          orderIndex: 8,
          durationDays: 14,
        },
        {
          title: "Simulacros y práctica final",
          orderIndex: 9,
          durationDays: 14,
        },
      ],
    },

    {
      title: "Java desde Cero",
      slug: "java-beginner",
      description:
        "Aprende Java desde cero: tipos, control de flujo, métodos, arrays, strings y POO. Entiende cómo funciona la JVM y por qué Java domina el backend empresarial. Al terminar construirás una aplicación de consola con programación orientada a objetos real.",
      level: "BEGINNER" as const,
      goal: "backend",
      weeklyHours: 10,
      subjectId: java.id,
      modules: [
        {
          title: "Qué es Java y cómo funciona la JVM",
          orderIndex: 1,
          durationDays: 8,
        },
        {
          title: "Tipos, variables, operadores y control de flujo",
          orderIndex: 2,
          durationDays: 10,
        },
        {
          title: "Métodos, parámetros y organización del código",
          orderIndex: 3,
          durationDays: 10,
        },
        {
          title: "Arrays, Strings y tipos wrapper",
          orderIndex: 4,
          durationDays: 12,
        },
        {
          title: "Programación orientada a objetos",
          orderIndex: 5,
          durationDays: 14,
        },
        {
          title: "Interfaces, clases abstractas y principios de diseño",
          orderIndex: 6,
          durationDays: 10,
        },
        {
          title: "Excepciones y manejo de errores robusto",
          orderIndex: 7,
          durationDays: 8,
        },
        {
          title: "Collections Framework: List, Map y Set",
          orderIndex: 8,
          durationDays: 10,
        },
        {
          title: "Proyecto: aplicación de consola completa",
          orderIndex: 9,
          durationDays: 12,
        },
      ],
    },

    {
      title: "Python para Data Science",
      slug: "python-data-science",
      description:
        "Aprende Python aplicado al análisis de datos con NumPy, Pandas, Matplotlib y scikit-learn. Desde la exploración de datos hasta modelos de Machine Learning. El stack que usan los data scientists en la industria.",
      level: "BEGINNER" as const,
      goal: "data_science",
      weeklyHours: 12,
      subjectId: python.id,
      modules: [
        {
          title: "Python y entorno para Data Science",
          orderIndex: 1,
          durationDays: 12,
        },
        {
          title: "Python avanzado para análisis de datos",
          orderIndex: 2,
          durationDays: 10,
        },
        {
          title: "NumPy: computación numérica vectorizada",
          orderIndex: 3,
          durationDays: 12,
        },
        {
          title: "Pandas: análisis y manipulación de datos",
          orderIndex: 4,
          durationDays: 14,
        },
        {
          title: "Visualización con Matplotlib y Seaborn",
          orderIndex: 5,
          durationDays: 10,
        },
        {
          title: "Estadística descriptiva e inferencial aplicada",
          orderIndex: 6,
          durationDays: 12,
        },
        {
          title: "Machine Learning con scikit-learn",
          orderIndex: 7,
          durationDays: 14,
        },
        {
          title: "Pipelines, feature engineering y validación robusta",
          orderIndex: 8,
          durationDays: 12,
        },
        {
          title: "Proyecto: análisis de datos real end-to-end",
          orderIndex: 9,
          durationDays: 14,
        },
      ],
    },

    // ── NUEVAS BEGINNER ──────────────────────────────────────

    {
      title: "Python desde Cero",
      slug: "python-beginner",
      description:
        "Aprende Python desde los fundamentos: tipos, funciones, colecciones, POO, archivos y la librería estándar. El lenguaje más versátil del mercado, ideal como primer lenguaje de programación. Al terminar construirás una herramienta de automatización CLI.",
      level: "BEGINNER" as const,
      goal: "backend",
      weeklyHours: 8,
      subjectId: python.id,
      modules: [
        {
          title: "Python: filosofía, instalación y primeros pasos",
          orderIndex: 1,
          durationDays: 6,
        },
        {
          title: "Tipos, variables, operadores y strings",
          orderIndex: 2,
          durationDays: 8,
        },
        {
          title: "Control de flujo: condicionales y loops",
          orderIndex: 3,
          durationDays: 8,
        },
        {
          title: "Funciones, argumentos y scope",
          orderIndex: 4,
          durationDays: 10,
        },
        {
          title: "Listas, tuplas, diccionarios y sets",
          orderIndex: 5,
          durationDays: 10,
        },
        {
          title: "Programación orientada a objetos en Python",
          orderIndex: 6,
          durationDays: 10,
        },
        {
          title: "Archivos, excepciones y módulos",
          orderIndex: 7,
          durationDays: 8,
        },
        {
          title: "Librería estándar esencial y pip",
          orderIndex: 8,
          durationDays: 8,
        },
        {
          title: "Proyecto: herramienta de automatización CLI",
          orderIndex: 9,
          durationDays: 12,
        },
      ],
    },

    {
      title: "TypeScript desde Cero",
      slug: "typescript-beginner",
      description:
        "Aprende TypeScript desde los fundamentos: tipos primitivos, interfaces, generics básicos y utility types. Entiende por qué los equipos profesionales lo adoptan y cómo añade seguridad y escalabilidad a cualquier proyecto JavaScript.",
      level: "BEGINNER" as const,
      goal: "fullstack",
      weeklyHours: 8,
      subjectId: typescript.id,
      modules: [
        {
          title: "Por qué TypeScript existe y cómo configurarlo",
          orderIndex: 1,
          durationDays: 8,
        },
        {
          title: "Tipos primitivos, anotaciones y funciones tipadas",
          orderIndex: 2,
          durationDays: 8,
        },
        {
          title: "Objetos, interfaces y type aliases",
          orderIndex: 3,
          durationDays: 8,
        },
        {
          title: "Union types, intersection types y narrowing",
          orderIndex: 4,
          durationDays: 10,
        },
        {
          title: "Generics: código reutilizable con type safety",
          orderIndex: 5,
          durationDays: 10,
        },
        {
          title: "Enums y clases tipadas",
          orderIndex: 6,
          durationDays: 8,
        },
        {
          title: "Utility types de la librería estándar",
          orderIndex: 7,
          durationDays: 10,
        },
        {
          title: "Módulos, paths y tipos para librerías externas",
          orderIndex: 8,
          durationDays: 8,
        },
        {
          title: "Proyecto: API tipada con TypeScript y Zod",
          orderIndex: 9,
          durationDays: 12,
        },
      ],
    },

    {
      title: "Algoritmos y Estructuras de Datos",
      slug: "algorithms-beginner",
      description:
        "Domina las estructuras de datos y algoritmos fundamentales para resolver problemas técnicos y destacar en entrevistas de trabajo. Arrays, listas enlazadas, pilas, colas, árboles, grafos, búsqueda, ordenamiento y complejidad Big O.",
      level: "BEGINNER" as const,
      goal: "fullstack",
      weeklyHours: 10,
      subjectId: algorithms.id,
      modules: [
        {
          title: "Complejidad algorítmica y notación Big O",
          orderIndex: 1,
          durationDays: 8,
        },
        {
          title: "Arrays y strings: técnicas y patrones",
          orderIndex: 2,
          durationDays: 10,
        },
        {
          title: "Listas enlazadas: simple, doble y circular",
          orderIndex: 3,
          durationDays: 10,
        },
        {
          title: "Pilas, colas y deques",
          orderIndex: 4,
          durationDays: 8,
        },
        {
          title: "Tablas hash: implementación y colisiones",
          orderIndex: 5,
          durationDays: 8,
        },
        {
          title: "Árboles binarios y BST",
          orderIndex: 6,
          durationDays: 12,
        },
        {
          title: "Heaps y colas de prioridad",
          orderIndex: 7,
          durationDays: 8,
        },
        {
          title: "Grafos: BFS, DFS y caminos más cortos",
          orderIndex: 8,
          durationDays: 12,
        },
        {
          title: "Algoritmos de ordenamiento clásicos",
          orderIndex: 9,
          durationDays: 8,
        },
        {
          title: "Programación dinámica y técnicas avanzadas",
          orderIndex: 10,
          durationDays: 12,
        },
        {
          title: "Práctica: 30 problemas tipo entrevista resueltos",
          orderIndex: 11,
          durationDays: 14,
        },
      ],
    },

    // ══════════════════════════════════════
    // INTERMEDIATE
    // ══════════════════════════════════════

    {
      title: "React para Frontend Developers",
      slug: "react-frontend",
      description:
        "Conviértete en Frontend Developer profesional dominando React. Hooks, estado global con Context y Zustand, React Router v6, TanStack Query, formularios con React Hook Form y Zod, testing con Testing Library y deploy en producción.",
      level: "INTERMEDIATE" as const,
      goal: "frontend",
      weeklyHours: 15,
      subjectId: react.id,
      modules: [
        {
          title: "Fundamentos de React: Virtual DOM y JSX",
          orderIndex: 1,
          durationDays: 10,
        },
        {
          title: "Estado con useState y manejo de eventos",
          orderIndex: 2,
          durationDays: 12,
        },
        {
          title: "Props, renderizado condicional y listas",
          orderIndex: 3,
          durationDays: 8,
        },
        {
          title: "useEffect: sincronización y ciclo de vida",
          orderIndex: 4,
          durationDays: 12,
        },
        {
          title: "Hooks avanzados: useRef, useMemo y useCallback",
          orderIndex: 5,
          durationDays: 10,
        },
        {
          title: "Context API y estado global",
          orderIndex: 6,
          durationDays: 10,
        },
        {
          title: "React Router v6: navegación en SPAs",
          orderIndex: 7,
          durationDays: 7,
        },
        {
          title: "Peticiones HTTP con TanStack Query",
          orderIndex: 8,
          durationDays: 10,
        },
        {
          title: "Formularios con React Hook Form y Zod",
          orderIndex: 9,
          durationDays: 8,
        },
        {
          title: "Performance, testing y arquitectura de proyecto",
          orderIndex: 10,
          durationDays: 10,
        },
        {
          title: "Proyecto final: SPA completa en producción",
          orderIndex: 11,
          durationDays: 14,
        },
      ],
    },

    {
      title: "TypeScript Profesional",
      slug: "typescript-intermediate",
      description:
        "Domina TypeScript para código seguro y mantenible en proyectos profesionales. Tipos avanzados, generics con infer y constraints, utility types, TypeScript en React y Node.js, declaration files y patrones de diseño con el sistema de tipos.",
      level: "INTERMEDIATE" as const,
      goal: "fullstack",
      weeklyHours: 12,
      subjectId: typescript.id,
      modules: [
        {
          title: "Sistema de tipos avanzado y control flow analysis",
          orderIndex: 1,
          durationDays: 10,
        },
        {
          title: "Tipos avanzados: conditional, mapped e indexed access",
          orderIndex: 2,
          durationDays: 8,
        },
        {
          title: "Generics avanzados: infer, constraints y varianza",
          orderIndex: 3,
          durationDays: 10,
        },
        {
          title: "Utility types avanzados y template literal types",
          orderIndex: 4,
          durationDays: 8,
        },
        {
          title: "TypeScript en React: componentes, hooks y context tipados",
          orderIndex: 5,
          durationDays: 12,
        },
        {
          title: "TypeScript en Node.js: Express, Prisma y configuración",
          orderIndex: 6,
          durationDays: 10,
        },
        {
          title: "Declaration files y extensión de módulos",
          orderIndex: 7,
          durationDays: 8,
        },
        {
          title: "Patrones de diseño con TypeScript",
          orderIndex: 8,
          durationDays: 10,
        },
        {
          title: "Proyecto: librería TypeScript con tipos públicos",
          orderIndex: 9,
          durationDays: 12,
        },
      ],
    },

    {
      title: "Node.js Backend Developer",
      slug: "nodejs-backend",
      description:
        "Construye APIs REST robustas con Node.js, Express, Prisma y PostgreSQL. Auth JWT con refresh tokens, validación con Zod, upload a S3, jobs con BullMQ, rate limiting, testing con Jest y Supertest, y deploy con CI/CD.",
      level: "INTERMEDIATE" as const,
      goal: "backend",
      weeklyHours: 15,
      subjectId: nodejs.id,
      modules: [
        {
          title: "Node.js core: event loop, módulos y streams",
          orderIndex: 1,
          durationDays: 8,
        },
        {
          title: "Express.js: APIs REST y middleware",
          orderIndex: 2,
          durationDays: 12,
        },
        {
          title: "PostgreSQL y Prisma ORM con TypeScript",
          orderIndex: 3,
          durationDays: 12,
        },
        {
          title: "Autenticación JWT con access y refresh tokens",
          orderIndex: 4,
          durationDays: 10,
        },
        {
          title: "Validación con Zod y manejo de errores estructurado",
          orderIndex: 5,
          durationDays: 10,
        },
        {
          title: "Upload de archivos, email y jobs en background",
          orderIndex: 6,
          durationDays: 10,
        },
        {
          title: "Seguridad: CORS, rate limiting y headers HTTP",
          orderIndex: 7,
          durationDays: 8,
        },
        {
          title: "Testing: unitario, integración y APIs",
          orderIndex: 8,
          durationDays: 10,
        },
        {
          title: "Performance: caching con Redis y paginación",
          orderIndex: 9,
          durationDays: 8,
        },
        {
          title: "Deploy y observabilidad en producción",
          orderIndex: 10,
          durationDays: 10,
        },
        {
          title: "Proyecto final: API REST completa en producción",
          orderIndex: 11,
          durationDays: 14,
        },
      ],
    },

    {
      title: "Vue para Frontend Developers",
      slug: "vue-frontend",
      description:
        "Domina Vue 3 con Composition API para construir interfaces modernas. Composables, Pinia para estado global, Vue Router con guards, VeeValidate con Zod, TanStack Query para Vue y deploy en producción con Vite.",
      level: "INTERMEDIATE" as const,
      goal: "frontend",
      weeklyHours: 12,
      subjectId: vue.id,
      modules: [
        {
          title: "Fundamentos de Vue 3 y Composition API",
          orderIndex: 1,
          durationDays: 10,
        },
        {
          title: "Templates, directivas y reactividad",
          orderIndex: 2,
          durationDays: 10,
        },
        {
          title: "Componentes, props y emits",
          orderIndex: 3,
          durationDays: 10,
        },
        {
          title: "Composables y reutilización de lógica",
          orderIndex: 4,
          durationDays: 10,
        },
        {
          title: "Vue Router: navegación en SPAs",
          orderIndex: 5,
          durationDays: 10,
        },
        {
          title: "Pinia: estado global en Vue",
          orderIndex: 6,
          durationDays: 10,
        },
        {
          title: "Formularios, validación y peticiones HTTP",
          orderIndex: 7,
          durationDays: 10,
        },
        {
          title: "Testing con Vitest y Vue Testing Library",
          orderIndex: 8,
          durationDays: 10,
        },
        {
          title: "Performance, SSR con Nuxt y deploy",
          orderIndex: 9,
          durationDays: 10,
        },
        {
          title: "Proyecto final: SPA completa con Vue",
          orderIndex: 10,
          durationDays: 14,
        },
      ],
    },

    {
      title: "Angular para Frontend Developers",
      slug: "angular-frontend",
      description:
        "Domina Angular para aplicaciones web empresariales. Componentes, servicios con DI, RxJS y programación reactiva, formularios reactivos, routing con guards, HttpClient y arquitectura escalable con módulos.",
      level: "INTERMEDIATE" as const,
      goal: "frontend",
      weeklyHours: 12,
      subjectId: angular.id,
      modules: [
        {
          title: "Fundamentos de Angular y arquitectura",
          orderIndex: 1,
          durationDays: 10,
        },
        {
          title: "Componentes, templates y data binding",
          orderIndex: 2,
          durationDays: 10,
        },
        {
          title: "Servicios, inyección de dependencias y módulos",
          orderIndex: 3,
          durationDays: 10,
        },
        {
          title: "RxJS: programación reactiva en Angular",
          orderIndex: 4,
          durationDays: 12,
        },
        {
          title: "Routing y navigation guards",
          orderIndex: 5,
          durationDays: 10,
        },
        {
          title: "Formularios reactivos y validación",
          orderIndex: 6,
          durationDays: 10,
        },
        {
          title: "HttpClient, interceptors y manejo de errores",
          orderIndex: 7,
          durationDays: 10,
        },
        {
          title: "State management con NgRx o signals",
          orderIndex: 8,
          durationDays: 12,
        },
        {
          title: "Testing con Jasmine y Angular Testing Utilities",
          orderIndex: 9,
          durationDays: 10,
        },
        {
          title: "Proyecto final: aplicación empresarial con Angular",
          orderIndex: 10,
          durationDays: 14,
        },
      ],
    },

    {
      title: "PostgreSQL Profesional",
      slug: "postgresql-intermediate",
      description:
        "Domina PostgreSQL más allá del SQL básico. JSONB, arrays, isolation levels, índices avanzados (GIN, GiST), window functions, CTEs recursivos, funciones PL/pgSQL, full-text search y performance tuning.",
      level: "INTERMEDIATE" as const,
      goal: "backend",
      weeklyHours: 10,
      subjectId: postgresql.id,
      modules: [
        {
          title: "Arquitectura de PostgreSQL y tipos de datos avanzados",
          orderIndex: 1,
          durationDays: 10,
        },
        {
          title: "Relaciones avanzadas y normalización",
          orderIndex: 2,
          durationDays: 10,
        },
        {
          title: "Transacciones, isolation levels y locks",
          orderIndex: 3,
          durationDays: 10,
        },
        {
          title: "Queries avanzadas: window functions y CTEs recursivos",
          orderIndex: 4,
          durationDays: 10,
        },
        {
          title: "Índices avanzados y performance tuning",
          orderIndex: 5,
          durationDays: 12,
        },
        {
          title: "Funciones PL/pgSQL, triggers y vistas materializadas",
          orderIndex: 6,
          durationDays: 10,
        },
        {
          title: "Full-text search y búsqueda avanzada",
          orderIndex: 7,
          durationDays: 8,
        },
        {
          title: "Backup, replicación y alta disponibilidad",
          orderIndex: 8,
          durationDays: 10,
        },
        {
          title: "Proyecto: sistema de datos para aplicación real",
          orderIndex: 9,
          durationDays: 12,
        },
      ],
    },

    {
      title: "MongoDB para Backend",
      slug: "mongodb-intermediate",
      description:
        "Aprende MongoDB para backends con datos flexibles. Modelado de documentos, embedding vs referencing, aggregation pipeline, índices, transacciones ACID e integración con Node.js usando Mongoose. Deploy en MongoDB Atlas.",
      level: "INTERMEDIATE" as const,
      goal: "backend",
      weeklyHours: 10,
      subjectId: mongodb.id,
      modules: [
        {
          title: "MongoDB: modelo de documentos y cuándo usarlo",
          orderIndex: 1,
          durationDays: 8,
        },
        {
          title: "Modelado de datos: embedding vs referencing",
          orderIndex: 2,
          durationDays: 10,
        },
        {
          title: "Queries, filtros y operadores",
          orderIndex: 3,
          durationDays: 10,
        },
        {
          title: "Aggregation Pipeline",
          orderIndex: 4,
          durationDays: 10,
        },
        {
          title: "Índices y performance en MongoDB",
          orderIndex: 5,
          durationDays: 10,
        },
        {
          title: "Transacciones y consistencia",
          orderIndex: 6,
          durationDays: 8,
        },
        {
          title: "Integración con Node.js: Mongoose y driver nativo",
          orderIndex: 7,
          durationDays: 12,
        },
        {
          title: "Proyecto: API con MongoDB Atlas en producción",
          orderIndex: 8,
          durationDays: 12,
        },
      ],
    },

    {
      title: "Docker para Desarrolladores",
      slug: "docker-intermediate",
      description:
        "Conteneriza aplicaciones para entornos reproducibles. Dockerfile multi-stage, volúmenes, redes, Docker Compose para ambientes completos, publicación en ECR, buenas prácticas de seguridad y deploy de contenedores en producción.",
      level: "INTERMEDIATE" as const,
      goal: "devops",
      weeklyHours: 10,
      subjectId: docker.id,
      modules: [
        {
          title: "Contenedores: qué son y por qué importan",
          orderIndex: 1,
          durationDays: 8,
        },
        {
          title: "Dockerfile: construir imágenes propias",
          orderIndex: 2,
          durationDays: 10,
        },
        {
          title: "Volúmenes y redes en Docker",
          orderIndex: 3,
          durationDays: 8,
        },
        {
          title: "Docker Compose: ambientes multi-contenedor",
          orderIndex: 4,
          durationDays: 10,
        },
        {
          title: "Registry privado y gestión de imágenes",
          orderIndex: 5,
          durationDays: 8,
        },
        {
          title: "Buenas prácticas: seguridad y optimización",
          orderIndex: 6,
          durationDays: 10,
        },
        {
          title: "Logging, monitoreo y debugging de contenedores",
          orderIndex: 7,
          durationDays: 8,
        },
        {
          title: "Proyecto: aplicación completa containerizada",
          orderIndex: 8,
          durationDays: 12,
        },
      ],
    },

    {
      title: "Java Profesional",
      slug: "java-intermediate",
      description:
        "Consolida Java para el mundo profesional. SOLID, Streams y lambdas de Java 8+, testing con JUnit 5 y Mockito, concurrencia con ExecutorService, Java moderno (records, sealed classes), Maven/Gradle y arquitectura hexagonal.",
      level: "INTERMEDIATE" as const,
      goal: "backend",
      weeklyHours: 12,
      subjectId: java.id,
      modules: [
        {
          title: "POO sólida: principios SOLID y diseño de clases",
          orderIndex: 1,
          durationDays: 10,
        },
        {
          title: "Herencia avanzada, interfaces y polimorfismo",
          orderIndex: 2,
          durationDays: 10,
        },
        {
          title: "Colecciones, generics y Streams API",
          orderIndex: 3,
          durationDays: 12,
        },
        {
          title: "Excepciones, archivos y I/O con NIO.2",
          orderIndex: 4,
          durationDays: 12,
        },
        {
          title: "Testing con JUnit 5 y Mockito",
          orderIndex: 5,
          durationDays: 12,
        },
        {
          title: "Concurrencia: threads, synchronized y ExecutorService",
          orderIndex: 6,
          durationDays: 12,
        },
        {
          title: "Java moderno: records, sealed classes y pattern matching",
          orderIndex: 7,
          durationDays: 8,
        },
        {
          title: "Maven, Gradle y gestión de dependencias",
          orderIndex: 8,
          durationDays: 8,
        },
        {
          title: "Arquitectura hexagonal y patrones de diseño",
          orderIndex: 9,
          durationDays: 12,
        },
        {
          title: "Proyecto: aplicación backend Java bien estructurada",
          orderIndex: 10,
          durationDays: 14,
        },
      ],
    },

    {
      title: "AWS para Backend y Serverless",
      slug: "aws-intermediate",
      description:
        "Construye y despliega arquitecturas serverless en AWS. Lambda, API Gateway, DynamoDB, SQS, S3 presigned URLs, Cognito, CloudWatch, VPC e Infrastructure as Code con Serverless Framework.",
      level: "INTERMEDIATE" as const,
      goal: "devops",
      weeklyHours: 12,
      subjectId: aws.id,
      modules: [
        {
          title: "Lambda y API Gateway: serverless desde cero",
          orderIndex: 1,
          durationDays: 12,
        },
        {
          title: "DynamoDB: diseño y acceso a datos NoSQL",
          orderIndex: 2,
          durationDays: 12,
        },
        {
          title: "VPC, subnets y conectividad de servicios",
          orderIndex: 3,
          durationDays: 12,
        },
        {
          title: "CloudWatch: logs, métricas y alarmas",
          orderIndex: 4,
          durationDays: 10,
        },
        {
          title: "Seguridad serverless: IAM, Secrets Manager y WAF",
          orderIndex: 5,
          durationDays: 10,
        },
        {
          title: "SQS y procesamiento asíncrono",
          orderIndex: 6,
          durationDays: 10,
        },
        {
          title: "S3 avanzado: presigned URLs, eventos y lifecycle",
          orderIndex: 7,
          durationDays: 8,
        },
        {
          title: "Cognito: autenticación gestionada",
          orderIndex: 8,
          durationDays: 10,
        },
        {
          title: "Infrastructure as Code con Serverless Framework",
          orderIndex: 9,
          durationDays: 10,
        },
        {
          title: "Proyecto: backend serverless completo en producción",
          orderIndex: 10,
          durationDays: 14,
        },
      ],
    },

    {
      title: "React Native para Mobile Developers",
      slug: "react-native-intermediate",
      description:
        "Construye apps para iOS y Android con React Native. React Navigation, APIs nativas del dispositivo, estado global con Zustand, notificaciones push, almacenamiento local y publicación en App Store y Google Play.",
      level: "INTERMEDIATE" as const,
      goal: "mobile",
      weeklyHours: 12,
      subjectId: reactNative.id,
      modules: [
        {
          title: "Fundamentos de React Native y entorno",
          orderIndex: 1,
          durationDays: 10,
        },
        {
          title: "Componentes nativos, estilos y layouts",
          orderIndex: 2,
          durationDays: 10,
        },
        {
          title: "Navegación con React Navigation",
          orderIndex: 3,
          durationDays: 10,
        },
        {
          title: "Estado global con Zustand y persistencia",
          orderIndex: 4,
          durationDays: 10,
        },
        {
          title: "APIs del dispositivo: cámara, geolocalización y sensores",
          orderIndex: 5,
          durationDays: 10,
        },
        {
          title: "Notificaciones push y almacenamiento local",
          orderIndex: 6,
          durationDays: 10,
        },
        {
          title: "Peticiones HTTP, autenticación y manejo de errores",
          orderIndex: 7,
          durationDays: 10,
        },
        {
          title: "Performance, animaciones y experiencia de usuario",
          orderIndex: 8,
          durationDays: 10,
        },
        {
          title: "Publicación en App Store y Google Play",
          orderIndex: 9,
          durationDays: 10,
        },
        {
          title: "Proyecto final: app móvil completa publicada",
          orderIndex: 10,
          durationDays: 14,
        },
      ],
    },

    {
      title: "QA Automation con JavaScript",
      slug: "qa-javascript-intermediate",
      description:
        "Automatiza pruebas de software con JavaScript. Testing unitario con Jest, integración con Supertest, E2E con Cypress y Playwright, estrategia de QA, reportes y pipelines de calidad en CI/CD.",
      level: "INTERMEDIATE" as const,
      goal: "qa",
      weeklyHours: 10,
      subjectId: javascript.id,
      modules: [
        {
          title: "Fundamentos de testing y estrategia QA",
          orderIndex: 1,
          durationDays: 8,
        },
        {
          title: "Testing unitario con Jest: mocks, spies y cobertura",
          orderIndex: 2,
          durationDays: 10,
        },
        {
          title: "Testing de APIs con Supertest e integración",
          orderIndex: 3,
          durationDays: 10,
        },
        {
          title: "E2E con Cypress: escenarios reales de usuario",
          orderIndex: 4,
          durationDays: 12,
        },
        {
          title: "E2E con Playwright: cross-browser y mobile",
          orderIndex: 5,
          durationDays: 12,
        },
        {
          title: "Performance testing y accesibilidad",
          orderIndex: 6,
          durationDays: 10,
        },
        {
          title: "CI/CD para pipelines de calidad automáticos",
          orderIndex: 7,
          durationDays: 10,
        },
        {
          title: "Reportes, métricas y estrategia de QA en equipos",
          orderIndex: 8,
          durationDays: 10,
        },
        {
          title: "Proyecto: suite de tests completa para una aplicación real",
          orderIndex: 9,
          durationDays: 12,
        },
      ],
    },

    // ── NUEVAS INTERMEDIATE ──────────────────────────────────

    {
      title: "CI/CD con GitHub Actions",
      slug: "cicd-github-actions",
      description:
        "Implementa pipelines de integración y despliegue continuo profesionales con GitHub Actions. Tests automáticos, build de Docker, gestión de secrets con OIDC, deploy a AWS Lambda y ECS, automatización de PRs y análisis de calidad de código.",
      level: "INTERMEDIATE" as const,
      goal: "devops",
      weeklyHours: 8,
      subjectId: cicd.id,
      modules: [
        {
          title: "Qué es CI/CD y por qué cambia todo",
          orderIndex: 1,
          durationDays: 6,
        },
        {
          title: "GitHub Actions: workflows, jobs y steps",
          orderIndex: 2,
          durationDays: 8,
        },
        {
          title: "Pipeline de tests automáticos",
          orderIndex: 3,
          durationDays: 8,
        },
        {
          title: "Secrets, variables de entorno y seguridad",
          orderIndex: 4,
          durationDays: 8,
        },
        {
          title: "Build y publicación de imágenes Docker",
          orderIndex: 5,
          durationDays: 8,
        },
        {
          title: "Deploy automático a producción",
          orderIndex: 6,
          durationDays: 10,
        },
        {
          title: "Automatización de PRs y calidad de código",
          orderIndex: 7,
          durationDays: 6,
        },
        {
          title: "Proyecto: pipeline completo de producción",
          orderIndex: 8,
          durationDays: 10,
        },
      ],
    },

    {
      title: "Next.js Full Stack",
      slug: "nextjs-fullstack",
      description:
        "Construye aplicaciones full stack con Next.js 15 y App Router. Server Components, Server Actions, API Routes, autenticación con NextAuth, bases de datos con Prisma, deploy en Vercel y AWS. El stack más demandado para proyectos React en producción.",
      level: "INTERMEDIATE" as const,
      goal: "fullstack",
      weeklyHours: 15,
      subjectId: nextjs.id,
      modules: [
        {
          title: "App Router: Server Components y Client Components",
          orderIndex: 1,
          durationDays: 10,
        },
        {
          title: "Routing, layouts y nested routes",
          orderIndex: 2,
          durationDays: 8,
        },
        {
          title: "Data fetching: fetch, cache y revalidación",
          orderIndex: 3,
          durationDays: 10,
        },
        {
          title: "Server Actions: mutaciones sin API explícita",
          orderIndex: 4,
          durationDays: 10,
        },
        {
          title: "API Routes y Route Handlers",
          orderIndex: 5,
          durationDays: 8,
        },
        {
          title: "Autenticación con NextAuth v5",
          orderIndex: 6,
          durationDays: 10,
        },
        {
          title: "Base de datos con Prisma y PostgreSQL",
          orderIndex: 7,
          durationDays: 12,
        },
        {
          title: "Optimización: imágenes, fuentes y metadata SEO",
          orderIndex: 8,
          durationDays: 8,
        },
        {
          title: "Testing en Next.js: unitario, integración y E2E",
          orderIndex: 9,
          durationDays: 10,
        },
        {
          title: "Deploy en Vercel y self-hosted en AWS",
          orderIndex: 10,
          durationDays: 8,
        },
        {
          title: "Proyecto final: aplicación full stack completa",
          orderIndex: 11,
          durationDays: 14,
        },
      ],
    },

    // ══════════════════════════════════════
    // ADVANCED
    // ══════════════════════════════════════

    {
      title: "Java Avanzado",
      slug: "java-advanced",
      description:
        "Domina Java para sistemas de alto rendimiento. Concurrencia avanzada con CompletableFuture y Virtual Threads (Java 21), Collections internals, patrones GoF, arquitectura limpia y hexagonal, performance profiling y preparación para Spring Boot.",
      level: "ADVANCED" as const,
      goal: "backend",
      weeklyHours: 12,
      subjectId: java.id,
      modules: [
        {
          title: "Generics avanzados y APIs robustas",
          orderIndex: 1,
          durationDays: 10,
        },
        {
          title: "Concurrencia avanzada: CompletableFuture y reactive",
          orderIndex: 2,
          durationDays: 12,
        },
        {
          title: "Virtual Threads y Project Loom (Java 21)",
          orderIndex: 3,
          durationDays: 10,
        },
        {
          title: "Java Collections internals y performance",
          orderIndex: 4,
          durationDays: 10,
        },
        {
          title: "Patrones de diseño GoF aplicados a Java",
          orderIndex: 5,
          durationDays: 12,
        },
        {
          title: "Arquitectura limpia y hexagonal en Java",
          orderIndex: 6,
          durationDays: 12,
        },
        {
          title: "JVM internals: GC tuning y profiling",
          orderIndex: 7,
          durationDays: 10,
        },
        {
          title: "Preparación para Spring Boot y ecosistema",
          orderIndex: 8,
          durationDays: 14,
        },
      ],
    },

    {
      title: "Spring Boot Backend",
      slug: "spring-boot-backend",
      description:
        "Construye APIs y microservicios con Spring Boot 3. Arquitectura en capas, Spring Data JPA, Bean Validation, Spring Security con JWT, testing con JUnit 5 y Mockito, documentación con OpenAPI y deploy en contenedores.",
      level: "ADVANCED" as const,
      goal: "backend",
      weeklyHours: 15,
      subjectId: java.id,
      modules: [
        {
          title: "Estructura de proyecto y Spring Boot internals",
          orderIndex: 1,
          durationDays: 10,
        },
        {
          title: "Controllers, services y dependency injection",
          orderIndex: 2,
          durationDays: 12,
        },
        {
          title: "REST APIs, validación con Bean Validation y manejo de errores",
          orderIndex: 3,
          durationDays: 12,
        },
        {
          title: "Persistencia con Spring Data JPA y PostgreSQL",
          orderIndex: 4,
          durationDays: 14,
        },
        {
          title: "Spring Security: autenticación JWT y autorización",
          orderIndex: 5,
          durationDays: 12,
        },
        {
          title: "Testing: unitario, integración y slice tests",
          orderIndex: 6,
          durationDays: 12,
        },
        {
          title: "Documentación con OpenAPI y Swagger UI",
          orderIndex: 7,
          durationDays: 8,
        },
        {
          title: "Configuración, profiles y gestión de secretos",
          orderIndex: 8,
          durationDays: 8,
        },
        {
          title: "Containerización con Docker y deploy en producción",
          orderIndex: 9,
          durationDays: 10,
        },
        {
          title: "Proyecto final: microservicio Spring Boot en producción",
          orderIndex: 10,
          durationDays: 14,
        },
      ],
    },

    {
      title: "Kubernetes Esencial",
      slug: "kubernetes-intermediate",
      description:
        "Orquesta contenedores en producción con Kubernetes. Pods, Deployments, Services, Ingress, ConfigMaps, Secrets, Persistent Volumes, HPA para escalado automático, RBAC y observabilidad con Prometheus y Grafana.",
      level: "ADVANCED" as const,
      goal: "devops",
      weeklyHours: 12,
      subjectId: kubernetes.id,
      modules: [
        {
          title: "Arquitectura de Kubernetes y componentes core",
          orderIndex: 1,
          durationDays: 10,
        },
        {
          title: "Pods, deployments y ReplicaSets",
          orderIndex: 2,
          durationDays: 10,
        },
        {
          title: "Services, Ingress y networking",
          orderIndex: 3,
          durationDays: 10,
        },
        {
          title: "ConfigMaps, Secrets y gestión de configuración",
          orderIndex: 4,
          durationDays: 10,
        },
        {
          title: "Persistent Volumes y StatefulSets",
          orderIndex: 5,
          durationDays: 10,
        },
        {
          title: "HPA, VPA y escalado automático",
          orderIndex: 6,
          durationDays: 10,
        },
        {
          title: "RBAC, seguridad y network policies",
          orderIndex: 7,
          durationDays: 10,
        },
        {
          title: "Observabilidad con Prometheus y Grafana",
          orderIndex: 8,
          durationDays: 10,
        },
        {
          title: "Helm: gestión de paquetes en Kubernetes",
          orderIndex: 9,
          durationDays: 8,
        },
        {
          title: "Proyecto: despliegue completo de aplicación en EKS",
          orderIndex: 10,
          durationDays: 14,
        },
      ],
    },

    {
      title: "AWS Well-Architected",
      slug: "aws-advanced",
      description:
        "Diseña arquitecturas cloud que escalan, resisten fallos y optimizan costos siguiendo el AWS Well-Architected Framework. Los 6 pilares con casos reales. Para roles de arquitecto cloud y soluciones senior.",
      level: "ADVANCED" as const,
      goal: "devops",
      weeklyHours: 12,
      subjectId: aws.id,
      modules: [
        {
          title: "Operational Excellence: observabilidad y automatización",
          orderIndex: 1,
          durationDays: 10,
        },
        {
          title: "Security Pillar: IAM avanzado, KMS y detección de amenazas",
          orderIndex: 2,
          durationDays: 10,
        },
        {
          title: "Reliability: multi-AZ, disaster recovery y chaos engineering",
          orderIndex: 3,
          durationDays: 10,
        },
        {
          title: "Performance Efficiency: caching, CDN y auto-scaling",
          orderIndex: 4,
          durationDays: 10,
        },
        {
          title: "Cost Optimization: right-sizing, Reserved Instances y Savings Plans",
          orderIndex: 5,
          durationDays: 10,
        },
        {
          title: "Sustainability: arquitecturas eficientes en energía",
          orderIndex: 6,
          durationDays: 8,
        },
        {
          title: "Microservicios en AWS: ECS, EKS y service mesh",
          orderIndex: 7,
          durationDays: 12,
        },
        {
          title: "Event-driven architecture: EventBridge, SNS y SQS avanzado",
          orderIndex: 8,
          durationDays: 10,
        },
        {
          title: "Infrastructure as Code avanzado: CDK y Terraform",
          orderIndex: 9,
          durationDays: 12,
        },
        {
          title: "Proyecto: arquitectura Well-Architected completa",
          orderIndex: 10,
          durationDays: 14,
        },
      ],
    },


    {
      title: "Arquitectura de Microservicios",
      slug: "microservices-advanced",
      description:
        "Diseña y construye sistemas distribuidos con arquitectura de microservicios. Comunicación síncrona y asíncrona, patrones de resiliencia (Circuit Breaker, Saga), API Gateway, service discovery y observabilidad distribuida.",
      level: "ADVANCED" as const,
      goal: "backend",
      weeklyHours: 15,
      subjectId: nodejs.id,
      modules: [
        {
          title: "De monolito a microservicios: cuándo y cómo",
          orderIndex: 1,
          durationDays: 10,
        },
        {
          title: "Comunicación síncrona: REST y gRPC entre servicios",
          orderIndex: 2,
          durationDays: 12,
        },
        {
          title: "Mensajería asíncrona con RabbitMQ y Kafka",
          orderIndex: 3,
          durationDays: 14,
        },
        {
          title: "Patrones de resiliencia: Circuit Breaker, Retry y Bulkhead",
          orderIndex: 4,
          durationDays: 10,
        },
        {
          title: "Patrón Saga para transacciones distribuidas",
          orderIndex: 5,
          durationDays: 12,
        },
        {
          title: "API Gateway: autenticación, rate limiting y routing",
          orderIndex: 6,
          durationDays: 10,
        },
        {
          title: "Service discovery y configuración centralizada",
          orderIndex: 7,
          durationDays: 10,
        },
        {
          title: "Observabilidad distribuida: tracing, métricas y logs",
          orderIndex: 8,
          durationDays: 10,
        },
        {
          title: "Seguridad en sistemas distribuidos: mTLS y zero trust",
          orderIndex: 9,
          durationDays: 10,
        },
        {
          title: "Proyecto: sistema de microservicios completo en producción",
          orderIndex: 10,
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
        create: { ...module, pathTemplateId: path.id },
      });
    }

    console.log(`  ✅ ${pathInfo.title} (${modules.length} módulos)`);
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

async function seedConcepts() {
  const htmlCssId = "14ea6a80-4927-4d62-a41b-4a8c87215e6d";
  const javascriptId = "a5789bc1-b4a4-4680-9bb3-e03394e602ac";
  const sqlId = "2108f8f2-9106-412e-9fd9-8ce98579f195";
  const gitId = "9f4859f8-d186-4cef-8d0b-e0c10b7e3ae6";

  const concepts = [
    
    //HTML & CSS
    // MÓDULO 1: Cómo funciona la web y HTML semántico 
    {
      name: "Cómo funciona la web: clientes, servidores y HTTP",
      slug: "html-how-web-works",
      level: "BEGINNER" as const,
      subjectId: htmlCssId,
      description: "Comprende qué sucede desde que escribes una URL hasta que el navegador muestra la página: DNS, HTTP, servidores y el rol del navegador.",
      whyMatters: "Sin entender el ciclo petición-respuesta no puedes depurar errores de red, entender tiempos de carga ni trabajar con APIs. Es la base de todo desarrollo web.",
      explanation: `La web funciona sobre el protocolo HTTP (HyperText Transfer Protocol). Cuando escribes una URL:

1. El navegador consulta el DNS para traducir el dominio (ej: google.com) a una IP.
2. El navegador abre una conexión TCP/IP con el servidor en esa IP.
3. Envía una petición HTTP (GET, POST, etc.) con cabeceras y opcionalmente un body.
4. El servidor procesa la petición y responde con un código de estado (200, 404, 500...) y el recurso solicitado (HTML, JSON, imagen, etc.).
5. El navegador recibe el HTML y comienza a construir el DOM, descargando recursos adicionales (CSS, JS, imágenes).

Los navegadores modernos usan HTTP/2 o HTTP/3, que permiten múltiples peticiones simultáneas sobre una sola conexión, mejorando la performance.

El frontend (lo que ves) corre en el navegador del usuario. El backend (lógica de negocio, base de datos) corre en el servidor.`,
      codeExample: `<!-- Esto es lo que el servidor devuelve al navegador -->
<!-- Petición: GET https://ejemplo.com/index.html -->
<!-- Respuesta: 200 OK + este HTML -->

<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Mi página</title>
    <!-- El navegador hará otra petición GET para este CSS -->
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>Hola mundo</h1>
    <!-- El navegador hará otra petición GET para esta imagen -->
    <img src="foto.jpg" alt="Una foto" />
    <!-- Y otra para este script -->
    <script src="app.js"></script>
  </body>
</html>`,
      practicalTips: [
        "Abre DevTools (F12) → pestaña Network para ver todas las peticiones HTTP que hace tu página en tiempo real.",
        "El código de estado 200 significa éxito, 404 recurso no encontrado, 500 error del servidor. Memoriza los más comunes.",
        "HTTPS es simplemente HTTP con encriptación TLS. Hoy en día toda web en producción debe usar HTTPS.",
        "El navegador cachea recursos (CSS, imágenes, JS) para no pedirlos en cada visita. Esto acelera las cargas posteriores.",
      ],
      commonMistakes: [
        "Confundir frontend con backend: el HTML/CSS/JS que escribes corre en el navegador del usuario, no en tu computadora.",
        "No revisar la pestaña Network en DevTools cuando algo no carga. Ahí está el 90% de los diagnósticos.",
        "Creer que HTTP y HTTPS son protocolos completamente distintos. HTTPS es HTTP + capa de seguridad TLS.",
      ],
    },
    {
      name: "Estructura de un documento HTML y etiquetas semánticas",
      slug: "html-semantic-structure",
      level: "BEGINNER" as const,
      subjectId: htmlCssId,
      description: "Aprende la anatomía de un archivo HTML5 válido y el uso correcto de etiquetas semánticas como header, main, section, article, nav y footer.",
      whyMatters: "El HTML semántico mejora la accesibilidad (lectores de pantalla), el SEO (Google entiende tu contenido) y la mantenibilidad del código. Es la diferencia entre código profesional y amateur.",
      explanation: `Un documento HTML5 tiene una estructura mínima obligatoria:

- \`<!DOCTYPE html>\` — declara que es HTML5 (no HTML4 ni XHTML).
- \`<html lang="es">\` — elemento raíz, el atributo lang es clave para accesibilidad y SEO.
- \`<head>\` — metadatos: charset, título, descripción, links a CSS/fuentes. No se muestra en pantalla.
- \`<body>\` — todo el contenido visible.

Las etiquetas semánticas describen el significado del contenido, no solo su apariencia:

- \`<header>\` — encabezado del sitio o de una sección (logo, nav principal).
- \`<nav>\` — navegación principal o secundaria.
- \`<main>\` — contenido principal único de la página (solo uno por página).
- \`<section>\` — sección temática del contenido (debe tener un heading h2-h6).
- \`<article>\` — contenido independiente y reutilizable (post de blog, tarjeta de producto).
- \`<aside>\` — contenido complementario (sidebar, anuncios, info relacionada).
- \`<footer>\` — pie del sitio o sección (copyright, links legales).

Diferencia clave: \`<div>\` y \`<span>\` son neutros (sin significado semántico), úsalos solo cuando ninguna etiqueta semántica aplica.`,
      codeExample: `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Blog de desarrollo web con tutoriales y artículos" />
    <title>DevBlog | Tutoriales de desarrollo web</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>

    <header>
      <a href="/" aria-label="Ir al inicio">
        <img src="logo.svg" alt="DevBlog logo" width="120" />
      </a>
      <nav aria-label="Navegación principal">
        <ul>
          <li><a href="/tutoriales">Tutoriales</a></li>
          <li><a href="/sobre-mi">Sobre mí</a></li>
          <li><a href="/contacto">Contacto</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section aria-labelledby="articulos-recientes">
        <h2 id="articulos-recientes">Artículos recientes</h2>

        <article>
          <h3>Flexbox explicado desde cero</h3>
          <p>Aprende a crear layouts modernos con CSS Flexbox...</p>
          <a href="/flexbox">Leer más</a>
        </article>

        <article>
          <h3>Guía de CSS Grid</h3>
          <p>Domina CSS Grid para layouts de dos dimensiones...</p>
          <a href="/css-grid">Leer más</a>
        </article>
      </section>

      <aside aria-label="Temas relacionados">
        <h2>Categorías</h2>
        <ul>
          <li><a href="/css">CSS</a></li>
          <li><a href="/javascript">JavaScript</a></li>
        </ul>
      </aside>
    </main>

    <footer>
      <p>&copy; 2025 DevBlog. Todos los derechos reservados.</p>
      <nav aria-label="Navegación del pie de página">
        <a href="/privacidad">Privacidad</a>
        <a href="/terminos">Términos</a>
      </nav>
    </footer>

  </body>
</html>`,
      practicalTips: [
        "Usa la extensión 'axe DevTools' en Chrome para auditar accesibilidad de tu HTML semántico automáticamente.",
        "Solo debe haber un elemento <main> por página y un <h1> por página. Esto es crítico para SEO.",
        "El atributo lang en <html> es obligatorio. Google y los lectores de pantalla lo necesitan.",
        "Valida tu HTML en https://validator.w3.org/ antes de publicar. Errores silenciosos pueden afectar el rendering.",
        "Piensa en la estructura antes de escribir: dibuja los bloques en papel y luego mapéalos a etiquetas semánticas.",
      ],
      commonMistakes: [
        "Usar <div> para todo en lugar de etiquetas semánticas. Esto es el error más común en principiantes.",
        "Tener múltiples <h1> en la misma página. Solo debe haber uno, generalmente el título principal del contenido.",
        "Olvidar el meta viewport. Sin él, la página no se verá bien en móviles.",
        "Anidar <section> dentro de <article> cuando debería ser al revés: un article puede tener sections, no viceversa siempre.",
        "Poner el <nav> fuera del <header> cuando es la navegación principal del sitio.",
      ],
    },

    // ─── MÓDULO 2: Texto, enlaces, listas, tablas e imágenes ───────────────────
    {
      name: "Etiquetas de texto, énfasis y jerarquía tipográfica en HTML",
      slug: "html-text-elements",
      level: "BEGINNER" as const,
      subjectId: htmlCssId,
      description: "Domina las etiquetas HTML para estructurar texto: headings (h1-h6), párrafos, énfasis semántico (strong, em), citas, código inline y más.",
      whyMatters: "El texto es el 90% del contenido web. Usarlo correctamente con etiquetas semánticas mejora la legibilidad, el SEO y la accesibilidad. Google pondera el uso correcto de headings para posicionar páginas.",
      explanation: `HTML provee etiquetas específicas para cada tipo de contenido textual:

**Jerarquía de headings:**
- \`<h1>\` a \`<h6>\` crean una jerarquía documental. \`<h1>\` es el más importante (solo uno por página), \`<h6>\` el menos.
- No saltes niveles: después de h2 va h3, no h4. Esto afecta la accesibilidad y el SEO.

**Párrafos y saltos:**
- \`<p>\` es el elemento estándar para párrafos. El navegador añade margen automáticamente.
- \`<br>\` es un salto de línea forzado. Úsalo raramente (ej: en poemas o direcciones postales), no para espaciar elementos.

**Énfasis semántico:**
- \`<strong>\` — importancia alta (negrita por defecto). Semántico.
- \`<em>\` — énfasis (cursiva por defecto). Semántico.
- \`<b>\` — texto en negrita sin significado semántico. Úsalo solo para styling.
- \`<i>\` — texto en cursiva sin significado semántico (términos técnicos, títulos de obras).

**Otros elementos de texto:**
- \`<blockquote cite="url">\` — cita en bloque de otra fuente.
- \`<q>\` — cita inline corta.
- \`<cite>\` — título de una obra (libro, película, etc.).
- \`<code>\` — código inline.
- \`<pre>\` — texto preformateado (respeta espacios y saltos de línea).
- \`<mark>\` — texto resaltado (como con marcador).
- \`<small>\` — texto de menor importancia (avisos legales, copyright).
- \`<del>\` y \`<ins>\` — texto eliminado e insertado (útil en docs con cambios).
- \`<abbr title="HyperText Markup Language">\` — abreviaturas con tooltip.`,
      codeExample: `<article>
  <h2>Guía de CSS Flexbox</h2>

  <p>
    <strong>CSS Flexbox</strong> es un módulo de layout que permite distribuir
    elementos en un contenedor de forma <em>flexible y eficiente</em>,
    sin importar su tamaño.
  </p>

  <p>
    Fue introducido en <abbr title="Cascading Style Sheets">CSS</abbr> versión 3
    y hoy tiene soporte en el <mark>99% de los navegadores</mark> modernos.
  </p>

  <blockquote cite="https://developer.mozilla.org/es/docs/Web/CSS/CSS_flexible_box_layout">
    <p>"El módulo de caja flexible está diseñado como un modelo de layout
    unidimensional y como un método que puede ofrecer distribución de espacio
    entre ítems en una interfaz."</p>
    <cite>— MDN Web Docs</cite>
  </blockquote>

  <p>Para activar Flexbox, usa la propiedad <code>display: flex</code> en el contenedor:</p>

  <pre><code>.container {
  display: flex;
  justify-content: center;
  align-items: center;
}</code></pre>

  <p><small>Nota: Flexbox no reemplaza CSS Grid. Cada uno tiene su caso de uso ideal.</small></p>
</article>`,
      practicalTips: [
        "Usa strong y em por su significado semántico, no solo por el estilo visual. Si solo quieres negrita decorativa, usa CSS.",
        "La jerarquía de headings debe ser lógica: no pongas un h4 después de un h2 saltándote el h3.",
        "Para mostrar código, combina <pre><code>: pre respeta el formato y code indica que es código.",
        "El elemento <mark> es perfecto para resultados de búsqueda, resaltando el término buscado.",
      ],
      commonMistakes: [
        "Usar <br><br> para separar párrafos en lugar de usar elementos <p> separados.",
        "Confundir <strong> con <b> y <em> con <i>. Los primeros son semánticos, los segundos son puramente visuales.",
        "Usar headings para hacer texto grande en lugar de para estructurar el documento. El tamaño visual se controla con CSS.",
        "Olvidar cerrar etiquetas como <p>, <li>, <td>. Aunque el navegador lo corrija, es mala práctica.",
      ],
    },
    {
      name: "Enlaces, listas y tablas HTML",
      slug: "html-links-lists-tables",
      level: "BEGINNER" as const,
      subjectId: htmlCssId,
      description: "Aprende a crear hipervínculos internos y externos, listas ordenadas y desordenadas, listas de definición y tablas HTML accesibles para datos tabulares.",
      whyMatters: "Los enlaces son la esencia de la web. Las listas son el patrón de contenido más repetido (navegación, artículos, productos). Las tablas son la única forma correcta de mostrar datos tabulares con relaciones entre filas y columnas.",
      explanation: `**Elementos de enlace (<a>):**
El atributo \`href\` define el destino. Tipos de rutas:
- Absolutas: \`https://google.com\`
- Relativas: \`./sobre-mi.html\` o \`../contacto.html\`
- Anclas internas: \`#seccion-2\`
- Email: \`mailto:hola@ejemplo.com\`
- Teléfono: \`tel:+573001234567\`

Atributos importantes:
- \`target="_blank"\` — abre en nueva pestaña (siempre acompaña con \`rel="noopener noreferrer"\` por seguridad).
- \`rel="nofollow"\` — le dice a Google que no siga este enlace.
- \`download\` — fuerza descarga del recurso.
- \`aria-label\` — descripción accesible cuando el texto del enlace no es descriptivo.

**Listas:**
- \`<ul>\` + \`<li>\` — lista desordenada (viñetas). Para items sin orden jerárquico.
- \`<ol>\` + \`<li>\` — lista ordenada (números). Para pasos secuenciales.
- \`<dl>\` + \`<dt>\` + \`<dd>\` — lista de definición. Para glosarios o pares término-descripción.
- Las listas pueden anidarse: un \`<ul>\` dentro de un \`<li>\`.

**Tablas:**
Las tablas son SOLO para datos tabulares (no para layout):
- \`<table>\` — contenedor.
- \`<thead>\`, \`<tbody>\`, \`<tfoot>\` — agrupación semántica de filas.
- \`<tr>\` — fila.
- \`<th>\` — celda de encabezado (con \`scope="col"\` o \`scope="row"\` para accesibilidad).
- \`<td>\` — celda de dato.
- \`<caption>\` — título descriptivo de la tabla.
- \`colspan\` y \`rowspan\` — combinan columnas o filas.`,
      codeExample: `<!-- ENLACES -->
<nav>
  <!-- Enlace interno relativo -->
  <a href="./sobre-mi.html">Sobre mí</a>

  <!-- Enlace externo en nueva pestaña (con seguridad) -->
  <a href="https://github.com/usuario" target="_blank" rel="noopener noreferrer">
    GitHub
  </a>

  <!-- Enlace de email -->
  <a href="mailto:hola@ejemplo.com">Contáctame</a>

  <!-- Enlace a sección interna -->
  <a href="#proyectos">Ver proyectos</a>
</nav>

<!-- LISTAS -->
<!-- Desordenada: menú de navegación, lista de features -->
<ul>
  <li>HTML semántico</li>
  <li>CSS moderno
    <ul>
      <li>Flexbox</li>
      <li>Grid</li>
    </ul>
  </li>
</ul>

<!-- Ordenada: pasos de instalación, instrucciones -->
<ol>
  <li>Instala Node.js desde nodejs.org</li>
  <li>Abre la terminal</li>
  <li>Ejecuta <code>npm install</code></li>
</ol>

<!-- Lista de definición: glosarios -->
<dl>
  <dt>HTML</dt>
  <dd>Lenguaje de marcado para estructurar contenido web.</dd>
  <dt>CSS</dt>
  <dd>Lenguaje de estilos para presentar contenido HTML.</dd>
</dl>

<!-- TABLA ACCESIBLE -->
<table>
  <caption>Comparativa de navegadores 2025</caption>
  <thead>
    <tr>
      <th scope="col">Navegador</th>
      <th scope="col">Motor</th>
      <th scope="col">Cuota de mercado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Chrome</td>
      <td>Blink</td>
      <td>65%</td>
    </tr>
    <tr>
      <td>Safari</td>
      <td>WebKit</td>
      <td>19%</td>
    </tr>
    <tr>
      <td>Firefox</td>
      <td>Gecko</td>
      <td>4%</td>
    </tr>
  </tbody>
</table>`,
      practicalTips: [
        "Siempre usa rel='noopener noreferrer' con target='_blank'. Sin esto, la página destino puede acceder a tu window mediante window.opener (vulnerabilidad de seguridad).",
        "El texto de un enlace debe describir el destino: 'Ver política de privacidad' es mejor que 'Click aquí'.",
        "Usa <ol> para pasos numerados (recetas, instalación, tutoriales) y <ul> para listas donde el orden no importa.",
        "Las tablas deben tener siempre <caption> y atributos scope en <th> para que los lectores de pantalla las lean correctamente.",
        "Nunca uses tablas para layout de página. Eso era práctica de los años 90. Para layout usa Flexbox o Grid.",
      ],
      commonMistakes: [
        "Usar target='_blank' sin rel='noopener noreferrer'. Es una vulnerabilidad de seguridad conocida.",
        "Escribir 'Haz click aquí' como texto de enlace. No describe el destino y es pésimo para accesibilidad y SEO.",
        "Usar tablas para maquetar la página en lugar de datos tabulares. Es una práctica obsoleta y dañina para accesibilidad.",
        "Olvidar el atributo href en los enlaces o dejarlo vacío con href='#' sin intención.",
        "Anidar elementos de bloque (<p>, <div>) dentro de <a>. Aunque HTML5 lo permite en algunos casos, puede causar comportamientos inesperados.",
      ],
    },
    {
      name: "Imágenes y multimedia en HTML",
      slug: "html-images-media",
      level: "BEGINNER" as const,
      subjectId: htmlCssId,
      description: "Aprende a incrustar imágenes optimizadas, SVG, audio y video en HTML, usando las etiquetas correctas y atributos de accesibilidad y performance.",
      whyMatters: "Las imágenes son el recurso más pesado en la mayoría de webs. Usarlas correctamente impacta directamente en la velocidad de carga, el SEO (Core Web Vitals) y la accesibilidad.",
      explanation: `**Etiqueta <img>:**
Atributos fundamentales:
- \`src\` — ruta de la imagen (relativa o absoluta).
- \`alt\` — texto alternativo. Obligatorio para accesibilidad. Si la imagen es decorativa, usa \`alt=""\`.
- \`width\` y \`height\` — dimensiones. Evitan el Layout Shift (CLS) al reservar espacio antes de cargar.
- \`loading="lazy"\` — carga diferida. Las imágenes fuera del viewport inicial cargan cuando el usuario llega a ellas.
- \`decoding="async"\` — decodificación asíncrona para no bloquear el hilo principal.

**Formatos de imagen:**
- \`JPEG/JPG\` — fotografías, imágenes con muchos colores. No soporta transparencia.
- \`PNG\` — imágenes con transparencia, capturas de pantalla, iconos.
- \`WebP\` — formato moderno de Google. Mejor compresión que JPEG y PNG. Soporta transparencia.
- \`AVIF\` — el más moderno. Compresión superior a WebP. Soporte creciente.
- \`SVG\` — gráficos vectoriales (logos, iconos). Escalable sin pérdida de calidad.
- \`GIF\` — animaciones simples (preferir video MP4 para animaciones largas).

**Elemento <picture>:**
Permite servir diferentes imágenes según el dispositivo o soporte del navegador (imágenes responsivas).

**Video y Audio:**
- \`<video>\` con atributo \`controls\` para mostrar controles nativos.
- \`<audio>\` para audio.
- Siempre provee múltiples \`<source>\` con diferentes formatos para compatibilidad.
- Usa \`<track>\` para subtítulos en video (accesibilidad).`,
      codeExample: `<!-- Imagen básica con buenas prácticas -->
<img
  src="./images/hero.webp"
  alt="Desarrolladora escribiendo código en una laptop"
  width="800"
  height="450"
  loading="eager"
  decoding="async"
/>

<!-- Imagen decorativa (el alt vacío le dice a lectores de pantalla que la ignoren) -->
<img src="./images/separador.svg" alt="" aria-hidden="true" />

<!-- Picture: servir formato moderno con fallback -->
<picture>
  <!-- AVIF para navegadores que lo soporten -->
  <source srcset="./images/portada.avif" type="image/avif" />
  <!-- WebP como segunda opción -->
  <source srcset="./images/portada.webp" type="image/webp" />
  <!-- JPEG como fallback universal -->
  <img
    src="./images/portada.jpg"
    alt="Portada del artículo sobre CSS Grid"
    width="1200"
    height="630"
    loading="lazy"
  />
</picture>

<!-- Picture: imágenes responsivas según tamaño de pantalla -->
<picture>
  <source media="(min-width: 1024px)" srcset="./images/banner-desktop.webp" />
  <source media="(min-width: 768px)" srcset="./images/banner-tablet.webp" />
  <img src="./images/banner-mobile.webp" alt="Banner principal" width="400" height="300" />
</picture>

<!-- Video con accesibilidad -->
<video controls width="720" height="405" poster="./images/thumbnail.jpg">
  <source src="./videos/tutorial.mp4" type="video/mp4" />
  <source src="./videos/tutorial.webm" type="video/webm" />
  <track kind="subtitles" src="./subtitles/es.vtt" srclang="es" label="Español" default />
  <p>Tu navegador no soporta video HTML5. <a href="./videos/tutorial.mp4">Descarga el video</a>.</p>
</video>

<!-- Audio -->
<audio controls>
  <source src="./audio/podcast.mp3" type="audio/mpeg" />
  <source src="./audio/podcast.ogg" type="audio/ogg" />
  Tu navegador no soporta audio HTML5.
</audio>`,
      practicalTips: [
        "Siempre especifica width y height en las imágenes. Evita el Cumulative Layout Shift (CLS), una métrica crítica de Core Web Vitals de Google.",
        "Usa loading='lazy' para imágenes que están debajo del fold (fuera de la pantalla inicial). Mejora notablemente el tiempo de carga.",
        "Convierte tus imágenes a WebP. Puedes usar squoosh.app (herramienta online de Google) para convertir y comprimir sin perder calidad visible.",
        "El atributo alt debe describir el contenido de la imagen, no decir 'imagen de...' o 'foto de...'. Solo describe qué se ve.",
        "Para logos y SVG que se repiten, considera incrustarlos inline en el HTML. Evita una petición HTTP extra y permite estilarlos con CSS.",
      ],
      commonMistakes: [
        "Olvidar el atributo alt. Es un error de accesibilidad grave y afecta el SEO. Google no puede 'ver' imágenes sin alt.",
        "Subir imágenes enormes (3000x2000px) cuando se muestran pequeñas (300x200px). Desperdicia ancho de banda del usuario.",
        "Usar GIF para animaciones largas. Un video MP4 del mismo contenido pesa hasta 10 veces menos.",
        "No especificar width y height, causando Layout Shift: el contenido salta cuando la imagen termina de cargar.",
        "Usar imágenes de texto en lugar de texto real con CSS. Las imágenes de texto son inaccesibles, no son seleccionables y pesan más.",
      ],
    },

    // ─── MÓDULO 3: Formularios HTML y validación nativa ────────────────────────
    {
      name: "Formularios HTML y validación nativa del navegador",
      slug: "html-forms-validation",
      level: "BEGINNER" as const,
      subjectId: htmlCssId,
      description: "Construye formularios HTML completos y accesibles usando todos los tipos de input disponibles, atributos de validación nativa y las mejores prácticas de UX.",
      whyMatters: "Los formularios son el principal punto de interacción usuario-servidor en la web: registros, login, contacto, checkout, búsqueda. Hacerlos bien es crítico para conversión, accesibilidad y seguridad.",
      explanation: `**Estructura básica de un formulario:**
- \`<form>\` — contenedor. Atributos: \`action\` (URL de envío) y \`method\` (GET o POST).
- \`<label>\` — etiqueta del campo. Mejora la accesibilidad y la UX (click en label activa el input).
- \`<input>\` — campo de entrada. El atributo \`type\` determina su comportamiento.
- \`<button type="submit">\` — botón de envío.
- \`<fieldset>\` + \`<legend>\` — agrupan campos relacionados (ej: datos de envío vs datos de pago).

**Tipos de input más importantes:**
- \`text\` — texto libre (nombre, apellido).
- \`email\` — valida formato de email automáticamente.
- \`password\` — oculta el texto.
- \`number\` — solo números, con min/max/step.
- \`tel\` — teléfono (muestra teclado numérico en móvil).
- \`url\` — valida formato de URL.
- \`date\`, \`time\`, \`datetime-local\` — selectores de fecha/hora nativos.
- \`checkbox\` — selección múltiple.
- \`radio\` — selección única dentro de un grupo.
- \`file\` — subida de archivos.
- \`range\` — slider numérico.
- \`hidden\` — campo oculto (para tokens CSRF, IDs, etc.).
- \`search\` — campo de búsqueda.
- \`color\` — selector de color.

**Atributos de validación nativa:**
- \`required\` — campo obligatorio.
- \`minlength\` / \`maxlength\` — longitud mínima/máxima para texto.
- \`min\` / \`max\` — valor mínimo/máximo para números y fechas.
- \`pattern\` — expresión regular que debe cumplir el valor.
- \`step\` — incremento para inputs numéricos.
- \`autocomplete\` — sugiere valores guardados del navegador.

**Otros elementos de formulario:**
- \`<textarea>\` — texto multilínea.
- \`<select>\` + \`<option>\` — lista desplegable.
- \`<optgroup>\` — agrupa opciones en un select.
- \`<datalist>\` — sugerencias de autocompletado para un input.
- \`<output>\` — muestra el resultado de un cálculo.`,
      codeExample: `<form action="/api/registro" method="POST" novalidate>
  <fieldset>
    <legend>Información personal</legend>

    <!-- Label vinculado con for/id -->
    <div class="field">
      <label for="nombre">Nombre completo *</label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        placeholder="Ej: María García"
        required
        minlength="2"
        maxlength="100"
        autocomplete="name"
      />
    </div>

    <div class="field">
      <label for="email">Correo electrónico *</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="tu@email.com"
        required
        autocomplete="email"
      />
    </div>

    <div class="field">
      <label for="password">Contraseña *</label>
      <input
        type="password"
        id="password"
        name="password"
        required
        minlength="8"
        pattern="^(?=.*[A-Z])(?=.*[0-9]).{8,}$"
        aria-describedby="password-hint"
      />
      <small id="password-hint">
        Mínimo 8 caracteres, una mayúscula y un número.
      </small>
    </div>

    <div class="field">
      <label for="edad">Edad</label>
      <input
        type="number"
        id="edad"
        name="edad"
        min="18"
        max="120"
        step="1"
      />
    </div>

    <div class="field">
      <label for="pais">País *</label>
      <select id="pais" name="pais" required autocomplete="country">
        <option value="">Selecciona tu país</option>
        <optgroup label="América del Sur">
          <option value="CO">Colombia</option>
          <option value="AR">Argentina</option>
          <option value="CL">Chile</option>
        </optgroup>
        <optgroup label="América del Norte">
          <option value="MX">México</option>
          <option value="US">Estados Unidos</option>
        </optgroup>
      </select>
    </div>

    <div class="field">
      <label for="bio">Sobre ti</label>
      <textarea
        id="bio"
        name="bio"
        rows="4"
        maxlength="500"
        placeholder="Cuéntanos un poco sobre ti..."
      ></textarea>
    </div>
  </fieldset>

  <fieldset>
    <legend>Preferencias</legend>

    <!-- Radio buttons: selección única -->
    <div role="group" aria-labelledby="nivel-label">
      <p id="nivel-label">Nivel de experiencia *</p>
      <label>
        <input type="radio" name="nivel" value="principiante" required /> Principiante
      </label>
      <label>
        <input type="radio" name="nivel" value="intermedio" /> Intermedio
      </label>
      <label>
        <input type="radio" name="nivel" value="avanzado" /> Avanzado
      </label>
    </div>

    <!-- Checkboxes: selección múltiple -->
    <div>
      <p>Tecnologías de interés</p>
      <label>
        <input type="checkbox" name="tecnologias" value="frontend" /> Frontend
      </label>
      <label>
        <input type="checkbox" name="tecnologias" value="backend" /> Backend
      </label>
      <label>
        <input type="checkbox" name="tecnologias" value="devops" /> DevOps
      </label>
    </div>
  </fieldset>

  <!-- Términos y condiciones -->
  <label class="checkbox-label">
    <input type="checkbox" name="terminos" required />
    Acepto los <a href="/terminos" target="_blank">términos y condiciones</a>
  </label>

  <button type="submit">Crear cuenta</button>
  <button type="reset">Limpiar formulario</button>
</form>`,
      practicalTips: [
        "Siempre vincula <label> con su <input> mediante for/id. Esto duplica el área clickeable y es fundamental para accesibilidad.",
        "Usa el tipo de input correcto (email, tel, number) para activar el teclado adecuado en móviles y obtener validación nativa gratis.",
        "El atributo autocomplete mejora la UX enormemente. Usa valores estándar: 'name', 'email', 'tel', 'street-address', 'postal-code'.",
        "Usa aria-describedby para vincular hints o mensajes de error con el input correspondiente. Los lectores de pantalla los leen juntos.",
        "Agrupa campos relacionados con <fieldset> y <legend>. Es semántico, accesible y mejora la UX visual.",
        "novalidate en el <form> desactiva la validación nativa del navegador, útil cuando quieres implementar validación personalizada con JavaScript.",
      ],
      commonMistakes: [
        "No vincular el label con el input. El placeholder no reemplaza al label: desaparece al escribir y no es accesible.",
        "Usar type='text' para emails, teléfonos y números. Pierdes validación nativa y el teclado correcto en móvil.",
        "Olvidar el atributo name en los inputs. Sin name, el campo no se envía con el formulario.",
        "Usar placeholder como único label del campo. Cuando el usuario empieza a escribir, no recuerda qué iba ahí.",
        "No agrupar radio buttons con el mismo atributo name. Sin el mismo name, no funcionan como selección única.",
        "Dejar el botón de submit sin type='submit' explícito. En algunos contextos el tipo por defecto puede variar.",
      ],
    },

    // ─── MÓDULO 4: CSS: selectores, cascada, especificidad y tipografía ────────
    {
      name: "Selectores CSS, cascada y especificidad",
      slug: "css-selectors-cascade-specificity",
      level: "BEGINNER" as const,
      subjectId: htmlCssId,
      description: "Comprende cómo CSS decide qué regla aplicar cuando hay conflictos: la cascada, la especificidad y la herencia. Domina los selectores fundamentales y avanzados.",
      whyMatters: "La especificidad y la cascada son la fuente de los bugs CSS más frustrantes. Entenderlas elimina el uso de !important como solución mágica y permite escribir CSS predecible y mantenible.",
      explanation: `**La Cascada:**
CSS significa "Cascading Style Sheets". La cascada es el algoritmo que decide qué regla aplica cuando múltiples reglas apuntan al mismo elemento. Factores en orden de prioridad:
1. Origen: estilos del navegador < estilos del autor < estilos inline.
2. Especificidad del selector.
3. Orden de aparición (la última regla gana si todo lo demás es igual).

**Especificidad:**
Cada tipo de selector tiene un peso que se representa como (A, B, C):
- A = selectores de ID (#id): peso 1,0,0
- B = clases (.class), atributos ([attr]), pseudo-clases (:hover): peso 0,1,0
- C = elementos (div, p, h1) y pseudo-elementos (::before): peso 0,0,1

Ejemplos:
- \`p\` → (0,0,1)
- \`.card\` → (0,1,0)
- \`#header\` → (1,0,0)
- \`.card p\` → (0,1,1)
- \`#nav .link:hover\` → (1,1,0) + pseudo-clase = (1,2,0)
- \`style="..."\` (inline) → (1,0,0,0) — siempre gana sobre selectores.
- \`!important\` — rompe la cascada. Evítalo salvo casos excepcionales.

**Herencia:**
Algunas propiedades CSS se heredan automáticamente de padre a hijo:
- Se heredan: \`color\`, \`font-family\`, \`font-size\`, \`line-height\`, \`text-align\`, \`visibility\`, \`cursor\`.
- NO se heredan: \`margin\`, \`padding\`, \`border\`, \`background\`, \`width\`, \`height\`, \`display\`, \`position\`.
- \`inherit\` fuerza la herencia de cualquier propiedad.
- \`initial\` resetea al valor inicial del navegador.
- \`unset\` combina: hereda si la propiedad es heredable, si no usa initial.

**Selectores fundamentales:**
- Universal: \`*\`
- Elemento: \`p\`, \`div\`, \`h1\`
- Clase: \`.card\`, \`.btn-primary\`
- ID: \`#header\`, \`#main-nav\`
- Atributo: \`[type="text"]\`, \`[href^="https"]\`, \`[class*="icon"]\`
- Descendiente: \`.nav a\` (cualquier a dentro de .nav)
- Hijo directo: \`.nav > a\` (solo a que es hijo directo de .nav)
- Hermano adyacente: \`h2 + p\` (p inmediatamente después de h2)
- Hermano general: \`h2 ~ p\` (todos los p hermanos después de h2)`,
      codeExample: `/* ─── ESPECIFICIDAD ──────────────────────── */

/* (0,0,1) - elemento */
p {
  color: black;
}

/* (0,1,0) - clase → gana sobre elemento */
.destacado {
  color: blue;
}

/* (1,0,0) - ID → gana sobre clase */
#titulo-principal {
  color: red;
}

/* Inline style → gana sobre todo (excepto !important) */
/* <p style="color: green"> */

/* !important → solo úsalo como último recurso */
.forzado {
  color: purple !important;
}

/* ─── HERENCIA ────────────────────────────── */
body {
  /* Estas propiedades se heredan por todos los hijos */
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}

.sin-herencia {
  /* border NO se hereda, hay que declararlo explícitamente */
  border: 1px solid red;
}

.forzar-herencia {
  /* Fuerza herencia en propiedades que normalmente no se heredan */
  border: inherit;
}

/* ─── SELECTORES ──────────────────────────── */

/* Atributo: links que empiezan con https */
a[href^="https"] {
  color: green;
}

/* Atributo: links que terminan en .pdf */
a[href$=".pdf"] {
  color: orange;
}

/* Atributo: elementos cuya clase contiene "icon" */
[class*="icon"] {
  display: inline-flex;
  align-items: center;
}

/* Hijo directo: solo li hijos directos de .nav */
.nav > li {
  display: inline-block;
}

/* Hermano adyacente: p que va inmediatamente después de h2 */
h2 + p {
  font-size: 1.1rem;
  color: #666;
}

/* Hermano general: todos los p después de h2 dentro del mismo padre */
h2 ~ p {
  margin-top: 0.5rem;
}`,
      practicalTips: [
        "Calcula la especificidad contando (IDs, clases, elementos). Una clase (.btn) siempre gana a cualquier cantidad de elementos (div p span a).",
        "Evita los IDs para estilar en CSS. Son demasiado específicos y dificultan sobreescribir estilos. Úsalos solo en JavaScript.",
        "Si usas !important es una señal de que la arquitectura CSS tiene problemas de especificidad. Refactoriza en lugar de parchar.",
        "El orden importa cuando la especificidad es igual: pon los estilos más específicos al final del archivo.",
        "Usa las DevTools de Chrome: selecciona un elemento y mira el panel Styles. Muestra qué reglas aplican y cuáles están tachadas (sobreescritas).",
      ],
      commonMistakes: [
        "Abusar de !important para resolver conflictos de especificidad. Crea una deuda técnica que se vuelve imposible de mantener.",
        "Usar IDs para estilos CSS. Su especificidad tan alta hace casi imposible sobreescribirlos sin más IDs o !important.",
        "No entender por qué un estilo no se aplica. Siempre usa DevTools para ver qué regla está ganando y por qué.",
        "Creer que el último estilo siempre gana. Solo es así cuando la especificidad es igual.",
        "Confundir herencia con cascada. La herencia viene del padre en el HTML. La cascada es sobre qué selector gana.",
      ],
    },
    {
      name: "Tipografía CSS: fuentes, tamaños y espaciado",
      slug: "css-typography",
      level: "BEGINNER" as const,
      subjectId: htmlCssId,
      description: "Controla la tipografía web con CSS: fuentes locales y de Google Fonts, tamaños fluidos, line-height, letter-spacing y las propiedades esenciales para texto legible y atractivo.",
      whyMatters: "La tipografía representa el 95% del diseño web según muchos diseñadores. Un texto bien configurado hace la diferencia entre una web profesional y una amateur, impactando directamente en la legibilidad y la percepción de calidad.",
      explanation: `**Fuentes web:**
- \`font-family\` — define la fuente con una pila de fallbacks: \`font-family: 'Inter', Arial, sans-serif;\`
- Fuentes seguras (disponibles en todos los sistemas): Arial, Georgia, Times New Roman, Verdana, Courier New.
- Google Fonts: fuentes gratuitas, cargadas desde CDN de Google.
- Fuentes locales con \`@font-face\`: máximo control, sin depender de servicios externos.

**Tamaños y unidades:**
- \`px\` — píxeles absolutos. Predecibles pero no escalan con las preferencias del usuario.
- \`em\` — relativo al font-size del elemento padre. 1em = font-size del padre.
- \`rem\` — relativo al font-size del elemento raíz (<html>). Más predecible que em. Recomendado para tipografía.
- \`%\` — relativo al elemento padre.
- \`vw\`/\`vh\` — relativo al viewport (útil para tipografía fluida).
- \`clamp(min, ideal, max)\` — tipografía responsiva sin media queries.

**Propiedades tipográficas esenciales:**
- \`font-size\` — tamaño de la fuente.
- \`font-weight\` — grosor: 100-900 o keywords (normal=400, bold=700).
- \`font-style\` — normal, italic, oblique.
- \`line-height\` — altura de línea. Sin unidad es lo recomendado (1.5 = 150% del font-size).
- \`letter-spacing\` — espaciado entre caracteres. Útil para headings y texto en mayúsculas.
- \`word-spacing\` — espaciado entre palabras.
- \`text-align\` — alineación: left, right, center, justify.
- \`text-decoration\` — subrayado, tachado, etc.
- \`text-transform\` — uppercase, lowercase, capitalize.
- \`text-overflow\` — maneja texto que desborda: clip, ellipsis.
- \`white-space\` — controla saltos de línea: normal, nowrap, pre.
- \`font-display\` — en @font-face: swap, block, fallback, optional.`,
      codeExample: `/* ─── CARGA DE FUENTES ───────────────────── */

/* Google Fonts (en el <head> del HTML) */
/* <link rel="preconnect" href="https://fonts.googleapis.com">
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet"> */

/* Fuente local con @font-face */
@font-face {
  font-family: 'MiFuente';
  src:
    url('./fonts/mi-fuente.woff2') format('woff2'),
    url('./fonts/mi-fuente.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap; /* Muestra texto con fallback mientras carga */
}

/* ─── ESCALA TIPOGRÁFICA ──────────────────── */
:root {
  /* Base: 1rem = 16px (default del navegador) */
  --font-family-base: 'Inter', system-ui, -apple-system, Arial, sans-serif;
  --font-family-mono: 'Fira Code', 'Courier New', monospace;

  /* Escala modular (ratio 1.25 - Major Third) */
  --text-xs:   0.64rem;   /* 10.24px */
  --text-sm:   0.8rem;    /* 12.8px */
  --text-base: 1rem;      /* 16px */
  --text-lg:   1.25rem;   /* 20px */
  --text-xl:   1.563rem;  /* 25px */
  --text-2xl:  1.953rem;  /* 31.25px */
  --text-3xl:  2.441rem;  /* 39px */
  --text-4xl:  3.052rem;  /* 48.8px */
}

/* ─── ESTILOS BASE ────────────────────────── */
html {
  font-size: 16px; /* Base para rem */
}

body {
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  line-height: 1.6;       /* Sin unidad: relativo al font-size del elemento */
  color: #1a1a2e;
  -webkit-font-smoothing: antialiased; /* Mejor rendering en Mac */
}

/* ─── HEADINGS ────────────────────────────── */
h1 {
  font-size: var(--text-4xl);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em; /* Negativo en headings grandes = más elegante */
}

h2 {
  font-size: var(--text-3xl);
  font-weight: 600;
  line-height: 1.3;
}

h3 {
  font-size: var(--text-2xl);
  font-weight: 600;
  line-height: 1.4;
}

/* ─── TIPOGRAFÍA FLUIDA CON CLAMP ─────────── */
h1 {
  /* Mínimo 2rem, ideal 5vw, máximo 4rem */
  /* Se escala fluidamente sin media queries */
  font-size: clamp(2rem, 5vw, 4rem);
}

/* ─── TEXTO EN MAYÚSCULAS (botones, labels) ── */
.label {
  font-size: var(--text-sm);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em; /* Más espacio en mayúsculas mejora legibilidad */
  color: #666;
}

/* ─── TRUNCAR TEXTO CON ELLIPSIS ─────────── */
.card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

/* ─── CÓDIGO INLINE ───────────────────────── */
code {
  font-family: var(--font-family-mono);
  font-size: 0.875em;
  background-color: #f0f0f0;
  padding: 0.1em 0.4em;
  border-radius: 3px;
}`,
      practicalTips: [
        "Usa rem para font-size en lugar de px. Respeta las preferencias de accesibilidad del usuario (quienes configuran fuentes más grandes en el sistema).",
        "Un line-height entre 1.4 y 1.7 es ideal para cuerpo de texto. Menos de 1.2 en párrafos largos cansa la vista.",
        "Carga solo los pesos de fuente que necesitas de Google Fonts. Cada peso adicional aumenta el tiempo de carga.",
        "Usa system-ui como fuente de fallback: usa la fuente nativa del sistema operativo (SF Pro en Mac, Segoe UI en Windows), que ya está cargada.",
        "Aplica letter-spacing negativo en headings grandes (h1, h2) y positivo en texto en mayúsculas. Mejora la elegancia tipográfica.",
        "clamp() es la forma moderna de tipografía fluida: font-size: clamp(1.5rem, 4vw, 3rem) escala con el viewport sin media queries.",
      ],
      commonMistakes: [
        "Usar px para todos los tamaños de fuente. Rompe la accesibilidad para usuarios que configuran tamaños de fuente grandes en su sistema.",
        "Cargar 5 o 6 pesos de Google Fonts cuando solo usas 2. Cada peso adicional es una petición HTTP y kilobytes extra.",
        "Un line-height de 1 o menos en párrafos. El texto se vuelve ilegible cuando las líneas están pegadas.",
        "Justificar texto (text-align: justify) en web. A diferencia de la imprenta, los navegadores no separan sílabas bien y crea ríos de espacio feos.",
        "Poner text-transform: uppercase directamente en el HTML. El texto en mayúsculas en el HTML no puede ser convertido a minúsculas con CSS, pero sí al revés.",
      ],
    },

    // ─── MÓDULO 5: Box model, colores y unidades CSS ──────────────────────────
    {
      name: "El Box Model de CSS: margin, border, padding y sizing",
      slug: "css-box-model",
      level: "BEGINNER" as const,
      subjectId: htmlCssId,
      description: "Entiende cómo CSS calcula el tamaño y el espacio de cada elemento: el box model completo con content, padding, border y margin, y la diferencia entre box-sizing: content-box y border-box.",
      whyMatters: "El Box Model es la base de todo el layout en CSS. No entenderlo es la razón por la que los elementos no tienen el tamaño esperado y los layouts se rompen de formas misteriosas.",
      explanation: `**Las 4 capas del Box Model:**
Cada elemento HTML es una caja rectangular compuesta por:

1. **Content** — el contenido real (texto, imagen). Su tamaño se controla con \`width\` y \`height\`.
2. **Padding** — espacio interno entre el contenido y el borde. Tiene el background del elemento.
3. **Border** — borde alrededor del padding. Puede tener color, grosor y estilo.
4. **Margin** — espacio externo entre el elemento y los demás. Transparente (no tiene background).

**box-sizing: content-box (default):**
\`width\` y \`height\` definen solo el contenido. El padding y el border se suman al tamaño total.
Ejemplo: \`width: 200px + padding: 20px + border: 2px\` → el elemento ocupa 244px en total.

**box-sizing: border-box (recomendado):**
\`width\` y \`height\` incluyen el padding y el border. El contenido se achica para compensar.
Ejemplo: \`width: 200px + padding: 20px + border: 2px\` → el elemento ocupa exactamente 200px.

**Margin collapsing:**
Los márgenes verticales (top/bottom) entre elementos adyacentes se colapsan: solo aplica el mayor de los dos, no la suma. Esto solo pasa con márgenes verticales, nunca horizontales ni con Flexbox/Grid.

**Propiedades de dimensionado:**
- \`width\`, \`height\` — dimensiones fijas.
- \`min-width\`, \`max-width\` — límites mínimos y máximos.
- \`min-height\`, \`max-height\` — límites de alto.
- \`overflow\` — qué hacer cuando el contenido supera el tamaño: visible, hidden, scroll, auto.
- \`aspect-ratio\` — mantiene proporción (ej: 16/9 para videos).`,
      codeExample: `/* ─── BOX-SIZING UNIVERSAL (siempre pon esto) ─ */
*,
*::before,
*::after {
  box-sizing: border-box; /* Simplifica todos los cálculos de tamaño */
}

/* ─── BOX MODEL VISUAL ────────────────────── */
.card {
  width: 300px;           /* Ancho del área de contenido (con border-box: ancho total) */
  height: auto;           /* Auto: se ajusta al contenido */

  padding: 24px;          /* Espacio interno en los 4 lados */
  padding: 16px 24px;     /* top/bottom: 16px, left/right: 24px */
  padding: 8px 16px 24px 32px; /* top right bottom left (sentido horario) */

  border: 2px solid #e0e0e0;  /* Grosor, estilo, color */
  border-radius: 8px;          /* Esquinas redondeadas */
  border-top: 4px solid blue;  /* Solo borde superior */

  margin: 0 auto;         /* 0 arriba/abajo, auto izquierda/derecha = centrar */
  margin-bottom: 16px;
}

/* ─── OVERFLOW ────────────────────────────── */
.contenedor {
  width: 200px;
  height: 100px;
  overflow: hidden;     /* Corta el contenido que se desborda */
  /* overflow: scroll → siempre muestra scrollbar */
  /* overflow: auto → muestra scrollbar solo si es necesario */
  /* overflow: visible → el contenido se muestra fuera (default) */
}

/* ─── ASPECT-RATIO ────────────────────────── */
.video-container {
  width: 100%;
  aspect-ratio: 16 / 9;  /* Mantiene proporción 16:9 independiente del ancho */
  background: black;
}

.avatar {
  width: 60px;
  aspect-ratio: 1 / 1;   /* Siempre cuadrado → con border-radius: 50% = círculo */
  border-radius: 50%;
  object-fit: cover;      /* Recorta la imagen para llenar el espacio */
}

/* ─── MARGIN COLLAPSING ───────────────────── */
h2 {
  margin-bottom: 24px; /* ← Solo este aplica */
}

p {
  margin-top: 16px;    /* ← Este se colapsa: h2 y p quedan con 24px entre sí, no 40px */
}

/* Para evitar margin collapsing, usa padding o Flexbox/Grid en el contenedor */

/* ─── DIMENSIONADO RESPONSIVO ─────────────── */
.container {
  width: 100%;          /* Ocupa todo el ancho disponible */
  max-width: 1200px;    /* Pero nunca más de 1200px */
  margin: 0 auto;       /* Centrado horizontal */
  padding: 0 16px;      /* Padding lateral para móvil */
}

.columna {
  width: 100%;
  min-width: 200px;     /* Nunca menos de 200px */
  max-width: 400px;     /* Nunca más de 400px */
}`,
      practicalTips: [
        "Siempre aplica box-sizing: border-box con el selector universal (*) al inicio de tu CSS. Evita horas de frustración calculando tamaños.",
        "Para centrar un elemento de bloque horizontalmente: width definido + margin: 0 auto. O mejor aún, usa Flexbox.",
        "Cuando un elemento es más grande de lo esperado, abre DevTools y mira el box model en la pestaña Computed. Muestra padding, border y margin visualmente.",
        "object-fit: cover en imágenes dentro de contenedores con tamaño fijo es la forma más fácil de recortar imágenes manteniendo su proporción.",
        "aspect-ratio reemplaza el viejo hack del padding-top: 56.25% para mantener proporciones. Úsalo.",
      ],
      commonMistakes: [
        "No aplicar box-sizing: border-box. Con content-box el cálculo de tamaños es contraintuitivo y provoca layouts rotos.",
        "Confundir padding y margin: padding es espacio DENTRO del elemento (lleva el background), margin es espacio FUERA (transparente).",
        "Intentar aplicar margin-top a elementos inline (span, a, em). Los márgenes verticales no funcionan en elementos inline.",
        "No entender el margin collapsing y agregar margin extra pensando que el anterior no funciona, creando el doble del espacio esperado.",
        "Usar height fijo en contenedores con contenido dinámico. El contenido desborda o el contenedor no crece. Usa min-height en su lugar.",
      ],
    },
    {
      name: "Colores y unidades CSS",
      slug: "css-colors-units",
      level: "BEGINNER" as const,
      subjectId: htmlCssId,
      description: "Domina todos los formatos de color en CSS (hex, rgb, hsl, oklch) y las unidades absolutas y relativas (px, rem, em, vw, vh, %) con sus casos de uso correctos.",
      whyMatters: "Elegir la unidad correcta determina si tu diseño es rígido o flexible, accesible o no. Las variables CSS de color son la base de cualquier sistema de diseño o tema oscuro/claro.",
      explanation: `**Formatos de color:**

1. **Nombres:** \`red\`, \`blue\`, \`coral\`. Son 140 colores predefinidos. Solo para prototipos.

2. **Hexadecimal:** \`#RRGGBB\` o \`#RGB\` (shorthand). Ej: \`#ff5733\`, \`#f53\`. Con alpha: \`#RRGGBBAA\` → \`#ff573380\` (50% opacidad).

3. **RGB/RGBA:** \`rgb(255, 87, 51)\`, \`rgba(255, 87, 51, 0.5)\`. Con sintaxis moderna: \`rgb(255 87 51 / 50%)\`.

4. **HSL/HSLA:** \`hsl(Hue, Saturation%, Lightness%)\`. Más intuitivo para crear paletas de color.
   - H: ángulo en la rueda de colores (0=rojo, 120=verde, 240=azul).
   - S: saturación (0%=gris, 100%=color puro).
   - L: luminosidad (0%=negro, 50%=normal, 100%=blanco).

5. **OKLCH (moderno):** \`oklch(L C H)\`. Espacio de color perceptualmente uniforme. Las variaciones de luminosidad se perciben uniformes a través de diferentes tonos. Recomendado para sistemas de diseño modernos.

6. **currentColor:** usa el color del texto del elemento. Útil para SVGs y bordes.

7. **transparent:** completamente transparente.

**Unidades absolutas:**
- \`px\` — píxeles CSS (no son píxeles físicos en pantallas retina). Predecibles.
- \`cm\`, \`mm\`, \`in\`, \`pt\` — unidades físicas. Solo útiles para CSS de impresión.

**Unidades relativas:**
- \`%\` — relativo al elemento padre.
- \`em\` — relativo al font-size del elemento actual o su padre (en font-size, al padre).
- \`rem\` — relativo al font-size del elemento raíz (<html>). Más predecible que em.
- \`vw\` — 1% del ancho del viewport.
- \`vh\` — 1% del alto del viewport.
- \`vmin\` — 1% del lado menor del viewport (útil para elementos cuadrados responsivos).
- \`vmax\` — 1% del lado mayor.
- \`dvh\` — dynamic viewport height. Resuelve el problema de vh en móvil con la barra del navegador.
- \`ch\` — ancho del carácter "0" en la fuente actual. Útil para anchos de texto legibles.
- \`lh\` — line-height actual. Útil para espaciado basado en la tipografía.`,
      codeExample: `/* ─── VARIABLES DE COLOR (sistema de diseño) ─ */
:root {
  /* Paleta principal en HSL (fácil de crear variantes) */
  --color-primary-h: 231;
  --color-primary-s: 70%;
  --color-primary-base: hsl(var(--color-primary-h), var(--color-primary-s), 50%);
  --color-primary-light: hsl(var(--color-primary-h), var(--color-primary-s), 65%);
  --color-primary-dark: hsl(var(--color-primary-h), var(--color-primary-s), 35%);

  /* Escala de grises */
  --color-gray-50:  hsl(0, 0%, 98%);
  --color-gray-100: hsl(0, 0%, 96%);
  --color-gray-200: hsl(0, 0%, 90%);
  --color-gray-500: hsl(0, 0%, 60%);
  --color-gray-800: hsl(0, 0%, 20%);
  --color-gray-900: hsl(0, 0%, 10%);

  /* Colores semánticos */
  --color-success: hsl(142, 71%, 45%);
  --color-warning: hsl(38, 95%, 55%);
  --color-error:   hsl(0, 84%, 60%);

  /* OKLCH - moderno y uniforme perceptualmente */
  --color-brand: oklch(55% 0.2 231);
}

/* ─── TEMA OSCURO ─────────────────────────── */
@media (prefers-color-scheme: dark) {
  :root {
    --color-gray-50: hsl(0, 0%, 10%);
    --color-gray-900: hsl(0, 0%, 98%);
  }
}

/* ─── FORMATOS DE COLOR ───────────────────── */
.ejemplos-color {
  /* Hexadecimal */
  color: #1a1a2e;
  background-color: #ff5733;
  border-color: #ff573380; /* Con 50% de opacidad */

  /* RGB moderno */
  color: rgb(26 26 46);
  background: rgb(255 87 51 / 0.5);

  /* HSL */
  color: hsl(231, 48%, 14%);
  background: hsl(14, 100%, 60%);

  /* currentColor: usa el color del texto */
  border: 2px solid currentColor;
}

/* ─── UNIDADES ────────────────────────────── */
.contenedor {
  /* Layout: preferir % o unidades de viewport */
  width: 90%;
  max-width: 1200px;

  /* Espaciado: rem para consistencia */
  padding: 1.5rem;
  margin-bottom: 2rem;

  /* Texto: rem para accesibilidad */
  font-size: 1rem;
  line-height: 1.6;
}

/* Viewport units */
.hero {
  /* dvh resuelve el bug de vh en móvil */
  min-height: 100dvh;
  width: 100vw;
}

/* ch: ancho ideal para texto legible (60-75 caracteres por línea) */
.articulo {
  max-width: 65ch; /* Aproximadamente 65 caracteres de ancho */
}

/* vmin para elementos que deben ser cuadrados y responsivos */
.avatar-grande {
  width: 30vmin;
  height: 30vmin;
  border-radius: 50%;
}`,
      practicalTips: [
        "Define todos los colores como variables CSS en :root. Te permite implementar temas claro/oscuro y mantener consistencia con una sola fuente de verdad.",
        "Usa HSL para tu paleta de colores: es más fácil crear variantes (más claro, más oscuro, más saturado) cambiando solo un valor.",
        "max-width: 65ch en artículos y blogs asegura que nunca haya más de ~65 caracteres por línea, el rango óptimo de legibilidad.",
        "Reemplaza vh por dvh en móvil. vh no descuenta la barra del navegador en móviles, dvh sí.",
        "Para overlays y transparencias, usa rgba() o el formato hex con canal alpha (#RRGGBBAA) en lugar de la propiedad opacity (que afecta a todos los hijos).",
      ],
      commonMistakes: [
        "Hardcodear colores en cada regla CSS (#ff5733 en 50 lugares). Si cambias la paleta, debes buscar y reemplazar en todo el archivo.",
        "Usar opacity para hacer transparente un fondo. opacity afecta al elemento completo (incluyendo texto e hijos). Usa rgba() o background con alpha.",
        "Confundir em y rem. em en font-size es relativo al padre (se anida y puede crecer exponencialmente), rem es siempre relativo al root.",
        "Usar vw para font-size directamente sin clamp(). En pantallas muy pequeñas el texto puede ser ilegible, en pantallas grandes demasiado grande.",
        "No testear colores con herramientas de contraste. El ratio mínimo para accesibilidad WCAG AA es 4.5:1 para texto normal.",
      ],
    },

    // ─── MÓDULO 6: Layouts modernos con Flexbox ───────────────────────────────
    {
      name: "CSS Flexbox: layout unidimensional",
      slug: "css-flexbox",
      level: "BEGINNER" as const,
      subjectId: htmlCssId,
      description: "Domina CSS Flexbox para crear layouts flexibles en una dimensión: distribución, alineación, orden y las propiedades flex-grow, flex-shrink y flex-basis.",
      whyMatters: "Flexbox resolvió los problemas de layout que habían perseguido a los desarrolladores web durante años (centrado vertical, distribución equitativa, columnas de igual altura). Es la herramienta más usada en el desarrollo frontend actual.",
      explanation: `**Conceptos fundamentales:**
Flexbox trabaja en una sola dimensión a la vez (fila O columna).

**Contenedor flex (parent):**
Se activa con \`display: flex\` o \`display: inline-flex\`.

Propiedades del contenedor:
- \`flex-direction\` — eje principal: \`row\` (default), \`row-reverse\`, \`column\`, \`column-reverse\`.
- \`flex-wrap\` — si los items se envuelven: \`nowrap\` (default), \`wrap\`, \`wrap-reverse\`.
- \`flex-flow\` — shorthand de flex-direction + flex-wrap.
- \`justify-content\` — alinea en el **eje principal**: flex-start, flex-end, center, space-between, space-around, space-evenly.
- \`align-items\` — alinea en el **eje cruzado** (línea individual): stretch (default), flex-start, flex-end, center, baseline.
- \`align-content\` — alinea en el eje cruzado cuando hay **múltiples líneas** (con wrap).
- \`gap\` — espacio entre items (row-gap column-gap). Reemplaza los hacks con margin.

**Items flex (children):**
- \`flex-grow\` — factor de crecimiento. Cuánto ocupa del espacio libre. 0=no crece, 1=crece proporcional.
- \`flex-shrink\` — factor de reducción. Cuánto se encoge si falta espacio. 1=default, 0=no se encoge.
- \`flex-basis\` — tamaño base antes de grow/shrink. \`auto\` usa width/height, valor específico (200px, 50%).
- \`flex\` — shorthand de grow shrink basis: \`flex: 1\` = \`flex: 1 1 0%\`.
- \`align-self\` — sobreescribe align-items para un item específico.
- \`order\` — cambia el orden visual sin modificar el HTML. Default: 0.

**El eje principal y el eje cruzado:**
- Con \`flex-direction: row\`: eje principal = horizontal, eje cruzado = vertical.
- Con \`flex-direction: column\`: eje principal = vertical, eje cruzado = horizontal.
- \`justify-content\` siempre controla el eje principal.
- \`align-items\` siempre controla el eje cruzado.`,
      codeExample: `/* ─── SETUP BÁSICO ───────────────────────── */
.container {
  display: flex;
  flex-direction: row;     /* default: items en fila */
  flex-wrap: wrap;         /* items se envuelven si no caben */
  gap: 16px;               /* espacio entre items */
}

/* ─── CENTRADO PERFECTO (el clásico) ─────── */
.centrado {
  display: flex;
  justify-content: center; /* eje principal (horizontal en row) */
  align-items: center;     /* eje cruzado (vertical en row) */
  min-height: 100vh;
}

/* ─── DISTRIBUCIÓN DE ESPACIO ─────────────── */
.navbar {
  display: flex;
  justify-content: space-between; /* Logo izq, nav derecha */
  align-items: center;
  padding: 0 24px;
  height: 64px;
}

/* ─── FLEX-GROW: COLUMNAS FLUIDAS ─────────── */
.layout {
  display: flex;
  gap: 24px;
}

.sidebar {
  flex: 0 0 280px;    /* NO crece, NO se encoge, siempre 280px */
  /* flex-grow: 0, flex-shrink: 0, flex-basis: 280px */
}

.main-content {
  flex: 1;            /* Ocupa todo el espacio restante */
  /* flex-grow: 1, flex-shrink: 1, flex-basis: 0% */
}

/* ─── COLUMNAS DE IGUAL ALTO ──────────────── */
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.card {
  flex: 1 1 280px;    /* Crece y se encoge, mínimo 280px */
  /* align-self: stretch (default) hace que todas tengan el mismo alto */
}

/* ─── ORDEN ───────────────────────────────── */
.featured {
  order: -1;          /* Aparece primero visualmente sin mover el HTML */
}

/* ─── ALINEACIÓN INDIVIDUAL ───────────────── */
.footer-link {
  align-self: flex-end; /* Este item se alinea al fondo, los demás al inicio */
}

/* ─── MENÚ RESPONSIVO ─────────────────────── */
.menu {
  display: flex;
  flex-direction: column; /* En móvil: columna */
  gap: 8px;
}

@media (min-width: 768px) {
  .menu {
    flex-direction: row;    /* En tablet/desktop: fila */
    gap: 24px;
  }
}

/* ─── PATRÓN: PUSH TO BOTTOM ─────────────── */
/* El botón siempre queda al fondo de la card, sin importar el contenido */
.card {
  display: flex;
  flex-direction: column;
}

.card-content {
  flex: 1; /* Ocupa todo el espacio disponible, empujando el botón al fondo */
}

.card-button {
  /* Naturalmente queda al fondo */
  margin-top: auto; /* Alternativa: auto margin empuja el elemento al fondo */
}`,
      practicalTips: [
        "Memoriza la diferencia: justify-content = eje principal, align-items = eje cruzado. Cambia con flex-direction.",
        "flex: 1 es el shorthand más útil. Significa 'ocupa todo el espacio disponible'. Úsalo para la columna principal junto a una sidebar fija.",
        "gap reemplaza completamente los hacks de margin entre flex items. Es más limpio y no requiere quitar el margin al primer/último elemento.",
        "margin: auto en un flex item absorbe todo el espacio disponible en esa dirección. margin-left: auto empuja el elemento a la derecha.",
        "Usa flex-direction: column en cards para que el botón siempre quede al fondo con flex: 1 en el contenido.",
      ],
      commonMistakes: [
        "Confundir el eje de justify-content y align-items cuando cambias flex-direction a column. El eje principal rota.",
        "Usar Flexbox para layouts de dos dimensiones complejos. Para grids de filas Y columnas simultáneas, usa CSS Grid.",
        "No usar gap y en cambio añadir margin a los items. Gap es más limpio y no crea espacio extra en el primero/último elemento.",
        "Olvidar que flex-wrap: nowrap es el default. Sin wrap, los items se comprimen en lugar de pasar a la siguiente línea.",
        "Usar align-content cuando hay una sola línea de items. align-content solo funciona con múltiples líneas (flex-wrap: wrap activado).",
      ],
    },

    // ─── MÓDULO 7: Layouts de dos dimensiones con CSS Grid ────────────────────
    {
      name: "CSS Grid: layout bidimensional",
      slug: "css-grid",
      level: "BEGINNER" as const,
      subjectId: htmlCssId,
      description: "Domina CSS Grid para crear layouts complejos en dos dimensiones: filas y columnas simultáneamente, áreas con nombre, y patrones de layout avanzados.",
      whyMatters: "CSS Grid es la herramienta más poderosa para layout en CSS. Permite diseños que antes requerían hacks complejos con floats o tablas, ahora en pocas líneas de código. Es el estándar para layouts de página completa.",
      explanation: `**Conceptos de Grid:**
Grid trabaja en dos dimensiones simultáneamente (filas Y columnas).

**Contenedor grid:**
Se activa con \`display: grid\` o \`display: inline-grid\`.

**Definir la cuadrícula:**
- \`grid-template-columns\` — define las columnas. Ej: \`repeat(3, 1fr)\` = 3 columnas iguales.
- \`grid-template-rows\` — define las filas.
- \`grid-template-areas\` — define áreas con nombres (muy visual y poderoso).
- \`gap\` — espacio entre celdas (row-gap, column-gap).
- \`grid-auto-rows\` — tamaño de filas implícitas (las que se crean automáticamente).
- \`grid-auto-columns\` — tamaño de columnas implícitas.
- \`grid-auto-flow\` — cómo se colocan los items automáticamente: row, column, dense.

**La unidad fr (fraction):**
Representa una fracción del espacio disponible. \`1fr 2fr\` = la segunda columna es el doble de la primera.

**Funciones especiales:**
- \`repeat(n, tamaño)\` — repite un patrón n veces.
- \`minmax(min, max)\` — columna con tamaño mínimo y máximo.
- \`auto-fill\` — crea tantas columnas como quepan.
- \`auto-fit\` — como auto-fill pero las columnas vacías colapsan a 0.

**Posicionamiento de items:**
- \`grid-column: 1 / 3\` — ocupa de la línea 1 a la 3 (2 columnas).
- \`grid-column: span 2\` — ocupa 2 columnas desde donde está.
- \`grid-row: 1 / 3\` — ocupa 2 filas.
- \`grid-area: nombre\` — ubica el item en un área nombrada.

**Alineación en Grid:**
- \`justify-items\` — alineación horizontal de items dentro de su celda.
- \`align-items\` — alineación vertical de items dentro de su celda.
- \`justify-content\` — alineación horizontal de toda la cuadrícula.
- \`align-content\` — alineación vertical de toda la cuadrícula.
- \`place-items\` — shorthand de align-items + justify-items.`,
      codeExample: `/* ─── GRID BÁSICO ────────────────────────── */
.galeria {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columnas iguales */
  gap: 16px;
}

/* ─── COLUMNAS RESPONSIVAS SIN MEDIA QUERIES ─ */
.cards {
  display: grid;
  /* auto-fit: crea las columnas que quepan, mínimo 280px, máximo 1fr */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

/* ─── LAYOUT DE PÁGINA CON ÁREAS ─────────── */
.page-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  grid-template-rows: 64px 1fr 48px;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  min-height: 100vh;
  gap: 0;
}

.page-header  { grid-area: header; }
.page-sidebar { grid-area: sidebar; }
.page-main    { grid-area: main; }
.page-footer  { grid-area: footer; }

/* ─── POSICIONAMIENTO EXPLÍCITO ───────────── */
.destacado {
  grid-column: 1 / -1;  /* Ocupa todas las columnas (-1 = última línea) */
  grid-row: span 2;      /* Ocupa 2 filas */
}

/* ─── MINMAX Y AUTO ROWS ──────────────────── */
.masonry-like {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(100px, auto); /* Filas mínimo 100px, crecen con contenido */
  gap: 16px;
}

/* ─── PATRÓN: HERO + SIDEBAR ──────────────── */
.article-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 48px;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .article-layout {
    grid-template-columns: 1fr; /* Una sola columna en móvil */
  }
}

/* ─── ALINEACIÓN ──────────────────────────── */
.grid-centrado {
  display: grid;
  place-items: center;      /* Centra items vertical y horizontalmente en su celda */
  min-height: 200px;
}

/* ─── SUBGRID (moderno) ───────────────────── */
.cards-subgrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.card {
  display: grid;
  grid-row: span 4;
  /* Hereda las filas del contenedor padre */
  grid-template-rows: subgrid;
}`,
      practicalTips: [
        "repeat(auto-fit, minmax(280px, 1fr)) es el patrón más poderoso de CSS Grid. Crea un layout responsivo sin media queries.",
        "grid-template-areas hace el código de layout legible como un diagrama. Úsalo para layouts de página completa.",
        "grid-column: 1 / -1 hace que un elemento ocupe todas las columnas. El -1 siempre referencia la última línea de la cuadrícula.",
        "gap en Grid funciona igual que en Flexbox. Reemplaza todos los hacks de margin entre columnas.",
        "Usa las DevTools de Firefox para visualizar Grid: tienen la mejor herramienta de inspección de CSS Grid, mejor que Chrome.",
      ],
      commonMistakes: [
        "Usar Grid cuando Flexbox es suficiente. Grid es para layouts bidimensionales; para una fila o columna de items, Flexbox es más simple.",
        "Olvidar que grid-template-areas requiere que cada área sea rectangular. No puedes crear formas en L con grid-area.",
        "No usar minmax() en las columnas. Sin mínimo, las columnas pueden colapsar a 0px en pantallas pequeñas.",
        "Usar auto-fill cuando querías auto-fit (o viceversa). auto-fill crea columnas vacías, auto-fit las colapsa.",
        "Definir explícitamente cada fila cuando el contenido es dinámico. Usa grid-auto-rows para filas implícitas.",
      ],
    },

    // ─── MÓDULO 8: Diseño responsivo: mobile-first y media queries ────────────
    {
      name: "Diseño responsivo: mobile-first y media queries",
      slug: "css-responsive-design",
      level: "BEGINNER" as const,
      subjectId: htmlCssId,
      description: "Aprende a construir interfaces que se adaptan a cualquier pantalla usando la metodología mobile-first, media queries, breakpoints y técnicas modernas de diseño responsivo.",
      whyMatters: "El 60%+ del tráfico web viene de móviles. Google usa mobile-first indexing para posicionar páginas. Una web que no es responsiva pierde usuarios, ventas y posicionamiento SEO.",
      explanation: `**Mobile-first vs Desktop-first:**

**Desktop-first (legado):** diseñas para escritorio y luego reduces. Usas \`max-width\` en media queries.
**Mobile-first (recomendado):** diseñas para móvil y luego expandes. Usas \`min-width\` en media queries.

Ventajas de mobile-first:
- El CSS base (sin media queries) es el más liviano → carga más rápida en móviles.
- Progresión natural: empiezas simple y añades complejidad.
- Coincide con cómo CSS procesa los estilos (cascada hacia abajo).

**Media queries:**
La sintaxis de media query con \`@media\`:
\`\`\`css
@media (condición) { reglas CSS }
\`\`\`

**Tipos de media:**
- \`screen\` — pantallas (default implícito).
- \`print\` — cuando se imprime.
- \`all\` — todos los medios.

**Features más usadas:**
- \`min-width\` / \`max-width\` — ancho del viewport.
- \`min-height\` / \`max-height\` — alto del viewport.
- \`orientation: portrait | landscape\` — orientación.
- \`prefers-color-scheme: dark | light\` — tema del sistema.
- \`prefers-reduced-motion: reduce\` — usuario prefiere menos animaciones.
- \`hover: hover | none\` — si el dispositivo soporta hover (mouse vs touch).
- \`pointer: fine | coarse | none\` — precisión del puntero (mouse vs dedo).
- Operadores: \`and\`, \`or\` (\`,\`), \`not\`.

**Breakpoints comunes (convención):**
- \`480px\` — móvil grande / phablet.
- \`768px\` — tablet.
- \`1024px\` — tablet grande / laptop.
- \`1280px\` — desktop.
- \`1536px\` — desktop grande.

Mejor práctica: no uses breakpoints predefinidos por dispositivo, sino donde tu diseño "se rompe" (content-based breakpoints).

**Meta viewport:**
Sin esta etiqueta en el \`<head>\`, las media queries no funcionan en móvil:
\`<meta name="viewport" content="width=device-width, initial-scale=1.0" />\``,
      codeExample: `/* ─── MOBILE-FIRST: empieza en móvil ─────── */

/* Estilos base (móvil: <768px) */
.container {
  padding: 0 16px;
  width: 100%;
}

.card-grid {
  display: grid;
  grid-template-columns: 1fr; /* Una columna en móvil */
  gap: 16px;
}

.navbar {
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.nav-menu {
  display: none; /* Menú oculto en móvil */
}

.menu-toggle {
  display: block; /* Botón hamburguesa visible en móvil */
}

/* ─── TABLET (≥768px) ─────────────────────── */
@media (min-width: 768px) {
  .container {
    padding: 0 24px;
    max-width: 768px;
    margin: 0 auto;
  }

  .card-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas */
    gap: 24px;
  }

  .navbar {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    height: 64px;
  }

  .nav-menu {
    display: flex; /* Menú visible en tablet+ */
    gap: 24px;
  }

  .menu-toggle {
    display: none; /* Hamburguesa oculta */
  }
}

/* ─── DESKTOP (≥1024px) ───────────────────── */
@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
    padding: 0 48px;
  }

  .card-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 columnas */
  }

  .article-layout {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 48px;
  }
}

/* ─── DESKTOP GRANDE (≥1280px) ────────────── */
@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }

  .card-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* ─── MEDIA QUERIES DE PREFERENCIAS ──────── */

/* Tema oscuro según preferencia del sistema */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #0f172a;
    --text-color: #f1f5f9;
    --card-bg: #1e293b;
  }
}

/* Reducir animaciones para usuarios que lo prefieren */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Estilos para impresión */
@media print {
  .navbar,
  .sidebar,
  .ads {
    display: none;
  }

  body {
    font-size: 12pt;
    color: black;
  }

  a[href]::after {
    content: " (" attr(href) ")"; /* Muestra URLs al imprimir */
  }
}

/* ─── CONTAINER QUERIES (moderno) ─────────── */
/* En lugar de basarse en el viewport, se basa en el contenedor */
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}`,
      practicalTips: [
        "Siempre incluye el meta viewport en el <head>. Sin él, el navegador móvil simula una pantalla de escritorio y ignora tus media queries.",
        "Empieza mobile-first siempre. Es más fácil añadir complejidad que quitarla, y el CSS base será más liviano.",
        "Pon los breakpoints donde el diseño se ve mal, no donde están los dispositivos. Abre el navegador, reduce la pantalla y cuando algo se rompe, ahí va el breakpoint.",
        "prefers-reduced-motion es obligatorio si usas animaciones. Algunos usuarios tienen condiciones médicas que hacen dolorosas las animaciones.",
        "Explora Container Queries como alternativa moderna a media queries. Permiten que los componentes sean responsivos a su propio tamaño, no al viewport.",
      ],
      commonMistakes: [
        "Olvidar el meta viewport. Es el error más común: el diseño se ve bien en DevTools pero mal en el teléfono real.",
        "Usar desktop-first y luego intentar revertirlo todo con media queries. Terminas luchando contra tu propio CSS.",
        "Definir breakpoints según dispositivos específicos (iPhone X, Galaxy S21). Los dispositivos cambian, tu diseño debe basarse en el contenido.",
        "No testear en dispositivos reales. DevTools es útil pero no simula perfectamente el comportamiento táctil y el viewport móvil.",
        "Ignorar prefers-color-scheme y prefers-reduced-motion. Son accesibilidad básica esperada hoy en día.",
      ],
    },

    // ─── MÓDULO 9: Transiciones, animaciones y pseudo-clases avanzadas ─────────
    {
      name: "Transiciones y animaciones CSS",
      slug: "css-transitions-animations",
      level: "BEGINNER" as const,
      subjectId: htmlCssId,
      description: "Crea interfaces dinámicas y fluidas con transiciones CSS para cambios de estado y animaciones @keyframes para movimientos complejos y continuos.",
      whyMatters: "Las animaciones bien hechas mejoran la UX comunicando estado y cambio. Las mal hechas distraen y causan malestar. Dominar CSS animations es lo que diferencia una interfaz estática de una viva y profesional.",
      explanation: `**Transiciones CSS (transition):**
Las transiciones animan el cambio de un estado a otro (ej: hover, focus, active).

Propiedades:
- \`transition-property\` — qué propiedad animar (o \`all\`).
- \`transition-duration\` — duración (en s o ms).
- \`transition-timing-function\` — curva de velocidad: ease, linear, ease-in, ease-out, ease-in-out, cubic-bezier().
- \`transition-delay\` — retraso antes de iniciar.
- \`transition\` — shorthand: \`property duration timing-function delay\`.

Propiedades animables: color, background-color, opacity, transform, width, height, margin, padding, border-radius, box-shadow, font-size.
NO animables: display, visibility (sí animable con algunos tricks), font-family.

**Animaciones @keyframes:**
Para animaciones complejas, continuas o independientes de interacción.

Sintaxis:
1. Definir la animación con \`@keyframes nombre\`.
2. Aplicarla con \`animation\` en el elemento.

Propiedades de animation:
- \`animation-name\` — nombre del @keyframes.
- \`animation-duration\` — duración.
- \`animation-timing-function\` — curva de velocidad.
- \`animation-delay\` — retraso.
- \`animation-iteration-count\` — repeticiones: número o \`infinite\`.
- \`animation-direction\` — dirección: normal, reverse, alternate, alternate-reverse.
- \`animation-fill-mode\` — estado antes/después: none, forwards, backwards, both.
- \`animation-play-state\` — paused o running (para pausar con JS).
- \`animation\` — shorthand.

**Transform:**
La propiedad más importante para animaciones. No provoca reflow (muy eficiente):
- \`translate(x, y)\` / \`translateX()\` / \`translateY()\` — mover.
- \`scale(x, y)\` — escalar.
- \`rotate(deg)\` — rotar.
- \`skew(x, y)\` — sesgar.
- \`matrix()\` — transformación 2D compleja.
- \`perspective()\` — profundidad 3D.

**Pseudo-clases de estado:**
- \`:hover\` — cuando el cursor está sobre el elemento.
- \`:focus\` — cuando el elemento tiene el foco (teclado o click).
- \`:active\` — mientras se hace click.
- \`:focus-visible\` — foco visible solo con teclado (no con click).
- \`:focus-within\` — cuando cualquier hijo tiene el foco.`,
      codeExample: `/* ─── TRANSICIONES BÁSICAS ───────────────── */
.btn {
  background-color: #4f46e5;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  /* Transición en múltiples propiedades */
  transition:
    background-color 200ms ease,
    transform 150ms ease,
    box-shadow 200ms ease;
}

.btn:hover {
  background-color: #4338ca;
  transform: translateY(-2px); /* Levanta el botón */
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
}

.btn:active {
  transform: translateY(0);    /* Baja al hacer click */
  box-shadow: none;
}

/* ─── FOCUS VISIBLE (accesibilidad) ──────── */
.btn:focus-visible {
  outline: 3px solid #818cf8;
  outline-offset: 2px;
}

/* ─── CARD CON HOVER AVANZADO ─────────────── */
.card {
  border-radius: 12px;
  overflow: hidden;
  transition: transform 300ms ease, box-shadow 300ms ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.card img {
  transition: transform 500ms ease;
}

.card:hover img {
  transform: scale(1.05); /* Zoom sutil en la imagen */
}

/* ─── ANIMACIONES @KEYFRAMES ──────────────── */

/* Fade In */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-text {
  animation: fadeIn 600ms ease forwards;
}

/* Con delay en hijos (efecto cascada) */
.hero-title    { animation-delay: 0ms; }
.hero-subtitle { animation-delay: 150ms; }
.hero-cta      { animation-delay: 300ms; }

/* Spinner de carga */
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top-color: #4f46e5;
  border-radius: 50%;
  animation: spin 800ms linear infinite;
}

/* Pulso (indicador de estado activo) */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
}

.badge-activo {
  animation: pulse 2s ease-in-out infinite;
}

/* Skeleton loading */
@keyframes shimmer {
  from { background-position: -200% 0; }
  to   { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

/* ─── RESPETAR PREFERENCIAS ───────────────── */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`,
      practicalTips: [
        "Anima siempre transform y opacity. Son las únicas propiedades que el navegador puede animar en el compositor GPU sin causar reflow. Todo lo demás es más lento.",
        "Duraciones recomendadas: micro-interacciones (hover, click) = 100-200ms; transiciones de contenido = 200-400ms; animaciones decorativas = 500-1000ms.",
        "animation-fill-mode: forwards hace que la animación permanezca en el estado final. Sin él, el elemento vuelve a su estado inicial.",
        "Usa will-change: transform en elementos que van a animarse. Informa al navegador que prepare la aceleración GPU. Pero úsalo con moderación.",
        "Siempre implementa prefers-reduced-motion. Es accesibilidad básica y algunos sistemas operativos lo activan por defecto.",
      ],
      commonMistakes: [
        "Animar width, height, top, left en lugar de transform. Causan reflow en cada frame, haciendo la animación lenta y costosa.",
        "Usar transition: all. Anima todas las propiedades, incluso las que no deben animarse, causando comportamientos inesperados y peor performance.",
        "Animaciones muy largas (>1 segundo) para interacciones de usuario. Hacen la interfaz sentirse lenta. Las micro-interacciones deben ser rápidas.",
        "Olvidar animation-fill-mode: forwards cuando quieres que el elemento permanezca en el estado final de la animación.",
        "No probar con prefers-reduced-motion activado. Algunos usuarios tienen condiciones como epilepsia o vértigo.",
      ],
    },
    {
      name: "Pseudo-clases y pseudo-elementos CSS avanzados",
      slug: "css-pseudo-classes-elements",
      level: "BEGINNER" as const,
      subjectId: htmlCssId,
      description: "Domina las pseudo-clases estructurales (:nth-child, :not, :is, :where, :has) y los pseudo-elementos (::before, ::after, ::placeholder) para estilos precisos sin clases extra.",
      whyMatters: "Las pseudo-clases y pseudo-elementos permiten estilar elementos específicos sin modificar el HTML. Reducen la cantidad de clases en el markup y hacen el CSS más expresivo y mantenible.",
      explanation: `**Pseudo-clases de estado** (ya vistas):
\`:hover\`, \`:focus\`, \`:active\`, \`:visited\`, \`:checked\`, \`:disabled\`, \`:enabled\`, \`:required\`, \`:valid\`, \`:invalid\`.

**Pseudo-clases estructurales:**
- \`:first-child\` — primer hijo de su padre.
- \`:last-child\` — último hijo.
- \`:nth-child(n)\` — el n-ésimo hijo. Acepta fórmulas: \`2n\` (pares), \`2n+1\` (impares), \`3n\` (cada 3).
- \`:nth-of-type(n)\` — el n-ésimo hijo de ese tipo de elemento.
- \`:only-child\` — único hijo de su padre.
- \`:only-of-type\` — único de su tipo entre sus hermanos.
- \`:empty\` — sin hijos ni texto.
- \`:root\` — elemento raíz del documento (<html>).
- \`:not(selector)\` — elementos que NO coinciden con el selector.
- \`:is(selector1, selector2)\` — agrupa selectores. La especificidad es la del selector más específico dentro.
- \`:where(selector1, selector2)\` — como :is pero con especificidad 0. Ideal para resets y estilos base.
- \`:has(selector)\` — el "selector padre". Selecciona elementos que contienen cierto selector hijo. Revolucionario.

**Pseudo-elementos:**
Se crean con \`::\` (doble dos puntos):
- \`::before\` — inserta contenido antes del contenido del elemento.
- \`::after\` — inserta contenido después del contenido.
- \`::placeholder\` — estila el placeholder de inputs.
- \`::selection\` — texto seleccionado por el usuario.
- \`::first-line\` — primera línea de un párrafo.
- \`::first-letter\` — primera letra (capitular).
- \`::marker\` — el marcador de listas (viñeta o número).
- \`::backdrop\` — fondo del elemento <dialog> o fullscreen.

\`::before\` y \`::after\` requieren la propiedad \`content\` (puede ser \`content: ""\` para elementos decorativos).`,
      codeExample: `/* ─── PSEUDO-CLASES ESTRUCTURALES ────────── */

/* Tabla con filas alternadas */
tr:nth-child(even) {
  background-color: #f8f9fa;
}

/* Primer item sin separador superior */
.list-item:not(:first-child) {
  border-top: 1px solid #e5e7eb;
}

/* Último item sin margen inferior */
.card:not(:last-child) {
  margin-bottom: 24px;
}

/* Cada 3er elemento (para grids de 3 columnas) */
.grid-item:nth-child(3n) {
  margin-right: 0;
}

/* ─── :IS() Y :WHERE() ────────────────────── */

/* Sin :is() - repetitivo */
h1 a, h2 a, h3 a, h4 a { color: inherit; }

/* Con :is() - limpio */
:is(h1, h2, h3, h4) a {
  color: inherit;
  text-decoration: none;
}

/* :where() para estilos base (especificidad 0, fácil de sobreescribir) */
:where(h1, h2, h3, h4, h5, h6) {
  margin-top: 0;
  line-height: 1.2;
}

/* ─── :HAS() - EL SELECTOR PADRE ─────────── */

/* Card que tiene imagen: layout horizontal */
.card:has(img) {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

/* Card sin imagen: layout vertical (default) */
.card:not(:has(img)) {
  display: flex;
  flex-direction: column;
}

/* Formulario inválido: estila el botón de submit */
form:has(:invalid) .submit-btn {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Label cuando el input asociado está en focus */
.field:has(input:focus) label {
  color: #4f46e5;
}

/* ─── PSEUDO-ELEMENTOS ────────────────────── */

/* Decoración con ::before y ::after */
.section-title {
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: "";           /* Obligatorio, aunque sea vacío */
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #4f46e5;
  border-radius: 2px;
}

/* Badge/chip con ::before para el punto de estado */
.status-badge::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: currentColor;
  margin-right: 6px;
  vertical-align: middle;
}

/* Icono de enlace externo con ::after */
a[href^="https://"]::after {
  content: " ↗";
  font-size: 0.75em;
  opacity: 0.7;
}

/* Estilando el placeholder */
input::placeholder {
  color: #9ca3af;
  font-style: italic;
}

/* Selección de texto personalizada */
::selection {
  background-color: #4f46e5;
  color: white;
}

/* Capitular en artículos */
.articulo p:first-of-type::first-letter {
  font-size: 3rem;
  font-weight: 700;
  float: left;
  line-height: 0.8;
  margin-right: 8px;
  color: #4f46e5;
}

/* Estilando los marcadores de lista */
.custom-list li::marker {
  content: "→ ";
  color: #4f46e5;
}`,
      practicalTips: [
        ":has() es el selector más poderoso que CSS ha añadido en años. Permite estilar un elemento padre basándose en sus hijos, algo imposible antes.",
        "Usa :where() para estilos de reset y base. Su especificidad 0 garantiza que cualquier otra regla lo sobreescribirá fácilmente.",
        "::before y ::after son elementos reales en el DOM que puedes posicionar, dimensionar y animar como cualquier elemento.",
        ":not() acepta selectores complejos en su versión moderna: :not(.card, .btn, [data-special]) funciona en todos los navegadores modernos.",
        "nth-child acepta las keywords 'even' y 'odd': :nth-child(even) y :nth-child(odd), más legibles que :nth-child(2n) y :nth-child(2n+1).",
      ],
      commonMistakes: [
        "Olvidar content: '' en ::before y ::after. Sin la propiedad content, el pseudo-elemento no se renderiza.",
        "Confundir :nth-child con :nth-of-type. :nth-child cuenta todos los hijos, :nth-of-type solo cuenta los del mismo tipo.",
        "Usar :first-child cuando querías :first-of-type. Si el primer hijo es de un tipo diferente, :first-child no coincidirá.",
        "Abusar de ::before y ::after para contenido real. Son para contenido decorativo; el contenido real debe estar en el HTML.",
        "No considerar la especificidad de :is(). Toma la especificidad del selector más específico dentro, lo que puede causar sorpresas.",
      ],
    },

    // ─── MÓDULO 10: Proyecto final ────────────────────────────────────────────
    {
      name: "Buenas prácticas CSS: organización, naming y mantenibilidad",
      slug: "css-best-practices",
      level: "BEGINNER" as const,
      subjectId: htmlCssId,
      description: "Aprende a organizar CSS escalable usando convenciones de naming como BEM, variables CSS para sistemas de diseño, y estrategias para mantener código CSS mantenible en proyectos reales.",
      whyMatters: "El CSS mal organizado es la deuda técnica más invisible y dolorosa. Proyectos que empiezan simples se vuelven imposibles de mantener sin una convención clara. BEM y las variables CSS son habilidades que separan al junior del developer profesional.",
      explanation: `**BEM (Block, Element, Modifier):**
Convención de naming para clases CSS que evita conflictos y hace el código autodocumentado.

- **Block:** componente independiente y reutilizable. \`.card\`, \`.navbar\`, \`.btn\`.
- **Element:** parte de un bloque, no tiene sentido fuera de él. \`.card__title\`, \`.card__image\`, \`.navbar__logo\`.
- **Modifier:** variante o estado del bloque o elemento. \`.card--featured\`, \`.btn--primary\`, \`.btn--disabled\`.

Sintaxis: \`bloque__elemento--modificador\`.

**Variables CSS (Custom Properties):**
Declaradas con \`--nombre\` en \`:root\` y usadas con \`var(--nombre)\`.
- Permiten crear sistemas de diseño consistentes.
- Son dinámicas: pueden cambiar con JavaScript o con media queries.
- Se heredan igual que otras propiedades CSS.
- A diferencia de las variables de SASS, funcionan en el navegador en tiempo real.

**Organización de archivos CSS:**
Convención de capas (moderna con \`@layer\`):
1. Reset / Normalize
2. Variables / Tokens
3. Base / Tipografía
4. Layout
5. Componentes
6. Utilities / Helpers
7. Overrides

**@layer (moderno):**
Permite declarar capas de CSS con especificidad controlada. Estilos en capas de menor prioridad nunca sobreescriben los de mayor prioridad, independiente de la especificidad del selector.

**Utility-first CSS (Tailwind approach):**
Alternativa a BEM donde se aplican clases utilitarias directamente en el HTML (\`flex\`, \`text-center\`, \`p-4\`). Polémica pero muy popular. Ambos enfoques tienen su lugar.`,
      codeExample: `/* ─── VARIABLES CSS (Design Tokens) ──────── */
:root {
  /* Colores */
  --color-primary-50:  hsl(231, 100%, 97%);
  --color-primary-100: hsl(231, 96%, 93%);
  --color-primary-500: hsl(231, 70%, 55%);
  --color-primary-600: hsl(231, 70%, 48%);
  --color-primary-700: hsl(231, 70%, 40%);

  --color-gray-50:  hsl(210, 40%, 98%);
  --color-gray-100: hsl(210, 40%, 96%);
  --color-gray-200: hsl(214, 32%, 91%);
  --color-gray-900: hsl(222, 47%, 11%);

  /* Tipografía */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'Fira Code', monospace;
  --text-sm:   0.875rem;
  --text-base: 1rem;
  --text-lg:   1.125rem;
  --text-xl:   1.25rem;
  --text-2xl:  1.5rem;
  --text-3xl:  1.875rem;

  /* Espaciado */
  --space-1:  0.25rem;  /*  4px */
  --space-2:  0.5rem;   /*  8px */
  --space-3:  0.75rem;  /* 12px */
  --space-4:  1rem;     /* 16px */
  --space-6:  1.5rem;   /* 24px */
  --space-8:  2rem;     /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Sombras */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  /* Transiciones */
  --transition-fast:   150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow:   400ms ease;
}

/* ─── TEMA OSCURO ─────────────────────────── */
[data-theme="dark"] {
  --color-gray-50:  hsl(222, 47%, 11%);
  --color-gray-900: hsl(210, 40%, 98%);
}

/* ─── BEM: COMPONENTE CARD ────────────────── */

/* Block */
.card {
  background-color: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

/* Block modifier: card destacada */
.card--featured {
  border: 2px solid var(--color-primary-500);
}

/* Block modifier: card horizontal */
.card--horizontal {
  display: flex;
  flex-direction: row;
}

/* Element: imagen de la card */
.card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

/* Element dentro de modifier */
.card--horizontal .card__image {
  width: 200px;
  height: auto;
  flex-shrink: 0;
}

/* Element: contenido de la card */
.card__body {
  padding: var(--space-6);
}

/* Element: título de la card */
.card__title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: var(--space-2);
}

/* Element: descripción */
.card__description {
  font-size: var(--text-base);
  color: var(--color-gray-500);
  line-height: 1.6;
}

/* Element: footer de la card */
.card__footer {
  padding: var(--space-4) var(--space-6);
  border-top: 1px solid var(--color-gray-200);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Element: tag/badge */
.card__tag {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-primary-600);
  background-color: var(--color-primary-50);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
}

/* ─── @LAYER (CSS moderno) ────────────────── */
@layer reset, base, components, utilities;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
  * { margin: 0; padding: 0; }
}

@layer base {
  body {
    font-family: var(--font-sans);
    color: var(--color-gray-900);
    line-height: 1.6;
  }
}

@layer components {
  .btn { /* estilos del botón */ }
}

@layer utilities {
  .sr-only { /* visually hidden para accesibilidad */ }
}`,
      practicalTips: [
        "Define todas las variables CSS en :root desde el inicio del proyecto. Es mucho más fácil que refactorizar colores hardcodeados después.",
        "BEM parece verboso al principio pero hace el HTML completamente autodocumentado: .card__title--truncated dice exactamente qué es, dónde está y cómo se ve.",
        "Usa data-theme en el <html> para temas claro/oscuro controlados por JavaScript, en lugar de solo media queries. Da más control al usuario.",
        "@layer es el futuro del CSS organizado. Permite controlar la cascada de forma explícita, sin depender de la especificidad de los selectores.",
        "Consiste: elige BEM, utility-first o CSS Modules, pero aplícalo consistentemente en todo el proyecto. Los estilos mixtos son lo más difícil de mantener.",
      ],
      commonMistakes: [
        "Mezclar convenciones de naming (BEM + camelCase + snake_case). Elige una y sé consistente en todo el proyecto.",
        "No usar variables CSS y hardcodear colores y tamaños. Cuando el diseño cambia, tienes que buscar y reemplazar en decenas de archivos.",
        "Crear modificadores BEM para todo en lugar de usar variables CSS. .card--padding-large, .card--padding-medium, .card--padding-small. Mejor: usa variables.",
        "Olvidar que las variables CSS pueden cambiar en media queries. Puedes cambiar --spacing-base en @media y afectar todo el layout automáticamente.",
        "Poner estilos en el archivo equivocado sin una convención. Sin estructura, todos los archivos CSS terminan siendo un spaghetti.",
      ],
    },
    //JavaScript 

    {
      name: "Variables: var, let y const",
      slug: "js-variables-let-const",
      level: "BEGINNER" as const,
      subjectId: javascriptId,
      description: "Aprende a declarar variables en JavaScript moderno con let y const, entiende por qué var es obsoleto y cómo el hoisting y el scope de bloque afectan tu código.",
      whyMatters: "Las variables son la base de cualquier programa. Entender la diferencia entre var, let y const, y cuándo usar cada una, evita bugs sutiles relacionados con scope y redeclaración que son muy difíciles de depurar.",
      explanation: `JavaScript tiene tres formas de declarar variables, cada una con comportamiento distinto:
 
**var (evitar en código moderno):**
- Scope de función: visible en toda la función donde se declaró, no en el bloque.
- Hoisting: la declaración se mueve al tope de su scope, pero no su valor (vale undefined hasta la asignación).
- Permite redeclaración en el mismo scope sin error.
- No tiene scope de bloque (el if, for, while no crean scope para var).
 
**let (usar para variables que cambian):**
- Scope de bloque: visible solo dentro del bloque {} donde se declaró.
- Hoisting existe pero la variable está en la "Temporal Dead Zone" (TDZ) hasta su declaración: acceder antes lanza ReferenceError.
- No permite redeclaración en el mismo scope.
- Permite reasignación.
 
**const (usar por defecto):**
- Scope de bloque igual que let.
- No permite reasignación (lanza TypeError).
- No permite redeclaración.
- IMPORTANTE: const no hace el valor inmutable. En objetos y arrays, el contenido puede cambiar; lo que no puede cambiar es la referencia.
 
**Regla práctica:** usa const por defecto. Cambia a let solo cuando necesitas reasignar. Nunca uses var.`,
      codeExample: `// ─── VAR: problemas de scope ───────────────
function ejemploVar() {
  var x = 1;
  if (true) {
    var x = 2; // Redeclara la MISMA x (no crea una nueva)
    console.log(x); // 2
  }
  console.log(x); // 2 ← sorpresa, var no tiene scope de bloque
}
 
// ─── LET: scope de bloque ───────────────────
function ejemploLet() {
  let x = 1;
  if (true) {
    let x = 2; // Nueva x, solo existe dentro del if
    console.log(x); // 2
  }
  console.log(x); // 1 ← la x del bloque if ya no existe
}
 
// ─── CONST: referencia inmutable ────────────
const nombre = "María";
// nombre = "Carlos"; // TypeError: Assignment to constant variable
 
const usuario = { nombre: "María", edad: 25 };
usuario.edad = 26;       // ✅ Mutar el objeto SÍ está permitido
usuario.email = "m@m.com"; // ✅ Agregar propiedades SÍ está permitido
// usuario = {};         // ❌ Reasignar la referencia NO está permitido
 
const numeros = [1, 2, 3];
numeros.push(4);         // ✅ Mutar el array SÍ está permitido
// numeros = [];         // ❌ Reasignar NO está permitido
 
// ─── HOISTING ───────────────────────────────
console.log(a); // undefined (var hoisted, no su valor)
var a = 5;
 
// console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 5;
 
// ─── REGLA PRÁCTICA ─────────────────────────
const MAX_INTENTOS = 3;      // const: valor que no cambia
let intentosActuales = 0;    // let: valor que va a cambiar
 
for (let i = 0; i < MAX_INTENTOS; i++) { // let en el for
  intentosActuales++;
  console.log(\`Intento \${intentosActuales}\`);
}`,
      practicalTips: [
        "Usa const por defecto en todo. Cambia a let solo cuando el linter te diga que necesitas reasignar. Esto hace el código más predecible.",
        "const en arrays y objetos no los hace inmutables. Si necesitas inmutabilidad real, usa Object.freeze() o librerías como Immer.",
        "El error más común con let en loops: declarar la variable fuera del for cuando debería estar dentro, perdiendo el scope de bloque.",
        "En módulos ES6 y código moderno, var simplemente no existe. Si ves var en código que debes mantener, considera refactorizarlo a let/const.",
      ],
      commonMistakes: [
        "Usar var pensando que tiene scope de bloque. var solo tiene scope de función, lo que causa bugs en loops y condicionales.",
        "Creer que const hace inmutable el valor. Solo hace inmutable la referencia. El contenido de objetos y arrays sí puede cambiar.",
        "Acceder a una variable let antes de su declaración esperando undefined como con var. Con let/const obtienes ReferenceError.",
        "Declarar variables sin let, const o var (variables globales implícitas). En modo estricto lanza ReferenceError; sin él, contamina el scope global.",
      ],
    },
    {
      name: "Tipos de datos primitivos y type coercion",
      slug: "js-data-types-coercion",
      level: "BEGINNER" as const,
      subjectId: javascriptId,
      description: "Comprende los 7 tipos primitivos de JavaScript, el tipo object, cómo funciona typeof, y los peligros de la coerción de tipos implícita y explícita.",
      whyMatters: "JavaScript es de tipado dinámico y realiza coerciones automáticas que producen resultados inesperados. Entender los tipos y la coerción es esencial para evitar bugs como '1' + 1 === '11' o [] == false === true.",
      explanation: `**Los 7 tipos primitivos de JavaScript:**
1. **string** — texto: \`'hola'\`, \`"mundo"\`, \`\`template\`\`.
2. **number** — números enteros y decimales: \`42\`, \`3.14\`, \`NaN\`, \`Infinity\`.
3. **boolean** — \`true\` o \`false\`.
4. **undefined** — variable declarada pero sin valor asignado.
5. **null** — ausencia intencional de valor (asignado explícitamente).
6. **bigint** — enteros muy grandes: \`9007199254740991n\`.
7. **symbol** — identificadores únicos: \`Symbol('desc')\`.
 
**El tipo object:**
Todo lo que no es primitivo es un objeto: arrays, funciones, fechas, etc.
- \`typeof null === 'object'\` — bug histórico de JS, null NO es un objeto.
- \`typeof function(){} === 'function'\` — las funciones son objetos pero typeof las reporta como 'function'.
- \`typeof [] === 'object'\` — los arrays son objetos.
 
**Valores falsy (se comportan como false en booleano):**
\`false\`, \`0\`, \`-0\`, \`0n\`, \`""\`, \`''\`, \`\`\`\`, \`null\`, \`undefined\`, \`NaN\`.
Todos los demás valores son truthy.
 
**Coerción implícita (JavaScript la hace automáticamente):**
- \`+\` con strings: convierte el otro operando a string.
- Operadores de comparación \`==\`: convierte tipos para comparar.
- Contextos booleanos (if, while, &&, ||): convierte a boolean.
 
**Coerción explícita (tú la haces):**
- \`String(value)\`, \`Number(value)\`, \`Boolean(value)\`.
- \`parseInt(str, radix)\`, \`parseFloat(str)\`.
- \`!!value\` — convierte a boolean.
 
**Usa siempre === (igualdad estricta)** en lugar de == (igualdad débil).`,
      codeExample: `// ─── TIPOS PRIMITIVOS ───────────────────────
typeof "hola"       // "string"
typeof 42           // "number"
typeof true         // "boolean"
typeof undefined    // "undefined"
typeof null         // "object" ← bug histórico!
typeof {}           // "object"
typeof []           // "object"
typeof function(){} // "function"
typeof Symbol()     // "symbol"
typeof 42n          // "bigint"
 
// ─── NaN ────────────────────────────────────
typeof NaN          // "number" ← NaN es de tipo number
NaN === NaN         // false ← NaN no es igual a sí mismo
Number.isNaN(NaN)   // true ← la forma correcta de verificar NaN
 
// ─── VALORES FALSY ───────────────────────────
Boolean(false)     // false
Boolean(0)         // false
Boolean("")        // false
Boolean(null)      // false
Boolean(undefined) // false
Boolean(NaN)       // false
// Todo lo demás es truthy:
Boolean([])        // true ← array vacío es TRUTHY
Boolean({})        // true ← objeto vacío es TRUTHY
Boolean("0")       // true ← string "0" es TRUTHY
 
// ─── COERCIÓN IMPLÍCITA (los bugs clásicos) ──
"5" + 3           // "53" (3 se convierte a string)
"5" - 3           // 2   (- no concatena, convierte "5" a number)
"5" * "3"         // 15  (ambos se convierten a number)
true + true       // 2   (true → 1)
true + false      // 1
[] + []           // ""
[] + {}           // "[object Object]"
{} + []           // 0 (en algunos contextos)
 
// ─── COMPARACIÓN DÉBIL vs ESTRICTA ──────────
1 == "1"          // true  ← coerción, peligroso
1 === "1"         // false ← sin coerción, correcto
null == undefined // true  ← excepción conocida
null === undefined// false
0 == false        // true  ← peligroso
0 === false       // false ← correcto
 
// ─── COERCIÓN EXPLÍCITA (la correcta) ───────
Number("42")      // 42
Number("")        // 0
Number("abc")     // NaN
Number(true)      // 1
Number(false)     // 0
Number(null)      // 0
Number(undefined) // NaN
 
String(42)        // "42"
String(null)      // "null"
String(undefined) // "undefined"
 
Boolean(0)        // false
Boolean("")       // false
!!0               // false (forma corta)
!!"hola"          // true
 
parseInt("42px")  // 42 (parsea hasta que no puede)
parseInt("px42")  // NaN
parseFloat("3.14rem") // 3.14
 
// ─── DETECTAR TIPOS CORRECTAMENTE ───────────
Array.isArray([])          // true (no usar typeof)
value === null             // detectar null
typeof value === "undefined" // detectar undefined
Number.isNaN(value)        // detectar NaN (no isNaN global)
Number.isFinite(value)     // detectar número finito`,
      practicalTips: [
        "Usa siempre === en lugar de ==. La única excepción aceptada es 'value == null' que detecta tanto null como undefined a la vez.",
        "Para detectar arrays usa Array.isArray(value), no typeof (que retorna 'object').",
        "Para detectar NaN usa Number.isNaN(value), no el isNaN() global que convierte el argumento a número antes de verificar.",
        "El patrón !!value convierte cualquier valor a su equivalente booleano. Muy útil para simplificar condiciones.",
        "parseInt siempre pasa el radix: parseInt('42', 10). Sin radix, strings que empiezan con '0x' se interpretan como hexadecimal.",
      ],
      commonMistakes: [
        "Usar == en lugar de ===. La coerción implícita de == produce resultados contraintuitivos que son difíciles de depurar.",
        "Creer que [] y {} son falsy. Son truthy porque son objetos. Solo los primitivos vacíos ('', 0, null, undefined) son falsy.",
        "Usar typeof para detectar arrays o null. typeof [] === 'object' y typeof null === 'object', ambos engañan.",
        "Usar isNaN() global en lugar de Number.isNaN(). isNaN('abc') retorna true porque convierte 'abc' a NaN primero.",
        "No manejar el caso en que Number() retorna NaN. Siempre valida con Number.isNaN() después de convertir strings a número.",
      ],
    },
    {
      name: "Operadores y expresiones en JavaScript",
      slug: "js-operators-expressions",
      level: "BEGINNER" as const,
      subjectId: javascriptId,
      description: "Domina los operadores aritméticos, de comparación, lógicos, de asignación y los modernos operadores de ES2020+: nullish coalescing (??) y optional chaining (?.).",
      whyMatters: "Los operadores ?? y ?. han reemplazado patrones verbosos de verificación de null/undefined. Entender la precedencia de operadores y los operadores lógicos como valores (no solo booleanos) es clave para leer código JavaScript moderno.",
      explanation: `**Operadores aritméticos:**
\`+\`, \`-\`, \`*\`, \`/\`, \`%\` (módulo), \`**\` (exponenciación), \`++\`, \`--\`.
 
**Operadores de comparación (siempre usar ===):**
\`===\`, \`!==\`, \`>\`, \`<\`, \`>=\`, \`<=\`.
 
**Operadores lógicos:**
- \`&&\` (AND): retorna el primer falsy o el último valor si todos son truthy.
- \`||\` (OR): retorna el primer truthy o el último valor si todos son falsy.
- \`!\` (NOT): invierte el valor booleano.
- Los operadores lógicos no siempre retornan boolean, retornan uno de sus operandos.
 
**Nullish Coalescing (??) — ES2020:**
Retorna el operando derecho solo si el izquierdo es null o undefined. A diferencia de ||, no considera 0, '', false como "no hay valor".
 
**Optional Chaining (?.) — ES2020:**
Accede a propiedades anidadas sin lanzar error si algún nodo intermedio es null o undefined. Retorna undefined en lugar de lanzar TypeError.
 
**Operadores de asignación:**
\`=\`, \`+=\`, \`-=\`, \`*=\`, \`/=\`, \`%=\`, \`**=\`, \`&&=\`, \`||=\`, \`??=\`.
 
**Operador ternario:**
\`condición ? valorSiTrue : valorSiFalse\` — expresión condicional en una línea.
 
**Operador spread (...) y rest (...):**
Spread: expande un iterable. Rest: agrupa argumentos restantes.
 
**Operador typeof, instanceof, in:**
- \`typeof value\` — retorna el tipo como string.
- \`obj instanceof Constructor\` — verifica la cadena de prototipos.
- \`'prop' in obj\` — verifica si una propiedad existe en un objeto.`,
      codeExample: `// ─── OPERADORES LÓGICOS COMO VALORES ────────
const a = null || "default";     // "default" (null es falsy)
const b = 0 || "default";        // "default" (0 también es falsy ← problema)
const c = "" || "default";       // "default" ("" también es falsy ← problema)
 
// ─── NULLISH COALESCING (??) ─────────────────
const d = null ?? "default";     // "default"
const e = undefined ?? "default";// "default"
const f = 0 ?? "default";        // 0 ← 0 NO es null/undefined, OK
const g = "" ?? "default";       // "" ← "" NO es null/undefined, OK
const h = false ?? "default";    // false ← false NO es null/undefined, OK
 
// Caso de uso: config con valores válidos de 0 o false
const config = {
  timeout: 0,          // 0 es un timeout válido
  retries: 0,          // 0 retries es válido
  debug: false,        // false es un valor válido
};
const timeout = config.timeout ?? 5000;  // 0 (correcto)
const timeout2 = config.timeout || 5000; // 5000 (incorrecto, 0 es falsy)
 
// ─── OPTIONAL CHAINING (?.) ──────────────────
const usuario = {
  nombre: "María",
  direccion: {
    ciudad: "Bogotá",
  },
};
 
// Sin optional chaining (verboso y error-prone)
const ciudad = usuario && usuario.direccion && usuario.direccion.ciudad;
 
// Con optional chaining
const ciudad2 = usuario?.direccion?.ciudad;         // "Bogotá"
const pais   = usuario?.direccion?.pais;            // undefined (sin error)
const zip    = usuario?.direccion?.codigoPostal;    // undefined (sin error)
 
// En métodos y arrays
const nombres = usuario?.obtenerNombres?.();        // undefined si el método no existe
const primer  = usuario?.tags?.[0];                // undefined si tags no existe
 
// Combinado con ??
const ciudad3 = usuario?.direccion?.ciudad ?? "Ciudad desconocida";
 
// ─── ASIGNACIÓN LÓGICA ───────────────────────
let x = null;
x ??= "valor por defecto";   // x = "valor por defecto" (solo asigna si null/undefined)
 
let y = 0;
y ||= 42;   // y = 42 (asigna si y es falsy)
y &&= 100;  // y = 100 (asigna si y es truthy)
 
// ─── TERNARIO ────────────────────────────────
const edad = 20;
const acceso = edad >= 18 ? "permitido" : "denegado";
 
// Ternario anidado (evitar si es ilegible)
const nivel = puntos > 100 ? "oro" : puntos > 50 ? "plata" : "bronce";
 
// ─── SPREAD Y REST ───────────────────────────
// Spread en arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combinado = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]
const copia = [...arr1];              // copia superficial
 
// Spread en objetos
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 3, c: 4 } (b se sobreescribe)
 
// Rest en funciones
function suma(...numeros) {         // agrupa todos los args en un array
  return numeros.reduce((acc, n) => acc + n, 0);
}
suma(1, 2, 3, 4, 5); // 15
 
// ─── IN Y INSTANCEOF ─────────────────────────
"nombre" in usuario    // true
"telefono" in usuario  // false
 
[] instanceof Array    // true
{} instanceof Object   // true`,
      practicalTips: [
        "Prefiere ?? sobre || para valores por defecto cuando 0, false o '' son valores válidos. Es uno de los cambios más importantes de ES2020.",
        "Encadena ?. sin miedo: obj?.a?.b?.c?.d retorna undefined si cualquier eslabón es null/undefined, nunca lanza TypeError.",
        "El operador ??= es perfecto para inicialización lazy: cache ??= calcularValorCostoso() solo calcula si cache es null/undefined.",
        "Usa spread para copiar objetos y arrays en lugar de Object.assign() o concat(). Es más legible: {...original, nuevaPropiedad: valor}.",
      ],
      commonMistakes: [
        "Usar || para valores por defecto cuando el valor podría ser 0 o ''. En esos casos usa ?? para no tratar valores válidos como ausentes.",
        "Encadenar ?. con && innecesariamente: usuario && usuario.nombre es equivalente a usuario?.nombre.",
        "Confundir rest y spread. Visualmente son los mismos (...), pero rest agrupa parámetros en una función, spread expande un iterable.",
        "Usar ternario anidado con más de 2 niveles. Se vuelve ilegible rápidamente. Usa if/else o un objeto de configuración en su lugar.",
      ],
    },
 
    // ─── MÓDULO 2: Condicionales y ciclos ─────────────────────────────────────
    {
      name: "Condicionales: if/else, switch y guard clauses",
      slug: "js-conditionals",
      level: "BEGINNER" as const,
      subjectId: javascriptId,
      description: "Aprende todas las formas de control de flujo condicional en JavaScript: if/else, else if, switch/case, y el patrón de guard clauses para código más limpio y legible.",
      whyMatters: "El control de flujo condicional es la lógica de cualquier programa. Los guard clauses son un patrón de código limpio que reduce el anidamiento y hace el código más fácil de leer y testear.",
      explanation: `**if / else if / else:**
La estructura condicional más básica. Evalúa una expresión booleana y ejecuta el bloque correspondiente.
 
**Switch/case:**
Ideal cuando tienes múltiples condiciones que comparan el mismo valor. Usa comparación estricta (===) internamente.
- Siempre incluye \`break\` al final de cada case (o \`return\` si está en una función).
- El case \`default\` se ejecuta si ningún case coincide.
- El "fall-through" (sin break) es raramente intencional y fuente de bugs.
 
**Guard clauses (early return):**
Patrón de código limpio: en lugar de anidar lógica en if/else profundos, retorna temprano cuando hay condiciones que impiden continuar. Reduce la indentación y hace el "camino feliz" más visible.
 
**Objetos como switch (lookup tables):**
Cuando tienes muchos casos basados en una clave string, usar un objeto como tabla de lookup es más elegante y extensible que switch.
 
**Short-circuit evaluation:**
\`&&\` y \`||\` como condicionales inline. \`condición && <JSX>\` es el patrón más común en React.`,
      codeExample: `// ─── IF/ELSE BÁSICO ──────────────────────────
const edad = 20;
 
if (edad >= 18) {
  console.log("Mayor de edad");
} else if (edad >= 13) {
  console.log("Adolescente");
} else {
  console.log("Niño");
}
 
// ─── SWITCH/CASE ─────────────────────────────
const dia = "lunes";
 
switch (dia) {
  case "lunes":
  case "martes":
  case "miércoles":
  case "jueves":
  case "viernes":
    console.log("Día laboral");
    break;
  case "sábado":
  case "domingo":
    console.log("Fin de semana");
    break;
  default:
    console.log("Día inválido");
}
 
// ─── GUARD CLAUSES (early return) ────────────
 
// ❌ Sin guard clauses: anidamiento profundo
function procesarOrden(orden) {
  if (orden) {
    if (orden.items.length > 0) {
      if (orden.usuario.activo) {
        if (orden.total > 0) {
          // lógica principal enterrada en 4 niveles
          return procesarPago(orden);
        }
      }
    }
  }
}
 
// ✅ Con guard clauses: camino feliz al final, claro y limpio
function procesarOrden(orden) {
  if (!orden) return null;
  if (orden.items.length === 0) return { error: "Orden vacía" };
  if (!orden.usuario.activo) return { error: "Usuario inactivo" };
  if (orden.total <= 0) return { error: "Total inválido" };
 
  // El camino feliz está al final, sin anidamiento
  return procesarPago(orden);
}
 
// ─── OBJETO COMO LOOKUP TABLE ─────────────────
// ❌ Switch con muchos casos
function getDescuento(rol) {
  switch (rol) {
    case "estudiante": return 0.2;
    case "senior": return 0.15;
    case "premium": return 0.1;
    case "corporativo": return 0.25;
    default: return 0;
  }
}
 
// ✅ Lookup table: más extensible y testeable
const DESCUENTOS = {
  estudiante:  0.20,
  senior:      0.15,
  premium:     0.10,
  corporativo: 0.25,
};
 
function getDescuento(rol) {
  return DESCUENTOS[rol] ?? 0;
}
 
// ─── SHORT-CIRCUIT EVALUATION ────────────────
const estaLogueado = true;
const nombre = "María";
 
// && ejecuta el segundo operando solo si el primero es truthy
estaLogueado && console.log(\`Hola, \${nombre}\`);
 
// || ejecuta el segundo operando solo si el primero es falsy
const nombreMostrar = nombre || "Anónimo";
 
// Patrón común en React
const usuario = { activo: true, nombre: "María" };
// {usuario.activo && <Perfil nombre={usuario.nombre} />}`,
      practicalTips: [
        "Aplica guard clauses siempre que el código tenga más de 2 niveles de anidamiento. El código plano es más legible y testeable.",
        "Prefiere objetos de configuración (lookup tables) sobre switch cuando los casos son más de 3-4. Son más fáciles de extender y testear.",
        "En switch, si olvidas el break, los cases caen al siguiente (fall-through). Esto es raramente lo que quieres. Siempre pon break o return.",
        "El operador ternario es para expresiones simples de una línea. Para lógica compleja, usa if/else aunque sea más verboso.",
      ],
      commonMistakes: [
        "Olvidar break en switch/case, causando fall-through accidental que ejecuta múltiples casos.",
        "Anidar if/else en lugar de usar guard clauses. El anidamiento profundo es la causa número 1 de código difícil de leer.",
        "Usar switch cuando solo hay 2 casos. Para eso if/else es más claro. Switch brilla con 3+ casos del mismo valor.",
        "Comparar con == en lugar de ===. Switch usa === internamente, pero en if puedes caer en la trampa de ==.",
      ],
    },
    {
      name: "Ciclos: for, while, for...of y for...in",
      slug: "js-loops",
      level: "BEGINNER" as const,
      subjectId: javascriptId,
      description: "Domina todas las formas de iteración en JavaScript: for clásico, while, do...while, for...of para iterables, for...in para objetos, y cuándo usar cada uno.",
      whyMatters: "Los ciclos son fundamentales para procesar colecciones de datos. Elegir el tipo de loop correcto hace el código más legible y evita bugs. En JavaScript moderno, for...of ha reemplazado al for clásico para la mayoría de iteraciones sobre arrays.",
      explanation: `**for clásico:**
Ideal cuando necesitas el índice o controlar exactamente el inicio, fin e incremento de la iteración.
\`for (inicialización; condición; incremento) { }\`
 
**while:**
Cuando no sabes cuántas iteraciones necesitas. Itera mientras la condición sea true.
Riesgo: loop infinito si la condición nunca se vuelve false.
 
**do...while:**
Como while pero garantiza al menos una ejecución del bloque (verifica la condición al final).
 
**for...of (ES6):**
Itera sobre iterables: arrays, strings, Sets, Maps, NodeLists, generadores.
Más limpio que el for clásico para arrays. Permite usar break y continue.
NO funciona con objetos planos (no son iterables).
 
**for...in:**
Itera sobre las propiedades enumerables de un objeto (las claves/keys).
Incluye propiedades heredadas del prototipo. Por eso se recomienda acompañar con hasOwnProperty() o usar Object.keys() en su lugar.
NO usar con arrays (el orden no está garantizado en todos los engines y itera sobre índices como strings).
 
**break y continue:**
- \`break\` — sale del loop inmediatamente.
- \`continue\` — salta a la siguiente iteración.
- Con label: permite romper loops anidados.
 
**Métodos de array (alternativa funcional a loops):**
forEach, map, filter, reduce, find, findIndex, some, every — cubiertos en el módulo de Arrays.`,
      codeExample: `// ─── FOR CLÁSICO ─────────────────────────────
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
 
// Iterar array con índice (cuando necesitas el índice)
const frutas = ["manzana", "banana", "cereza"];
for (let i = 0; i < frutas.length; i++) {
  console.log(\`\${i}: \${frutas[i]}\`);
}
 
// ─── FOR...OF (preferido para arrays) ────────
for (const fruta of frutas) {
  console.log(fruta); // "manzana", "banana", "cereza"
}
 
// Con entries() para obtener índice y valor
for (const [index, fruta] of frutas.entries()) {
  console.log(\`\${index}: \${fruta}\`);
}
 
// Iterar strings
for (const char of "hola") {
  console.log(char); // "h", "o", "l", "a"
}
 
// Iterar un Set
const colores = new Set(["rojo", "verde", "azul"]);
for (const color of colores) {
  console.log(color);
}
 
// Iterar un Map
const mapa = new Map([["a", 1], ["b", 2]]);
for (const [clave, valor] of mapa) {
  console.log(\`\${clave}: \${valor}\`);
}
 
// ─── FOR...IN (para objetos) ──────────────────
const persona = { nombre: "María", edad: 25, ciudad: "Bogotá" };
 
for (const clave in persona) {
  // hasOwnProperty filtra propiedades heredadas del prototipo
  if (Object.hasOwn(persona, clave)) {
    console.log(\`\${clave}: \${persona[clave]}\`);
  }
}
 
// Alternativa más limpia con Object.keys()
for (const clave of Object.keys(persona)) {
  console.log(\`\${clave}: \${persona[clave]}\`);
}
 
// ─── WHILE ───────────────────────────────────
let intentos = 0;
while (intentos < 3) {
  console.log(\`Intento \${intentos + 1}\`);
  intentos++;
}
 
// ─── DO...WHILE ──────────────────────────────
let respuesta;
do {
  respuesta = prompt("¿Cuál es la capital de Colombia?");
} while (respuesta !== "Bogotá"); // Se ejecuta al menos una vez
 
// ─── BREAK Y CONTINUE ────────────────────────
const numeros = [1, 3, 5, 2, 7, 4, 8];
 
// Encontrar el primer número par
for (const num of numeros) {
  if (num % 2 === 0) {
    console.log(\`Primer par: \${num}\`); // 2
    break; // Sale del loop
  }
}
 
// Saltar números impares (imprimir solo pares)
for (const num of numeros) {
  if (num % 2 !== 0) continue; // Salta a la siguiente iteración
  console.log(num); // 2, 4, 8
}
 
// ─── LOOPS ANIDADOS CON LABEL ─────────────────
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) break outer; // Rompe ambos loops
    console.log(\`\${i},\${j}\`);
  }
}`,
      practicalTips: [
        "Para arrays, prefiere for...of sobre el for clásico cuando no necesitas el índice. Es más legible y menos propenso a errores (off-by-one).",
        "Para objetos, prefiere Object.keys(), Object.values() u Object.entries() con for...of sobre for...in. Son más predecibles y no incluyen propiedades heredadas.",
        "Si necesitas el índice en for...of, usa array.entries(): for (const [i, item] of array.entries()).",
        "while es ideal para leer datos de streams o hacer polling: while (hayMásDatos()) { procesarDato(); }.",
      ],
      commonMistakes: [
        "Usar for...in para iterar arrays. El orden no está garantizado y puedes iterar sobre propiedades del prototipo o propiedades custom añadidas al array.",
        "Modificar el array mientras lo iteras con for...of. Puede causar comportamientos inesperados. Crea una copia primero si necesitas modificar.",
        "Loop infinito con while al olvidar actualizar la condición dentro del bloque.",
        "Usar for clásico cuando for...of sería más claro. El for con i es propenso al error off-by-one (< vs <=).",
      ],
    },
 
    // ─── MÓDULO 3: Funciones, scope y closures ────────────────────────────────
    {
      name: "Funciones: declaración, expresión y arrow functions",
      slug: "js-functions-types",
      level: "BEGINNER" as const,
      subjectId: javascriptId,
      description: "Comprende las tres formas de definir funciones en JavaScript, sus diferencias de hoisting y contexto (this), los parámetros por defecto, rest params y destructuring en parámetros.",
      whyMatters: "Las funciones son ciudadanos de primera clase en JavaScript: se pueden asignar a variables, pasarse como argumentos y retornarse desde otras funciones. Entender sus diferencias es fundamental para escribir código moderno y evitar bugs con 'this'.",
      explanation: `**Function Declaration (declaración de función):**
- Hoisting completo: la función entera se mueve al tope del scope. Se puede llamar antes de ser declarada.
- Tiene su propio \`this\` (depende de cómo se llama).
- Tiene el objeto \`arguments\`.
- Puede ser recursiva por nombre.
 
**Function Expression (expresión de función):**
- NO tiene hoisting (solo la variable se eleva, no la función).
- Puede ser anónima o nombrada.
- Útil para asignar funciones condicionalmente.
 
**Arrow Functions (ES6):**
- Sintaxis compacta.
- NO tiene su propio \`this\`: hereda el \`this\` del scope léxico donde fue creada (lexical this). Clave para callbacks y métodos de clase.
- NO tiene \`arguments\`.
- NO puede usarse como constructor (new).
- NO puede usarse como método de objeto si necesita acceder a \`this\`.
- Retorno implícito: si el cuerpo es una expresión sin {}, retorna automáticamente.
 
**Parámetros:**
- Parámetros por defecto: \`function fn(a, b = 10) {}\`.
- Rest parameters: \`function fn(...args) {}\` — agrupa los argumentos restantes en un array.
- Destructuring en parámetros: desestructura directamente en la firma.
 
**Funciones de primera clase:**
Las funciones son objetos en JavaScript. Se pueden:
- Asignar a variables.
- Pasar como argumentos (callbacks).
- Retornar desde otras funciones (higher-order functions).
- Almacenar en arrays y objetos.`,
      codeExample: `// ─── FUNCTION DECLARATION ────────────────────
saludar("María"); // Funciona por hoisting
 
function saludar(nombre) {
  return \`Hola, \${nombre}!\`;
}
 
// ─── FUNCTION EXPRESSION ─────────────────────
// const saludar2 = saludar2("María"); // ReferenceError: no hay hoisting
 
const saludar2 = function(nombre) {
  return \`Hola, \${nombre}!\`;
};
 
// Función nombrada (útil para stack traces y recursión)
const factorial = function calcFactorial(n) {
  return n <= 1 ? 1 : n * calcFactorial(n - 1);
};
 
// ─── ARROW FUNCTIONS ─────────────────────────
// Forma completa
const sumar = (a, b) => {
  return a + b;
};
 
// Retorno implícito (sin llaves)
const sumar2 = (a, b) => a + b;
 
// Un solo parámetro (sin paréntesis)
const doble = n => n * 2;
 
// Sin parámetros (paréntesis obligatorio)
const saludarGenerico = () => "¡Hola!";
 
// Retornar un objeto literal (necesita paréntesis para no confundir con el bloque)
const crearUsuario = (nombre, edad) => ({ nombre, edad });
 
// ─── THIS EN ARROW FUNCTIONS ─────────────────
// El problema con function en callbacks:
function Temporizador() {
  this.segundos = 0;
 
  setInterval(function() {
    this.segundos++; // ❌ 'this' aquí es window/undefined, no el Temporizador
    console.log(this.segundos); // NaN
  }, 1000);
}
 
// Arrow function soluciona el problema:
function TemporizadorCorrecto() {
  this.segundos = 0;
 
  setInterval(() => {
    this.segundos++; // ✅ 'this' heredado del constructor
    console.log(this.segundos); // 1, 2, 3...
  }, 1000);
}
 
// ─── PARÁMETROS POR DEFECTO ──────────────────
function crearMensaje(texto, tipo = "info", prefijo = "[MSG]") {
  return \`\${prefijo} [\${tipo.toUpperCase()}]: \${texto}\`;
}
 
crearMensaje("Hola");                    // "[MSG] [INFO]: Hola"
crearMensaje("Error", "error");          // "[MSG] [ERROR]: Error"
crearMensaje("Ok", "success", "[SYS]"); // "[SYS] [SUCCESS]: Ok"
 
// ─── REST PARAMETERS ─────────────────────────
function sumarTodo(inicial, ...numeros) {
  return numeros.reduce((acc, n) => acc + n, inicial);
}
 
sumarTodo(0, 1, 2, 3, 4, 5); // 15
 
// ─── DESTRUCTURING EN PARÁMETROS ─────────────
// Sin destructuring (verboso)
function mostrarUsuario(usuario) {
  console.log(\`\${usuario.nombre} (\${usuario.edad})\`);
}
 
// Con destructuring (limpio)
function mostrarUsuario2({ nombre, edad, ciudad = "Desconocida" }) {
  console.log(\`\${nombre} (\${edad}) - \${ciudad}\`);
}
 
mostrarUsuario2({ nombre: "María", edad: 25, ciudad: "Bogotá" });
 
// Destructuring en array params
function primerYUltimo([primero, ...resto]) {
  return { primero, ultimo: resto[resto.length - 1] };
}
 
primerYUltimo([1, 2, 3, 4, 5]); // { primero: 1, ultimo: 5 }
 
// ─── FUNCIONES DE PRIMERA CLASE ──────────────
// Pasar función como argumento (callback)
const numeros = [1, 2, 3, 4, 5];
const pares = numeros.filter(n => n % 2 === 0); // [2, 4]
 
// Retornar función desde función (higher-order function)
function multiplicadorPor(factor) {
  return (numero) => numero * factor;
}
 
const triple = multiplicadorPor(3);
const cuadruple = multiplicadorPor(4);
triple(5);    // 15
cuadruple(5); // 20`,
      practicalTips: [
        "Usa arrow functions para callbacks y funciones cortas. Usa function declarations para funciones principales del módulo (se benefician del hoisting).",
        "Nunca uses arrow functions como métodos de un objeto si necesitas acceder a 'this'. Arrow functions no tienen su propio this.",
        "El retorno implícito de arrow functions con objetos requiere paréntesis: () => ({ clave: valor }). Sin paréntesis, las {} se interpretan como bloque.",
        "Prefiere destructuring en los parámetros de funciones que reciben objetos. Hace la firma más declarativa y permite valores por defecto por propiedad.",
      ],
      commonMistakes: [
        "Usar arrow functions como métodos de objeto esperando que 'this' apunte al objeto. Arrow functions heredan 'this' del contexto donde fueron definidas, no donde son llamadas.",
        "Olvidar los paréntesis al retornar un objeto con arrow function: n => {id: n} retorna undefined, n => ({id: n}) retorna el objeto.",
        "Confundir rest parameters (...args en la firma) con el objeto 'arguments'. Rest es un array real, arguments es un objeto array-like y no existe en arrow functions.",
        "Asumir que function expressions tienen hoisting. Solo var tiene hoisting de valor; const y let solo tienen hoisting de declaración (TDZ).",
      ],
    },
    {
      name: "Scope, hoisting y closures",
      slug: "js-scope-hoisting-closures",
      level: "BEGINNER" as const,
      subjectId: javascriptId,
      description: "Comprende en profundidad cómo JavaScript gestiona el acceso a variables: scope global, de función y de bloque, el proceso de hoisting, y el mecanismo de closures para encapsular estado.",
      whyMatters: "Los closures son uno de los conceptos más poderosos y mal entendidos de JavaScript. Son la base de patrones como módulos, memoización, currying, y son fundamentales para entender cómo funcionan los hooks de React internamente.",
      explanation: `**Scope (alcance):**
Define dónde una variable es accesible.
 
- **Scope global:** variables declaradas fuera de cualquier función o bloque. Accesibles en todo el programa. Evitar contaminar el scope global.
- **Scope de función:** variables declaradas dentro de una función, solo accesibles dentro de ella (aplica a var, let, const).
- **Scope de bloque:** variables let y const son accesibles solo dentro del bloque {} donde fueron declaradas.
- **Scope léxico:** una función interna tiene acceso a las variables de la función externa que la contiene, incluso si la función externa ya terminó.
 
**La Scope Chain:**
Cuando JavaScript busca una variable, busca primero en el scope actual, luego en el scope exterior, y así hasta llegar al scope global. Si no encuentra la variable, lanza ReferenceError.
 
**Hoisting:**
JavaScript procesa las declaraciones antes de ejecutar el código:
- **Function declarations:** hoisting completo (nombre y cuerpo).
- **var:** hoisting de la declaración (vale undefined hasta la asignación).
- **let/const:** hoisting de la declaración pero en la Temporal Dead Zone (TDZ) hasta la línea de declaración.
- **Class declarations:** similar a let, TDZ.
 
**Closures:**
Una closure es la combinación de una función y el scope léxico en el que fue creada. La función "recuerda" las variables del scope donde nació, incluso después de que ese scope haya terminado de ejecutarse.
 
Características:
- La función interna tiene referencia a las variables del scope externo, no una copia.
- Las variables capturadas viven mientras exista la closure que las referencia.
- Permiten crear datos privados y estado encapsulado.
 
**Usos comunes de closures:**
- Factory functions (funciones que crean funciones).
- Módulos con datos privados.
- Memoización.
- Callbacks con contexto.
- Currying y partial application.`,
      codeExample: `// ─── SCOPE ───────────────────────────────────
let global = "soy global";
 
function exterior() {
  let enExterior = "en exterior";
 
  function interior() {
    let enInterior = "en interior";
    // Accede a su propio scope, al de exterior y al global
    console.log(enInterior); // ✅
    console.log(enExterior); // ✅ scope léxico
    console.log(global);     // ✅ scope global
  }
 
  interior();
  // console.log(enInterior); // ❌ ReferenceError
}
 
// ─── SCOPE DE BLOQUE ─────────────────────────
{
  let dentroDelBloque = "solo aquí";
  const tambienAqui = "y aquí";
}
// console.log(dentroDelBloque); // ❌ ReferenceError
 
// El bug clásico de var en loops:
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Imprime 3, 3, 3 (no 0, 1, 2)
}
 
// Solución con let (scope de bloque):
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100); // Imprime 0, 1, 2 ✅
}
 
// ─── CLOSURES BÁSICAS ─────────────────────────
function crearContador() {
  let count = 0; // Variable privada, solo accesible desde las funciones retornadas
 
  return {
    incrementar: () => ++count,
    decrementar: () => --count,
    obtener: () => count,
    resetear: () => { count = 0; },
  };
}
 
const contador = crearContador();
contador.incrementar(); // 1
contador.incrementar(); // 2
contador.incrementar(); // 3
contador.decrementar(); // 2
contador.obtener();     // 2
// No hay forma de acceder a count directamente desde fuera: es privado
 
const contador2 = crearContador(); // Instancia independiente
contador2.obtener(); // 0 (su propio count)
 
// ─── FACTORY FUNCTIONS ───────────────────────
function crearMultiplicador(factor) {
  // factor es capturado por la closure
  return (numero) => numero * factor;
}
 
const doble = crearMultiplicador(2);
const triple = crearMultiplicador(3);
 
doble(5);  // 10
triple(5); // 15
doble(7);  // 14
 
// ─── MÓDULO CON DATOS PRIVADOS ────────────────
const moduloCarrito = (() => {
  // Datos privados (no accesibles desde fuera)
  let items = [];
  let descuento = 0;
 
  // API pública
  return {
    agregar(item) {
      items.push(item);
    },
    eliminar(id) {
      items = items.filter(item => item.id !== id);
    },
    setDescuento(pct) {
      if (pct >= 0 && pct <= 100) descuento = pct;
    },
    getTotal() {
      const subtotal = items.reduce((sum, item) => sum + item.precio, 0);
      return subtotal * (1 - descuento / 100);
    },
    getItems() {
      return [...items]; // Retorna copia para evitar mutación externa
    },
  };
})(); // IIFE: Immediately Invoked Function Expression
 
moduloCarrito.agregar({ id: 1, nombre: "Libro", precio: 25000 });
moduloCarrito.agregar({ id: 2, nombre: "Curso", precio: 50000 });
moduloCarrito.setDescuento(10);
moduloCarrito.getTotal(); // 67500
 
// ─── MEMOIZACIÓN CON CLOSURE ─────────────────
function memoize(fn) {
  const cache = new Map(); // El cache es privado gracias a la closure
 
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log("Cache hit!");
      return cache.get(key);
    }
    const resultado = fn(...args);
    cache.set(key, resultado);
    return resultado;
  };
}
 
function fibonacciLento(n) {
  if (n <= 1) return n;
  return fibonacciLento(n - 1) + fibonacciLento(n - 2);
}
 
const fibonacciRapido = memoize(fibonacciLento);
fibonacciRapido(40); // Lento la primera vez
fibonacciRapido(40); // "Cache hit!" - instantáneo`,
      practicalTips: [
        "Una closure es simplemente una función que recuerda su scope de creación. Cada vez que defines una función dentro de otra, estás creando una closure.",
        "El bug del var en loops (imprime 3,3,3) es el ejemplo más clásico de closures + scope. Siempre usa let en loops.",
        "Las closures son la base de los hooks de React. useState internamente usa una closure para preservar el estado entre renders.",
        "Usa IIFE (Immediately Invoked Function Expression) para crear módulos con datos privados cuando no tienes módulos ES6.",
      ],
      commonMistakes: [
        "El bug del loop con var: todos los callbacks comparten la misma variable i porque var no tiene scope de bloque. Usa let.",
        "Pensar que las closures copian las variables. No: capturan la referencia. Si la variable cambia, la closure ve el valor actualizado.",
        "Crear closures innecesariamente dentro de loops, generando muchas funciones en memoria cuando una sola alcanzaría.",
        "Confundir scope léxico (dónde se define la función) con scope dinámico (dónde se llama). JavaScript usa scope léxico.",
      ],
    },
 
    // ─── MÓDULO 4: Arrays y objetos en profundidad ────────────────────────────
    {
      name: "Arrays: métodos funcionales y transformación de datos",
      slug: "js-array-methods",
      level: "BEGINNER" as const,
      subjectId: javascriptId,
      description: "Domina los métodos de array de JavaScript: map, filter, reduce, find, some, every, flat, flatMap, y los métodos de mutación. Aprende a encadenar métodos para transformar datos de forma elegante.",
      whyMatters: "Los métodos funcionales de array son el pan de cada día en JavaScript moderno. map, filter y reduce reemplazan la mayoría de los loops for y producen código más declarativo, testeable y componible.",
      explanation: `**Métodos que NO mutan el array original (inmutables):**
 
- **map(callback):** transforma cada elemento y retorna un nuevo array del mismo tamaño. Callback recibe (elemento, índice, array).
- **filter(callback):** retorna un nuevo array con solo los elementos donde el callback retorna true.
- **reduce(callback, valorInicial):** reduce el array a un único valor. Callback recibe (acumulador, elemento, índice, array).
- **find(callback):** retorna el primer elemento que cumple la condición, o undefined.
- **findIndex(callback):** retorna el índice del primer elemento que cumple la condición, o -1.
- **some(callback):** retorna true si AL MENOS UN elemento cumple la condición.
- **every(callback):** retorna true si TODOS los elementos cumplen la condición.
- **includes(valor):** retorna true si el valor existe en el array.
- **flat(depth):** aplana arrays anidados.
- **flatMap(callback):** map + flat(1) en un paso.
- **slice(inicio, fin):** retorna una porción del array (sin mutar).
- **concat(...arrays):** combina arrays (o usa spread).
- **indexOf(valor):** índice de la primera ocurrencia o -1.
- **join(separador):** convierte el array a string.
 
**Métodos que SÍ mutan el array original:**
- **push(...items):** agrega al final. Retorna el nuevo length.
- **pop():** elimina el último. Retorna el elemento eliminado.
- **shift():** elimina el primero. Retorna el elemento eliminado.
- **unshift(...items):** agrega al inicio. Retorna el nuevo length.
- **splice(inicio, cantidad, ...items):** elimina/reemplaza/inserta elementos en cualquier posición.
- **sort(compareFn):** ordena en sitio (modifica el array).
- **reverse():** invierte en sitio.
- **fill(valor, inicio, fin):** rellena con un valor.
 
**Encadenamiento (chaining):**
Los métodos inmutables retornan arrays, por lo que se pueden encadenar.
 
**Métodos estáticos de Array:**
- **Array.from(iterable):** crea un array desde un iterable o array-like.
- **Array.isArray(value):** verifica si es un array.
- **Array.of(...items):** crea un array con los argumentos dados.`,
      codeExample: `const productos = [
  { id: 1, nombre: "Laptop",  precio: 1200000, categoria: "tech",  stock: 5  },
  { id: 2, nombre: "Mouse",   precio:   80000, categoria: "tech",  stock: 20 },
  { id: 3, nombre: "Libro",   precio:   45000, categoria: "edu",   stock: 3  },
  { id: 4, nombre: "Curso",   precio:  350000, categoria: "edu",   stock: 100},
  { id: 5, nombre: "Monitor", precio:  800000, categoria: "tech",  stock: 0  },
];
 
// ─── MAP: transformar ─────────────────────────
const nombres = productos.map(p => p.nombre);
// ["Laptop", "Mouse", "Libro", "Curso", "Monitor"]
 
const conIVA = productos.map(p => ({
  ...p,
  precioConIVA: Math.round(p.precio * 1.19),
}));
 
// ─── FILTER: filtrar ──────────────────────────
const enStock = productos.filter(p => p.stock > 0);
const tecnologia = productos.filter(p => p.categoria === "tech");
const accesibles = productos.filter(p => p.precio < 200000);
 
// ─── REDUCE: acumular ─────────────────────────
// Suma total de precios
const totalInventario = productos.reduce((sum, p) => sum + p.precio, 0);
// 2475000
 
// Agrupar por categoría
const porCategoria = productos.reduce((grupos, p) => {
  const categoria = p.categoria;
  if (!grupos[categoria]) {
    grupos[categoria] = [];
  }
  grupos[categoria].push(p);
  return grupos;
}, {});
// { tech: [...], edu: [...] }
 
// ─── FIND Y FINDINDEX ─────────────────────────
const laptop = productos.find(p => p.id === 1);
// { id: 1, nombre: "Laptop", ... }
 
const idxAgotado = productos.findIndex(p => p.stock === 0);
// 4 (índice del Monitor)
 
// ─── SOME Y EVERY ─────────────────────────────
const hayAgotados = productos.some(p => p.stock === 0);
// true
 
const todosEnStock = productos.every(p => p.stock > 0);
// false
 
const todosTech = productos.every(p => p.categoria === "tech");
// false
 
// ─── ENCADENAMIENTO ───────────────────────────
// Productos de tecnología en stock, ordenados por precio, con nombres
const techEnStock = productos
  .filter(p => p.categoria === "tech" && p.stock > 0)
  .sort((a, b) => a.precio - b.precio)
  .map(p => \`\${p.nombre}: $\${p.precio.toLocaleString()}\`);
// ["Mouse: $80,000", "Laptop: $1,200,000"]
 
// ─── FLAT Y FLATMAP ───────────────────────────
const anidado = [[1, 2], [3, 4], [5, 6]];
anidado.flat();     // [1, 2, 3, 4, 5, 6]
 
const dobleAnidado = [[[1, 2]], [[3, 4]]];
dobleAnidado.flat(2); // [1, 2, 3, 4]
 
const oraciones = ["hola mundo", "javascript es genial"];
const palabras = oraciones.flatMap(frase => frase.split(" "));
// ["hola", "mundo", "javascript", "es", "genial"]
 
// ─── SORT CORRECTO ────────────────────────────
const nums = [10, 9, 100, 2, 5];
nums.sort();                        // [10, 100, 2, 5, 9] ❌ ordena como strings
nums.sort((a, b) => a - b);        // [2, 5, 9, 10, 100] ✅ ascendente
nums.sort((a, b) => b - a);        // [100, 10, 9, 5, 2] ✅ descendente
 
// Ordenar objetos
productos.sort((a, b) => a.precio - b.precio); // por precio ascendente
productos.sort((a, b) => a.nombre.localeCompare(b.nombre)); // por nombre
 
// ─── INMUTABILIDAD CON SPREAD ─────────────────
// En lugar de mutar (splice), crear nuevo array
const sinLaptop = productos.filter(p => p.id !== 1);
const actualizado = productos.map(p =>
  p.id === 1 ? { ...p, precio: 1100000 } : p
);
 
// ─── ARRAY.FROM ───────────────────────────────
Array.from({ length: 5 }, (_, i) => i + 1); // [1, 2, 3, 4, 5]
Array.from("hola");                           // ["h", "o", "l", "a"]
Array.from(new Set([1, 2, 2, 3, 3]));        // [1, 2, 3] (deduplicar)`,
      practicalTips: [
        "Aprende reduce profundamente: puede reimplementar map, filter, find y cualquier transformación de array. Es el método más poderoso.",
        "Para evitar sort() que muta el array original: [...array].sort(compareFn) — el spread crea una copia antes de ordenar.",
        "Para eliminar duplicados de un array de primitivos: [...new Set(array)]. Para objetos necesitas reduce o filter con findIndex.",
        "Encadenar map, filter y reduce es poderoso pero puede ser lento en arrays muy grandes. En esos casos, un único reduce que haga todo es más eficiente.",
        "Array.from({ length: n }, (_, i) => i) es la forma idiomática de crear un array de n elementos secuenciales.",
      ],
      commonMistakes: [
        "Usar sort() sin función comparadora. El sort() por defecto convierte a strings, causando '10' < '9' = true.",
        "Mutar el array original dentro de map/filter. Devuelve nuevos valores en lugar de modificar el elemento existente.",
        "Olvidar el valor inicial en reduce(). Sin valor inicial, el primer elemento se usa como acumulador, lo que puede causar bugs con arrays vacíos.",
        "Usar forEach cuando necesitas el resultado. forEach siempre retorna undefined. Usa map si necesitas un nuevo array.",
        "Encadenar filter().map() cuando flatMap() sería más eficiente para casos específicos.",
      ],
    },
    {
      name: "Objetos: creación, desestructuración y métodos estáticos",
      slug: "js-objects-destructuring",
      level: "BEGINNER" as const,
      subjectId: javascriptId,
      description: "Domina los objetos en JavaScript: creación, acceso dinámico, desestructuración avanzada, shorthand properties, computed properties, y los métodos estáticos Object.keys/values/entries/assign/freeze.",
      whyMatters: "Los objetos son la estructura de datos más usada en JavaScript. La desestructuración moderna reduce enormemente el código boilerplate y es omnipresente en React, Node.js y cualquier codebase JavaScript moderno.",
      explanation: `**Creación de objetos:**
- Literal: \`const obj = { clave: valor }\`.
- Constructor: \`new Object()\` (evitar, usar literal).
- Object.create(prototipo): crea con un prototipo específico.
 
**Acceso a propiedades:**
- Notación de punto: \`obj.propiedad\` — cuando la clave es un identificador válido.
- Notación de corchetes: \`obj['propiedad']\` — para claves dinámicas, claves con espacios, o claves que son variables.
 
**Shorthand properties (ES6):**
Si la variable tiene el mismo nombre que la clave: \`{ nombre }\` en lugar de \`{ nombre: nombre }\`.
 
**Computed property names (ES6):**
\`{ [variable]: valor }\` — la clave del objeto es el valor de la variable.
 
**Desestructuración:**
Extrae propiedades de objetos en variables locales.
- Con renombre: \`const { nombre: nombreCompleto } = persona\`.
- Con valor por defecto: \`const { edad = 18 } = persona\`.
- Anidada: \`const { direccion: { ciudad } } = persona\`.
- En parámetros de función: \`function fn({ nombre, edad }) {}\`.
- Con rest: \`const { a, b, ...resto } = obj\`.
 
**Métodos estáticos de Object:**
- \`Object.keys(obj)\` — array de claves propias enumerables.
- \`Object.values(obj)\` — array de valores propios enumerables.
- \`Object.entries(obj)\` — array de pares [clave, valor].
- \`Object.assign(target, ...sources)\` — copia propiedades (mutación superficial).
- \`Object.freeze(obj)\` — hace el objeto inmutable (superficial).
- \`Object.fromEntries(entries)\` — crea un objeto desde pares [clave, valor].
- \`Object.hasOwn(obj, clave)\` — verifica propiedad propia (reemplaza hasOwnProperty).
- \`Object.create(proto)\` — crea objeto con prototipo específico.
- \`Object.getPrototypeOf(obj)\` — obtiene el prototipo.`,
      codeExample: `// ─── CREACIÓN ────────────────────────────────
const nombre = "María";
const edad = 25;
const rol = "admin";
 
// Sin shorthand (verboso)
const usuario1 = { nombre: nombre, edad: edad, rol: rol };
 
// Con shorthand (ES6)
const usuario = { nombre, edad, rol };
 
// Computed property names
const campo = "email";
const config = {
  [campo]: "maria@email.com",          // { email: "..." }
  [\`puede\${rol.charAt(0).toUpperCase() + rol.slice(1)}\`]: true, // { puedeAdmin: true }
};
 
// ─── DESESTRUCTURACIÓN ────────────────────────
const persona = {
  nombre: "Carlos",
  edad: 30,
  ciudad: "Medellín",
  contacto: {
    email: "carlos@email.com",
    telefono: "300-123-4567",
  },
  habilidades: ["JS", "React", "Node"],
};
 
// Básica
const { nombre: nomPersona, edad: edadPersona } = persona;
 
// Con renombre
const { nombre: nombreCompleto } = persona;
 
// Con valor por defecto
const { pais = "Colombia" } = persona;    // "Colombia" (no existe en el objeto)
 
// Anidada
const { contacto: { email, telefono } } = persona;
 
// Con rest
const { nombre: nom, ...resto } = persona;
// resto = { edad, ciudad, contacto, habilidades }
 
// En parámetros
function mostrarPerfil({ nombre, edad, ciudad = "Sin ciudad", contacto: { email } }) {
  return \`\${nombre}, \${edad} años, \${ciudad} - \${email}\`;
}
 
// ─── DESESTRUCTURACIÓN DE ARRAYS ─────────────
const [primero, segundo, ...restantes] = [1, 2, 3, 4, 5];
// primero=1, segundo=2, restantes=[3,4,5]
 
// Saltar elementos
const [, segundo2, , cuarto] = [1, 2, 3, 4];
// segundo2=2, cuarto=4
 
// Swap de variables
let a = 1, b = 2;
[a, b] = [b, a]; // a=2, b=1
 
// ─── MÉTODOS ESTÁTICOS DE OBJECT ─────────────
const config2 = {
  host: "localhost",
  port: 3000,
  debug: true,
  secret: "abc123",
};
 
Object.keys(config2);    // ["host", "port", "debug", "secret"]
Object.values(config2);  // ["localhost", 3000, true, "abc123"]
Object.entries(config2); // [["host","localhost"], ["port",3000], ...]
 
// Iterar objeto
for (const [clave, valor] of Object.entries(config2)) {
  console.log(\`\${clave}: \${valor}\`);
}
 
// Transformar objeto con entries + fromEntries
const configEnMayusculas = Object.fromEntries(
  Object.entries(config2).map(([k, v]) => [k.toUpperCase(), v])
);
 
// Object.assign (superficial, muta el target)
const defaults = { timeout: 5000, retries: 3, debug: false };
const userConfig = { timeout: 1000, debug: true };
const finalConfig = Object.assign({}, defaults, userConfig);
// { timeout: 1000, retries: 3, debug: true }
 
// Con spread (preferido, más limpio)
const finalConfig2 = { ...defaults, ...userConfig };
 
// Object.freeze (inmutabilidad superficial)
const COLORES = Object.freeze({
  PRIMARIO: "#4f46e5",
  SECUNDARIO: "#7c3aed",
  ERROR: "#ef4444",
});
// COLORES.PRIMARIO = "red"; // Silenciosamente ignorado (strict mode: TypeError)
 
// Object.hasOwn (moderno, reemplaza hasOwnProperty)
Object.hasOwn(persona, "nombre");   // true
Object.hasOwn(persona, "toString"); // false (heredada del prototipo)
 
// ─── CLONACIÓN ────────────────────────────────
// Copia superficial (shallow clone)
const copia = { ...persona };
const copia2 = Object.assign({}, persona);
 
// Copia profunda (deep clone) — native en browsers modernos
const copiaCompleta = structuredClone(persona); // ES2022+
 
// ─── PATRONES COMUNES ─────────────────────────
// Objeto como mapa
const conteoLetras = "javascript".split("").reduce((mapa, letra) => ({
  ...mapa,
  [letra]: (mapa[letra] ?? 0) + 1,
}), {});
// { j:1, a:2, v:1, s:1, c:1, r:1, i:1, p:1, t:1 }`,
      practicalTips: [
        "structuredClone() es la forma nativa y moderna de hacer deep clone en JavaScript. Reemplaza JSON.parse(JSON.stringify(obj)) que no maneja undefined, funciones ni fechas.",
        "Object.fromEntries(Object.entries(obj).map(...)) es el patrón para transformar las propiedades de un objeto funcionalmente.",
        "Prefiere spread sobre Object.assign para combinar objetos: es más legible y no muta el primer argumento si usas {} como target.",
        "La desestructuración anidada es poderosa pero puede volverse ilegible. Si es muy profunda, considera extraer la propiedad anidada en un paso intermedio.",
      ],
      commonMistakes: [
        "Usar JSON.parse(JSON.stringify(obj)) para deep clone. No maneja undefined, funciones, Dates, Sets, Maps ni referencias circulares. Usa structuredClone().",
        "Confundir copia superficial con copia profunda. Con spread {...obj}, los objetos y arrays anidados siguen siendo referencias compartidas.",
        "Olvidar que Object.freeze() es superficial. Las propiedades que son objetos siguen siendo mutables en sus propiedades internas.",
        "Usar for...in para objetos sin Object.hasOwn(), iterando sobre propiedades heredadas del prototipo inesperadamente.",
      ],
    },
 
    // ─── MÓDULO 5: DOM: selección y manipulación dinámica ─────────────────────
    {
      name: "Selección y traversal del DOM",
      slug: "js-dom-selection",
      level: "BEGINNER" as const,
      subjectId: javascriptId,
      description: "Aprende a seleccionar elementos del DOM con los métodos modernos querySelector y querySelectorAll, navegar por la estructura del árbol DOM, y entender la diferencia entre HTMLCollection y NodeList.",
      whyMatters: "La manipulación del DOM es lo que permite a JavaScript crear interfaces dinámicas. Elegir el método de selección correcto y entender las estructuras de datos que retornan es fundamental para evitar bugs sutiles.",
      explanation: `**El DOM (Document Object Model):**
Representación del HTML como árbol de objetos JavaScript. El navegador convierte el HTML en este árbol cuando carga la página. JavaScript puede leer y modificar este árbol en tiempo real.
 
**Métodos de selección modernos (usar estos):**
- \`document.querySelector(selector)\` — retorna el primer elemento que coincide con el selector CSS. Retorna null si no encuentra.
- \`document.querySelectorAll(selector)\` — retorna un NodeList estático con todos los elementos que coinciden.
- Ambos métodos aceptan cualquier selector CSS válido.
- También funcionan sobre elementos: \`elemento.querySelector('.hijo')\` busca solo dentro de ese elemento.
 
**Métodos legacy (conocer pero preferir los modernos):**
- \`getElementById(id)\` — más rápido que querySelector('#id') para un ID específico.
- \`getElementsByClassName(clase)\` — HTMLCollection viva (live).
- \`getElementsByTagName(tag)\` — HTMLCollection viva.
- \`getElementsByName(nombre)\` — para inputs con atributo name.
 
**NodeList vs HTMLCollection:**
- \`NodeList\` (de querySelectorAll): estático, tiene forEach nativo, no actualiza automáticamente.
- \`HTMLCollection\` (de getElementsBy*): viva (live), se actualiza automáticamente si el DOM cambia, no tiene forEach nativo.
- Para iterar una HTMLCollection: \`Array.from(collection).forEach(...)\` o spread \`[...collection]\`.
 
**Traversal (navegar por el árbol DOM):**
- \`element.parentElement\` — elemento padre.
- \`element.children\` — HTMLCollection de hijos elemento (solo elementos, no nodos de texto).
- \`element.firstElementChild\` / \`element.lastElementChild\` — primer/último hijo elemento.
- \`element.nextElementSibling\` / \`element.previousElementSibling\` — hermanos elemento.
- \`element.closest(selector)\` — busca el ancestro más cercano que coincide con el selector (incluyendo el propio elemento).
- \`element.matches(selector)\` — verifica si el elemento coincide con el selector.`,
      codeExample: `// ─── SELECCIÓN BÁSICA ────────────────────────
const titulo = document.querySelector("h1");
const primerBoton = document.querySelector(".btn");
const botonSubmit = document.querySelector("#form-registro button[type='submit']");
 
// Null check siempre antes de usar
if (titulo) {
  console.log(titulo.textContent);
}
 
// querySelectorAll: retorna NodeList
const botones = document.querySelectorAll(".btn");
const inputs = document.querySelectorAll("input[required]");
const tarjetas = document.querySelectorAll(".card");
 
// NodeList tiene forEach nativo
botones.forEach(btn => {
  btn.style.cursor = "pointer";
});
 
// También puedes convertir a array para usar map/filter/reduce
const textosBotones = [...botones].map(btn => btn.textContent);
 
// ─── SELECCIÓN DENTRO DE UN ELEMENTO ─────────
const nav = document.querySelector("nav");
const linksNav = nav.querySelectorAll("a"); // Solo dentro del nav
 
// ─── TRAVERSAL ───────────────────────────────
const listItem = document.querySelector(".lista li:first-child");
 
// Navegar hacia arriba
const lista = listItem.parentElement;
const section = listItem.closest("section"); // Busca el <section> ancestro
 
// Navegar hacia abajo
const primerHijo = lista.firstElementChild;
const ultimoHijo = lista.lastElementChild;
const todosHijos = [...lista.children]; // Convierte HTMLCollection a Array
 
// Navegar entre hermanos
const siguiente = listItem.nextElementSibling;
const anterior = listItem.previousElementSibling;
 
// ─── MATCHES ─────────────────────────────────
const elemento = document.querySelector(".card");
elemento.matches(".card");           // true
elemento.matches(".card.featured");  // depende de las clases
elemento.matches("section > .card"); // verifica el contexto en el árbol
 
// ─── EJEMPLO: Encontrar la card padre de un botón ────
document.querySelector(".btn-eliminar").addEventListener("click", (e) => {
  const card = e.target.closest(".card"); // Sube hasta encontrar .card
  if (card) {
    card.remove();
  }
});
 
// ─── DIFERENCIA NODELIST vs HTMLCOLLECTION ────
// NodeList ESTÁTICA (no cambia aunque el DOM cambie)
const divs = document.querySelectorAll("div");
console.log(divs.length); // 3
 
document.body.appendChild(document.createElement("div"));
console.log(divs.length); // Sigue siendo 3 (estática)
 
// HTMLCollection VIVA (se actualiza)
const divsVivos = document.getElementsByTagName("div");
console.log(divsVivos.length); // 3
 
document.body.appendChild(document.createElement("div"));
console.log(divsVivos.length); // 4 (actualizado automáticamente)
 
// ─── VERIFICAR SI UN ELEMENTO EXISTE ─────────
const modal = document.querySelector("#modal");
if (modal !== null) {
  // El elemento existe
}
 
// Forma más corta (null es falsy)
const header = document.querySelector("header");
header?.classList.add("scrolled"); // Optional chaining para null safety`,
      practicalTips: [
        "Siempre verifica que querySelector no retornó null antes de usar el resultado. Usar optional chaining (?.) es la forma más elegante.",
        "closest() es extremadamente útil para event delegation: desde el evento, busca el ancestro que representa el componente.",
        "Prefiere querySelectorAll sobre getElementsByClassName porque retorna un NodeList estático que tiene forEach nativo.",
        "Buscar elementos dentro de un elemento padre (parent.querySelector()) es más eficiente que buscar en document y más seguro en componentes.",
      ],
      commonMistakes: [
        "No verificar null después de querySelector. Si el elemento no existe, cualquier operación sobre null lanzará TypeError.",
        "Usar forEach directamente en una HTMLCollection. No tiene forEach nativo. Conviértela con Array.from() o spread primero.",
        "Asumir que querySelectorAll retorna un Array. Es un NodeList: tiene forEach pero no map, filter ni reduce. Usa spread para convertir.",
        "Modificar una HTMLCollection viva mientras la iteras. Puede causar comportamientos inesperados porque la colección cambia durante la iteración.",
      ],
    },
    {
      name: "Manipulación del DOM: contenido, atributos y estilos",
      slug: "js-dom-manipulation",
      level: "BEGINNER" as const,
      subjectId: javascriptId,
      description: "Aprende a crear, modificar y eliminar elementos del DOM dinámicamente: textContent, innerHTML, createElement, append, classList, setAttribute y las APIs de estilos.",
      whyMatters: "La manipulación del DOM es el núcleo de cualquier interfaz web interactiva. Hacerla correctamente (evitando innerHTML cuando hay datos de usuario, usando classList en lugar de style, creando elementos eficientemente) marca la diferencia en seguridad y performance.",
      explanation: `**Leer y modificar contenido:**
- \`element.textContent\` — texto plano del elemento (y sus hijos). Más seguro que innerHTML. Sin HTML.
- \`element.innerHTML\` — HTML como string. Puede parsear y renderizar HTML. PELIGROSO con datos de usuario (XSS).
- \`element.innerText\` — similar a textContent pero respeta estilos CSS (elementos hidden no se incluyen). Más lento.
- \`element.value\` — para inputs, textarea y select.
 
**Crear y agregar elementos:**
- \`document.createElement(tag)\` — crea un nuevo elemento.
- \`document.createTextNode(texto)\` — crea un nodo de texto.
- \`element.append(...nodos)\` — agrega al final (acepta strings y nodos).
- \`element.prepend(...nodos)\` — agrega al inicio.
- \`element.before(...nodos)\` — inserta antes del elemento.
- \`element.after(...nodos)\` — inserta después del elemento.
- \`element.replaceWith(...nodos)\` — reemplaza el elemento.
- \`element.remove()\` — elimina el elemento del DOM.
- \`element.cloneNode(deep)\` — clona el elemento (deep=true clona hijos también).
 
**Atributos:**
- \`element.getAttribute(nombre)\` — lee un atributo.
- \`element.setAttribute(nombre, valor)\` — establece un atributo.
- \`element.removeAttribute(nombre)\` — elimina un atributo.
- \`element.hasAttribute(nombre)\` — verifica si existe el atributo.
- \`element.dataset\` — acceso a atributos data-* como propiedades camelCase.
- Propiedades directas: \`element.id\`, \`element.href\`, \`element.src\`, \`element.alt\`.
 
**classList API:**
- \`element.classList.add(...clases)\` — agrega clases.
- \`element.classList.remove(...clases)\` — elimina clases.
- \`element.classList.toggle(clase, force?)\` — alterna. Con force: agrega si true, elimina si false.
- \`element.classList.contains(clase)\` — verifica si tiene la clase.
- \`element.classList.replace(vieja, nueva)\` — reemplaza una clase.
 
**Estilos:**
- \`element.style.propiedad\` — estilo inline (camelCase: backgroundColor, fontSize).
- \`getComputedStyle(element).propiedad\` — estilo calculado final (read-only).
- Preferir modificar clases sobre estilos inline.
 
**DocumentFragment:**
Nodo virtual fuera del DOM. Útil para hacer múltiples operaciones DOM sin reflows intermedios.`,
      codeExample: `// ─── CONTENIDO ───────────────────────────────
const titulo = document.querySelector("h1");
 
// textContent: seguro, solo texto
titulo.textContent = "Nuevo título";
 
// innerHTML: parsea HTML (cuidado con XSS)
const container = document.querySelector(".container");
container.innerHTML = "<strong>Importante</strong>"; // ✅ contenido controlado
 
// ❌ NUNCA hagas esto con datos del usuario:
// container.innerHTML = userInput; // Vulnerabilidad XSS
 
// ✅ Usar textContent para datos de usuario:
const comentario = document.createElement("p");
comentario.textContent = userInput; // El HTML se escapa automáticamente
 
// ─── CREAR ELEMENTOS ─────────────────────────
function crearTarjeta({ titulo, descripcion, imagen }) {
  const card = document.createElement("article");
  card.classList.add("card");
 
  const img = document.createElement("img");
  img.src = imagen;
  img.alt = titulo;
  img.loading = "lazy";
 
  const body = document.createElement("div");
  body.classList.add("card__body");
 
  const h3 = document.createElement("h3");
  h3.classList.add("card__title");
  h3.textContent = titulo;
 
  const p = document.createElement("p");
  p.classList.add("card__description");
  p.textContent = descripcion;
 
  body.append(h3, p);
  card.append(img, body);
 
  return card;
}
 
// Agregar al DOM
const grid = document.querySelector(".card-grid");
const nuevaTarjeta = crearTarjeta({
  titulo: "CSS Grid",
  descripcion: "Layout bidimensional",
  imagen: "./img/grid.jpg",
});
grid.append(nuevaTarjeta);
 
// ─── DOCUMENTFRAGMENT (múltiples inserciones eficientes) ──
const productos = ["Laptop", "Mouse", "Teclado", "Monitor"];
const lista = document.querySelector("#lista-productos");
const fragment = document.createDocumentFragment();
 
productos.forEach(producto => {
  const li = document.createElement("li");
  li.textContent = producto;
  fragment.append(li); // No toca el DOM real todavía
});
 
lista.append(fragment); // Un solo reflow al final
 
// ─── ATRIBUTOS ────────────────────────────────
const link = document.querySelector("a");
link.getAttribute("href");              // Lee href
link.setAttribute("target", "_blank"); // Establece target
link.setAttribute("rel", "noopener noreferrer");
 
// Dataset (data-* attributes)
const btn = document.querySelector("[data-id]");
btn.dataset.id;          // Lee data-id como string
btn.dataset.userId;      // Lee data-user-id (kebab → camelCase)
btn.dataset.action = "eliminar"; // Establece data-action
 
// ─── CLASSLIST ────────────────────────────────
const nav = document.querySelector("nav");
 
// Scroll handler con classList
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 100);
  // Si scrollY > 100: agrega 'scrolled', si no: la quita
});
 
// Toggle de menú móvil
const menuBtn = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
 
menuBtn.addEventListener("click", () => {
  menu.classList.toggle("open");
  menuBtn.classList.toggle("active");
  // Accesibilidad
  const isOpen = menu.classList.contains("open");
  menuBtn.setAttribute("aria-expanded", isOpen);
});
 
// ─── ESTILOS ─────────────────────────────────
// Preferir classList; style solo para valores dinámicos
const progress = document.querySelector(".progress-bar");
const porcentaje = 75;
progress.style.width = \`\${porcentaje}%\`; // Valor dinámico, CSS no puede saber este valor
 
// getComputedStyle para leer estilos calculados
const computado = getComputedStyle(titulo);
console.log(computado.fontSize);      // "24px"
console.log(computado.color);         // "rgb(26, 26, 46)"
 
// ─── ELIMINAR ELEMENTOS ───────────────────────
const itemAEliminar = document.querySelector(".item-obsoleto");
itemAEliminar?.remove(); // Optional chaining por si no existe`,
      practicalTips: [
        "Nunca uses innerHTML con datos que vienen del usuario. Usa textContent o crea elementos con createElement + textContent para evitar XSS.",
        "Usa DocumentFragment cuando necesitas insertar muchos elementos en el DOM de una vez. Reduce el número de reflows al mínimo.",
        "Prefiere classList.toggle(clase, condicion) sobre if/else con add/remove. Es más conciso y claro.",
        "Para animaciones CSS, agrega/quita clases en lugar de modificar style directamente. El CSS puede usar transiciones sobre esas clases.",
      ],
      commonMistakes: [
        "Usar innerHTML con datos del usuario. Permite inyección de scripts (XSS). Siempre usa textContent para datos de usuarios.",
        "Modificar el DOM dentro de un loop sin DocumentFragment. Cada modificación puede causar un reflow. Agrupa con DocumentFragment.",
        "Leer element.style para obtener estilos calculados. element.style solo refleja estilos inline. Usa getComputedStyle() para el valor real.",
        "Usar className en lugar de classList. className reemplaza todas las clases; classList permite modificar clases individuales.",
      ],
    },
 
    // ─── MÓDULO 6: Eventos del navegador y delegación ─────────────────────────
    {
      name: "Eventos del navegador: addEventListener y el objeto Event",
      slug: "js-events-addeventlistener",
      level: "BEGINNER" as const,
      subjectId: javascriptId,
      description: "Domina el sistema de eventos del navegador: addEventListener, el objeto Event, tipos de eventos comunes, la fase de propagación (bubbling y capturing), y cómo prevenir el comportamiento por defecto.",
      whyMatters: "Los eventos son el mecanismo por el que JavaScript responde a las acciones del usuario. Entender el bubbling, capturing y el objeto Event correctamente es fundamental para construir interfaces interactivas correctas y accesibles.",
      explanation: `**addEventListener:**
La forma moderna de escuchar eventos. Permite múltiples listeners sobre el mismo elemento y tipo de evento.
\`element.addEventListener(tipo, callback, opciones)\`
 
Opciones:
- \`{ once: true }\` — el listener se ejecuta solo una vez y se elimina automáticamente.
- \`{ capture: true }\` — el listener actúa en la fase de capturing (antes del bubbling).
- \`{ passive: true }\` — indica que nunca llamará preventDefault() (mejora performance en scroll/touch).
 
**removeEventListener:**
Para eliminar un listener necesitas la referencia exacta a la función callback (no funciona con funciones anónimas).
 
**El objeto Event:**
El callback recibe automáticamente un objeto Event con información sobre el evento:
- \`event.target\` — el elemento que originó el evento.
- \`event.currentTarget\` — el elemento al que está attachado el listener.
- \`event.type\` — el tipo de evento ("click", "keydown", etc.).
- \`event.preventDefault()\` — previene el comportamiento por defecto del navegador.
- \`event.stopPropagation()\` — detiene la propagación del evento.
- \`event.stopImmediatePropagation()\` — detiene propagación y otros listeners en el mismo elemento.
- \`event.timeStamp\` — momento en que ocurrió el evento.
 
**Propagación de eventos (Bubbling y Capturing):**
Cuando un evento ocurre en un elemento:
1. **Fase de Capturing** (de arriba hacia abajo): el evento baja desde window hasta el target.
2. **Fase de Target**: el evento llega al elemento objetivo.
3. **Fase de Bubbling** (de abajo hacia arriba): el evento sube desde el target hasta window.
 
Por defecto, los listeners actúan en la fase de bubbling.
 
**Tipos de eventos más comunes:**
- Ratón: click, dblclick, mousedown, mouseup, mousemove, mouseenter, mouseleave, mouseover, mouseout.
- Teclado: keydown, keyup, keypress (deprecated).
- Formulario: submit, change, input, focus, blur, focusin, focusout.
- Ventana: load, DOMContentLoaded, resize, scroll, beforeunload.
- Touch: touchstart, touchend, touchmove.
- Drag & Drop: dragstart, drag, dragend, dragover, drop.
- Custom: cualquier nombre con CustomEvent.`,
      codeExample: `// ─── ADDEVENTLISTENER BÁSICO ─────────────────
const boton = document.querySelector("#btn-enviar");
 
// Función nombrada (se puede remover después)
function manejarClick(event) {
  console.log("Clickeado:", event.target);
  console.log("Tipo:", event.type);
  console.log("Posición:", event.clientX, event.clientY);
}
 
boton.addEventListener("click", manejarClick);
 
// Remover listener (necesita la misma referencia)
boton.removeEventListener("click", manejarClick);
 
// ─── OPCIONES ─────────────────────────────────
// Once: se ejecuta solo una vez
const btnCerrar = document.querySelector(".btn-cerrar");
btnCerrar.addEventListener("click", () => {
  document.querySelector(".modal").classList.remove("open");
}, { once: true });
 
// Passive: mejora performance en scroll
window.addEventListener("scroll", () => {
  // No llamamos preventDefault, marcarlo como passive mejora el scroll
  actualizarNavbar();
}, { passive: true });
 
// ─── PREVENTDEFAULT ───────────────────────────
// Formulario: prevenir el envío HTML por defecto
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Evita que la página recargue
  const datos = new FormData(event.target);
  enviarDatosConFetch(datos);
});
 
// Link: prevenir navegación
const linkAncla = document.querySelector('a[href^="#"]');
linkAncla.addEventListener("click", (event) => {
  event.preventDefault();
  const id = event.target.getAttribute("href").slice(1);
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
});
 
// ─── TARGET VS CURRENTTARGET ─────────────────
const lista = document.querySelector("ul");
lista.addEventListener("click", (event) => {
  console.log(event.target);        // El elemento específico clickeado (ej: el <li> o el <span> dentro)
  console.log(event.currentTarget); // Siempre el <ul> (donde está el listener)
});
 
// ─── BUBBLING ────────────────────────────────
document.querySelector(".hijo").addEventListener("click", (e) => {
  console.log("1. Hijo");
});
document.querySelector(".padre").addEventListener("click", (e) => {
  console.log("2. Padre"); // También se ejecuta cuando se clickea el hijo
});
document.querySelector(".abuelo").addEventListener("click", (e) => {
  console.log("3. Abuelo"); // También se ejecuta
});
// Click en .hijo imprime: "1. Hijo", "2. Padre", "3. Abuelo"
 
// stopPropagation: detiene el bubbling
document.querySelector(".modal").addEventListener("click", (e) => {
  e.stopPropagation(); // El click no llega al backdrop
});
 
// ─── EVENTOS DE TECLADO ───────────────────────
document.addEventListener("keydown", (event) => {
  console.log(event.key);      // "Enter", "Escape", "ArrowUp", "a", etc.
  console.log(event.code);     // "Enter", "Escape", "ArrowUp", "KeyA" (posición física)
  console.log(event.ctrlKey);  // true si Ctrl presionado
  console.log(event.shiftKey); // true si Shift presionado
  console.log(event.altKey);   // true si Alt presionado
 
  // Shortcut: Ctrl+K para búsqueda
  if (event.ctrlKey && event.key === "k") {
    event.preventDefault();
    abrirBuscador();
  }
 
  // Escape para cerrar modal
  if (event.key === "Escape") {
    cerrarModal();
  }
});
 
// ─── EVENTOS DE FORMULARIO ────────────────────
const inputBusqueda = document.querySelector("#busqueda");
 
// Input: se dispara en cada cambio de valor (cada tecla)
inputBusqueda.addEventListener("input", (event) => {
  buscar(event.target.value);
});
 
// Change: se dispara cuando el input pierde el foco con un valor diferente
inputBusqueda.addEventListener("change", (event) => {
  validar(event.target.value);
});
 
// Focus y blur
inputBusqueda.addEventListener("focus", () => {
  inputBusqueda.parentElement?.classList.add("focused");
});
 
inputBusqueda.addEventListener("blur", () => {
  inputBusqueda.parentElement?.classList.remove("focused");
});
 
// ─── CUSTOMEVENT ─────────────────────────────
// Crear y disparar eventos personalizados
const eventoProductoAgregado = new CustomEvent("producto:agregado", {
  detail: { id: 1, nombre: "Laptop", precio: 1200000 },
  bubbles: true, // El evento hace bubbling
});
 
document.dispatchEvent(eventoProductoAgregado);
 
// Escuchar el evento personalizado
document.addEventListener("producto:agregado", (event) => {
  console.log("Producto agregado:", event.detail);
  actualizarCarrito(event.detail);
});`,
      practicalTips: [
        "Usa { once: true } en lugar de llamar removeEventListener manualmente cuando el listener solo debe ejecutarse una vez.",
        "{ passive: true } en listeners de scroll y touch mejora el performance hasta 3x porque el navegador no espera si se llama preventDefault().",
        "Usa event.key en lugar de event.keyCode (deprecated). event.key retorna el valor de la tecla como string ('Enter', 'Escape', 'a').",
        "CustomEvent con bubbles: true es la forma correcta de comunicación entre componentes en JavaScript vanilla sin librerías de estado.",
      ],
      commonMistakes: [
        "Usar addEventListener con función anónima y luego intentar removeEventListener. No funciona: removeEventListener necesita la misma referencia de función.",
        "Confundir event.target y event.currentTarget. target es el elemento que originó el evento; currentTarget es donde está el listener.",
        "Llamar stopPropagation() innecesariamente. Rompe el bubbling que otros listeners más arriba necesitan, causando bugs difíciles de rastrear.",
        "No usar passive: true en listeners de scroll cuando no necesitas preventDefault(). Causa jank (tartamudeo) visible en el scroll.",
      ],
    },
    {
      name: "Delegación de eventos y patrones avanzados",
      slug: "js-event-delegation",
      level: "BEGINNER" as const,
      subjectId: javascriptId,
      description: "Aprende el patrón de delegación de eventos para manejar eficientemente colecciones de elementos dinámicos, el debouncing y throttling de eventos frecuentes, y la gestión de memoria con listeners.",
      whyMatters: "La delegación de eventos es el patrón de performance más importante para listas de elementos dinámicos. Sin ella, agregar 1000 items a una lista significa 1000 listeners; con ella, solo necesitas uno. Debounce y throttle son esenciales para scroll, resize e inputs de búsqueda.",
      explanation: `**Delegación de eventos:**
En lugar de agregar un listener a cada elemento hijo, agrega uno al padre. Gracias al bubbling, los eventos de los hijos suben al padre.
 
Ventajas:
- Un solo listener para N elementos.
- Funciona automáticamente para elementos creados dinámicamente después de agregar el listener.
- Menos memoria usada.
 
Implementación: usar \`event.target\` y \`element.matches(selector)\` o \`element.closest(selector)\` para identificar qué hijo generó el evento.
 
**Debounce:**
Retrasa la ejecución de una función hasta que haya pasado un tiempo sin que sea llamada de nuevo. Útil para:
- Búsqueda en tiempo real (esperar a que el usuario deje de escribir).
- Resize de ventana (calcular después de que termina el resize).
- Validación de formularios.
 
**Throttle:**
Limita la ejecución de una función a máximo una vez por período de tiempo. Útil para:
- Eventos de scroll (ejecutar máximo cada 100ms).
- Eventos de mousemove (máximo cada 16ms para 60fps).
- Llamadas a API que no deben hacerse muy seguido.
 
**Diferencia Debounce vs Throttle:**
- Debounce: espera silencio → ejecuta una vez al final.
- Throttle: ejecuta a intervalos regulares durante el evento → no espera silencio.
 
**Gestión de memoria:**
Los listeners mantienen vivas las referencias a los elementos y al scope donde fueron creados. En SPAs, es importante remover listeners cuando un componente se destruye para evitar memory leaks.
 
**AbortController para listeners:**
Forma moderna de remover múltiples listeners a la vez con una señal.`,
      codeExample: `// ─── DELEGACIÓN DE EVENTOS ───────────────────
 
// ❌ Sin delegación: un listener por elemento
document.querySelectorAll(".btn-eliminar").forEach(btn => {
  btn.addEventListener("click", eliminarItem); // N listeners
});
// Problema: no funciona para items agregados dinámicamente
 
// ✅ Con delegación: un listener en el contenedor
const lista = document.querySelector("#lista-productos");
 
lista.addEventListener("click", (event) => {
  // Verificar qué elemento generó el click
  const btnEliminar = event.target.closest(".btn-eliminar");
  const btnEditar = event.target.closest(".btn-editar");
  const btnFavorito = event.target.closest(".btn-favorito");
 
  if (btnEliminar) {
    const item = btnEliminar.closest(".item");
    const id = item.dataset.id;
    eliminarProducto(id);
    item.remove();
  }
 
  if (btnEditar) {
    const id = btnEditar.dataset.productoId;
    abrirModalEdicion(id);
  }
 
  if (btnFavorito) {
    btnFavorito.classList.toggle("activo");
    const id = btnFavorito.closest(".item").dataset.id;
    toggleFavorito(id);
  }
});
 
// Ahora funciona para items agregados dinámicamente también:
function agregarProducto(producto) {
  lista.insertAdjacentHTML("beforeend", \`
    <li class="item" data-id="\${producto.id}">
      <span>\${producto.nombre}</span>
      <button class="btn-editar" data-producto-id="\${producto.id}">Editar</button>
      <button class="btn-eliminar">Eliminar</button>
      <button class="btn-favorito">♡</button>
    </li>
  \`);
  // Sin necesidad de agregar nuevos listeners
}
 
// ─── DEBOUNCE ─────────────────────────────────
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}
 
// Búsqueda: solo llama a la API después de 300ms de silencio
const buscarProductos = debounce(async (termino) => {
  if (termino.length < 2) return;
  const resultados = await fetch(\`/api/productos?q=\${termino}\`).then(r => r.json());
  mostrarResultados(resultados);
}, 300);
 
const inputBusqueda = document.querySelector("#busqueda");
inputBusqueda.addEventListener("input", (e) => {
  buscarProductos(e.target.value);
});
 
// Resize: recalcular layout después de que termine el resize
const recalcularLayout = debounce(() => {
  // Operación costosa
  calcularColumnas();
}, 250);
 
window.addEventListener("resize", recalcularLayout);
 
// ─── THROTTLE ─────────────────────────────────
function throttle(fn, interval) {
  let ultimaEjecucion = 0;
  return function(...args) {
    const ahora = Date.now();
    if (ahora - ultimaEjecucion >= interval) {
      ultimaEjecucion = ahora;
      fn.apply(this, args);
    }
  };
}
 
// Scroll: actualizar navbar máximo cada 100ms
const actualizarNavbar = throttle(() => {
  const scrollY = window.scrollY;
  document.querySelector("nav").classList.toggle("scrolled", scrollY > 100);
}, 100);
 
window.addEventListener("scroll", actualizarNavbar, { passive: true });
 
// Mousemove: máximo 60fps (16ms)
const manejarMouseMove = throttle((event) => {
  moverCursor(event.clientX, event.clientY);
}, 16);
 
document.addEventListener("mousemove", manejarMouseMove);
 
// ─── ABORTCONTROLLER (remover múltiples listeners) ───
const controller = new AbortController();
const { signal } = controller;
 
// Agregar múltiples listeners con la misma señal
document.addEventListener("click", manejarClick, { signal });
document.addEventListener("keydown", manejarTeclado, { signal });
window.addEventListener("scroll", manejarScroll, { signal });
 
// Remover todos a la vez
controller.abort(); // Todos los listeners con esta señal se remueven
 
// Útil en componentes con ciclo de vida:
class ComponenteModal {
  constructor() {
    this.controller = new AbortController();
    this.inicializarEventos();
  }
 
  inicializarEventos() {
    const { signal } = this.controller;
    document.addEventListener("keydown", this.manejarTeclado.bind(this), { signal });
    this.elemento.addEventListener("click", this.manejarClick.bind(this), { signal });
  }
 
  destruir() {
    this.controller.abort(); // Limpia todos los listeners automáticamente
    this.elemento.remove();
  }
}`,
      practicalTips: [
        "Usa delegación para cualquier lista que tenga items que se agregan/eliminan dinámicamente. Es más eficiente y más simple.",
        "El valor típico de debounce para búsqueda es 300ms. Para resize es 250ms. Para validación de formularios, 500ms.",
        "Usa AbortController en lugar de guardar referencias a funciones para removeEventListener. Es más limpio cuando tienes múltiples listeners.",
        "Combina delegación + closest(): en el handler, usa event.target.closest('.btn-accion') para encontrar el botón aunque el click haya sido en un elemento hijo.",
      ],
      commonMistakes: [
        "No usar delegación en listas dinámicas. Cada vez que agregas un item nuevo, tienes que agregar su listener manualmente.",
        "Confundir debounce y throttle. Debounce espera silencio (búsqueda), throttle limita frecuencia (scroll). Usar el incorrecto da mala UX.",
        "Crear funciones debounced/throttled dentro del callback o dentro del loop. Se recrea la función en cada evento, perdiendo el efecto de espera.",
        "No limpiar listeners en SPAs cuando un componente se destruye. Los listeners mantienen el componente en memoria aunque ya no esté en el DOM.",
      ],
    },
 
    // ─── MÓDULO 7: JavaScript asíncrono ───────────────────────────────────────
    {
      name: "El Event Loop y el modelo de concurrencia de JavaScript",
      slug: "js-event-loop",
      level: "BEGINNER" as const,
      subjectId: javascriptId,
      description: "Comprende cómo JavaScript ejecuta código asíncrono siendo single-threaded: el Call Stack, el Heap, la Callback Queue, la Microtask Queue y el Event Loop que los coordina.",
      whyMatters: "El Event Loop es el corazón de JavaScript. Entenderlo explica por qué setTimeout(fn, 0) no es inmediato, por qué las Promises se resuelven antes que los callbacks de setTimeout, y cómo evitar bloquear el hilo principal.",
      explanation: `**JavaScript es single-threaded:**
Solo puede ejecutar una cosa a la vez. Sin embargo, el navegador provee APIs web (setTimeout, fetch, eventos del DOM) que permiten operaciones asíncronas sin bloquear.
 
**Componentes del modelo de concurrencia:**
 
1. **Call Stack (pila de llamadas):**
Registra qué función se está ejecutando. Es una pila LIFO (último en entrar, primero en salir). Cuando una función se llama, se agrega (push). Cuando retorna, se elimina (pop). Si el stack está ocupado, el navegador no puede responder a eventos.
 
2. **Heap:**
Memoria donde se almacenan los objetos. No tiene estructura de pila.
 
3. **Web APIs (del navegador):**
setTimeout, setInterval, fetch, XMLHttpRequest, addEventListener. El navegador los maneja en paralelo fuera del Call Stack de JS.
 
4. **Callback Queue (Task Queue / Macrotask Queue):**
Los callbacks de Web APIs esperan aquí cuando terminan. setTimeout, setInterval, eventos del DOM van aquí.
 
5. **Microtask Queue:**
Cola de mayor prioridad que el Callback Queue. Las Promises (.then, .catch), queueMicrotask() y MutationObserver van aquí. Se vacía completamente antes de procesar el siguiente macrotask.
 
6. **El Event Loop:**
Monitorea continuamente el Call Stack y las colas. Cuando el Call Stack está vacío:
1. Vacía completamente la Microtask Queue (tarea por tarea, incluyendo microtasks generados por microtasks).
2. Toma el primer callback de la Callback Queue y lo pone en el Call Stack.
3. Repite.
 
**Orden de ejecución:**
1. Código síncrono (Call Stack).
2. Microtasks (Promises, queueMicrotask).
3. Macrotasks (setTimeout, setInterval, eventos).
 
**Blocking vs Non-blocking:**
Operaciones que ocupan el Call Stack mucho tiempo (loops grandes, cálculos pesados) bloquean el hilo: el navegador no puede actualizar la UI ni responder a eventos. Esto causa el "freezing" de la página.`,
      codeExample: `// ─── VISUALIZANDO EL EVENT LOOP ──────────────
console.log("1: síncrono inicio");
 
setTimeout(() => {
  console.log("4: macrotask (setTimeout 0ms)");
}, 0);
 
Promise.resolve()
  .then(() => {
    console.log("3: microtask (Promise)");
  });
 
queueMicrotask(() => {
  console.log("3b: microtask (queueMicrotask)");
});
 
console.log("2: síncrono fin");
 
// Orden de salida:
// 1: síncrono inicio
// 2: síncrono fin
// 3: microtask (Promise)        ← microtasks antes que macrotasks
// 3b: microtask (queueMicrotask)
// 4: macrotask (setTimeout 0ms) ← aunque fue 0ms, va después de las microtasks
 
// ─── LAS MICROTASKS TIENEN PRIORIDAD ─────────
setTimeout(() => console.log("timeout"), 0);
 
Promise.resolve()
  .then(() => {
    console.log("promise 1");
    // Esta microtask genera otra microtask
    return Promise.resolve();
  })
  .then(() => {
    console.log("promise 2");
  })
  .then(() => {
    console.log("promise 3");
  });
 
// promise 1 → promise 2 → promise 3 → timeout
// Todas las microtasks se procesan ANTES del siguiente macrotask
 
// ─── BLOCKING VS NON-BLOCKING ─────────────────
 
// ❌ BLOCKING: bloquea el hilo principal
function calcularSincrono() {
  console.log("Inicio");
  let suma = 0;
  for (let i = 0; i < 1_000_000_000; i++) {
    suma += i; // El navegador se congela durante este loop
  }
  console.log("Fin:", suma);
}
calcularSincrono(); // La UI queda congelada hasta que termina
 
// ✅ NON-BLOCKING: usando setTimeout para no bloquear
function calcularEnPiezas(callback) {
  let suma = 0;
  let i = 0;
  const CHUNK_SIZE = 10_000_000;
 
  function procesarChunk() {
    const fin = Math.min(i + CHUNK_SIZE, 1_000_000_000);
    for (; i < fin; i++) {
      suma += i;
    }
 
    if (i < 1_000_000_000) {
      setTimeout(procesarChunk, 0); // Cede el control al Event Loop
    } else {
      callback(suma);
    }
  }
 
  procesarChunk();
}
 
// ─── SETTIMEOUT NO ES PRECISO ─────────────────
console.log("Antes del setTimeout");
 
setTimeout(() => {
  // Este callback se ejecuta DESPUÉS de que el Call Stack esté vacío
  // y hayan pasado al menos 100ms. Puede ser más si el stack está ocupado.
  console.log("Dentro del setTimeout");
}, 100);
 
// Si aquí hay código síncrono que tarda 500ms, el setTimeout
// se ejecutará después de esos 500ms, no exactamente en 100ms
 
// ─── VISUALIZACIÓN DEL CALL STACK ────────────
function a() {
  console.log("a: inicio");
  b();
  console.log("a: fin");
}
 
function b() {
  console.log("b: inicio");
  c();
  console.log("b: fin");
}
 
function c() {
  console.log("c");
}
 
a();
// Call Stack durante la ejecución de c():
// [c, b, a, main]  ← c está en el tope`,
      practicalTips: [
        "Si necesitas hacer un cálculo pesado sin bloquear la UI, divídelo en chunks con setTimeout(procesar, 0) o usa Web Workers para procesamiento en paralelo.",
        "Recuerda: las Promises siempre se resuelven de forma asíncrona, incluso Promise.resolve() ya resuelta. Su .then() nunca es síncrono.",
        "console.log en el Call Stack aparece inmediatamente. Si ves que un console.log 'salta' a un orden inesperado, es el Event Loop actuando.",
        "Web Workers permiten ejecutar JavaScript en un hilo separado para cálculos pesados. Comunican con el hilo principal via postMessage.",
      ],
      commonMistakes: [
        "Creer que setTimeout(fn, 0) es síncrono. Siempre es asíncrono: el callback va a la Callback Queue y se ejecuta después de las microtasks pendientes.",
        "Hacer operaciones costosas en el hilo principal (bucles enormes, parseo de JSON grande) causando que la UI se congele.",
        "Asumir que el callback de setTimeout se ejecuta exactamente en el tiempo especificado. Es un mínimo, no una garantía.",
        "No entender por qué el .then() de una Promise ya resuelta no se ejecuta inmediatamente. Va a la Microtask Queue, no al Call Stack directo.",
      ],
    },
    {
      name: "Promises: creación, encadenamiento y manejo de errores",
      slug: "js-promises",
      level: "BEGINNER" as const,
      subjectId: javascriptId,
      description: "Domina las Promises de JavaScript: estados, creación, encadenamiento con .then()/.catch()/.finally(), y los métodos estáticos Promise.all, Promise.allSettled, Promise.race y Promise.any.",
      whyMatters: "Las Promises son la base de toda la programación asíncrona moderna en JavaScript. Fetch API, la mayoría de APIs de Node.js, bases de datos, y cualquier operación IO usan Promises. Entenderlas profundamente es no negociable.",
      explanation: `**¿Qué es una Promise?**
Un objeto que representa el resultado eventual (o el fallo) de una operación asíncrona. Tiene tres estados posibles:
- **Pending:** esperando.
- **Fulfilled:** completada exitosamente (tiene un valor).
- **Rejected:** falló (tiene una razón/error).
 
Una Promise solo puede transicionar una vez: de pending a fulfilled o de pending a rejected. No puede volver a pending ni cambiar de fulfilled a rejected.
 
**Crear una Promise:**
\`new Promise((resolve, reject) => { ... })\`
- Llama a \`resolve(valor)\` para cumplir la promise.
- Llama a \`reject(error)\` para rechazarla.
- Si el executor lanza una excepción, la promise se rechaza automáticamente.
 
**Consumir una Promise:**
- \`.then(onFulfilled, onRejected?)\` — registra callbacks para fulfilled y opcionalmente rejected. Retorna una nueva Promise.
- \`.catch(onRejected)\` — shorthand de .then(null, onRejected). Maneja rechazos.
- \`.finally(callback)\` — se ejecuta siempre, sin importar el resultado. No recibe valor. Útil para cleanup.
 
**Encadenamiento:**
Cada .then() retorna una nueva Promise con el valor retornado por el callback. Esto permite encadenar transformaciones. Si un callback lanza una excepción, la siguiente Promise en la cadena se rechaza.
 
**Métodos estáticos:**
- \`Promise.all([p1, p2, p3])\` — espera a que TODAS se resuelvan. Si una falla, toda falla.
- \`Promise.allSettled([p1, p2, p3])\` — espera a que TODAS terminen (sin importar éxito o fallo). Retorna array de resultados con status.
- \`Promise.race([p1, p2, p3])\` — retorna la primera que termine (éxito o fallo).
- \`Promise.any([p1, p2, p3])\` — retorna la primera que tenga ÉXITO. Falla solo si todas fallan.
- \`Promise.resolve(valor)\` — crea una Promise ya resuelta con ese valor.
- \`Promise.reject(error)\` — crea una Promise ya rechazada con ese error.`,
      codeExample: `// ─── CREAR UNA PROMISE ───────────────────────
function esperar(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
 
function obtenerUsuario(id) {
  return new Promise((resolve, reject) => {
    if (!id || typeof id !== "number") {
      reject(new Error("ID inválido"));
      return;
    }
 
    setTimeout(() => {
      const usuarios = {
        1: { id: 1, nombre: "María", email: "maria@email.com" },
        2: { id: 2, nombre: "Carlos", email: "carlos@email.com" },
      };
 
      const usuario = usuarios[id];
      if (usuario) {
        resolve(usuario);
      } else {
        reject(new Error(\`Usuario \${id} no encontrado\`));
      }
    }, 500);
  });
}
 
// ─── CONSUMIR CON .THEN/.CATCH ────────────────
obtenerUsuario(1)
  .then(usuario => {
    console.log("Usuario:", usuario.nombre);
    return usuario.id; // Pasamos el ID al siguiente .then
  })
  .then(id => {
    console.log("ID del usuario:", id);
    return obtenerPedidos(id); // Retornamos otra Promise (chaining)
  })
  .then(pedidos => {
    console.log("Pedidos:", pedidos);
  })
  .catch(error => {
    // Captura errores de CUALQUIER punto de la cadena
    console.error("Error:", error.message);
  })
  .finally(() => {
    // Siempre se ejecuta, sea éxito o error
    ocultarSpinner();
  });
 
// ─── MÉTODOS ESTÁTICOS ────────────────────────
 
// Promise.all: todas deben resolverse
const [usuarios, productos, ordenes] = await Promise.all([
  fetch("/api/usuarios").then(r => r.json()),
  fetch("/api/productos").then(r => r.json()),
  fetch("/api/ordenes").then(r => r.json()),
]);
// Si cualquiera falla, todo falla
 
// Promise.allSettled: independiente del resultado individual
const resultados = await Promise.allSettled([
  obtenerUsuario(1),
  obtenerUsuario(999), // Este fallará
  obtenerUsuario(2),
]);
 
resultados.forEach(resultado => {
  if (resultado.status === "fulfilled") {
    console.log("Éxito:", resultado.value);
  } else {
    console.log("Error:", resultado.reason.message);
  }
});
 
// Promise.race: la primera que termine
const timeout = new Promise((_, reject) =>
  setTimeout(() => reject(new Error("Timeout")), 5000)
);
 
const resultado = await Promise.race([
  fetch("/api/datos"),
  timeout,
]);
// Si fetch tarda más de 5s, gana el timeout y se rechaza
 
// Promise.any: la primera en tener ÉXITO
const respuestaRapida = await Promise.any([
  fetch("https://servidor1.com/api"),
  fetch("https://servidor2.com/api"),
  fetch("https://servidor3.com/api"),
]);
// Usa el primer servidor que responda exitosamente
 
// ─── PROMISIFICAR CALLBACKS LEGACY ───────────
// Convertir función con callback a Promise
function leerArchivo(ruta) {
  return new Promise((resolve, reject) => {
    fs.readFile(ruta, "utf8", (error, datos) => {
      if (error) reject(error);
      else resolve(datos);
    });
  });
}
 
// ─── ERRORES COMUNES ──────────────────────────
// ❌ Promise no manejada (unhandled rejection)
obtenerUsuario(999); // Sin .catch → warning en consola y posible crash
 
// ✅ Siempre maneja el rechazo
obtenerUsuario(999).catch(err => console.error(err));
 
// ❌ "Promise hell" (equivalente al callback hell)
obtenerUsuario(1)
  .then(usuario => {
    obtenerPedidos(usuario.id) // ❌ Olvidamos el return
      .then(pedidos => {
        console.log(pedidos);
      });
  });
 
// ✅ Siempre retorna la siguiente Promise en el chain
obtenerUsuario(1)
  .then(usuario => obtenerPedidos(usuario.id)) // return implícito
  .then(pedidos => console.log(pedidos));`,
      practicalTips: [
        "Siempre agrega .catch() al final de cada cadena de Promises que no está en un bloque try/catch. Las Promises rechazadas no manejadas causan warnings y pueden crashear el proceso en Node.js.",
        "Promise.allSettled es preferible a Promise.all cuando quieres que todas las operaciones completen aunque algunas fallen.",
        "Cuando retornas una Promise dentro de un .then(), el siguiente .then() espera a que esa Promise se resuelva. Si olvidas el return, el siguiente .then() recibe undefined.",
        "Promise.resolve(valor) es útil para normalizar APIs que pueden retornar un valor o una Promise: Promise.resolve(posiblePromise).then(...).",
      ],
      commonMistakes: [
        "Olvidar el return dentro de .then() cuando retornas otra Promise. Sin return, la cadena no espera la Promise interna y el siguiente .then() recibe undefined.",
        "Crear promesas innecesarias: return new Promise((resolve) => resolve(fetch(url))) en lugar de simplemente return fetch(url).",
        "No manejar rechazos de Promises. En Node.js, una Promise rechazada sin .catch() puede terminar el proceso.",
        "Confundir Promise.all y Promise.allSettled. all falla si cualquiera falla; allSettled espera a todas sin importar el resultado.",
      ],
    },
    {
      name: "Async/Await: sintaxis asíncrona con apariencia síncrona",
      slug: "js-async-await",
      level: "BEGINNER" as const,
      subjectId: javascriptId,
      description: "Domina async/await para escribir código asíncrono legible, manejo de errores con try/catch, ejecución paralela con Promise.all, y patrones avanzados de composición asíncrona.",
      whyMatters: "Async/await es el estándar de facto para código asíncrono moderno en JavaScript. Hace que el código asíncrono sea legible como código síncrono, simplifica enormemente el manejo de errores y es lo que verás en todos los proyectos modernos.",
      explanation: `**async/await es syntactic sugar sobre Promises:**
Una función \`async\` siempre retorna una Promise. \`await\` pausa la ejecución de la función async hasta que la Promise se resuelve, retornando su valor.
 
**Función async:**
- Declarada con \`async function nombre() {}\` o \`const fn = async () => {}\`.
- Siempre retorna una Promise, aunque retornes un valor primitivo (se envuelve automáticamente).
- Permite usar \`await\` dentro de ella.
 
**await:**
- Solo puede usarse dentro de una función async (o en el nivel superior de módulos ES6 - top-level await).
- Pausa la función async, no el hilo principal (el Event Loop sigue funcionando).
- Si la Promise se rechaza, lanza una excepción que puede capturarse con try/catch.
 
**Manejo de errores:**
- \`try/catch\` — el catch recibe el error si cualquier await dentro del try rechaza.
- \`.catch()\` en la llamada de la función async.
- Puedes combinar: try/catch dentro de la función + .catch() en la llamada.
 
**Ejecución secuencial vs paralela:**
- Secuencial: \`await a(); await b();\` — b empieza cuando a termina. Total: tiempo(a) + tiempo(b).
- Paralela: \`await Promise.all([a(), b()])\` — a y b empiezan simultáneamente. Total: max(tiempo(a), tiempo(b)).
 
**Errores comunes con async/await:**
- Esperar innecesariamente en secuencia cuando pueden ser paralelas.
- Olvidar que async dentro de forEach no funciona como se espera.
- No manejar errores con try/catch.
 
**Top-level await (ES2022):**
Permite usar await en el nivel superior de módulos ES6 sin envolver en una función async.`,
      codeExample: `// ─── ASYNC/AWAIT BÁSICO ──────────────────────
async function obtenerPerfilCompleto(userId) {
  // Sin async/await: .then().then().then()
  // Con async/await: parece síncrono, es asíncrono
 
  const usuario = await obtenerUsuario(userId);
  const pedidos = await obtenerPedidos(usuario.id);
  const perfil = await obtenerPerfil(usuario.id);
 
  return {
    usuario,
    pedidos,
    perfil,
  };
}
 
// Consumir
obtenerPerfilCompleto(1)
  .then(datos => console.log(datos))
  .catch(err => console.error(err));
 
// ─── MANEJO DE ERRORES ────────────────────────
async function crearOrden(datosOrden) {
  try {
    // Validar
    if (!datosOrden.items?.length) {
      throw new Error("La orden debe tener al menos un item");
    }
 
    // Todas estas pueden lanzar si fallan
    const usuario = await verificarUsuario(datosOrden.userId);
    const inventario = await verificarInventario(datosOrden.items);
    const pago = await procesarPago(datosOrden.metodoPago);
    const orden = await guardarOrden({ usuario, inventario, pago });
 
    return { success: true, ordenId: orden.id };
 
  } catch (error) {
    // Maneja errores de cualquier await en el bloque try
    console.error("Error al crear orden:", error.message);
 
    // Puedes re-lanzar para que el caller maneje
    throw new Error(\`Error al crear orden: \${error.message}\`);
 
  } finally {
    // Cleanup siempre, sea éxito o error
    cerrarConexionDB();
  }
}
 
// ─── SECUENCIAL VS PARALELO ───────────────────
 
// ❌ Secuencial innecesario: 3 segundos totales
async function cargarDashboardLento() {
  const usuarios = await fetch("/api/usuarios").then(r => r.json()); // 1s
  const productos = await fetch("/api/productos").then(r => r.json()); // 1s
  const ordenes = await fetch("/api/ordenes").then(r => r.json());   // 1s
  // Total: ~3 segundos
  return { usuarios, productos, ordenes };
}
 
// ✅ Paralelo: ~1 segundo total
async function cargarDashboardRapido() {
  const [usuarios, productos, ordenes] = await Promise.all([
    fetch("/api/usuarios").then(r => r.json()),   // Empiezan
    fetch("/api/productos").then(r => r.json()),  // al mismo
    fetch("/api/ordenes").then(r => r.json()),    // tiempo
  ]);
  // Total: ~1 segundo (el más lento)
  return { usuarios, productos, ordenes };
}
 
// ─── ASYNC EN LOOPS ───────────────────────────
 
// ❌ forEach NO funciona con async/await como se espera
async function procesarItemsMal(items) {
  items.forEach(async (item) => {
    await procesarItem(item); // El await es dentro del callback, no del forEach
  });
  console.log("Listo?"); // Se ejecuta ANTES de que los items procesen
}
 
// ✅ for...of SÍ funciona (secuencial)
async function procesarItemsSecuencial(items) {
  for (const item of items) {
    await procesarItem(item); // Espera cada uno antes del siguiente
  }
  console.log("Listo"); // Se ejecuta después de que todos procesen
}
 
// ✅ Promise.all para paralelo
async function procesarItemsParalelo(items) {
  await Promise.all(items.map(item => procesarItem(item)));
  console.log("Listo"); // Después de que todos terminen
}
 
// ─── PATRONES AVANZADOS ───────────────────────
 
// Retry automático
async function fetchConReintentos(url, maxIntentos = 3) {
  for (let intento = 1; intento <= maxIntentos; intento++) {
    try {
      const respuesta = await fetch(url);
      if (!respuesta.ok) throw new Error(\`HTTP \${respuesta.status}\`);
      return await respuesta.json();
    } catch (error) {
      if (intento === maxIntentos) throw error;
      console.log(\`Intento \${intento} fallido, reintentando...\`);
      await esperar(1000 * intento); // Backoff exponencial
    }
  }
}
 
// Timeout con Promise.race
async function fetchConTimeout(url, ms = 5000) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timeout")), ms)
  );
 
  return Promise.race([fetch(url).then(r => r.json()), timeout]);
}
 
// ─── TOP-LEVEL AWAIT (módulos ES6) ───────────
// En archivos .mjs o <script type="module">:
// const config = await fetch("/api/config").then(r => r.json());
// export { config };
 
// ─── ASYNC IIFE (cuando no puedes usar top-level await) ──
(async () => {
  try {
    const datos = await cargarDashboardRapido();
    renderizarDashboard(datos);
  } catch (error) {
    mostrarError(error.message);
  }
})();`,
      practicalTips: [
        "Identifica siempre si tus awaits son independientes entre sí. Si lo son, córrelos en paralelo con Promise.all. El error más común de performance en async/await.",
        "Para loops asíncronos usa for...of (secuencial) o items.map + Promise.all (paralelo). forEach + async nunca da el resultado esperado.",
        "Usa async IIFE cuando necesitas lógica async en el nivel superior sin top-level await: (async () => { await ... })().",
        "El patrón de retry con backoff exponencial (1s, 2s, 4s) es estándar en cualquier cliente HTTP de producción.",
      ],
      commonMistakes: [
        "Usar await innecesariamente en secuencia cuando las operaciones son independientes. Triplica o cuadruplica el tiempo de espera.",
        "forEach + async. El forEach no espera las promises de los callbacks async. Usa for...of o Promise.all con map.",
        "Olvidar try/catch en funciones async. Los errores de await rechazado se vuelven rechazos de la Promise retornada, invisibles si no se manejan.",
        "return await promise dentro de try/catch cuando solo return promise alcanzaría. Sin try/catch son equivalentes; dentro de try/catch, return await es correcto porque captura errores.",
      ],
    },
 
    // ─── MÓDULO 8: Fetch API y consumo de APIs REST ───────────────────────────
    {
      name: "Fetch API: peticiones HTTP desde el navegador",
      slug: "js-fetch-api",
      level: "BEGINNER" as const,
      subjectId: javascriptId,
      description: "Domina la Fetch API para realizar peticiones HTTP: GET, POST, PUT, DELETE; manejo de cabeceras, cuerpo de la petición, manejo de errores HTTP, y patrones para construir un cliente HTTP reutilizable.",
      whyMatters: "Fetch es la API nativa del navegador para comunicarse con servidores. Reemplazó a XMLHttpRequest y es la base de toda comunicación cliente-servidor en aplicaciones web modernas. Saber usarla correctamente, incluyendo manejo de errores, es una habilidad fundamental.",
      explanation: `**La Fetch API:**
\`fetch(url, opciones?)\` retorna una Promise que se resuelve con un objeto Response.
 
**El objeto Response:**
- \`response.ok\` — true si el status code está entre 200-299.
- \`response.status\` — código HTTP (200, 201, 400, 404, 500...).
- \`response.statusText\` — "OK", "Not Found", etc.
- \`response.headers\` — cabeceras de la respuesta.
- \`response.json()\` — parsea el body como JSON → retorna Promise.
- \`response.text()\` — body como texto → retorna Promise.
- \`response.blob()\` — body como Blob (archivos, imágenes) → retorna Promise.
- \`response.formData()\` — body como FormData → retorna Promise.
- \`response.arrayBuffer()\` — body como ArrayBuffer → retorna Promise.
- \`response.clone()\` — clona la respuesta (el body solo puede leerse una vez).
 
**IMPORTANTE:** Fetch solo rechaza la Promise en errores de red (sin conexión, CORS bloqueado). Un status 404 o 500 NO rechaza la Promise. Debes verificar \`response.ok\` manualmente.
 
**Opciones de la petición:**
- \`method\` — "GET" (default), "POST", "PUT", "PATCH", "DELETE".
- \`headers\` — objeto o Headers con las cabeceras.
- \`body\` — cuerpo de la petición (string, JSON.stringify(), FormData, Blob, etc.). GET no tiene body.
- \`credentials\` — "same-origin" (default), "include" (envía cookies), "omit".
- \`mode\` — "cors" (default), "no-cors", "same-origin".
- \`signal\` — AbortController.signal para cancelar la petición.
- \`cache\` — política de caché.
 
**Cabeceras comunes:**
- \`Content-Type: application/json\` — para enviar JSON.
- \`Authorization: Bearer token\` — para autenticación.
- \`Accept: application/json\` — qué formato acepta el cliente.`,
      codeExample: `// ─── GET BÁSICO ──────────────────────────────
async function obtenerUsuarios() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
 
  // ⚠️ Fetch NO rechaza en errores HTTP (404, 500, etc.)
  if (!response.ok) {
    throw new Error(\`HTTP Error: \${response.status} \${response.statusText}\`);
  }
 
  const usuarios = await response.json();
  return usuarios;
}
 
// ─── POST (crear recurso) ─────────────────────
async function crearUsuario(datosUsuario) {
  const response = await fetch("https://api.ejemplo.com/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": \`Bearer \${obtenerToken()}\`,
    },
    body: JSON.stringify(datosUsuario),
  });
 
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message ?? \`Error \${response.status}\`);
  }
 
  return response.json();
}
 
// ─── PUT Y PATCH ─────────────────────────────
async function actualizarUsuario(id, datos) {
  const response = await fetch(\`https://api.ejemplo.com/usuarios/\${id}\`, {
    method: "PUT",         // PUT reemplaza el recurso completo
    // method: "PATCH",   // PATCH modifica parcialmente
    headers: {
      "Content-Type": "application/json",
      "Authorization": \`Bearer \${obtenerToken()}\`,
    },
    body: JSON.stringify(datos),
  });
 
  if (!response.ok) throw new Error(\`Error \${response.status}\`);
 
  // 204 No Content no tiene body
  if (response.status === 204) return null;
 
  return response.json();
}
 
// ─── DELETE ───────────────────────────────────
async function eliminarUsuario(id) {
  const response = await fetch(\`https://api.ejemplo.com/usuarios/\${id}\`, {
    method: "DELETE",
    headers: {
      "Authorization": \`Bearer \${obtenerToken()}\`,
    },
  });
 
  if (!response.ok) throw new Error(\`Error al eliminar: \${response.status}\`);
 
  return response.status === 204 ? true : response.json();
}
 
// ─── CLIENTE HTTP REUTILIZABLE ────────────────
class APIClient {
  #baseURL;
  #defaultHeaders;
 
  constructor(baseURL, defaultHeaders = {}) {
    this.#baseURL = baseURL;
    this.#defaultHeaders = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...defaultHeaders,
    };
  }
 
  setAuthToken(token) {
    this.#defaultHeaders["Authorization"] = \`Bearer \${token}\`;
  }
 
  async #request(endpoint, options = {}) {
    const { body, ...restOptions } = options;
 
    const response = await fetch(\`\${this.#baseURL}\${endpoint}\`, {
      headers: { ...this.#defaultHeaders, ...options.headers },
      body: body ? JSON.stringify(body) : undefined,
      ...restOptions,
    });
 
    if (!response.ok) {
      let errorMessage = \`HTTP \${response.status}\`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message ?? errorMessage;
      } catch {
        // El body del error no es JSON
      }
      throw new APIError(errorMessage, response.status);
    }
 
    if (response.status === 204) return null;
 
    return response.json();
  }
 
  get(endpoint, options) {
    return this.#request(endpoint, { method: "GET", ...options });
  }
 
  post(endpoint, body, options) {
    return this.#request(endpoint, { method: "POST", body, ...options });
  }
 
  put(endpoint, body, options) {
    return this.#request(endpoint, { method: "PUT", body, ...options });
  }
 
  patch(endpoint, body, options) {
    return this.#request(endpoint, { method: "PATCH", body, ...options });
  }
 
  delete(endpoint, options) {
    return this.#request(endpoint, { method: "DELETE", ...options });
  }
}
 
class APIError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "APIError";
    this.status = status;
  }
}
 
// Uso del cliente
const api = new APIClient("https://api.mi-app.com");
api.setAuthToken("mi-jwt-token");
 
const usuarios = await api.get("/usuarios");
const nuevoUsuario = await api.post("/usuarios", { nombre: "María" });
await api.delete(\`/usuarios/\${id}\`);
 
// ─── CANCELAR PETICIÓN CON ABORTCONTROLLER ────
async function buscarConCancelacion(termino) {
  // Cancela la petición anterior si existe
  if (buscarConCancelacion.controller) {
    buscarConCancelacion.controller.abort();
  }
 
  buscarConCancelacion.controller = new AbortController();
 
  try {
    const respuesta = await fetch(\`/api/buscar?q=\${termino}\`, {
      signal: buscarConCancelacion.controller.signal,
    });
    return respuesta.json();
  } catch (error) {
    if (error.name === "AbortError") {
      return null; // Petición cancelada, no es un error real
    }
    throw error;
  }
}
 
// ─── SUBIR ARCHIVOS CON FORMDATA ──────────────
async function subirImagen(archivo, userId) {
  const formData = new FormData();
  formData.append("imagen", archivo);
  formData.append("userId", userId);
 
  const response = await fetch("/api/imagenes", {
    method: "POST",
    // No pongas Content-Type aquí: el browser lo configura automáticamente
    // con el boundary correcto para multipart/form-data
    headers: {
      "Authorization": \`Bearer \${obtenerToken()}\`,
    },
    body: formData,
  });
 
  if (!response.ok) throw new Error("Error al subir imagen");
  return response.json();
}`,
      practicalTips: [
        "Siempre verifica response.ok después de fetch. Un 404 o 500 no rechaza la Promise; debes verificarlo manualmente.",
        "Crea un cliente HTTP centralizado desde el inicio del proyecto. Centraliza el manejo de errores, el token de auth y la URL base.",
        "Para cancelar fetch usa AbortController. Es esencial en búsquedas con debounce: cancela la petición anterior antes de hacer la nueva.",
        "No pongas Content-Type cuando envías FormData. El navegador lo configura automáticamente con el boundary correcto. Ponerlo manualmente rompe la petición.",
      ],
      commonMistakes: [
        "No verificar response.ok. Fetch no rechaza en errores HTTP; solo en errores de red. Un 500 del servidor parece un éxito si no verificas.",
        "Olvidar JSON.stringify al enviar el body. El body debe ser string; pasar el objeto directamente resulta en '[object Object]' enviado al servidor.",
        "Poner Content-Type: multipart/form-data manualmente al usar FormData. El browser necesita poner el boundary automáticamente.",
        "No cancelar peticiones en componentes React que se desmontan, causando que el callback de una petición intente actualizar un componente unmounted.",
      ],
    },
    {
      name: "Patrones de consumo de APIs REST: autenticación, errores y estado de carga",
      slug: "js-api-patterns",
      level: "BEGINNER" as const,
      subjectId: javascriptId,
      description: "Aprende patrones profesionales para consumir APIs REST: gestión de tokens JWT, refresh tokens, manejo de errores por tipo, estados de carga/error/éxito, paginación y caché básico.",
      whyMatters: "Saber hacer un fetch básico es solo el inicio. En producción necesitas manejar autenticación con JWT, expiración de tokens, estados de UI durante la carga, errores de red vs errores del servidor, y paginación. Estos patrones son lo que distingue un frontend junior de uno senior.",
      explanation: `**Autenticación con JWT:**
- El servidor retorna un access token (corta duración) y un refresh token (larga duración) al hacer login.
- El access token va en el header \`Authorization: Bearer token\` en cada petición.
- Cuando el access token expira (401), el cliente usa el refresh token para obtener uno nuevo.
- Nunca guardes tokens sensibles en localStorage en aplicaciones de alta seguridad (usa httpOnly cookies). Para aplicaciones normales, localStorage es aceptable.
 
**Interceptores de petición:**
Función que se ejecuta antes/después de cada petición para:
- Agregar el token automáticamente.
- Manejar la expiración y renovación automática del token.
- Logging de peticiones.
- Transformar errores.
 
**Estados de una petición (UI):**
- **idle:** no hay petición en curso.
- **loading:** petición en curso.
- **success:** petición exitosa con datos.
- **error:** petición fallida con mensaje de error.
 
**Tipos de errores:**
- **Error de red:** sin conexión, timeout → mostrar "Sin conexión".
- **Error 400 Bad Request:** datos inválidos → mostrar errores de validación.
- **Error 401 Unauthorized:** no autenticado → redirigir al login.
- **Error 403 Forbidden:** sin permisos → mostrar "Sin acceso".
- **Error 404 Not Found:** recurso no existe → mostrar "No encontrado".
- **Error 500 Server Error:** error del servidor → mostrar "Error del servidor, intenta más tarde".
 
**Paginación:**
- **Offset/Limit:** \`?page=2&limit=20\`. Simple pero ineficiente para grandes datasets.
- **Cursor-based:** \`?cursor=xyz\`. Más eficiente, no sufre de "rows se mueven" entre páginas.
- El servidor típicamente retorna: \`{ data: [...], total: 100, page: 2, limit: 20, hasMore: true }\`.
 
**Caché básico:**
Guardar respuestas de peticiones GET para no repetirlas innecesariamente.`,
      codeExample: `// ─── GESTIÓN DE TOKENS ───────────────────────
class AuthService {
  static #ACCESS_TOKEN_KEY = "access_token";
  static #REFRESH_TOKEN_KEY = "refresh_token";
 
  static getAccessToken() {
    return localStorage.getItem(this.#ACCESS_TOKEN_KEY);
  }
 
  static setTokens({ accessToken, refreshToken }) {
    localStorage.setItem(this.#ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.#REFRESH_TOKEN_KEY, refreshToken);
  }
 
  static clearTokens() {
    localStorage.removeItem(this.#ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.#REFRESH_TOKEN_KEY);
  }
 
  static async refreshAccessToken() {
    const refreshToken = localStorage.getItem(this.#REFRESH_TOKEN_KEY);
    if (!refreshToken) throw new Error("No hay refresh token");
 
    const response = await fetch("/api/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
 
    if (!response.ok) {
      this.clearTokens();
      window.location.href = "/login";
      throw new Error("Sesión expirada");
    }
 
    const tokens = await response.json();
    this.setTokens(tokens);
    return tokens.accessToken;
  }
}
 
// ─── CLIENTE CON REFRESH AUTOMÁTICO ──────────
class APIClientConAuth {
  #baseURL;
  #isRefreshing = false;
  #refreshQueue = [];
 
  constructor(baseURL) {
    this.#baseURL = baseURL;
  }
 
  async request(endpoint, options = {}) {
    const token = AuthService.getAccessToken();
 
    const response = await fetch(\`\${this.#baseURL}\${endpoint}\`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": \`Bearer \${token}\` } : {}),
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
 
    // Token expirado: intentar refresh automático
    if (response.status === 401) {
      if (this.#isRefreshing) {
        // Si ya hay un refresh en curso, encolar y esperar
        return new Promise((resolve, reject) => {
          this.#refreshQueue.push({ resolve, reject });
        }).then(newToken => this.request(endpoint, options));
      }
 
      this.#isRefreshing = true;
 
      try {
        const newToken = await AuthService.refreshAccessToken();
        // Resolver todas las peticiones encoladas
        this.#refreshQueue.forEach(({ resolve }) => resolve(newToken));
        this.#refreshQueue = [];
        // Reintentar la petición original con el nuevo token
        return this.request(endpoint, options);
      } catch (error) {
        this.#refreshQueue.forEach(({ reject }) => reject(error));
        this.#refreshQueue = [];
        throw error;
      } finally {
        this.#isRefreshing = false;
      }
    }
 
    if (!response.ok) {
      const error = await this.#parseError(response);
      throw error;
    }
 
    if (response.status === 204) return null;
    return response.json();
  }
 
  async #parseError(response) {
    let message = \`Error \${response.status}\`;
    let details = null;
 
    try {
      const data = await response.json();
      message = data.message ?? message;
      details = data.errors ?? null;
    } catch { /* body no es JSON */ }
 
    const error = new APIError(message, response.status, details);
    return error;
  }
}
 
// ─── ESTADO DE CARGA EN LA UI ─────────────────
class RequestState {
  constructor() {
    this.status = "idle"; // idle | loading | success | error
    this.data = null;
    this.error = null;
  }
 
  setLoading() {
    this.status = "loading";
    this.error = null;
  }
 
  setSuccess(data) {
    this.status = "success";
    this.data = data;
    this.error = null;
  }
 
  setError(error) {
    this.status = "error";
    this.error = error;
    this.data = null;
  }
 
  get isIdle() { return this.status === "idle"; }
  get isLoading() { return this.status === "loading"; }
  get isSuccess() { return this.status === "success"; }
  get isError() { return this.status === "error"; }
}
 
// Uso con DOM
async function cargarProductos(contenedor) {
  const state = new RequestState();
 
  function renderizar() {
    if (state.isLoading) {
      contenedor.innerHTML = '<div class="skeleton"></div>'.repeat(6);
      return;
    }
    if (state.isError) {
      contenedor.innerHTML = \`
        <div class="error-state">
          <p>\${state.error.message}</p>
          <button onclick="cargarProductos(contenedor)">Reintentar</button>
        </div>
      \`;
      return;
    }
    if (state.isSuccess && state.data.length === 0) {
      contenedor.innerHTML = '<p class="empty-state">No hay productos</p>';
      return;
    }
    if (state.isSuccess) {
      contenedor.innerHTML = state.data.map(p => \`
        <div class="card">\${p.nombre}</div>
      \`).join("");
    }
  }
 
  state.setLoading();
  renderizar();
 
  try {
    const productos = await api.get("/productos");
    state.setSuccess(productos);
  } catch (error) {
    state.setError(manejarError(error));
  }
 
  renderizar();
}
 
// ─── MANEJO DE ERRORES POR TIPO ───────────────
function manejarError(error) {
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    return { message: "Sin conexión a internet. Verifica tu red." };
  }
 
  if (error instanceof APIError) {
    switch (error.status) {
      case 400: return { message: "Datos inválidos.", detalles: error.details };
      case 401: return { message: "Tu sesión expiró. Inicia sesión de nuevo." };
      case 403: return { message: "No tienes permisos para esta acción." };
      case 404: return { message: "El recurso no fue encontrado." };
      case 422: return { message: "Los datos enviados son incorrectos.", detalles: error.details };
      case 429: return { message: "Demasiadas peticiones. Espera un momento." };
      case 500:
      case 503: return { message: "Error del servidor. Intenta más tarde." };
      default:  return { message: \`Error inesperado (\${error.status}).\` };
    }
  }
 
  return { message: "Ocurrió un error inesperado." };
}
 
// ─── PAGINACIÓN ───────────────────────────────
class PaginatedLoader {
  #endpoint;
  #pageSize;
  #currentPage = 1;
  #hasMore = true;
  #isLoading = false;
  #items = [];
 
  constructor(endpoint, pageSize = 20) {
    this.#endpoint = endpoint;
    this.#pageSize = pageSize;
  }
 
  get hasMore() { return this.#hasMore; }
  get isLoading() { return this.#isLoading; }
  get items() { return [...this.#items]; }
 
  async loadMore() {
    if (this.#isLoading || !this.#hasMore) return;
 
    this.#isLoading = true;
    try {
      const data = await api.get(
        \`\${this.#endpoint}?page=\${this.#currentPage}&limit=\${this.#pageSize}\`
      );
 
      this.#items.push(...data.items);
      this.#hasMore = data.hasMore;
      this.#currentPage++;
 
      return data.items;
    } finally {
      this.#isLoading = false;
    }
  }
 
  reset() {
    this.#currentPage = 1;
    this.#hasMore = true;
    this.#items = [];
  }
}
 
// Infinite scroll con IntersectionObserver
const loader = new PaginatedLoader("/api/productos", 20);
const sentinel = document.querySelector("#sentinel");
 
const observer = new IntersectionObserver(async (entries) => {
  if (entries[0].isIntersecting && loader.hasMore && !loader.isLoading) {
    const nuevos = await loader.loadMore();
    renderizarNuevosItems(nuevos);
  }
}, { threshold: 0.1 });
 
observer.observe(sentinel);`,
      practicalTips: [
        "Centraliza el manejo de errores HTTP en el cliente API. El código de UI no debería conocer los status codes HTTP, solo recibir mensajes amigables.",
        "El patrón de cola de peticiones durante el refresh de token es esencial para evitar múltiples refreshes simultáneos y condiciones de carrera.",
        "Usa IntersectionObserver para infinite scroll en lugar de eventos de scroll. Es más performático y no requiere cálculos manuales de posición.",
        "Siempre distingue 'error de red' de 'error HTTP'. TypeError 'Failed to fetch' significa sin conexión; APIError significa respuesta del servidor.",
      ],
      commonMistakes: [
        "No manejar la expiración del token. El usuario ve un error 401 misterioso en lugar de ser redirigido al login automáticamente.",
        "Mezclar lógica de negocio y manejo de errores HTTP en los componentes. Centralízalo en el cliente API.",
        "No mostrar estados de loading y error en la UI. El usuario no sabe si algo está cargando o si falló.",
        "Implementar paginación con scroll event en lugar de IntersectionObserver. Es menos performático y difícil de implementar correctamente.",
      ],
    },
 
    // ─── MÓDULO 9: ES6+ y módulos de JavaScript ───────────────────────────────
    {
      name: "ES6+ Características modernas de JavaScript",
      slug: "js-es6-modern-features",
      level: "BEGINNER" as const,
      subjectId: javascriptId,
      description: "Domina las características más importantes de ES6 en adelante: template literals, destructuring avanzado, Symbols, iteradores, generadores, WeakMap/WeakSet, y las características de ES2021-2024.",
      whyMatters: "JavaScript evoluciona constantemente. Conocer las características modernas (algunas de las cuales son atajos a patrones complejos) te hace más productivo y tu código más expresivo y conciso.",
      explanation: `**Template literals (ES6):**
Strings con comillas backtick que permiten interpolación y multilínea.
- Interpolación: \`\${expresión}\`.
- Multilínea sin \\n.
- Tagged templates: función que procesa el template.
 
**Symbols (ES6):**
Tipo primitivo que crea valores únicos garantizados. Nunca son iguales entre sí.
- Útiles como claves únicas en objetos.
- \`Symbol.iterator\`, \`Symbol.toPrimitive\`, \`Symbol.hasInstance\` — bien conocidos (well-known symbols).
- No se enumeran con Object.keys() ni for...in.
 
**Iteradores y el protocolo iterable:**
Un objeto es iterable si tiene el método \`[Symbol.iterator]()\` que retorna un iterador.
Un iterador es un objeto con método \`next()\` que retorna \`{ value, done }\`.
Los arrays, strings, Sets, Maps son iterables nativos.
 
**Generadores (ES6):**
Funciones que pueden pausar y reanudar su ejecución con \`yield\`. Retornan un iterador.
- \`function*\` — declara un generador.
- \`yield\` — pausa y retorna un valor.
- \`yield*\` — delega a otro iterable/generador.
 
**WeakMap y WeakSet (ES6):**
- WeakMap: como Map pero las claves deben ser objetos. Las claves son referencias débiles (el GC puede limpiarlas si no hay otras referencias).
- WeakSet: como Set pero solo objetos, referencias débiles.
- Útiles para datos privados asociados a objetos sin crear memory leaks.
- No son iterables (por naturaleza de las referencias débiles).
 
**Características ES2020-2024:**
- Nullish coalescing (??), Optional chaining (?.), BigInt, Promise.allSettled.
- Logical assignment (??=, ||=, &&=), String.replaceAll(), Promise.any.
- Array.at(-1), Object.hasOwn(), error.cause, structuredClone().
- Array.findLast(), Array.findLastIndex(), Array.toSorted(), Array.toReversed(), Array.with().
- Object.groupBy(), Map.groupBy() — ES2024.
- Promise.withResolvers() — ES2024.`,
      codeExample: `// ─── TEMPLATE LITERALS ───────────────────────
const nombre = "María";
const edad = 25;
 
const saludo = \`Hola, \${nombre}! Tienes \${edad} años.\`;
 
const html = \`
  <div class="card">
    <h2>\${nombre}</h2>
    <p>Edad: \${edad}</p>
    <p>Mayor de edad: \${edad >= 18 ? "Sí" : "No"}</p>
  </div>
\`;
 
// Tagged template (para sanitización HTML, i18n, etc.)
function html(strings, ...values) {
  return strings.reduce((acc, str, i) => {
    const value = values[i - 1];
    const escapado = String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return acc + escapado + str;
  });
}
 
const userInput = "<script>alert('xss')</script>";
const safeHTML = html\`<p>Usuario: \${userInput}</p>\`;
// "<p>Usuario: &lt;script&gt;alert('xss')&lt;/script&gt;</p>"
 
// ─── SYMBOLS ──────────────────────────────────
const ID = Symbol("id");
const NOMBRE = Symbol("nombre");
 
const usuario = {
  [ID]: "u-123",           // Clave Symbol
  [NOMBRE]: "María",       // Clave Symbol
  email: "maria@email.com", // Clave string normal
};
 
usuario[ID];               // "u-123"
Object.keys(usuario);      // ["email"] — los Symbols no se enumeran
Object.getOwnPropertySymbols(usuario); // [Symbol(id), Symbol(nombre)]
 
// Symbol.for: registry global de Symbols por nombre
const s1 = Symbol.for("app.config");
const s2 = Symbol.for("app.config");
s1 === s2; // true (el mismo Symbol del registry)
 
// ─── ITERADORES PERSONALIZADOS ────────────────
class Rango {
  constructor(inicio, fin) {
    this.inicio = inicio;
    this.fin = fin;
  }
 
  [Symbol.iterator]() {
    let actual = this.inicio;
    const fin = this.fin;
 
    return {
      next() {
        if (actual <= fin) {
          return { value: actual++, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}
 
const rango = new Rango(1, 5);
for (const num of rango) {
  console.log(num); // 1, 2, 3, 4, 5
}
 
[...rango];           // [1, 2, 3, 4, 5]
const [a, b, ...c] = rango; // a=1, b=2, c=[3,4,5]
 
// ─── GENERADORES ─────────────────────────────
function* contador(inicio = 0, fin = Infinity) {
  for (let i = inicio; i <= fin; i++) {
    yield i; // Pausa aquí, retorna i
  }
}
 
const gen = contador(1, 5);
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
gen.next(); // { value: 3, done: false }
 
for (const n of contador(1, 3)) {
  console.log(n); // 1, 2, 3
}
 
// Generador infinito (lazy evaluation)
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
 
function take(n, iterable) {
  const resultado = [];
  for (const valor of iterable) {
    resultado.push(valor);
    if (resultado.length === n) break;
  }
  return resultado;
}
 
take(10, fibonacci()); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
 
// ─── WEAKMAP (datos privados de objetos) ──────
const _datos = new WeakMap();
 
class Cuenta {
  constructor(saldoInicial) {
    _datos.set(this, { saldo: saldoInicial, historial: [] });
  }
 
  depositar(monto) {
    const datos = _datos.get(this);
    datos.saldo += monto;
    datos.historial.push({ tipo: "deposito", monto });
  }
 
  get saldo() {
    return _datos.get(this).saldo;
  }
}
 
const cuenta = new Cuenta(100000);
cuenta.depositar(50000);
cuenta.saldo; // 150000
// No hay forma de acceder a _datos desde fuera de la clase
 
// ─── CARACTERÍSTICAS MODERNAS ─────────────────
 
// Array.at() - índices negativos
const array = [1, 2, 3, 4, 5];
array.at(-1);  // 5 (último)
array.at(-2);  // 4 (penúltimo)
 
// Array métodos inmutables (ES2023)
const original = [3, 1, 4, 1, 5];
const ordenado = original.toSorted();      // [1, 1, 3, 4, 5] - original intacto
const invertido = original.toReversed();   // [5, 1, 4, 1, 3] - original intacto
const conCambio = original.with(2, 99);   // [3, 1, 99, 1, 5] - original intacto
 
// Object.groupBy (ES2024)
const personas = [
  { nombre: "Ana", depto: "Eng" },
  { nombre: "Luis", depto: "HR" },
  { nombre: "Eva", depto: "Eng" },
];
 
const porDepto = Object.groupBy(personas, p => p.depto);
// { Eng: [{Ana}, {Eva}], HR: [{Luis}] }
 
// Promise.withResolvers (ES2024)
const { promise, resolve, reject } = Promise.withResolvers();
// Ahora resolve y reject pueden llamarse desde fuera del executor`,
      practicalTips: [
        "Los generadores son perfectos para lazy evaluation: generar valores infinitos sin consumir memoria, o procesar streams de datos paso a paso.",
        "WeakMap es la forma idiomática de almacenar datos privados en clases en JavaScript sin usar #privateFields si necesitas compatibilidad.",
        "Array.toSorted(), toReversed() y with() son los nuevos métodos inmutables (ES2023). Reemplazan el patrón [...arr].sort() para mayor claridad de intención.",
        "Object.groupBy() (ES2024) reemplaza el reduce() para agrupar arrays de objetos. Mucho más legible y conciso.",
      ],
      commonMistakes: [
        "Usar Symbol() cuando necesitas un Symbol compartido entre módulos. Symbol() siempre crea uno nuevo; usa Symbol.for('clave') para Symbols del registry global.",
        "Olvidar que WeakMap y WeakSet no son iterables. No puedes hacer for...of sobre ellos ni obtener su tamaño.",
        "Crear generadores infinitos sin break en el for...of que los consume. El loop nunca termina.",
        "Confundir el protocolo iterador (objeto con next()) con el protocolo iterable (objeto con [Symbol.iterator]()). Son distintos aunque relacionados.",
      ],
    },
    {
      name: "Módulos ES6: import, export y organización del código",
      slug: "js-modules-es6",
      level: "BEGINNER" as const,
      subjectId: javascriptId,
      description: "Aprende el sistema de módulos nativo de JavaScript (ESM): export named, export default, import estático y dinámico, re-exportaciones, y cómo organizar un proyecto con módulos.",
      whyMatters: "Los módulos ES6 son el estándar para organizar código JavaScript en producción. Reemplazaron a CommonJS (require/module.exports) en el frontend, y Node.js también los adopta. Entender la diferencia entre named exports y default exports evita errores comunes en proyectos React y TypeScript.",
      explanation: `**¿Por qué módulos?**
Sin módulos, todo el código JavaScript comparte el scope global, causando colisiones de nombres y acoplamiento. Los módulos crean su propio scope aislado.
 
**Export named (exportación nombrada):**
- Se exportan por nombre.
- El importador debe usar el mismo nombre (o renombrarlo con \`as\`).
- Un módulo puede tener múltiples named exports.
- \`export const nombre = valor;\`
- \`export function nombre() {}\`
- \`export { a, b, c };\`
 
**Export default (exportación por defecto):**
- Solo puede haber uno por módulo.
- El importador puede usar cualquier nombre.
- \`export default clase;\`
- \`export default function() {}\`
- Típicamente para el "tema principal" del módulo (el componente, la clase, la función principal).
 
**Import:**
- Named: \`import { nombre } from './modulo';\`
- Default: \`import cualquierNombre from './modulo';\`
- Mixto: \`import default, { named } from './modulo';\`
- Namespace: \`import * as todo from './modulo';\`
- Solo efectos secundarios: \`import './modulo.css';\`
- Renombrar: \`import { nombreOriginal as alias } from './modulo';\`
 
**Import dinámico:**
\`import('./modulo')\` retorna una Promise. Permite carga lazy de módulos.
Útil para: code splitting, cargar módulos condicionalmente, cargar módulos grandes solo cuando se necesitan.
 
**Re-exportación:**
\`export { nombre } from './otro-modulo';\` — importa y re-exporta sin importar en el scope actual.
 
**Características de ESM:**
- Los módulos son siempre en modo estricto.
- Se evalúan una sola vez (los imports son singletons).
- Los imports son vivos: si el módulo exportador cambia el valor, el importador ve el cambio.
- Los imports son estáticos (se resuelven en tiempo de compilación) a diferencia de require().
- Top-level await está disponible en ESM.`,
      codeExample: `// ─── utils/math.js ───────────────────────────
// Named exports
export const PI = 3.14159265358979;
 
export function sumar(a, b) {
  return a + b;
}
 
export function restar(a, b) {
  return a - b;
}
 
export const multiplicar = (a, b) => a * b;
 
// Export al final (otra forma válida)
const dividir = (a, b) => {
  if (b === 0) throw new Error("División por cero");
  return a / b;
};
 
export { dividir };
 
// ─── utils/api.js ─────────────────────────────
const BASE_URL = "https://api.ejemplo.com"; // No se exporta
 
// Export default: la función principal del módulo
export default async function fetchJSON(endpoint, options = {}) {
  const response = await fetch(\`\${BASE_URL}\${endpoint}\`, options);
  if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
  return response.json();
}
 
// También puede tener named exports
export function buildURL(path, params) {
  const url = new URL(\`\${BASE_URL}\${path}\`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.toString();
}
 
// ─── services/usuario.js ──────────────────────
import fetchJSON, { buildURL } from "../utils/api.js"; // default + named
 
export async function obtenerUsuario(id) {
  return fetchJSON(\`/usuarios/\${id}\`);
}
 
export async function buscarUsuarios(termino) {
  const url = buildURL("/usuarios", { q: termino });
  return fetchJSON(url);
}
 
// Re-exportar desde otro módulo (barrel export)
export { obtenerProductos, crearProducto } from "./producto.js";
 
// ─── main.js: importar ────────────────────────
 
// Named imports
import { sumar, PI, dividir } from "./utils/math.js";
import { sumar as add } from "./utils/math.js"; // Con alias
 
// Default import
import fetchJSON from "./utils/api.js";
 
// Namespace import
import * as Math from "./utils/math.js";
Math.sumar(1, 2);
Math.PI;
Math.multiplicar(3, 4);
 
// Mixto
import fetchJSON2, { buildURL } from "./utils/api.js";
 
// Solo efectos secundarios (ej: cargar CSS, polyfills)
import "./styles/global.css";
import "./polyfills.js";
 
// ─── IMPORT DINÁMICO (code splitting) ─────────
// Carga el módulo solo cuando se necesita
async function manejarEdicion() {
  // El módulo del editor solo se carga cuando el usuario quiere editar
  const { default: Editor } = await import("./editor.js");
  const editor = new Editor("#container");
  editor.init();
}
 
// Con Promise.all para cargar varios módulos en paralelo
const [{ default: Chart }, { default: DataTable }] = await Promise.all([
  import("./chart.js"),
  import("./datatable.js"),
]);
 
// Condicional
async function cargarMapa(tipo) {
  if (tipo === "leaflet") {
    return import("./leaflet-wrapper.js");
  } else {
    return import("./mapbox-wrapper.js");
  }
}
 
// ─── index.js: BARREL FILE (re-exportaciones) ──
// Permite importar desde un solo punto de entrada
export { obtenerUsuario, buscarUsuarios } from "./services/usuario.js";
export { obtenerProducto, listarProductos } from "./services/producto.js";
export { formatearFecha, formatearMoneda } from "./utils/format.js";
export { default as APIClient } from "./utils/api.js";
 
// El consumidor solo importa desde el barrel:
// import { obtenerUsuario, formatearFecha, APIClient } from "./index.js"
// En lugar de:
// import { obtenerUsuario } from "./services/usuario.js"
// import { formatearFecha } from "./utils/format.js"
// import APIClient from "./utils/api.js"`,
      practicalTips: [
        "Prefiere named exports sobre default exports. Son más refactorizables (el IDE puede renombrar automáticamente), más explícitos, y no tienen el problema del 'cualquier nombre en el import'.",
        "Crea barrel files (index.js) para cada feature/dominio. Permiten imports limpios: import { x, y } from './features/auth' en lugar de rutas profundas.",
        "Usa import dinámico para code splitting: cargar módulos pesados (charts, editores, mapas) solo cuando el usuario los necesita.",
        "En Node.js, necesitas file extensions (.js) en los imports de ESM. En bundlers (Vite, Webpack), generalmente puedes omitirlas.",
      ],
      commonMistakes: [
        "Mezclar default y named exports de forma inconsistente. Define una convención: en proyectos React, los componentes usan export default; las utilities usan named exports.",
        "Importar con el nombre incorrecto un named export. Los named exports deben importarse con el mismo nombre (o renombrarse explícitamente con 'as').",
        "Crear barrel files circulares: A re-exporta de B, B re-exporta de A. Causa errores de importación circular que son difíciles de depurar.",
        "Usar import dinámico sin manejar el error. El import() puede fallar si el archivo no existe o hay error de red. Siempre agrega .catch().",
      ],
    },
 
    // ─── MÓDULO 10: Proyecto final ────────────────────────────────────────────
    {
      name: "Arquitectura de una aplicación JavaScript: patrones y organización",
      slug: "js-app-architecture",
      level: "BEGINNER" as const,
      subjectId: javascriptId,
      description: "Aprende a estructurar una aplicación JavaScript vanilla profesional: separación de responsabilidades, patrón MVC/MVP, manejo de estado, componentes reutilizables y organización de carpetas.",
      whyMatters: "Una aplicación sin arquitectura se convierte en código spaguetti. Entender cómo separar responsabilidades, manejar el estado y crear componentes reutilizables es la diferencia entre un proyecto que escala y uno que se convierte en imposible de mantener.",
      explanation: `**Separación de responsabilidades (SoC):**
Cada módulo/función/clase debe tener una única responsabilidad bien definida.
 
**Capas típicas de una aplicación:**
1. **UI / Presentación:** render del DOM, event listeners, actualizar la vista.
2. **Estado:** datos de la aplicación y su gestión.
3. **Servicios / API:** comunicación con el backend.
4. **Utilidades:** funciones puras de ayuda (formateo, validación, transformación).
5. **Configuración:** constantes, URLs, settings.
 
**Patrón Observer (Pub/Sub):**
Permite que distintas partes de la app reaccionen a cambios sin acoplamiento directo. Un EventEmitter central donde los módulos publican eventos y otros se suscriben.
 
**Gestión de estado simple:**
Un objeto de estado centralizado con funciones para modificarlo. Cada cambio notifica a los suscriptores para re-renderizar.
 
**Componentes web sin framework:**
Funciones que crean, gestionan y retornan nodos DOM. Tienen su propio estado local y eventos.
 
**Estructura de carpetas sugerida:**
\`\`\`
src/
  api/          — clientes HTTP y calls al backend
  components/   — componentes UI reutilizables
  services/     — lógica de negocio
  store/        — gestión de estado
  utils/        — funciones puras de utilidad
  config/       — constantes y configuración
  main.js       — punto de entrada
\`\`\`
 
**Principios SOLID aplicados a JavaScript:**
- **S**ingle Responsibility: un módulo, una razón para cambiar.
- **O**pen/Closed: abierto para extensión, cerrado para modificación.
- **L**iskov Substitution: las subclases deben poder reemplazar a sus padres.
- **I**nterface Segregation: interfaces específicas mejor que una general.
- **D**ependency Inversion: depender de abstracciones, no de implementaciones.`,
      codeExample: `// ─── config/constants.js ─────────────────────
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
export const PAGE_SIZE = 20;
export const DEBOUNCE_DELAY = 300;
 
// ─── utils/format.js ─────────────────────────
export function formatearMoneda(valor, moneda = "COP") {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: moneda,
    minimumFractionDigits: 0,
  }).format(valor);
}
 
export function formatearFecha(fecha) {
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
  }).format(new Date(fecha));
}
 
// ─── store/EventEmitter.js ───────────────────
export class EventEmitter {
  #listeners = new Map();
 
  on(evento, callback) {
    if (!this.#listeners.has(evento)) {
      this.#listeners.set(evento, new Set());
    }
    this.#listeners.get(evento).add(callback);
    return () => this.off(evento, callback); // Retorna función de cleanup
  }
 
  off(evento, callback) {
    this.#listeners.get(evento)?.delete(callback);
  }
 
  emit(evento, datos) {
    this.#listeners.get(evento)?.forEach(cb => cb(datos));
  }
 
  once(evento, callback) {
    const wrapper = (datos) => {
      callback(datos);
      this.off(evento, wrapper);
    };
    return this.on(evento, wrapper);
  }
}
 
// ─── store/AppStore.js ────────────────────────
import { EventEmitter } from "./EventEmitter.js";
 
class AppStore extends EventEmitter {
  #estado = {
    productos: [],
    carrito: [],
    usuario: null,
    filtros: { categoria: null, precioMax: null },
    ui: { loading: false, error: null },
  };
 
  getEstado() {
    return structuredClone(this.#estado); // Retorna copia para evitar mutación
  }
 
  #actualizar(ruta, valor) {
    const partes = ruta.split(".");
    let obj = this.#estado;
    for (let i = 0; i < partes.length - 1; i++) {
      obj = obj[partes[i]];
    }
    obj[partes[partes.length - 1]] = valor;
    this.emit("cambio", { ruta, valor, estado: this.getEstado() });
  }
 
  setProductos(productos) {
    this.#actualizar("productos", productos);
    this.emit("productos:cargados", productos);
  }
 
  agregarAlCarrito(producto) {
    const carrito = [...this.#estado.carrito];
    const existente = carrito.find(i => i.id === producto.id);
 
    if (existente) {
      existente.cantidad++;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
 
    this.#actualizar("carrito", carrito);
    this.emit("carrito:actualizado", carrito);
  }
 
  setLoading(loading) {
    this.#actualizar("ui.loading", loading);
  }
 
  setError(error) {
    this.#actualizar("ui.error", error);
    if (error) this.emit("ui:error", error);
  }
}
 
export const store = new AppStore(); // Singleton
 
// ─── components/ProductoCard.js ───────────────
import { formatearMoneda } from "../utils/format.js";
import { store } from "../store/AppStore.js";
 
export function ProductoCard(producto) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.id = producto.id;
 
  card.innerHTML = \`
    <img src="\${producto.imagen}" alt="\${producto.nombre}" loading="lazy" />
    <div class="card__body">
      <h3 class="card__title">\${producto.nombre}</h3>
      <p class="card__precio">\${formatearMoneda(producto.precio)}</p>
      <button class="btn btn--primary btn-agregar" data-id="\${producto.id}">
        Agregar al carrito
      </button>
    </div>
  \`;
 
  card.querySelector(".btn-agregar").addEventListener("click", () => {
    store.agregarAlCarrito(producto);
 
    // Feedback visual
    const btn = card.querySelector(".btn-agregar");
    btn.textContent = "✓ Agregado";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = "Agregar al carrito";
      btn.disabled = false;
    }, 1500);
  });
 
  return card;
}
 
// ─── components/CarritoWidget.js ─────────────
import { store } from "../store/AppStore.js";
import { formatearMoneda } from "../utils/format.js";
 
export function CarritoWidget(contenedor) {
  function render() {
    const { carrito } = store.getEstado();
    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
 
    contenedor.innerHTML = \`
      <div class="carrito-badge">\${carrito.length}</div>
      <span>Total: \${formatearMoneda(total)}</span>
    \`;
  }
 
  // Reaccionar a cambios en el carrito
  const cleanup = store.on("carrito:actualizado", render);
 
  render(); // Render inicial
 
  return { cleanup }; // Expone cleanup para cuando el componente se destruye
}
 
// ─── services/ProductoService.js ─────────────
import { APIClient } from "../api/client.js";
import { store } from "../store/AppStore.js";
 
const api = new APIClient(import.meta.env.VITE_API_URL);
 
export const ProductoService = {
  async cargarTodos(filtros = {}) {
    store.setLoading(true);
    store.setError(null);
 
    try {
      const productos = await api.get("/productos", { params: filtros });
      store.setProductos(productos);
      return productos;
    } catch (error) {
      store.setError(error.message);
      throw error;
    } finally {
      store.setLoading(false);
    }
  },
};
 
// ─── main.js: punto de entrada ────────────────
import { store } from "./store/AppStore.js";
import { ProductoService } from "./services/ProductoService.js";
import { ProductoCard } from "./components/ProductoCard.js";
import { CarritoWidget } from "./components/CarritoWidget.js";
 
async function inicializar() {
  // Montar componentes
  const carritoContenedor = document.querySelector("#carrito");
  const { cleanup: cleanupCarrito } = CarritoWidget(carritoContenedor);
 
  const grid = document.querySelector("#productos-grid");
 
  // Suscribirse a cambios de productos para re-renderizar
  store.on("productos:cargados", (productos) => {
    grid.innerHTML = "";
    const fragment = document.createDocumentFragment();
    productos.forEach(p => fragment.append(ProductoCard(p)));
    grid.append(fragment);
  });
 
  store.on("ui:error", ({ message }) => {
    document.querySelector("#error-banner").textContent = message;
    document.querySelector("#error-banner").hidden = false;
  });
 
  // Cargar datos
  await ProductoService.cargarTodos();
}
 
document.addEventListener("DOMContentLoaded", inicializar);`,
      practicalTips: [
        "Un EventEmitter centralizado (Pub/Sub) es la forma más simple de comunicación entre módulos sin frameworks. React lo hace internamente con su sistema de contexto y estado.",
        "Siempre retorna las claves de cleanup de event listeners y subscriptions. En SPAs con enrutamiento manual, necesitas limpiar cuando la 'página' se desmonta.",
        "Los barrel files (index.js que re-exporta todo) simplifican los imports. Pero cuidado con las importaciones circulares que generan.",
        "El patrón de store con EventEmitter que usamos aquí es conceptualmente muy similar a cómo funciona Redux o Zustand, solo sin el tooling.",
      ],
      commonMistakes: [
        "Mezclar lógica de UI con lógica de negocio en el mismo archivo. El render no debe hacer fetch, y el servicio no debe tocar el DOM.",
        "No limpiar suscripciones al EventEmitter cuando el componente se destruye. Causa memory leaks y callbacks ejecutándose en elementos que ya no están en el DOM.",
        "Mutar el estado directamente en lugar de usar las funciones del store. Hace que los cambios sean imposibles de rastrear y los suscriptores no se notifican.",
        "Crear un dios-objeto (god object) que hace todo. Divide por responsabilidades: un archivo para estado, uno para llamadas API, uno por componente.",
      ],
    },

    //SQL beginner
    {
      name: "Modelo relacional y fundamentos de SQL",
      slug: "sql-relational-model",
      level: "BEGINNER" as const,
      subjectId: sqlId,
      description: "Comprende qué es una base de datos relacional, cómo se organiza en tablas, filas y columnas, y la estructura básica de una consulta SELECT con WHERE, ORDER BY y LIMIT.",
      whyMatters: "El modelo relacional es la base de todo. Sin entender cómo se relacionan las tablas y cómo se estructura una consulta SQL, los JOINs, subqueries y optimizaciones no tienen sentido.",
      explanation: `Una base de datos relacional organiza los datos en tablas (relaciones), donde:
- Cada **tabla** representa una entidad (usuarios, productos, órdenes).
- Cada **fila** (tupla) es una instancia de esa entidad.
- Cada **columna** (atributo) es una propiedad de la entidad.
- La **clave primaria (PK)** identifica de forma única cada fila.
- La **clave foránea (FK)** referencia la PK de otra tabla, creando la relación.
 
**Tipos de datos comunes:**
- \`INTEGER / BIGINT\` — números enteros.
- \`DECIMAL(p, s) / NUMERIC\` — números decimales exactos (dinero, precios).
- \`VARCHAR(n)\` — texto variable hasta n caracteres.
- \`TEXT\` — texto sin límite fijo.
- \`BOOLEAN\` — true/false.
- \`DATE / TIMESTAMP / TIMESTAMPTZ\` — fechas y tiempos.
- \`UUID\` — identificadores únicos universales.
- \`JSONB\` — JSON binario (PostgreSQL).
 
**Anatomía de un SELECT:**
\`\`\`sql
SELECT columnas
FROM tabla
WHERE condición
ORDER BY columna [ASC|DESC]
LIMIT n OFFSET m;
\`\`\`
 
El orden lógico de evaluación (no de escritura):
1. FROM — qué tabla(s).
2. WHERE — filtrar filas.
3. SELECT — qué columnas retornar.
4. ORDER BY — ordenar.
5. LIMIT/OFFSET — paginar.
 
**Operadores en WHERE:**
Comparación: \`=\`, \`<>\` (o \`!=\`), \`<\`, \`>\`, \`<=\`, \`>=\`.
Lógicos: \`AND\`, \`OR\`, \`NOT\`.
Rango: \`BETWEEN a AND b\`.
Lista: \`IN (val1, val2)\`, \`NOT IN\`.
Nulos: \`IS NULL\`, \`IS NOT NULL\`.
Texto: \`LIKE 'patrón%'\`, \`ILIKE\` (case-insensitive en PostgreSQL).`,
      codeExample: `-- Base de datos de ejemplo: e-commerce
-- Tabla usuarios
CREATE TABLE usuarios (
  id          SERIAL PRIMARY KEY,
  email       VARCHAR(255) NOT NULL UNIQUE,
  nombre      VARCHAR(100) NOT NULL,
  pais        VARCHAR(50)  DEFAULT 'Colombia',
  activo      BOOLEAN      DEFAULT true,
  creado_en   TIMESTAMP    DEFAULT NOW()
);
 
-- SELECT básico
SELECT * FROM usuarios;
 
-- Columnas específicas con alias
SELECT
  id,
  nombre,
  email,
  creado_en AS fecha_registro
FROM usuarios;
 
-- WHERE con múltiples condiciones
SELECT nombre, email, pais
FROM usuarios
WHERE activo = true
  AND pais IN ('Colombia', 'México', 'Argentina')
  AND creado_en >= '2024-01-01';
 
-- LIKE para búsqueda de texto
SELECT nombre, email
FROM usuarios
WHERE email ILIKE '%@gmail.com'   -- Case-insensitive
  OR nombre LIKE 'Mar%';          -- Empieza con 'Mar'
 
-- IS NULL
SELECT nombre, email
FROM usuarios
WHERE telefono IS NULL;
 
-- ORDER BY y LIMIT
SELECT nombre, email, creado_en
FROM usuarios
WHERE activo = true
ORDER BY creado_en DESC
LIMIT 10 OFFSET 20;  -- Página 3 de 10 resultados por página
 
-- BETWEEN
SELECT nombre, creado_en
FROM usuarios
WHERE creado_en BETWEEN '2024-01-01' AND '2024-12-31';
 
-- Columnas calculadas
SELECT
  nombre,
  UPPER(email) AS email_mayusculas,
  LENGTH(nombre) AS longitud_nombre,
  NOW() - creado_en AS tiempo_en_plataforma
FROM usuarios;`,
      practicalTips: [
        "Nunca uses SELECT * en producción. Especifica las columnas que necesitas: mejora la performance y hace el código más legible.",
        "ILIKE es de PostgreSQL (case-insensitive LIKE). En MySQL usa LIKE que ya es case-insensitive por defecto según el collation.",
        "OFFSET es ineficiente en tablas grandes: debe leer y descartar las primeras N filas. Para paginación en producción usa cursor-based pagination con WHERE id > ultimo_id.",
        "El orden de escritura SQL (SELECT, FROM, WHERE) difiere del orden de evaluación. Entender la evaluación lógica es clave para escribir consultas correctas.",
      ],
      commonMistakes: [
        "Comparar con NULL usando = en lugar de IS NULL. NULL = NULL siempre es NULL (desconocido), nunca true.",
        "Confundir el orden de escritura con el orden de evaluación. No puedes usar un alias de SELECT en el WHERE porque WHERE se evalúa antes.",
        "Olvidar que LIKE es case-sensitive en PostgreSQL. Usa ILIKE para búsquedas insensibles a mayúsculas.",
        "Usar OFFSET grande para paginación. En tablas de millones de filas, OFFSET 1000000 escanea y descarta un millón de filas.",
      ],
    },
 
    // ─── MÓDULO 2: JOINs ──────────────────────────────────────────────────────
    {
      name: "JOINs: INNER, LEFT, RIGHT y FULL OUTER",
      slug: "sql-joins",
      level: "BEGINNER" as const,
      subjectId: sqlId,
      description: "Domina todos los tipos de JOIN para combinar datos de múltiples tablas: INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN, CROSS JOIN y self-joins, con sus casos de uso y diferencias.",
      whyMatters: "Los JOINs son la operación más importante de SQL y la razón de ser del modelo relacional. El 80% de las consultas reales en producción involucran al menos un JOIN. Entenderlos mal produce resultados incorrectos silenciosamente.",
      explanation: `Un JOIN combina filas de dos o más tablas basándose en una condición de relación (generalmente FK = PK).
 
**INNER JOIN:**
Retorna solo las filas que tienen coincidencia en AMBAS tablas. Las filas sin coincidencia se excluyen de ambos lados.
 
**LEFT JOIN (LEFT OUTER JOIN):**
Retorna TODAS las filas de la tabla izquierda, con los datos de la derecha donde exista coincidencia, o NULL donde no. Útil para encontrar registros sin relación.
 
**RIGHT JOIN (RIGHT OUTER JOIN):**
Inverso del LEFT JOIN. Retorna todas las filas de la tabla derecha. Rara vez necesario: generalmente se reescribe como LEFT JOIN cambiando el orden de las tablas.
 
**FULL OUTER JOIN:**
Retorna todas las filas de ambas tablas, con NULL donde no hay coincidencia en el otro lado.
 
**CROSS JOIN:**
Producto cartesiano: combina cada fila de la izquierda con cada fila de la derecha. Sin condición ON. N x M filas resultantes.
 
**Self JOIN:**
Una tabla joined consigo misma. Útil para estructuras jerárquicas (empleado-manager, categoría-subcategoría).
 
**Múltiples JOINs:**
Se pueden encadenar: tabla A JOIN tabla B JOIN tabla C. El resultado del primer JOIN se usa como entrada del siguiente.
 
**ON vs USING:**
- \`ON t1.col = t2.col\` — forma general, permite cualquier condición.
- \`USING (col)\` — cuando la columna tiene el mismo nombre en ambas tablas; elimina la columna duplicada del resultado.`,
      codeExample: `-- Esquema de referencia
-- usuarios (id, nombre, email)
-- productos (id, nombre, precio, categoria_id)
-- ordenes (id, usuario_id, total, estado, creado_en)
-- orden_items (id, orden_id, producto_id, cantidad, precio_unitario)
 
-- INNER JOIN: solo usuarios que tienen órdenes
SELECT
  u.nombre,
  u.email,
  COUNT(o.id) AS total_ordenes,
  SUM(o.total) AS gasto_total
FROM usuarios u
INNER JOIN ordenes o ON u.id = o.usuario_id
GROUP BY u.id, u.nombre, u.email
ORDER BY gasto_total DESC;
 
-- LEFT JOIN: TODOS los usuarios, con o sin órdenes
SELECT
  u.nombre,
  u.email,
  COUNT(o.id) AS total_ordenes  -- 0 para usuarios sin órdenes
FROM usuarios u
LEFT JOIN ordenes o ON u.id = o.usuario_id
GROUP BY u.id, u.nombre, u.email;
 
-- Encontrar usuarios SIN ninguna orden (patrón anti-join)
SELECT u.nombre, u.email
FROM usuarios u
LEFT JOIN ordenes o ON u.id = o.usuario_id
WHERE o.id IS NULL;  -- NULL en la FK significa que no hubo coincidencia
 
-- Múltiples JOINs: productos vendidos con su categoría
SELECT
  p.nombre AS producto,
  c.nombre AS categoria,
  SUM(oi.cantidad) AS unidades_vendidas,
  SUM(oi.cantidad * oi.precio_unitario) AS ingresos
FROM orden_items oi
INNER JOIN productos p ON oi.producto_id = p.id
INNER JOIN categorias c ON p.categoria_id = c.id
INNER JOIN ordenes o ON oi.orden_id = o.id
WHERE o.estado = 'completada'
  AND o.creado_en >= NOW() - INTERVAL '30 days'
GROUP BY p.id, p.nombre, c.nombre
ORDER BY ingresos DESC;
 
-- FULL OUTER JOIN: ver qué hay en cada lado sin match
SELECT
  u.nombre AS usuario,
  e.nombre AS empresa
FROM usuarios u
FULL OUTER JOIN empresas e ON u.empresa_id = e.id
WHERE u.id IS NULL OR e.id IS NULL;  -- Solo los que no tienen match
 
-- Self JOIN: empleados con su manager
SELECT
  e.nombre AS empleado,
  m.nombre AS manager
FROM empleados e
LEFT JOIN empleados m ON e.manager_id = m.id;
 
-- USING cuando las columnas tienen el mismo nombre
SELECT u.nombre, o.total
FROM usuarios u
JOIN ordenes o USING (id);  -- Solo si ambas tienen columna 'id' referenciándose`,
      practicalTips: [
        "El patrón LEFT JOIN ... WHERE lado_derecho.id IS NULL es el más eficiente para encontrar registros sin relación (anti-join).",
        "En JOINs múltiples, ordena los JOINs de la tabla más grande a las más pequeñas cuando sea posible. El optimizador de la mayoría de DBs lo reordena automáticamente, pero ayuda a la legibilidad.",
        "Siempre usa alias de tabla (u, o, p) en queries con JOINs. Hace el código mucho más legible y evita ambigüedades.",
        "INNER JOIN y JOIN son sinónimos. LEFT JOIN y LEFT OUTER JOIN también. El OUTER es opcional en la mayoría de DBs.",
      ],
      commonMistakes: [
        "Confundir INNER JOIN con LEFT JOIN y obtener resultados que excluyen datos importantes silenciosamente.",
        "Hacer JOIN sin condición ON (o con condición incorrecta) produciendo un producto cartesiano accidental con millones de filas.",
        "No usar alias cuando hay columnas con el mismo nombre en múltiples tablas. La columna 'id' en el resultado es ambigua.",
        "Filtrar en WHERE en lugar de ON en un LEFT JOIN. Mover condiciones al WHERE convierte efectivamente el LEFT JOIN en INNER JOIN.",
      ],
    },
 
    // ─── MÓDULO 3: Agregaciones y GROUP BY ────────────────────────────────────
    {
      name: "Funciones de agregación y GROUP BY",
      slug: "sql-aggregations-groupby",
      level: "BEGINNER" as const,
      subjectId: sqlId,
      description: "Aprende a resumir datos con funciones de agregación (COUNT, SUM, AVG, MIN, MAX) y a agrupar resultados con GROUP BY y filtrarlos con HAVING.",
      whyMatters: "Las agregaciones son la base del análisis de datos en SQL. Toda pregunta de negocio ('¿cuánto vendimos?', '¿cuál es el producto más popular?') se responde con GROUP BY y funciones de agregación.",
      explanation: `**Funciones de agregación:**
Calculan un valor único a partir de un conjunto de filas.
 
- \`COUNT(*)\` — total de filas (incluyendo NULLs).
- \`COUNT(columna)\` — filas donde la columna NO es NULL.
- \`COUNT(DISTINCT columna)\` — valores únicos no nulos.
- \`SUM(columna)\` — suma (ignora NULLs).
- \`AVG(columna)\` — promedio (ignora NULLs).
- \`MIN(columna)\` — valor mínimo.
- \`MAX(columna)\` — valor máximo.
- \`STRING_AGG(columna, separador)\` — concatena strings (PostgreSQL).
- \`ARRAY_AGG(columna)\` — agrupa valores en un array (PostgreSQL).
 
**GROUP BY:**
Divide las filas en grupos según los valores de las columnas especificadas. Cada grupo produce una fila en el resultado. Las funciones de agregación se aplican a cada grupo.
 
**Regla fundamental:** En un SELECT con GROUP BY, cada columna del SELECT debe ser:
1. Una columna incluida en el GROUP BY, O
2. Una función de agregación.
 
**HAVING:**
Filtra grupos (como WHERE pero sobre el resultado del GROUP BY). Se evalúa después de GROUP BY.
- WHERE filtra filas antes de agrupar.
- HAVING filtra grupos después de agrupar.
 
**Orden de evaluación:**
1. FROM / JOIN
2. WHERE
3. GROUP BY
4. HAVING
5. SELECT
6. ORDER BY
7. LIMIT`,
      codeExample: `-- COUNT básico
SELECT COUNT(*) AS total_usuarios FROM usuarios;
SELECT COUNT(telefono) AS usuarios_con_tel FROM usuarios; -- Excluye NULLs
SELECT COUNT(DISTINCT pais) AS paises_distintos FROM usuarios;
 
-- GROUP BY simple
SELECT
  pais,
  COUNT(*) AS total_usuarios,
  COUNT(CASE WHEN activo THEN 1 END) AS usuarios_activos
FROM usuarios
GROUP BY pais
ORDER BY total_usuarios DESC;
 
-- Agregaciones con JOINs
SELECT
  u.nombre,
  COUNT(o.id)              AS total_ordenes,
  SUM(o.total)             AS gasto_total,
  AVG(o.total)             AS ticket_promedio,
  MIN(o.total)             AS orden_minima,
  MAX(o.total)             AS orden_maxima,
  MAX(o.creado_en)         AS ultima_compra
FROM usuarios u
LEFT JOIN ordenes o ON u.id = o.usuario_id
GROUP BY u.id, u.nombre
HAVING COUNT(o.id) > 0         -- Solo usuarios con al menos una orden
ORDER BY gasto_total DESC
LIMIT 10;
 
-- HAVING vs WHERE
SELECT
  categoria_id,
  COUNT(*) AS total_productos,
  AVG(precio) AS precio_promedio
FROM productos
WHERE activo = true             -- Filtra FILAS antes de agrupar
GROUP BY categoria_id
HAVING AVG(precio) > 50000      -- Filtra GRUPOS después de agrupar
  AND COUNT(*) >= 5;
 
-- Ventas por mes
SELECT
  DATE_TRUNC('month', creado_en) AS mes,
  COUNT(*)                       AS total_ordenes,
  SUM(total)                     AS ingresos,
  AVG(total)                     AS ticket_promedio
FROM ordenes
WHERE estado = 'completada'
  AND creado_en >= NOW() - INTERVAL '12 months'
GROUP BY DATE_TRUNC('month', creado_en)
ORDER BY mes;
 
-- STRING_AGG: agrupar productos por categoría
SELECT
  c.nombre AS categoria,
  STRING_AGG(p.nombre, ', ' ORDER BY p.nombre) AS productos,
  COUNT(p.id) AS total
FROM categorias c
JOIN productos p ON c.id = p.categoria_id
GROUP BY c.id, c.nombre;
 
-- ROLLUP: subtotales y total general
SELECT
  pais,
  ciudad,
  COUNT(*) AS usuarios
FROM usuarios
GROUP BY ROLLUP(pais, ciudad)
ORDER BY pais NULLS LAST, ciudad NULLS LAST;`,
      practicalTips: [
        "COUNT(*) cuenta todas las filas incluyendo NULLs. COUNT(columna) excluye NULLs. Elige según lo que necesitas medir.",
        "Puedes usar HAVING sin GROUP BY: se aplica a toda la tabla como un solo grupo. Raramente útil pero válido.",
        "DATE_TRUNC('month', fecha) es la forma idiomática de agrupar por mes en PostgreSQL. Trunca a inicio del mes.",
        "Si necesitas filtrar tanto antes como después de agrupar, usa WHERE para las condiciones sobre filas y HAVING para las condiciones sobre grupos.",
      ],
      commonMistakes: [
        "Poner columnas en SELECT que no están en GROUP BY ni son agregaciones. Produce error en PostgreSQL (modo estricto), resultado indeterminado en MySQL.",
        "Usar WHERE para filtrar sobre el resultado de una agregación (WHERE COUNT(*) > 5). Eso es HAVING.",
        "Olvidar que AVG y SUM ignoran NULLs. Si necesitas tratar NULL como 0, usa COALESCE: SUM(COALESCE(valor, 0)).",
        "Agrupar por el ID cuando quieres agrupar por nombre. GROUP BY u.id es correcto si el nombre puede no ser único, pero GROUP BY u.nombre falla si dos usuarios tienen el mismo nombre.",
      ],
    },
 
    // ─── MÓDULO 4: Subqueries y CTEs ──────────────────────────────────────────
    {
      name: "Subqueries y Common Table Expressions (CTEs)",
      slug: "sql-subqueries-ctes",
      level: "BEGINNER" as const,
      subjectId: sqlId,
      description: "Aprende a escribir consultas dentro de consultas (subqueries escalares, en FROM, en WHERE con IN/EXISTS) y a organizar consultas complejas con CTEs (WITH) para mayor legibilidad y reutilización.",
      whyMatters: "Las subqueries y CTEs permiten resolver problemas que no se pueden expresar en un solo SELECT. Los CTEs son la herramienta más importante para escribir SQL legible y mantenible en producción.",
      explanation: `**Subqueries (consultas anidadas):**
Una consulta SQL dentro de otra consulta.
 
**Tipos por posición:**
1. **En SELECT (escalar):** retorna exactamente un valor (1 fila, 1 columna). Error si retorna más de una fila.
2. **En FROM (derived table):** actúa como una tabla virtual. Requiere alias.
3. **En WHERE con IN:** \`WHERE id IN (SELECT id FROM ...)\`.
4. **En WHERE con EXISTS:** \`WHERE EXISTS (SELECT 1 FROM ... WHERE condición)\`. Más eficiente que IN para subqueries grandes; se detiene en la primera coincidencia.
5. **Correlacionada:** referencia columnas de la consulta exterior. Se evalúa una vez por cada fila del exterior (puede ser lenta).
 
**IN vs EXISTS:**
- IN: carga todos los valores en memoria y compara. Lento con subqueries que retornan muchas filas. Problemas con NULLs.
- EXISTS: evalúa la subquery por cada fila, para cuando encuentra la primera coincidencia. Más eficiente para tablas grandes. No tiene problemas con NULLs.
 
**CTEs (Common Table Expressions):**
Consultas nombradas con la cláusula WITH. Se definen antes del SELECT principal y se pueden referenciar como si fueran tablas.
 
Ventajas sobre subqueries:
- Legibilidad: cada CTE tiene un nombre descriptivo.
- Reutilización: un CTE puede referenciarse múltiples veces en la misma query.
- Depuración: se pueden probar individualmente.
- CTEs recursivos: para estructuras jerárquicas.
 
**CTEs recursivos:**
Un CTE que se referencia a sí mismo. Tiene una parte base (no recursiva) y una parte recursiva unida con UNION ALL.`,
      codeExample: `-- Subquery escalar en SELECT
SELECT
  nombre,
  total,
  (SELECT AVG(total) FROM ordenes WHERE estado = 'completada') AS promedio_general,
  total - (SELECT AVG(total) FROM ordenes WHERE estado = 'completada') AS diff_promedio
FROM ordenes
WHERE estado = 'completada';
 
-- Subquery en FROM (derived table)
SELECT
  categoria,
  total_productos,
  RANK() OVER (ORDER BY total_productos DESC) AS ranking
FROM (
  SELECT
    c.nombre AS categoria,
    COUNT(p.id) AS total_productos
  FROM categorias c
  JOIN productos p ON c.id = p.categoria_id
  GROUP BY c.id, c.nombre
) AS resumen_categorias
WHERE total_productos >= 5;
 
-- IN vs EXISTS
-- IN: obtener usuarios que compraron en el último mes
SELECT nombre, email
FROM usuarios
WHERE id IN (
  SELECT DISTINCT usuario_id
  FROM ordenes
  WHERE creado_en >= NOW() - INTERVAL '30 days'
    AND estado = 'completada'
);
 
-- EXISTS: equivalente pero más eficiente en tablas grandes
SELECT u.nombre, u.email
FROM usuarios u
WHERE EXISTS (
  SELECT 1
  FROM ordenes o
  WHERE o.usuario_id = u.id
    AND o.creado_en >= NOW() - INTERVAL '30 days'
    AND o.estado = 'completada'
);
 
-- NOT EXISTS: usuarios que NUNCA han comprado
SELECT u.nombre, u.email
FROM usuarios u
WHERE NOT EXISTS (
  SELECT 1 FROM ordenes o WHERE o.usuario_id = u.id
);
 
-- ─── CTEs ────────────────────────────────────────────────────────────
-- Sin CTEs: difícil de leer
SELECT u.nombre, resumen.total_ordenes, resumen.gasto
FROM usuarios u
JOIN (
  SELECT usuario_id, COUNT(*) AS total_ordenes, SUM(total) AS gasto
  FROM ordenes WHERE estado = 'completada'
  GROUP BY usuario_id
  HAVING COUNT(*) > 3
) resumen ON u.id = resumen.usuario_id
WHERE resumen.gasto > 500000;
 
-- Con CTEs: legible y estructurado
WITH clientes_activos AS (
  SELECT
    usuario_id,
    COUNT(*)   AS total_ordenes,
    SUM(total) AS gasto_total,
    MAX(creado_en) AS ultima_compra
  FROM ordenes
  WHERE estado = 'completada'
  GROUP BY usuario_id
  HAVING COUNT(*) > 3
),
top_clientes AS (
  SELECT
    u.nombre,
    u.email,
    ca.total_ordenes,
    ca.gasto_total,
    ca.ultima_compra
  FROM usuarios u
  JOIN clientes_activos ca ON u.id = ca.usuario_id
  WHERE ca.gasto_total > 500000
)
SELECT
  nombre,
  email,
  total_ordenes,
  gasto_total,
  ultima_compra,
  RANK() OVER (ORDER BY gasto_total DESC) AS ranking
FROM top_clientes
ORDER BY gasto_total DESC;
 
-- CTE recursivo: jerarquía de categorías
WITH RECURSIVE jerarquia AS (
  -- Caso base: categorías raíz
  SELECT id, nombre, padre_id, 0 AS nivel, nombre::TEXT AS ruta
  FROM categorias
  WHERE padre_id IS NULL
 
  UNION ALL
 
  -- Caso recursivo: hijos de cada categoría
  SELECT c.id, c.nombre, c.padre_id, j.nivel + 1, (j.ruta || ' > ' || c.nombre)
  FROM categorias c
  JOIN jerarquia j ON c.padre_id = j.id
)
SELECT nivel, ruta, nombre
FROM jerarquia
ORDER BY ruta;`,
      practicalTips: [
        "Prefiere CTEs sobre subqueries anidadas cuando la query tiene más de 2 niveles. La legibilidad impacta directamente en el mantenimiento.",
        "EXISTS es más eficiente que IN cuando la subquery puede retornar muchas filas. EXISTS para en la primera coincidencia; IN carga todo en memoria.",
        "En PostgreSQL, los CTEs no materializados por defecto (desde v12) son reescritos por el optimizador. Usa WITH ... AS MATERIALIZED si necesitas forzar la materialización.",
        "Para debug de CTEs complejos, selecciona solo el CTE problemático cambiando el SELECT final a SELECT * FROM nombre_cte.",
      ],
      commonMistakes: [
        "Subquery escalar que retorna más de una fila. PostgreSQL lanza error; MySQL retorna el primer valor silenciosamente.",
        "Usar IN con subqueries que pueden retornar NULL. NULL IN (1, 2, NULL) es NULL (desconocido), no true ni false. Prefiere EXISTS.",
        "CTEs correlacionados en bucle. Si un CTE referencia otro y ese referencia el primero, es un error. Los CTEs se evalúan en orden.",
        "Creer que los CTEs siempre mejoran el performance. A veces una subquery directa es más rápida porque el optimizador puede hacer mejores decisiones.",
      ],
    },
 
    // ─── MÓDULO 5: INSERT, UPDATE, DELETE y transacciones ─────────────────────
    {
      name: "Modificación de datos: INSERT, UPDATE, DELETE y transacciones",
      slug: "sql-dml-transactions",
      level: "BEGINNER" as const,
      subjectId: sqlId,
      description: "Aprende a insertar, actualizar y eliminar datos de forma segura con transacciones ACID, el uso de RETURNING, upserts con ON CONFLICT, y los niveles de aislamiento de transacciones.",
      whyMatters: "Las transacciones son lo que hace las bases de datos relacionales confiables. Entender ACID y los niveles de aislamiento evita bugs críticos como dinero que se duplica o se pierde en sistemas financieros.",
      explanation: `**INSERT:**
- \`INSERT INTO tabla (cols) VALUES (...)\` — inserta una fila.
- \`INSERT INTO tabla (cols) VALUES (...), (...)\` — inserta múltiples filas en un solo statement (más eficiente).
- \`INSERT INTO tabla SELECT ...\` — inserta desde un SELECT.
- \`RETURNING\` — retorna las columnas de las filas insertadas (PostgreSQL). Útil para obtener el ID generado.
 
**UPDATE:**
- \`UPDATE tabla SET col = valor WHERE condición\` — actualiza filas.
- Sin WHERE: actualiza TODAS las filas (casi siempre un error).
- \`UPDATE ... FROM\` — actualiza basándose en datos de otra tabla (PostgreSQL).
- \`RETURNING\` — retorna las filas actualizadas.
 
**DELETE:**
- \`DELETE FROM tabla WHERE condición\` — elimina filas que cumplen la condición.
- Sin WHERE: elimina TODAS las filas.
- \`TRUNCATE TABLE tabla\` — elimina todas las filas de forma más rápida (sin log por fila, no dispara triggers).
- \`RETURNING\` — retorna las filas eliminadas.
 
**ON CONFLICT (Upsert en PostgreSQL):**
Maneja conflictos de clave única: inserta si no existe, actualiza si ya existe.
 
**Transacciones ACID:**
- **Atomicidad:** todo o nada. Si algo falla, todo se revierte.
- **Consistencia:** la DB pasa de un estado válido a otro válido.
- **Aislamiento:** transacciones concurrentes no se interfieren entre sí.
- **Durabilidad:** una vez confirmada, la transacción persiste.
 
**Comandos de transacción:**
- \`BEGIN\` — inicia la transacción.
- \`COMMIT\` — confirma todos los cambios.
- \`ROLLBACK\` — revierte todos los cambios.
- \`SAVEPOINT nombre\` — punto de restauración parcial.
- \`ROLLBACK TO SAVEPOINT nombre\` — revierte hasta el savepoint.`,
      codeExample: `-- INSERT básico
INSERT INTO usuarios (email, nombre, pais)
VALUES ('ana@email.com', 'Ana García', 'Colombia');
 
-- INSERT múltiple (más eficiente que N inserts individuales)
INSERT INTO productos (nombre, precio, categoria_id, stock)
VALUES
  ('Laptop Dell', 3500000, 1, 15),
  ('Mouse Logitech', 85000, 2, 100),
  ('Teclado Mecánico', 250000, 2, 50);
 
-- RETURNING: obtener el ID generado
INSERT INTO ordenes (usuario_id, total, estado)
VALUES (1, 450000, 'pendiente')
RETURNING id, creado_en;
 
-- INSERT desde SELECT
INSERT INTO archivo_ordenes (orden_id, usuario_id, total, archivado_en)
SELECT id, usuario_id, total, NOW()
FROM ordenes
WHERE creado_en < NOW() - INTERVAL '1 year'
  AND estado = 'completada';
 
-- ON CONFLICT (Upsert): insertar o actualizar
INSERT INTO inventario (producto_id, stock, ultima_actualizacion)
VALUES (42, 100, NOW())
ON CONFLICT (producto_id)
DO UPDATE SET
  stock = inventario.stock + EXCLUDED.stock,
  ultima_actualizacion = NOW();
 
-- ON CONFLICT DO NOTHING: ignorar duplicados
INSERT INTO suscripciones (usuario_id, newsletter)
VALUES (1, 'promo')
ON CONFLICT (usuario_id, newsletter) DO NOTHING;
 
-- UPDATE básico
UPDATE productos
SET precio = precio * 1.10,  -- Aumentar 10%
    actualizado_en = NOW()
WHERE categoria_id = 1
  AND activo = true
RETURNING id, nombre, precio;
 
-- UPDATE desde otra tabla
UPDATE productos p
SET stock = i.stock_nuevo
FROM importacion_inventario i
WHERE p.sku = i.sku;
 
-- DELETE con condición
DELETE FROM sesiones
WHERE expira_en < NOW()
RETURNING id, usuario_id;  -- Ver qué se eliminó
 
-- TRUNCATE (rápido pero sin RETURNING)
TRUNCATE TABLE cache_temporal;
 
-- ─── TRANSACCIONES ──────────────────────────────────────────
-- Transferencia bancaria (debe ser atómica)
BEGIN;
 
  -- Debitar cuenta origen
  UPDATE cuentas
  SET saldo = saldo - 500000
  WHERE id = 1 AND saldo >= 500000;
 
  -- Verificar que se actualizó (saldo suficiente)
  -- En aplicación: si rowcount = 0, hacer ROLLBACK
 
  -- Acreditar cuenta destino
  UPDATE cuentas
  SET saldo = saldo + 500000
  WHERE id = 2;
 
  -- Registrar la transacción
  INSERT INTO movimientos (origen_id, destino_id, monto, tipo)
  VALUES (1, 2, 500000, 'transferencia');
 
COMMIT;  -- Solo si todo fue bien
-- En caso de error en la aplicación: ROLLBACK
 
-- SAVEPOINT: rollback parcial
BEGIN;
 
  INSERT INTO ordenes (usuario_id, total) VALUES (1, 100000);
 
  SAVEPOINT antes_de_items;
 
  INSERT INTO orden_items (orden_id, producto_id, cantidad)
  VALUES (LASTVAL(), 999, 1);  -- producto_id 999 no existe → error FK
 
  -- Si hay error, revertir solo hasta el savepoint
  ROLLBACK TO SAVEPOINT antes_de_items;
 
  -- La orden sigue existiendo, solo fallaron los items
  INSERT INTO orden_items (orden_id, producto_id, cantidad)
  VALUES (LASTVAL(), 1, 1);  -- Este sí existe
 
COMMIT;`,
      practicalTips: [
        "Siempre usa WHERE en UPDATE y DELETE. Una buena práctica: primero escribe el SELECT con el mismo WHERE para verificar qué filas afectarás.",
        "RETURNING es uno de los features más útiles de PostgreSQL. Elimina la necesidad de un SELECT adicional para obtener el ID o los datos actualizados.",
        "ON CONFLICT (upsert) es más eficiente que un SELECT seguido de INSERT o UPDATE. Evita race conditions en inserciones concurrentes.",
        "En transacciones largas, usa SAVEPOINT para poder hacer rollback parcial sin perder todo el trabajo.",
      ],
      commonMistakes: [
        "UPDATE o DELETE sin WHERE. El error más catastrófico en SQL. Algunos DBA usan 'safe mode' que requiere WHERE con PK.",
        "No usar transacciones para operaciones que deben ser atómicas (transferencias, creación de orden + items). Una falla parcial deja la DB en estado inconsistente.",
        "TRUNCATE vs DELETE: TRUNCATE es más rápido pero no dispara triggers, no puede tener WHERE, y en algunos casos no puede hacerse ROLLBACK.",
        "Confundir ON CONFLICT con ON DUPLICATE KEY (MySQL). La sintaxis y comportamiento difieren entre bases de datos.",
      ],
    },
 
    // ─── MÓDULO 6: Diseño de esquemas y DDL ────────────────────────────────────
    {
      name: "Diseño de esquemas relacionales y DDL",
      slug: "sql-schema-design-ddl",
      level: "BEGINNER" as const,
      subjectId: sqlId,
      description: "Aprende a diseñar esquemas relacionales correctos: normalización (1NF, 2NF, 3NF), constraints (PK, FK, UNIQUE, CHECK, NOT NULL), y los comandos DDL para crear y modificar la estructura de la base de datos.",
      whyMatters: "Un mal diseño de esquema es el problema más caro de corregir: requiere migraciones complejas, puede causar inconsistencias de datos imposibles de recuperar, y degrada el performance. La normalización y los constraints son la primera línea de defensa de la integridad de datos.",
      explanation: `**Normalización:**
Proceso de organizar las tablas para reducir redundancia e inconsistencias.
 
- **1NF (Primera Forma Normal):** cada columna tiene valores atómicos (un solo valor, no listas); cada fila es única. No hay grupos repetidos de columnas.
- **2NF (Segunda Forma Normal):** cumple 1NF + cada columna no-clave depende de TODA la clave primaria (relevante cuando la PK es compuesta).
- **3NF (Tercera Forma Normal):** cumple 2NF + ninguna columna no-clave depende de otra columna no-clave (no hay dependencias transitivas).
 
**Constraints (restricciones):**
Reglas que la base de datos enforza automáticamente para garantizar integridad.
 
- \`PRIMARY KEY\` — identifica únicamente cada fila. Implica NOT NULL + UNIQUE.
- \`FOREIGN KEY\` — garantiza que el valor referenciado existe en la tabla padre.
- \`UNIQUE\` — no permite valores duplicados en la columna o combinación de columnas.
- \`NOT NULL\` — la columna no puede ser NULL.
- \`CHECK\` — condición booleana que debe cumplirse: \`CHECK (precio > 0)\`.
- \`DEFAULT\` — valor por defecto cuando no se especifica.
 
**ON DELETE / ON UPDATE en FK:**
Qué hacer cuando se elimina o actualiza la fila padre.
- \`CASCADE\` — propaga la operación a las filas hijas.
- \`RESTRICT\` — previene la operación si hay filas hijas.
- \`SET NULL\` — pone NULL en la FK de las filas hijas.
- \`SET DEFAULT\` — pone el valor por defecto.
- \`NO ACTION\` — similar a RESTRICT pero deferido.
 
**DDL (Data Definition Language):**
- \`CREATE TABLE\` — crear tabla.
- \`ALTER TABLE\` — modificar tabla (agregar/eliminar columnas, constraints).
- \`DROP TABLE\` — eliminar tabla.
- \`CREATE INDEX\` — crear índice.
- \`CREATE VIEW\` — crear vista.`,
      codeExample: `-- ─── DISEÑO DE ESQUEMA E-COMMERCE ──────────────────────────────
 
-- Tabla de usuarios con constraints
CREATE TABLE usuarios (
  id          BIGSERIAL PRIMARY KEY,
  email       VARCHAR(255) NOT NULL UNIQUE,
  nombre      VARCHAR(100) NOT NULL,
  telefono    VARCHAR(20),
  pais        CHAR(2)      NOT NULL DEFAULT 'CO',
  activo      BOOLEAN      NOT NULL DEFAULT true,
  creado_en   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  actualizado_en TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 
  CONSTRAINT email_formato CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);
 
-- Categorías con jerarquía (self-referential FK)
CREATE TABLE categorias (
  id        SERIAL PRIMARY KEY,
  nombre    VARCHAR(100) NOT NULL,
  slug      VARCHAR(100) NOT NULL UNIQUE,
  padre_id  INTEGER REFERENCES categorias(id) ON DELETE SET NULL
);
 
-- Productos
CREATE TABLE productos (
  id           BIGSERIAL PRIMARY KEY,
  sku          VARCHAR(50)    NOT NULL UNIQUE,
  nombre       VARCHAR(200)   NOT NULL,
  descripcion  TEXT,
  precio       DECIMAL(12, 2) NOT NULL CHECK (precio > 0),
  precio_oferta DECIMAL(12, 2) CHECK (precio_oferta > 0 AND precio_oferta < precio),
  stock        INTEGER        NOT NULL DEFAULT 0 CHECK (stock >= 0),
  categoria_id INTEGER        NOT NULL REFERENCES categorias(id),
  activo       BOOLEAN        NOT NULL DEFAULT true,
  creado_en    TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
 
  CONSTRAINT precio_oferta_check CHECK (
    precio_oferta IS NULL OR precio_oferta < precio
  )
);
 
-- Órdenes (cabecera)
CREATE TABLE ordenes (
  id           BIGSERIAL PRIMARY KEY,
  usuario_id   BIGINT         NOT NULL REFERENCES usuarios(id),
  estado       VARCHAR(20)    NOT NULL DEFAULT 'pendiente'
                CHECK (estado IN ('pendiente', 'pagada', 'enviada', 'completada', 'cancelada')),
  subtotal     DECIMAL(12, 2) NOT NULL CHECK (subtotal >= 0),
  descuento    DECIMAL(12, 2) NOT NULL DEFAULT 0 CHECK (descuento >= 0),
  impuestos    DECIMAL(12, 2) NOT NULL DEFAULT 0 CHECK (impuestos >= 0),
  total        DECIMAL(12, 2) NOT NULL CHECK (total >= 0),
  notas        TEXT,
  creado_en    TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  actualizado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
 
-- Items de orden (tabla de unión con datos propios)
CREATE TABLE orden_items (
  id               BIGSERIAL PRIMARY KEY,
  orden_id         BIGINT         NOT NULL REFERENCES ordenes(id) ON DELETE CASCADE,
  producto_id      BIGINT         NOT NULL REFERENCES productos(id),
  cantidad         INTEGER        NOT NULL CHECK (cantidad > 0),
  precio_unitario  DECIMAL(12, 2) NOT NULL CHECK (precio_unitario > 0),
  descuento_item   DECIMAL(12, 2) NOT NULL DEFAULT 0,
 
  UNIQUE (orden_id, producto_id)  -- Un producto una vez por orden
);
 
-- ─── ALTER TABLE: modificaciones ───────────────────────────
-- Agregar columna
ALTER TABLE usuarios ADD COLUMN avatar_url TEXT;
 
-- Agregar constraint
ALTER TABLE usuarios
ADD CONSTRAINT nombre_min_length CHECK (LENGTH(TRIM(nombre)) >= 2);
 
-- Eliminar constraint
ALTER TABLE usuarios DROP CONSTRAINT email_formato;
 
-- Renombrar columna
ALTER TABLE usuarios RENAME COLUMN telefono TO numero_telefono;
 
-- Cambiar tipo (con conversión)
ALTER TABLE productos
ALTER COLUMN precio TYPE NUMERIC(14, 2);
 
-- ─── VIEWS ───────────────────────────────────────────────────
-- Vista: resumen de productos con categoría
CREATE VIEW v_productos_completo AS
SELECT
  p.id,
  p.sku,
  p.nombre,
  p.precio,
  p.precio_oferta,
  p.stock,
  c.nombre AS categoria,
  p.activo
FROM productos p
JOIN categorias c ON p.categoria_id = c.id;
 
-- Uso de la vista (se comporta como una tabla)
SELECT * FROM v_productos_completo WHERE categoria = 'Electrónica';`,
      practicalTips: [
        "Diseña pensando en las queries que necesitarás, no solo en las entidades. Una tabla perfectamente normalizada puede ser inútil si las queries comunes son muy lentas.",
        "Usa DECIMAL para dinero, nunca FLOAT o DOUBLE. Los tipos de punto flotante tienen errores de precisión (0.1 + 0.2 ≠ 0.3).",
        "ON DELETE CASCADE es conveniente pero peligroso. Un DELETE accidental en la tabla padre puede borrar miles de filas en cascada silenciosamente.",
        "Los constraints CHECK son la segunda línea de defensa después de la validación en la aplicación. Son críticos para datos que podrían insertarse por otras vías (scripts, otros servicios).",
      ],
      commonMistakes: [
        "Usar VARCHAR para todo incluyendo países, estados, categorías que tienen un conjunto fijo de valores. Mejor usa CHECK con lista o una tabla de referencia.",
        "No normalizar correctamente y guardar múltiples valores en una columna (ej: 'tag1,tag2,tag3'). Imposible hacer WHERE eficiente sobre eso.",
        "Olvidar las FKs entre tablas. Sin FK, puedes tener orden_items que referencian productos que no existen.",
        "Usar ON DELETE CASCADE indiscriminadamente. A veces es mejor ON DELETE RESTRICT para prevenir borrados accidentales.",
      ],
    },
 
    // ─── MÓDULO 7: Índices y performance básica ───────────────────────────────
    {
      name: "Índices y optimización básica de queries",
      slug: "sql-indexes-performance",
      level: "BEGINNER" as const,
      subjectId: sqlId,
      description: "Aprende cómo funcionan los índices B-tree, cuándo crearlos, cómo interpretar EXPLAIN ANALYZE, y los patrones básicos para optimizar queries lentas.",
      whyMatters: "Un query que tarda 10 segundos sin índice puede tardar 10 milisegundos con el índice correcto. Entender los índices es la habilidad de performance más impactante en bases de datos relacionales.",
      explanation: `**¿Qué es un índice?**
Una estructura de datos auxiliar (generalmente B-tree) que permite encontrar filas rápidamente sin escanear toda la tabla.
 
Sin índice: el motor hace un **Sequential Scan** (tabla completa). O(n).
Con índice: el motor hace un **Index Scan**. O(log n).
 
**Tipos de índice en PostgreSQL:**
- **B-tree (default):** para comparaciones (=, <, >, BETWEEN, IN, LIKE 'prefix%'). El más común.
- **Hash:** solo para igualdad (=). Más rápido que B-tree para igualdad pura pero no soporta rangos.
- **GiST / GIN:** para tipos de datos complejos (texto completo, arrays, JSON, geoespacial).
- **BRIN:** para columnas con correlación natural con el orden físico (timestamps de inserción).
 
**Cuándo crear un índice:**
- Columnas frecuentemente en WHERE.
- Columnas en JOIN ON.
- Columnas en ORDER BY (evita sort).
- FKs (PostgreSQL no los crea automáticamente como MySQL).
- Columnas de alta cardinalidad (muchos valores distintos).
 
**Cuándo NO crear un índice:**
- Tablas pequeñas (el seq scan es igual o más rápido).
- Columnas de baja cardinalidad (boolean, status con 3 valores): el índice no filtra suficiente.
- Tablas con muchos INSERT/UPDATE/DELETE (los índices se deben mantener).
 
**EXPLAIN y EXPLAIN ANALYZE:**
- \`EXPLAIN query\` — muestra el plan de ejecución estimado.
- \`EXPLAIN ANALYZE query\` — ejecuta la query y muestra tiempos reales.
- Buscar: Seq Scan en tablas grandes (señal de índice faltante), Nested Loop con tabla grande (puede necesitar índice o reescritura).
 
**Índices compuestos:**
Un índice en múltiples columnas. El orden importa: útil para queries que filtran por las primeras columnas del índice. Regla del prefijo: un índice (a, b, c) sirve para queries que filtran por (a), (a, b), o (a, b, c), pero NO para (b) o (c) solos.`,
      codeExample: `-- ─── CREAR ÍNDICES ──────────────────────────────────────────
 
-- Índice simple: queries frecuentes por email
CREATE INDEX idx_usuarios_email ON usuarios(email);
 
-- Índice en FK (importante en PostgreSQL)
CREATE INDEX idx_ordenes_usuario_id ON ordenes(usuario_id);
CREATE INDEX idx_orden_items_orden_id ON orden_items(orden_id);
CREATE INDEX idx_orden_items_producto_id ON orden_items(producto_id);
 
-- Índice compuesto: filtros frecuentes combinados
-- Sirve para: WHERE estado = ? AND creado_en > ?
-- También para: WHERE estado = ? (solo el primer campo)
CREATE INDEX idx_ordenes_estado_fecha ON ordenes(estado, creado_en DESC);
 
-- Índice parcial: solo las filas que cumplen la condición
-- Más pequeño y rápido que un índice completo
CREATE INDEX idx_ordenes_pendientes ON ordenes(creado_en)
WHERE estado = 'pendiente';
 
-- Índice único (también enforza unicidad como constraint)
CREATE UNIQUE INDEX idx_productos_sku ON productos(sku);
 
-- Índice para LIKE con prefijo
CREATE INDEX idx_usuarios_nombre ON usuarios(nombre varchar_pattern_ops);
-- Permite: WHERE nombre LIKE 'Mar%' (solo prefijo, no sufijo)
 
-- ─── EXPLAIN ANALYZE ─────────────────────────────────────────
 
-- Ver el plan de ejecución
EXPLAIN ANALYZE
SELECT u.nombre, COUNT(o.id) AS total
FROM usuarios u
JOIN ordenes o ON u.id = o.usuario_id
WHERE o.creado_en >= NOW() - INTERVAL '30 days'
GROUP BY u.id, u.nombre;
 
-- Output típico a interpretar:
-- Hash Aggregate  (cost=1234.56..1345.67 rows=100 width=200)
--   ->  Hash Join  (cost=... rows=1000 ...)
--         Hash Cond: (o.usuario_id = u.id)
--         ->  Index Scan using idx_ordenes_fecha on ordenes
--               Index Cond: (creado_en >= ...)
--               Actual rows: 5432, time=0.123ms
--         ->  Seq Scan on usuarios
--               Actual rows: 10000, time=2.3ms  ← puede necesitar índice
 
-- ─── PATRONES DE OPTIMIZACIÓN ────────────────────────────────
 
-- ❌ SLOW: función en columna indexada (el índice no se usa)
SELECT * FROM ordenes
WHERE EXTRACT(YEAR FROM creado_en) = 2024;
 
-- ✅ FAST: condición que permite usar el índice
SELECT * FROM ordenes
WHERE creado_en >= '2024-01-01' AND creado_en < '2025-01-01';
 
-- ❌ SLOW: LIKE con wildcard al inicio (no usa índice B-tree)
SELECT * FROM productos WHERE nombre LIKE '%laptop%';
 
-- ✅ FAST para búsqueda de texto: usar índice GIN con pg_trgm
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_productos_nombre_trgm ON productos USING gin(nombre gin_trgm_ops);
SELECT * FROM productos WHERE nombre ILIKE '%laptop%';  -- Ahora usa el índice
 
-- ❌ SLOW: SELECT * trae columnas innecesarias
SELECT * FROM ordenes WHERE estado = 'pendiente';
 
-- ✅ FAST: index-only scan si todas las columnas están en el índice
CREATE INDEX idx_ordenes_estado_id ON ordenes(estado, id, creado_en);
SELECT id, creado_en FROM ordenes WHERE estado = 'pendiente';
 
-- Ver índices de una tabla
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'ordenes';
 
-- Ver tamaño de índices
SELECT
  indexname,
  pg_size_pretty(pg_relation_size(indexname::regclass)) AS tamaño
FROM pg_indexes
WHERE tablename = 'ordenes'
ORDER BY pg_relation_size(indexname::regclass) DESC;`,
      practicalTips: [
        "Crea índices en todas las FKs en PostgreSQL. MySQL los crea automáticamente; PostgreSQL no. Sin ellos, los JOINs hacen seq scan en la tabla hija.",
        "EXPLAIN ANALYZE es tu mejor herramienta. Úsalo antes de cualquier optimización y compara el resultado. No adivines, mide.",
        "Los índices parciales (WHERE en el CREATE INDEX) son mucho más eficientes cuando solo un subconjunto de filas es consultado frecuentemente.",
        "Demasiados índices ralentizan INSERT/UPDATE/DELETE porque cada índice debe actualizarse. Crea solo los que realmente usas.",
      ],
      commonMistakes: [
        "Aplicar funciones a columnas indexadas en WHERE: WHERE UPPER(email) = 'ANA@EMAIL.COM' no usa el índice en email. Crea un índice funcional o guarda el dato normalizado.",
        "Crear índices en columnas de baja cardinalidad (boolean, estado con 3 valores). El optimizer prefiere seq scan cuando el índice filtraría más del 5-10% de filas.",
        "No crear índices en las FKs (especialmente en PostgreSQL). Los JOINs y los ON DELETE CHECK de FK hacen seq scan sin ellos.",
        "Usar LIKE '%término%' esperando usar el índice B-tree. El wildcard al inicio desactiva el índice. Usa índices GIN con pg_trgm para búsqueda de texto.",
      ],
    },
 
    // ─── MÓDULO 8: Window functions y SQL analítico ───────────────────────────
    {
      name: "Window functions: análisis sin perder el detalle de filas",
      slug: "sql-window-functions",
      level: "BEGINNER" as const,
      subjectId: sqlId,
      description: "Domina las window functions de SQL: ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, FIRST_VALUE, LAST_VALUE, y las cláusulas PARTITION BY, ORDER BY y ROWS/RANGE para análisis de datos avanzado.",
      whyMatters: "Las window functions son la diferencia entre SQL básico y SQL analítico de producción. Resuelven problemas que con GROUP BY requieren múltiples subqueries o self-joins costosos: ranking, running totals, comparaciones con períodos anteriores, top-N por categoría.",
      explanation: `**¿Qué son las window functions?**
Calculan un valor para cada fila basándose en un conjunto de filas relacionadas (la "ventana"), sin colapsar las filas como GROUP BY. La fila permanece en el resultado.
 
**Sintaxis:**
\`función() OVER (PARTITION BY ... ORDER BY ... ROWS/RANGE ...)\`
 
**PARTITION BY:** divide las filas en grupos (como GROUP BY pero sin colapsar). La función se calcula independientemente para cada partición.
 
**ORDER BY:** define el orden dentro de la partición. Requerido para funciones de ranking y navegación.
 
**Frame (ROWS/RANGE):** define qué filas de la partición incluye la ventana relativa a la fila actual.
- \`ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\` — desde el inicio hasta la fila actual.
- \`ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING\` — 2 filas antes y 2 después.
 
**Funciones de ranking:**
- \`ROW_NUMBER()\` — número único por fila (sin empates): 1, 2, 3, 4.
- \`RANK()\` — ranking con huecos en empates: 1, 2, 2, 4.
- \`DENSE_RANK()\` — ranking sin huecos en empates: 1, 2, 2, 3.
- \`NTILE(n)\` — divide en n grupos de tamaño similar (percentiles, cuartiles).
- \`PERCENT_RANK()\` — posición relativa entre 0 y 1.
- \`CUME_DIST()\` — distribución acumulativa.
 
**Funciones de navegación:**
- \`LAG(col, n, default)\` — valor de n filas anteriores.
- \`LEAD(col, n, default)\` — valor de n filas posteriores.
- \`FIRST_VALUE(col)\` — primer valor de la ventana.
- \`LAST_VALUE(col)\` — último valor (requiere frame ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING).
- \`NTH_VALUE(col, n)\` — n-ésimo valor de la ventana.
 
**Funciones de agregación como window:**
Cualquier función de agregación (SUM, AVG, COUNT, MIN, MAX) puede usarse como window function para running totals, moving averages, etc.`,
      codeExample: `-- ─── RANKING ─────────────────────────────────────────────────
 
-- Top 3 productos por ventas dentro de cada categoría
WITH ventas_producto AS (
  SELECT
    p.nombre,
    c.nombre AS categoria,
    SUM(oi.cantidad * oi.precio_unitario) AS ingresos
  FROM orden_items oi
  JOIN productos p ON oi.producto_id = p.id
  JOIN categorias c ON p.categoria_id = c.id
  GROUP BY p.id, p.nombre, c.nombre
)
SELECT *
FROM (
  SELECT
    nombre,
    categoria,
    ingresos,
    RANK() OVER (PARTITION BY categoria ORDER BY ingresos DESC) AS ranking_categoria,
    DENSE_RANK() OVER (ORDER BY ingresos DESC) AS ranking_global
  FROM ventas_producto
) ranked
WHERE ranking_categoria <= 3;
 
-- ROW_NUMBER para deduplicación (quedarse con el registro más reciente)
WITH duplicados AS (
  SELECT
    *,
    ROW_NUMBER() OVER (
      PARTITION BY email
      ORDER BY creado_en DESC
    ) AS rn
  FROM usuarios
)
SELECT * FROM duplicados WHERE rn = 1;
 
-- NTILE: dividir clientes en cuartiles de gasto
SELECT
  u.nombre,
  gasto_total,
  NTILE(4) OVER (ORDER BY gasto_total) AS cuartil,
  CASE NTILE(4) OVER (ORDER BY gasto_total)
    WHEN 4 THEN 'Top 25%'
    WHEN 3 THEN 'Alto'
    WHEN 2 THEN 'Medio'
    WHEN 1 THEN 'Bajo'
  END AS segmento
FROM usuarios u
JOIN (
  SELECT usuario_id, SUM(total) AS gasto_total
  FROM ordenes WHERE estado = 'completada'
  GROUP BY usuario_id
) g ON u.id = g.usuario_id;
 
-- ─── NAVEGACIÓN ──────────────────────────────────────────────
 
-- LAG/LEAD: comparar ventas mes a mes
WITH ventas_mensuales AS (
  SELECT
    DATE_TRUNC('month', creado_en) AS mes,
    SUM(total) AS ingresos
  FROM ordenes
  WHERE estado = 'completada'
  GROUP BY DATE_TRUNC('month', creado_en)
)
SELECT
  mes,
  ingresos,
  LAG(ingresos, 1, 0) OVER (ORDER BY mes) AS ingresos_mes_anterior,
  ingresos - LAG(ingresos, 1, 0) OVER (ORDER BY mes) AS variacion,
  ROUND(
    (ingresos - LAG(ingresos, 1) OVER (ORDER BY mes))
    / LAG(ingresos, 1) OVER (ORDER BY mes) * 100,
    2
  ) AS variacion_pct
FROM ventas_mensuales
ORDER BY mes;
 
-- ─── AGREGACIONES ACUMULATIVAS ───────────────────────────────
 
-- Running total y moving average
SELECT
  DATE_TRUNC('day', creado_en) AS dia,
  COUNT(*) AS ordenes_dia,
  SUM(COUNT(*)) OVER (
    ORDER BY DATE_TRUNC('day', creado_en)
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS ordenes_acumuladas,
  AVG(SUM(total)) OVER (
    ORDER BY DATE_TRUNC('day', creado_en)
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW  -- Media móvil 7 días
  ) AS ingresos_media_movil_7d
FROM ordenes
WHERE estado = 'completada'
GROUP BY DATE_TRUNC('day', creado_en)
ORDER BY dia;
 
-- Porcentaje del total y del grupo
SELECT
  p.nombre AS producto,
  c.nombre AS categoria,
  SUM(oi.cantidad * oi.precio_unitario) AS ingresos,
  SUM(SUM(oi.cantidad * oi.precio_unitario)) OVER () AS total_general,
  SUM(SUM(oi.cantidad * oi.precio_unitario)) OVER (PARTITION BY c.id) AS total_categoria,
  ROUND(
    SUM(oi.cantidad * oi.precio_unitario)
    / SUM(SUM(oi.cantidad * oi.precio_unitario)) OVER () * 100, 2
  ) AS pct_total,
  ROUND(
    SUM(oi.cantidad * oi.precio_unitario)
    / SUM(SUM(oi.cantidad * oi.precio_unitario)) OVER (PARTITION BY c.id) * 100, 2
  ) AS pct_categoria
FROM orden_items oi
JOIN productos p ON oi.producto_id = p.id
JOIN categorias c ON p.categoria_id = c.id
GROUP BY p.id, p.nombre, c.id, c.nombre
ORDER BY ingresos DESC;`,
      practicalTips: [
        "Las window functions se evalúan después del WHERE y GROUP BY pero antes del HAVING externo. Úsalas en CTEs si necesitas filtrar por su resultado.",
        "LAST_VALUE por defecto solo llega hasta la fila actual, no hasta el final de la partición. Siempre agrega ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING.",
        "Para el patrón 'top N por grupo' usa ROW_NUMBER() en un CTE y luego filtra WHERE rn <= N en la query exterior.",
        "Cuando necesites múltiples window functions con el mismo OVER(), usa WINDOW para nombrar la ventana y reutilizarla.",
      ],
      commonMistakes: [
        "Intentar filtrar por el resultado de una window function en el WHERE de la misma query. El WHERE se evalúa antes. Usa un CTE o subquery.",
        "LAST_VALUE retornando el valor actual en vez del último. El frame por defecto no incluye todas las filas hasta el final de la partición.",
        "Confundir RANK y DENSE_RANK. RANK deja huecos (1,2,2,4), DENSE_RANK no (1,2,2,3). Para competiciones usa RANK; para rangos sin huecos usa DENSE_RANK.",
        "Usar window functions cuando GROUP BY es suficiente. Si no necesitas el detalle de fila, GROUP BY es más eficiente.",
      ],
    },
 
    // ─── MÓDULO 9: Proyecto ───────────────────────────────────────────────────
    {
      name: "SQL en aplicaciones: buenas prácticas y patrones de producción",
      slug: "sql-production-patterns",
      level: "BEGINNER" as const,
      subjectId: sqlId,
      description: "Aprende los patrones SQL esenciales para producción: prevención de SQL injection con queries parametrizadas, paginación eficiente, migraciones de base de datos, y el diseño de queries analíticas complejas.",
      whyMatters: "Saber SQL no es suficiente: hay que saber usarlo de forma segura y mantenible en una aplicación real. SQL injection es una de las vulnerabilidades más explotadas. Las migraciones son la forma profesional de evolucionar el esquema sin riesgos.",
      explanation: `**SQL Injection y queries parametrizadas:**
SQL injection ocurre cuando input de usuario se concatena directamente en una query SQL, permitiendo al atacante modificar la query. Es la vulnerabilidad #1 en aplicaciones web según OWASP.
 
La solución es usar **parámetros bind** (placeholders): \`$1, $2\` en PostgreSQL, \`?\` en MySQL. El driver de la DB escapa los valores automáticamente.
 
Nunca construir queries con string concatenation cuando hay input de usuario.
 
**Paginación eficiente (Cursor-based):**
OFFSET es ineficiente en tablas grandes. La paginación por cursor usa WHERE id > ultimo_id para ir directo a la página correcta sin descartar filas.
 
**Migraciones de base de datos:**
Los cambios de esquema en producción se manejan con archivos de migración versionados (herramientas: Flyway, Liquibase, Prisma Migrate, node-pg-migrate).
 
Principios:
- Cada migración es un archivo con timestamp: 001_crear_usuarios.sql, 002_agregar_campo_telefono.sql.
- Las migraciones son incrementales e irreversibles (salvo que incluyas el "down migration").
- Siempre hacer migraciones con backward compatibility: agregar columnas nullable primero, luego llenarlas, luego hacerlas NOT NULL.
- NUNCA modificar una migración ya ejecutada en producción.
 
**Patrones de queries analíticas:**
- **Cohortes:** agrupar usuarios por fecha de registro y ver su comportamiento en el tiempo.
- **Funnel:** medir cuántos usuarios completan cada paso de un proceso.
- **Retención:** qué porcentaje de usuarios vuelve después de X días.`,
      codeExample: `-- ─── SQL INJECTION: NUNCA vs SIEMPRE ────────────────────────
 
-- ❌ VULNERABLE: concatenación directa (NUNCA hacer esto)
-- const query = \`SELECT * FROM usuarios WHERE email = '\${userInput}'\`;
-- Si userInput = "' OR '1'='1", la query retorna TODOS los usuarios
 
-- ✅ SEGURO: query parametrizada (siempre)
-- En Node.js con pg:
-- const result = await pool.query(
--   'SELECT * FROM usuarios WHERE email = $1',
--   [userInput]
-- );
 
-- ✅ SEGURO: múltiples parámetros
-- await pool.query(
--   'INSERT INTO usuarios (email, nombre) VALUES ($1, $2)',
--   [email, nombre]
-- );
 
-- ─── PAGINACIÓN EFICIENTE ─────────────────────────────────────
 
-- ❌ LENTO para páginas grandes: OFFSET escanea y descarta
SELECT id, nombre, creado_en
FROM usuarios
ORDER BY id
LIMIT 20 OFFSET 100000;  -- Lee 100020 filas, descarta 100000
 
-- ✅ RÁPIDO: cursor-based pagination
SELECT id, nombre, creado_en
FROM usuarios
WHERE id > 100000  -- Último ID de la página anterior
ORDER BY id
LIMIT 20;
 
-- Paginación bidireccional con cursor
-- Primera página:
SELECT id, nombre, creado_en FROM usuarios ORDER BY id LIMIT 20;
 
-- Siguiente página (cursor = último id de la respuesta anterior):
SELECT id, nombre, creado_en
FROM usuarios
WHERE id > :ultimo_id
ORDER BY id
LIMIT 20;
 
-- ─── QUERIES ANALÍTICAS ──────────────────────────────────────
 
-- Análisis de cohortes: retención de usuarios
WITH cohortes AS (
  SELECT
    u.id AS usuario_id,
    DATE_TRUNC('month', u.creado_en) AS cohorte
  FROM usuarios u
),
actividad AS (
  SELECT
    o.usuario_id,
    DATE_TRUNC('month', o.creado_en) AS mes_actividad
  FROM ordenes o
  WHERE o.estado = 'completada'
  GROUP BY o.usuario_id, DATE_TRUNC('month', o.creado_en)
)
SELECT
  c.cohorte,
  COUNT(DISTINCT c.usuario_id) AS tamaño_cohorte,
  COUNT(DISTINCT CASE
    WHEN a.mes_actividad = c.cohorte THEN c.usuario_id
  END) AS activos_mes_0,
  COUNT(DISTINCT CASE
    WHEN a.mes_actividad = c.cohorte + INTERVAL '1 month' THEN c.usuario_id
  END) AS activos_mes_1,
  COUNT(DISTINCT CASE
    WHEN a.mes_actividad = c.cohorte + INTERVAL '2 months' THEN c.usuario_id
  END) AS activos_mes_2,
  COUNT(DISTINCT CASE
    WHEN a.mes_actividad = c.cohorte + INTERVAL '3 months' THEN c.usuario_id
  END) AS activos_mes_3
FROM cohortes c
LEFT JOIN actividad a ON c.usuario_id = a.usuario_id
WHERE c.cohorte >= NOW() - INTERVAL '6 months'
GROUP BY c.cohorte
ORDER BY c.cohorte;
 
-- Funnel de conversión: registro → primera visita → primera compra
WITH funnel AS (
  SELECT
    COUNT(DISTINCT u.id)                          AS registrados,
    COUNT(DISTINCT s.usuario_id)                  AS con_sesion,
    COUNT(DISTINCT o.usuario_id)                  AS con_primera_orden,
    COUNT(DISTINCT CASE WHEN o2.cnt > 1
      THEN o.usuario_id END)                      AS compradores_recurrentes
  FROM usuarios u
  LEFT JOIN sesiones s ON u.id = s.usuario_id
  LEFT JOIN ordenes o ON u.id = o.usuario_id
    AND o.estado = 'completada'
  LEFT JOIN (
    SELECT usuario_id, COUNT(*) AS cnt FROM ordenes
    WHERE estado = 'completada' GROUP BY usuario_id
  ) o2 ON u.id = o2.usuario_id
  WHERE u.creado_en >= NOW() - INTERVAL '90 days'
)
SELECT
  registrados,
  con_sesion,
  ROUND(con_sesion::numeric / registrados * 100, 1) AS pct_sesion,
  con_primera_orden,
  ROUND(con_primera_orden::numeric / registrados * 100, 1) AS pct_primera_orden,
  compradores_recurrentes,
  ROUND(compradores_recurrentes::numeric / NULLIF(con_primera_orden, 0) * 100, 1) AS pct_recurrentes
FROM funnel;
 
-- ─── MIGRACIÓN EJEMPLO ────────────────────────────────────────
 
-- 003_agregar_campo_telefono.sql
-- Paso 1: agregar nullable (backward compatible, no rompe nada)
ALTER TABLE usuarios ADD COLUMN telefono VARCHAR(20);
 
-- Paso 2: poblar datos (en una migración separada si es costoso)
UPDATE usuarios SET telefono = '000-000-0000' WHERE telefono IS NULL;
 
-- Paso 3: hacer NOT NULL (una vez que todos los datos están)
ALTER TABLE usuarios ALTER COLUMN telefono SET NOT NULL;
ALTER TABLE usuarios ALTER COLUMN telefono SET DEFAULT '000-000-0000';`,
      practicalTips: [
        "Nunca concatenes input de usuario en SQL. Siempre usa parámetros bind, sin excepción. Un solo punto vulnerable es suficiente para comprometer toda la base de datos.",
        "Versiona todas las migraciones con timestamp en el nombre de archivo. Nunca modifiques una migración que ya fue ejecutada en producción.",
        "Para reportes y análisis de producción, usa una réplica de lectura (read replica) para no impactar el performance de la base de datos principal.",
        "Divide las migraciones complejas en pasos pequeños y backward-compatible. Una migración de 'agregar NOT NULL' en una tabla de millones de filas sin pasos intermedios puede bloquear la tabla por minutos.",
      ],
      commonMistakes: [
        "Construir queries SQL con string concatenation o interpolación cuando hay input de usuario. Es SQL injection garantizado.",
        "Ejecutar migraciones destructivas (DROP COLUMN, cambio de tipo) sin verificar que la aplicación ya no usa esas columnas.",
        "Usar OFFSET para paginación en producción. Página 1000 de 20 registros requiere leer y descartar 20000 filas.",
        "No usar transacciones en migraciones que tienen múltiples ALTER TABLE. Si algo falla a mitad, el esquema queda en estado inconsistente.",
      ],
    },
    // ─── MÓDULO 1: Qué es Git y cómo funciona internamente ───────────────────────
  {
    name: "Qué es Git y cómo funciona internamente",
    slug: "git-internals",
    level: "BEGINNER" as const,
    subjectId: gitId,
    description: "Entiende qué es Git, por qué existe y cómo organiza la información internamente para registrar el historial de un proyecto.",
    whyMatters: "Entender el modelo interno de Git evita que lo uses como una caja negra. Cuando algo sale mal, sabes exactamente dónde buscar y por qué ocurrió.",
    explanation: `Git es un sistema de control de versiones distribuido. Su trabajo es registrar cada cambio que ocurre en los archivos de un proyecto, permitiendo recuperar cualquier versión anterior y trabajar en paralelo con otros desarrolladores sin pisar el trabajo ajeno.

A diferencia de guardar copias manuales de archivos, Git almacena instantáneas completas del proyecto en cada punto de guardado. Estas instantáneas se llaman commits.

Internamente, Git organiza todo en tres áreas:

1. Working directory: los archivos que ves y editas en tu computador.
2. Staging area (índice): una zona intermedia donde preparas los cambios que quieres guardar en el próximo commit.
3. Repository (.git): la base de datos interna de Git, donde vive todo el historial.

El flujo básico es: editas archivos en el working directory, seleccionas cuáles cambios incluir con \`git add\` (los mueves al staging), y luego los guardas definitivamente con \`git commit\`.

Git también es distribuido, lo que significa que cada desarrollador tiene una copia completa del historial en su propia máquina. No depende de un servidor central para funcionar.`,
    codeExample: `# Inicializar un repositorio Git en una carpeta existente
git init

# Ver en qué estado están los archivos
git status

# Ver el historial de commits
git log --oneline`,
    practicalTips: [
      "Ejecuta git status constantemente. Es el comando más útil para orientarte en cualquier momento.",
      "La carpeta .git que Git crea al hacer git init contiene todo el historial. Borrarla equivale a borrar el control de versiones completo del proyecto.",
      "Git no requiere conexión a internet para funcionar. La sincronización con servidores como GitHub es un paso adicional y opcional.",
    ],
    commonMistakes: [
      "Confundir Git con GitHub. Git es la herramienta local; GitHub es un servicio en la nube para alojar repositorios Git.",
      "Ejecutar git init dentro de una carpeta que ya es un repositorio Git, creando repositorios anidados.",
    ],
    resources: JSON.stringify([
      { type: "article", title: "Git - About Version Control", url: "https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control" },
      { type: "article", title: "Git Internal Objects", url: "https://git-scm.com/book/en/v2/Git-Internals-Git-Objects" },
    ]),
  },

  // ─── MÓDULO 2: Commits: registrar cambios con significado ────────────────────
  {
    name: "Commits: registrar cambios con significado",
    slug: "git-commits",
    level: "BEGINNER" as const,
    subjectId: gitId,
    description: "Aprende a crear commits que cuenten la historia del proyecto de forma clara: qué cambió, cuándo y por qué.",
    whyMatters: "Un historial de commits bien escrito es la diferencia entre un proyecto mantenible y uno donde nadie entiende qué pasó hace tres semanas. En equipos, es la primera señal de profesionalismo.",
    explanation: `Un commit es una instantánea del proyecto en un momento determinado. Cada commit tiene un identificador único (hash SHA-1), el autor, la fecha y un mensaje que describe qué cambió.

El proceso para crear un commit siempre sigue dos pasos:

1. Agregar los cambios al staging con \`git add\`
2. Confirmar esos cambios con \`git commit\`

El mensaje de commit es lo más importante. Un buen mensaje explica qué se hizo y por qué, no cómo. El estándar más usado en la industria es Conventional Commits, que sigue esta estructura:

\`tipo(alcance): descripción corta\`

Los tipos más comunes son:
- feat: nueva funcionalidad
- fix: corrección de un error
- docs: cambios en documentación
- refactor: cambios en el código que no agregan ni corrigen nada visible

Cada commit debe representar una unidad lógica de trabajo. Si estás arreglando un error y añadiendo una funcionalidad al mismo tiempo, deberían ser dos commits separados.`,
    codeExample: `# Agregar todos los archivos modificados al staging
git add .

# Agregar un archivo específico
git add src/index.js

# Crear un commit con mensaje
git commit -m "feat(auth): add login form validation"

# Ver el historial de commits
git log --oneline

# Ver qué cambió en el último commit
git show HEAD`,
    practicalTips: [
      "Haz commits pequeños y frecuentes. Es más fácil revertir un cambio pequeño que deshacer horas de trabajo mezclado en un solo commit.",
      "Escribe el mensaje en imperativo y en inglés si trabajas en equipos internacionales: 'add feature' en lugar de 'added feature' o 'se agregó feature'.",
      "Usa git add -p para revisar cada cambio antes de incluirlo en el staging. Evita commits accidentales.",
    ],
    commonMistakes: [
      "Usar mensajes genéricos como 'fix', 'changes' o 'wip'. Estos mensajes no aportan información cuando revisas el historial semanas después.",
      "Mezclar cambios no relacionados en un solo commit. Dificulta hacer code review y revertir cambios específicos.",
      "Hacer git add . sin revisar qué archivos se están incluyendo, comprometiendo archivos de configuración local o credenciales.",
    ],
    resources: JSON.stringify([
      { type: "article", title: "Conventional Commits", url: "https://www.conventionalcommits.org/en/v1.0.0/" },
      { type: "article", title: "Git - Recording Changes to the Repository", url: "https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository" },
    ]),
  },

  // ─── MÓDULO 3: Branches, merge y resolución de conflictos ────────────────────
  {
    name: "Branches, merge y resolución de conflictos",
    slug: "git-branches-merge",
    level: "BEGINNER" as const,
    subjectId: gitId,
    description: "Aprende a crear líneas de trabajo independientes con branches, integrarlas con merge y resolver los conflictos que surgen cuando dos cambios se contradicen.",
    whyMatters: "El trabajo en equipo sin branches es imposible. Cada funcionalidad, corrección o experimento vive en su propia rama para no interferir con el trabajo de otros hasta que esté listo.",
    explanation: `Una branch (rama) es una línea de desarrollo independiente. Por defecto, Git crea una rama llamada \`main\` (o \`master\` en versiones antiguas). Cada nueva funcionalidad o corrección debería desarrollarse en su propia rama.

Cuando terminas el trabajo en una rama, la integras de vuelta a la rama principal mediante un merge. Git toma los commits de ambas ramas y los combina.

Existen dos tipos de merge:

1. Fast-forward: ocurre cuando la rama principal no tiene commits nuevos desde que creaste tu rama. Git simplemente mueve el puntero hacia adelante sin crear un commit adicional.
2. Merge commit: ocurre cuando ambas ramas tienen commits nuevos. Git crea un commit especial que une los dos historiales.

Los conflictos ocurren cuando dos personas modificaron la misma línea del mismo archivo en ramas distintas. Git no puede decidir cuál versión conservar, así que marca el archivo y espera que el desarrollador resuelva el conflicto manualmente.

Un conflicto se ve así en el archivo:
\`\`\`
<<<<<<< HEAD
tu versión del código
=======
la versión de la otra rama
>>>>>>> feature/login
\`\`\`

Para resolverlo, editas el archivo dejando solo la versión correcta, eliminas las marcas de conflicto, haces \`git add\` y luego \`git commit\`.`,
    codeExample: `# Crear una nueva rama y moverse a ella
git checkout -b feature/login

# Ver todas las ramas
git branch

# Volver a main
git checkout main

# Integrar la rama feature/login en main
git merge feature/login

# Eliminar la rama una vez integrada
git branch -d feature/login`,
    practicalTips: [
      "Nombra las ramas con un prefijo que indique su propósito: feature/, fix/, hotfix/, docs/.",
      "Antes de hacer merge, asegúrate de estar en la rama destino (main o develop), no en la rama origen.",
      "Cuando resuelvas un conflicto, compila o ejecuta el proyecto antes de hacer el commit para verificar que el resultado es correcto.",
    ],
    commonMistakes: [
      "Trabajar directamente en main en lugar de crear una rama para cada cambio.",
      "Olvidar hacer git checkout main antes de ejecutar git merge, terminando con merges en la rama equivocada.",
      "Eliminar una rama antes de confirmar que el merge fue exitoso.",
    ],
    resources: JSON.stringify([
      { type: "article", title: "Git - Basic Branching and Merging", url: "https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging" },
    ]),
  },

  // ─── MÓDULO 4: GitHub: repositorios remotos y colaboración ───────────────────
  {
    name: "GitHub: repositorios remotos y colaboración",
    slug: "git-github-remote",
    level: "BEGINNER" as const,
    subjectId: gitId,
    description: "Conecta tu repositorio local con GitHub, sincroniza cambios con push y pull, y aprende el flujo de colaboración mediante Pull Requests.",
    whyMatters: "GitHub es donde vive el trabajo en equipo. Saber sincronizar repositorios y gestionar Pull Requests es una habilidad diaria en cualquier trabajo de desarrollo.",
    explanation: `Un repositorio remoto es una copia del repositorio alojada en un servidor, accesible para todos los colaboradores del proyecto. GitHub es el servicio más usado para esto.

Los comandos fundamentales de sincronización son:

- \`git clone\`: descarga un repositorio remoto completo a tu máquina.
- \`git push\`: envía tus commits locales al repositorio remoto.
- \`git pull\`: descarga los commits nuevos del remoto y los integra en tu rama local.
- \`git fetch\`: descarga los cambios del remoto sin integrarlos automáticamente.

El flujo estándar de colaboración en GitHub se llama Pull Request (PR). Funciona así:

1. Creas una rama local para tu funcionalidad.
2. Haces commits con tus cambios.
3. Haces push de esa rama a GitHub.
4. Abres un Pull Request en GitHub pidiendo integrar tu rama en main.
5. Otros desarrolladores revisan el código (code review).
6. Una vez aprobado, el PR se mergea en main.

Este flujo garantiza que nadie introduce cambios directamente en main sin revisión.

La conexión entre tu repositorio local y el remoto se llama \`origin\` por convención. Puedes verificarla con \`git remote -v\`.`,
    codeExample: `# Clonar un repositorio de GitHub
git clone https://github.com/usuario/repositorio.git

# Ver los remotos configurados
git remote -v

# Enviar tu rama al remoto
git push origin feature/login

# Traer cambios del remoto e integrarlos
git pull origin main

# Solo descargar sin integrar
git fetch origin`,
    practicalTips: [
      "Haz git pull antes de empezar a trabajar cada día para tener la última versión del proyecto.",
      "El nombre origin es solo una convención. Puedes tener múltiples remotos con nombres distintos si trabajas con forks.",
      "Configura tu identidad antes del primer push: git config --global user.name y git config --global user.email.",
    ],
    commonMistakes: [
      "Hacer push directamente a main sin pasar por un Pull Request en proyectos de equipo.",
      "Ignorar los errores de git pull porque hay conflictos. Los conflictos deben resolverse antes de continuar.",
      "Confundir git fetch con git pull. Fetch solo descarga; pull descarga e integra.",
    ],
    resources: JSON.stringify([
      { type: "article", title: "GitHub Docs - About pull requests", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests" },
      { type: "article", title: "Git - Working with Remotes", url: "https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes" },
    ]),
  },

  // ─── MÓDULO 5: Rebase, stash y reescritura de historial ──────────────────────
  {
    name: "Rebase, stash y reescritura de historial",
    slug: "git-rebase-stash",
    level: "BEGINNER" as const,
    subjectId: gitId,
    description: "Aprende a mantener un historial limpio con rebase, a guardar trabajo temporal con stash y a corregir commits recientes antes de publicarlos.",
    whyMatters: "Un historial de Git limpio y lineal facilita las revisiones de código, la depuración y el trabajo con herramientas como git bisect. Rebase y stash son parte del flujo diario en equipos profesionales.",
    explanation: `Git ofrece herramientas para mantener el historial ordenado y manejar situaciones cotidianas del desarrollo.

**Rebase**
Rebase es una alternativa a merge. En lugar de crear un commit de fusión, rebase mueve los commits de tu rama y los aplica encima de otra rama, produciendo un historial lineal sin bifurcaciones.

La regla de oro: nunca hagas rebase de commits que ya publicaste en un repositorio compartido. Rebase reescribe el historial, y si otros ya tienen esos commits, generará conflictos graves.

**Stash**
Stash es un almacén temporal. Si estás a mitad de un cambio y necesitas cambiar de rama urgentemente sin hacer un commit incompleto, puedes guardar el trabajo en progreso con \`git stash\`, cambiar de rama, y luego recuperarlo con \`git stash pop\`.

**Corregir el último commit**
Si acabas de hacer un commit y te diste cuenta de que tiene un error en el mensaje o te faltó incluir un archivo, puedes corregirlo antes de hacer push con \`git commit --amend\`. Esto reescribe el commit más reciente.`,
    codeExample: `# Rebase de tu rama sobre main
git checkout feature/login
git rebase main

# Guardar trabajo en progreso temporalmente
git stash

# Ver lo que tienes guardado en el stash
git stash list

# Recuperar el último stash
git stash pop

# Corregir el mensaje o contenido del último commit
git commit --amend -m "feat(auth): fix login form validation message"`,
    practicalTips: [
      "Usa rebase para actualizar tu rama con los cambios de main antes de abrir un Pull Request. El historial queda más limpio que con merge.",
      "git stash push -m 'descripción' permite identificar el stash fácilmente si tienes varios guardados.",
      "Solo usa git commit --amend en commits que aún no has publicado con push.",
    ],
    commonMistakes: [
      "Hacer rebase de una rama que otros desarrolladores ya están usando. Esto reescribe el historial compartido y genera conflictos difíciles de resolver.",
      "Olvidar que git stash pop puede generar conflictos si la base del código cambió mientras el stash estaba guardado.",
      "Usar git commit --amend después de haber hecho push, obligando a un push forzado que puede sobrescribir el trabajo de otros.",
    ],
    resources: JSON.stringify([
      { type: "article", title: "Git - Rebasing", url: "https://git-scm.com/book/en/v2/Git-Branching-Rebasing" },
      { type: "article", title: "Git - Stashing and Cleaning", url: "https://git-scm.com/book/en/v2/Git-Tools-Stashing-and-Cleaning" },
    ]),
  },

  // ─── MÓDULO 6: Estrategias de branching: Git Flow y GitHub Flow ──────────────
  {
    name: "Estrategias de branching: Git Flow y GitHub Flow",
    slug: "git-branching-strategies",
    level: "BEGINNER" as const,
    subjectId: gitId,
    description: "Conoce los modelos de organización de ramas más usados en la industria y cuándo aplicar cada uno.",
    whyMatters: "Trabajar sin una estrategia de branching en un equipo genera caos: código roto en producción, conflictos constantes y nadie sabe qué está en qué estado. Los equipos profesionales siguen un modelo acordado.",
    explanation: `Una estrategia de branching es un conjunto de reglas que define cómo el equipo usa las ramas en Git. Las dos más usadas son Git Flow y GitHub Flow.

**GitHub Flow**
Es el modelo más simple y el más adoptado en equipos modernos. Tiene una sola regla fundamental: main siempre está en estado desplegable.

El flujo es:
1. Crea una rama desde main con un nombre descriptivo.
2. Haz commits en esa rama.
3. Abre un Pull Request.
4. El equipo revisa el código.
5. Se mergea en main y se despliega.

Es ideal para proyectos con deploys continuos y equipos pequeños o medianos.

**Git Flow**
Es un modelo más estructurado con ramas de larga duración:
- main: código en producción.
- develop: integración continua del trabajo en progreso.
- feature/*: nuevas funcionalidades (salen de develop, vuelven a develop).
- release/*: preparación de una versión para producción.
- hotfix/*: correcciones urgentes directamente sobre main.

Git Flow es útil cuando el producto tiene ciclos de releases programados y múltiples versiones en producción simultáneamente. Para la mayoría de proyectos web modernos con deploys continuos, GitHub Flow es suficiente y más simple.`,
    codeExample: `# GitHub Flow - flujo completo

# 1. Crear rama desde main
git checkout main
git pull origin main
git checkout -b feature/user-profile

# 2. Trabajar y hacer commits
git add .
git commit -m "feat(profile): add avatar upload"

# 3. Publicar la rama
git push origin feature/user-profile

# 4. Abrir PR en GitHub y esperar review
# 5. Después del merge en GitHub, limpiar localmente
git checkout main
git pull origin main
git branch -d feature/user-profile`,
    practicalTips: [
      "Para la mayoría de proyectos personales y startups, GitHub Flow es suficiente. No adoptes Git Flow por su complejidad sin una necesidad real.",
      "Sin importar la estrategia, la regla que no cambia es: nunca trabajes directamente en main.",
      "Documenta en el README del proyecto cuál estrategia usa el equipo para que los nuevos integrantes sepan cómo contribuir.",
    ],
    commonMistakes: [
      "Adoptar Git Flow en un proyecto pequeño donde GitHub Flow sería suficiente, añadiendo complejidad innecesaria.",
      "Mezclar convenciones de ambas estrategias sin documentarlo, dejando al equipo sin un modelo claro.",
      "Dejar ramas de feature vivas por semanas sin mergear, acumulando conflictos con main.",
    ],
    resources: JSON.stringify([
      { type: "article", title: "GitHub Flow", url: "https://docs.github.com/en/get-started/using-github/github-flow" },
      { type: "article", title: "A successful Git branching model (Git Flow)", url: "https://nvie.com/posts/a-successful-git-branching-model/" },
    ]),
  },

  // ─── MÓDULO 7: Proyecto: flujo profesional de colaboración ───────────────────
  {
    name: "Flujo profesional de colaboración con Git y GitHub",
    slug: "git-professional-workflow",
    level: "BEGINNER" as const,
    subjectId: gitId,
    description: "Aplica todo lo aprendido en un flujo de trabajo real: desde clonar un repositorio hasta abrir y revisar Pull Requests siguiendo las convenciones de equipos profesionales.",
    whyMatters: "Saber los comandos de Git es solo el inicio. Lo que realmente evalúan en una entrevista y en el trabajo diario es si puedes integrarte a un equipo y seguir el flujo de colaboración sin interrumpir a nadie.",
    explanation: `El flujo profesional de colaboración integra todos los conceptos anteriores en una secuencia de trabajo coherente. No hay comandos nuevos aquí; es la aplicación correcta de todo lo anterior.

El flujo completo de un desarrollador en un equipo real se ve así:

1. **Sincronizar**: antes de empezar, actualizar tu copia local de main.
2. **Crear rama**: una rama con nombre descriptivo siguiendo la convención del equipo.
3. **Desarrollar**: commits pequeños y frecuentes con mensajes siguiendo Conventional Commits.
4. **Mantener actualizado**: hacer rebase sobre main periódicamente si el desarrollo toma varios días.
5. **Push y Pull Request**: publicar la rama y abrir un PR con descripción clara de qué hace y por qué.
6. **Code review**: responder comentarios, hacer cambios adicionales si se requieren.
7. **Merge**: una vez aprobado, mergear y eliminar la rama.
8. **Repetir**.

Un buen Pull Request incluye:
- Título siguiendo Conventional Commits.
- Descripción de qué problema resuelve.
- Cómo probarlo.
- Capturas de pantalla si hay cambios visuales.

Además, los equipos usan archivos de configuración estandarizados:
- \`.gitignore\`: lista de archivos que Git debe ignorar (node_modules, .env, archivos de IDE).
- \`.gitattributes\`: define comportamientos como el manejo de saltos de línea entre sistemas operativos.`,
    codeExample: `# Flujo completo de un día de trabajo

# Inicio del día: sincronizar
git checkout main
git pull origin main

# Crear rama para la tarea
git checkout -b feature/user-settings

# Desarrollar... hacer commits frecuentes
git add src/settings/SettingsForm.tsx
git commit -m "feat(settings): add timezone selector"

git add src/settings/SettingsForm.tsx
git commit -m "feat(settings): add language preference option"

# Actualizar con main si pasaron varios días
git fetch origin
git rebase origin/main

# Publicar y abrir PR
git push origin feature/user-settings
# Luego en GitHub: New Pull Request

# Después del merge
git checkout main
git pull origin main
git branch -d feature/user-settings`,
    practicalTips: [
      "Revisa el .gitignore del proyecto antes de tu primer commit. Agregar node_modules o archivos .env al repositorio es un error común y costoso de limpiar.",
      "Cuando te asignen una tarea, lo primero es git pull en main y crear la rama desde ahí, no desde cualquier estado en el que esté tu repositorio local.",
      "En code review, los comentarios son sobre el código, no sobre la persona. Aprende a dar y recibir feedback técnico como parte del proceso.",
    ],
    commonMistakes: [
      "Abrir un Pull Request sin probar que el código funciona localmente.",
      "Ignorar los comentarios de code review o marcarlos como resueltos sin hacer el cambio solicitado.",
      "No eliminar la rama local después del merge, acumulando decenas de ramas obsoletas.",
    ],
    resources: JSON.stringify([
      { type: "article", title: "GitHub Docs - Collaborating with pull requests", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests" },
      { type: "article", title: "Git - gitignore", url: "https://git-scm.com/docs/gitignore" },
    ]),
  },
  // ─── MÓDULO 1: Python: filosofía, instalación y primeros pasos ───────────────
  {
    name: "Python: filosofía, instalación y primeros pasos",
    slug: "python-philosophy-setup-first-steps",
    level: "BEGINNER" as const,
    subjectId: pythonId,
    description:
      "Qué es Python, por qué es tan popular, cómo instalarlo correctamente y cómo ejecutar tu primer programa. Incluye el intérprete interactivo, scripts .py y la filosofía detrás del lenguaje.",
    whyMatters:
      "Arrancar bien importa. Entender qué es Python antes de escribir código te da contexto sobre sus decisiones de diseño, por qué se escribe de cierta manera y qué puedes esperar del lenguaje a medida que avanzas.",
    explanation: `Python es un lenguaje de programación interpretado, de propósito general y de alto nivel. Fue creado por Guido van Rossum y publicado en 1991. Hoy es uno de los lenguajes más usados del mundo, presente en automatización, backend, ciencia de datos, inteligencia artificial y scripting de sistemas.

**¿Qué significa "interpretado"?**
A diferencia de lenguajes como C o Java, Python no compila el código a un ejecutable antes de correrlo. Un programa llamado intérprete lee y ejecuta el código línea por línea. Esto hace que el ciclo de desarrollo sea más rápido: escribes, ejecutas, ves el resultado.

**La filosofía de Python: el Zen**
Python tiene una filosofía oficial resumida en 19 principios, conocida como el Zen de Python. Puedes verla ejecutando \`import this\` en el intérprete. Los más importantes para un principiante son:
- Explícito es mejor que implícito. El código debe decir lo que hace, sin trucos escondidos.
- La legibilidad cuenta. Python prioriza que el código sea fácil de leer por humanos.
- Simple es mejor que complejo. Si puedes resolverlo de forma simple, hazlo simple.

Estas ideas explican por qué Python usa indentación obligatoria en lugar de llaves, y por qué su sintaxis se parece tanto al inglés.

**Instalación**
1. Ve a https://python.org/downloads y descarga la versión estable más reciente (3.12+).
2. Durante la instalación en Windows, marca la casilla "Add Python to PATH". Sin esa opción no podrás ejecutar Python desde la terminal.
3. Verifica la instalación abriendo una terminal y ejecutando:

\`\`\`
python --version
\`\`\`

Deberías ver algo como \`Python 3.12.3\`.

**El intérprete interactivo (REPL)**
Escribe \`python\` en la terminal y presiona Enter. Entrarás al REPL (Read-Eval-Print Loop): un entorno donde puedes escribir código y ver el resultado inmediatamente. Es ideal para experimentar.

\`\`\`
>>> 2 + 2
4
>>> print("Hola, mundo")
Hola, mundo
>>> type("texto")
<class 'str'>
\`\`\`

Para salir escribe \`exit()\` o presiona Ctrl+D en Mac/Linux, Ctrl+Z en Windows.

**Tu primer script**
Un script es un archivo de texto con extensión \`.py\`. Crea un archivo llamado \`hola.py\` con este contenido:

\`\`\`
print("Hola, mundo")
\`\`\`

Ejecútalo desde la terminal con:

\`\`\`
python hola.py
\`\`\``,
    codeExample: `# Este es un comentario. Python los ignora al ejecutar.

# Imprimir texto en pantalla
print("Hola, mundo")

# Hacer una operación matemática
print(10 + 5)

# Combinar texto con un valor
nombre = "Ana"
print("Bienvenida,", nombre)

# Ver el Zen de Python
import this`,
    practicalTips: [
      "Usa el REPL para experimentar con cualquier idea antes de escribirla en un archivo. Es tu mejor herramienta de exploración.",
      "Instala un editor de código como VS Code con la extensión oficial de Python. Te dará resaltado de sintaxis, autocompletado y depuración integrada.",
      "Python 2 está muerto desde 2020. Si ves tutoriales que usan print sin paréntesis, están desactualizados. Usa siempre Python 3.",
      "En Mac y Linux el comando puede llamarse python3 en lugar de python. Ejecuta python3 --version para confirmarlo.",
    ],
    commonMistakes: [
      "No agregar Python al PATH durante la instalación en Windows, lo que impide ejecutarlo desde la terminal.",
      "Confundir el REPL con un archivo. En el REPL escribes código directamente; en un archivo lo guardas y lo ejecutas con python nombre.py.",
      "Intentar aprender todo antes de escribir código. Python se aprende escribiendo, fallando y corrigiendo.",
    ],
    resources: JSON.stringify([
      {
        type: "documentation",
        title: "Python.org - Documentación oficial",
        url: "https://docs.python.org/3/",
      },
      {
        type: "guide",
        title: "The Zen of Python (PEP 20)",
        url: "https://peps.python.org/pep-0020/",
      },
    ]),
  },

  // ─── MÓDULO 2: Tipos, variables, operadores y strings ───────────────────────
  {
    name: "Tipos, variables, operadores y strings",
    slug: "python-types-variables-operators-strings",
    level: "BEGINNER" as const,
    subjectId: pythonId,
    description:
      "Los bloques fundamentales de cualquier programa Python: cómo se almacenan los datos, qué tipos existen, cómo operar sobre ellos y cómo trabajar con texto de forma efectiva.",
    whyMatters:
      "Todo programa manipula datos. Entender los tipos nativos de Python y cómo operarlos es la diferencia entre escribir código que funciona y código que falla de formas que no entiendes. Los strings son omnipresentes: interfaces, archivos, APIs, todo es texto en algún punto.",
    explanation: `**Variables**
Una variable es un nombre que apunta a un valor almacenado en memoria. En Python no necesitas declarar el tipo: el intérprete lo infiere del valor que le asignas.

\`\`\`
edad = 25          # int
precio = 19.99     # float
nombre = "Carlos"  # str
activo = True      # bool
\`\`\`

Python es de tipado dinámico: una misma variable puede apuntar a distintos tipos a lo largo del programa.

**Tipos primitivos**
- int: números enteros sin límite de tamaño en Python 3. Ejemplos: 42, -7, 1_000_000.
- float: números decimales en punto flotante. Ejemplos: 3.14, -0.5. Importante: 0.1 + 0.2 no es exactamente 0.3 por la representación binaria interna.
- bool: True o False. Son subclase de int (True == 1, False == 0).
- NoneType: el valor None representa la ausencia de valor. Equivalente al null de otros lenguajes.

**Operadores aritméticos**
- \`+\` suma: 3 + 2 → 5
- \`-\` resta: 3 - 2 → 1
- \`*\` multiplicación: 3 * 2 → 6
- \`/\` división, siempre devuelve float: 7 / 2 → 3.5
- \`//\` división entera: 7 // 2 → 3
- \`%\` módulo (resto): 7 % 2 → 1
- \`**\` potencia: 2 ** 8 → 256

**Operadores de comparación** (devuelven bool): \`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`

**Operadores lógicos**: \`and\`, \`or\`, \`not\`

**Strings**
Un string es una secuencia inmutable de caracteres. Puedes definirlos con comillas simples o dobles. Para strings multilínea usa triple comilla.

Operaciones fundamentales:
- Concatenación: \`"Hola" + " " + "mundo"\`
- Repetición: \`"ha" * 3\` → \`"hahaha"\`
- Indexación: \`"Python"[0]\` → \`"P"\`, \`"Python"[-1]\` → \`"n"\`
- Slicing: \`"Python"[0:3]\` → \`"Pyt"\`
- Longitud: \`len("Python")\` → 6

**f-strings (la forma moderna de formatear texto)**
Introducidos en Python 3.6, son la manera recomendada de construir strings con valores interpolados:

\`\`\`
nombre = "Laura"
edad = 28
print(f"Hola, {nombre}. Tienes {edad} años.")
# → Hola, Laura. Tienes 28 años.
\`\`\`

**Métodos útiles de string**
\`upper()\`, \`lower()\`, \`strip()\`, \`replace()\`, \`split()\`, \`join()\`, \`startswith()\`, \`endswith()\`, \`find()\`, \`count()\`

**Conversión de tipos**
\`int("42")\`, \`float("3.14")\`, \`str(100)\`, \`bool(0)\``,
    codeExample: `# Variables y tipos
nombre = "Sofía"
edad = 31
altura = 1.65
activo = True
sin_valor = None

print(type(nombre))   # <class 'str'>
print(type(edad))     # <class 'int'>
print(type(altura))   # <class 'float'>

# Operadores aritméticos
print(10 / 3)    # 3.3333... (float)
print(10 // 3)   # 3 (entero)
print(10 % 3)    # 1 (resto)
print(2 ** 10)   # 1024

# Strings
saludo = "Hola, mundo"
print(saludo.upper())
print(saludo.replace("Hola", "Adiós"))
print(saludo.split(", "))

# Slicing
texto = "Python"
print(texto[0:3])   # Pyt
print(texto[::-1])  # nohtyP (invertido)

# f-strings
producto = "laptop"
precio = 899.99
print(f"El {producto} cuesta ${precio:.2f}")
# → El laptop cuesta $899.99

# Casting
numero_texto = "42"
numero = int(numero_texto)
print(numero + 8)   # 50`,
    practicalTips: [
      "Usa f-strings siempre. Son más legibles y más rápidas que concatenar con + o usar .format().",
      "Para verificar el tipo de un valor usa type(). Para verificar si es de un tipo específico usa isinstance(valor, int).",
      "Los strings son inmutables. Métodos como upper() o replace() no modifican el original, devuelven uno nuevo. Debes asignar el resultado a una variable.",
      "El operador // es útil cuando necesitas división sin decimales: calcular páginas, índices o grupos.",
    ],
    commonMistakes: [
      "Sumar un int con un str sin convertir: print('Tienes ' + 25 + ' años') lanza TypeError. Usa f-strings o str(25).",
      "Asumir que float es exacto. 0.1 + 0.2 == 0.3 es False en Python. Usa round() o el módulo decimal cuando la precisión importa.",
      "Usar = para comparar en lugar de ==. El primero asigna, el segundo compara.",
      "Olvidar que los índices empiezan en 0, no en 1.",
    ],
    resources: JSON.stringify([
      {
        type: "documentation",
        title: "Python Built-in Types",
        url: "https://docs.python.org/3/library/stdtypes.html",
      },
      {
        type: "guide",
        title: "Python f-strings (PEP 498)",
        url: "https://peps.python.org/pep-0498/",
      },
    ]),
  },

  // ─── MÓDULO 3: Control de flujo: condicionales y loops ──────────────────────
  {
    name: "Control de flujo: condicionales y loops",
    slug: "python-control-flow-conditionals-loops",
    level: "BEGINNER" as const,
    subjectId: pythonId,
    description:
      "Cómo hacer que tu programa tome decisiones con if/elif/else y cómo repetir acciones con for y while. Incluye break, continue, else en loops y la comprensión de la indentación como estructura.",
    whyMatters:
      "Sin control de flujo un programa solo ejecuta una lista de instrucciones de arriba a abajo, siempre igual. Los condicionales y loops son lo que convierte un script en un programa real capaz de reaccionar a datos y repetir trabajo automáticamente.",
    explanation: `**Indentación: la regla más importante de Python**
Python usa la indentación (espacios al inicio de la línea) para delimitar bloques de código. No hay llaves ni palabras clave de cierre. La convención oficial es 4 espacios por nivel. Mezclar espacios y tabs genera errores.

**Condicionales: if, elif, else**

\`\`\`
if condicion:
    # se ejecuta si condicion es True
elif otra_condicion:
    # se ejecuta si la anterior fue False y esta es True
else:
    # se ejecuta si ninguna condición anterior fue True
\`\`\`

**Valores truthy y falsy**
En Python, no solo True y False son booleanos. Cualquier valor puede evaluarse en un contexto booleano:
- Falsy: 0, 0.0, "", [], {}, None, False
- Truthy: cualquier otro valor

Esto permite escribir \`if lista:\` en lugar de \`if len(lista) > 0:\`.

**Operador ternario**

\`\`\`
resultado = "par" if numero % 2 == 0 else "impar"
\`\`\`

**Loop for**
Itera sobre cualquier objeto iterable: listas, strings, rangos, diccionarios, etc.

\`\`\`
for elemento in iterable:
    # código que se ejecuta por cada elemento
\`\`\`

\`range()\` genera secuencias de números:
- \`range(5)\` → 0, 1, 2, 3, 4
- \`range(1, 6)\` → 1, 2, 3, 4, 5
- \`range(0, 10, 2)\` → 0, 2, 4, 6, 8

**Loop while**
Se ejecuta mientras una condición sea verdadera. Úsalo cuando no sabes de antemano cuántas iteraciones necesitas.

\`\`\`
while condicion:
    # código repetido
\`\`\`

**break y continue**
- \`break\`: sale del loop inmediatamente.
- \`continue\`: salta a la siguiente iteración sin ejecutar el resto del cuerpo.

**else en loops**
Python permite un bloque \`else\` al final de un \`for\` o \`while\`. Se ejecuta solo si el loop terminó sin un \`break\`. Es útil para búsquedas.

**enumerate() y zip()**
- \`enumerate(iterable)\`: devuelve tuplas (índice, valor) en cada iteración.
- \`zip(a, b)\`: itera dos secuencias en paralelo.`,
    codeExample: `# Condicional básico
temperatura = 28

if temperatura > 35:
    print("Calor extremo")
elif temperatura > 25:
    print("Caluroso")
elif temperatura > 15:
    print("Agradable")
else:
    print("Frío")
# → Caluroso

# Truthy/falsy
nombre = ""
if not nombre:
    print("El nombre está vacío")

# for con range
for i in range(1, 6):
    print(f"{i} al cuadrado es {i ** 2}")

# for sobre una lista
frutas = ["manzana", "banana", "cereza"]
for fruta in frutas:
    print(fruta.capitalize())

# enumerate: índice + valor
for indice, fruta in enumerate(frutas):
    print(f"{indice}: {fruta}")

# while con break
intentos = 0
while True:
    intentos += 1
    if intentos == 3:
        print("Límite alcanzado")
        break

# continue: saltar pares
for n in range(10):
    if n % 2 == 0:
        continue
    print(n)   # imprime solo impares

# else en for (búsqueda)
objetivo = 7
for n in range(10):
    if n == objetivo:
        print(f"Encontrado: {n}")
        break
else:
    print("No encontrado")

# zip: dos listas en paralelo
nombres = ["Ana", "Luis", "Eva"]
edades = [25, 32, 28]
for nombre, edad in zip(nombres, edades):
    print(f"{nombre} tiene {edad} años")`,
    practicalTips: [
      "Prefiere for sobre while siempre que sepas de antemano sobre qué iteras. While es para cuando la condición de parada depende de algo que ocurre dentro del loop.",
      "Usa enumerate() en lugar de llevar un contador manual con i = 0 / i += 1. Es más claro y menos propenso a errores.",
      "El else en loops es poco conocido pero elimina la necesidad de una variable bandera en búsquedas.",
      "Evita modificar una lista mientras la iteras con for. Itera sobre una copia con lista[:] o usa una list comprehension.",
    ],
    commonMistakes: [
      "Usar = en lugar de == en una condición. if x = 5 es un error de sintaxis en Python.",
      "Loop infinito por olvidar actualizar la variable de control del while.",
      "Indentación inconsistente al mezclar bloques anidados. Configura tu editor para usar 4 espacios.",
      "Confundir range(n) con range(1, n). El primero va de 0 a n-1; el segundo de 1 a n-1.",
    ],
    resources: JSON.stringify([
      {
        type: "documentation",
        title: "Python Control Flow - Docs oficiales",
        url: "https://docs.python.org/3/tutorial/controlflow.html",
      },
    ]),
  },

  // ─── MÓDULO 4: Funciones, argumentos y scope ────────────────────────────────
  {
    name: "Funciones, argumentos y scope",
    slug: "python-functions-arguments-scope",
    level: "BEGINNER" as const,
    subjectId: pythonId,
    description:
      "Cómo definir y llamar funciones, los distintos tipos de argumentos (posicionales, keyword, por defecto, *args, **kwargs), el valor de retorno y las reglas de scope (LEGB). Incluye funciones lambda.",
    whyMatters:
      "Las funciones son la unidad básica de organización del código. Sin ellas repites lógica por todo el programa, que se vuelve imposible de mantener. Entender el scope evita errores sutiles donde una variable toma un valor inesperado.",
    explanation: `**Definición de una función**

\`\`\`
def nombre_funcion(parametros):
    """Docstring: describe qué hace la función."""
    # cuerpo
    return valor
\`\`\`

La palabra clave \`def\` define la función. El cuerpo va indentado. \`return\` devuelve un valor; si se omite, la función devuelve \`None\`.

**Tipos de argumentos**

1. Posicionales: se pasan en orden.

\`\`\`
def restar(a, b):
    return a - b
restar(10, 3)   # a=10, b=3 → 7
\`\`\`

2. Keyword (nombrados): se pasan por nombre, el orden no importa.

\`\`\`
restar(b=3, a=10)   # → 7
\`\`\`

3. Por defecto: tienen un valor predefinido si no se pasan.

\`\`\`
def saludar(nombre, saludo="Hola"):
    return f"{saludo}, {nombre}"

saludar("Ana")                 # Hola, Ana
saludar("Ana", "Buenos días")  # Buenos días, Ana
\`\`\`

4. *args: captura cualquier número de argumentos posicionales como tupla.

\`\`\`
def sumar(*numeros):
    return sum(numeros)

sumar(1, 2, 3, 4)   # 10
\`\`\`

5. **kwargs: captura cualquier número de argumentos keyword como diccionario.

\`\`\`
def mostrar_info(**datos):
    for clave, valor in datos.items():
        print(f"{clave}: {valor}")

mostrar_info(nombre="Luis", edad=30)
\`\`\`

**Retorno múltiple**
Python permite devolver varios valores (en realidad devuelve una tupla):

\`\`\`
def min_max(lista):
    return min(lista), max(lista)

minimo, maximo = min_max([3, 1, 7, 2])
\`\`\`

**Scope: la regla LEGB**
El scope define desde dónde es visible una variable. Python busca nombres en este orden:
1. Local: dentro de la función actual.
2. Enclosing: en funciones externas que envuelven a la actual.
3. Global: en el módulo (archivo) actual.
4. Built-in: nombres reservados de Python como len, print, range.

Una función puede leer variables globales, pero para modificarlas necesita declarar \`global variable\`. Esto es generalmente una mala práctica; es mejor pasar el valor como argumento.

**Funciones lambda**
Son funciones anónimas de una sola expresión. Útiles cuando necesitas una función pequeña como argumento:

\`\`\`
cuadrado = lambda x: x ** 2
lista.sort(key=lambda x: x["edad"])
\`\`\`

**Docstrings**
La primera línea de una función puede ser un string de documentación. Python lo usa para la ayuda integrada con \`help(funcion)\`.`,
    codeExample: `# Función básica con docstring
def calcular_imc(peso_kg, altura_m):
    """Calcula el Índice de Masa Corporal (IMC).

    Args:
        peso_kg: peso en kilogramos
        altura_m: altura en metros

    Returns:
        float con el valor del IMC
    """
    return peso_kg / (altura_m ** 2)

imc = calcular_imc(70, 1.75)
print(f"IMC: {imc:.1f}")   # IMC: 22.9

# Argumento por defecto
def crear_usuario(nombre, rol="estudiante", activo=True):
    return {"nombre": nombre, "rol": rol, "activo": activo}

print(crear_usuario("Ana"))
print(crear_usuario("Luis", rol="admin"))

# *args
def suma_total(*numeros):
    return sum(numeros)

print(suma_total(1, 2, 3, 4, 5))   # 15

# **kwargs
def registrar_evento(tipo, **detalles):
    print(f"Evento: {tipo}")
    for k, v in detalles.items():
        print(f"  {k}: {v}")

registrar_evento("login", usuario="Ana", ip="192.168.1.1")

# Retorno múltiple
def estadisticas(numeros):
    return min(numeros), max(numeros), sum(numeros) / len(numeros)

minimo, maximo, promedio = estadisticas([4, 7, 2, 9, 1])

# Scope
contador = 0

def incrementar():
    global contador
    contador += 1

# Lambda
numeros = [5, 2, 8, 1, 9, 3]
numeros.sort(key=lambda x: -x)   # orden descendente

personas = [{"nombre": "Luis", "edad": 30}, {"nombre": "Ana", "edad": 25}]
personas.sort(key=lambda p: p["edad"])`,
    practicalTips: [
      "Los parámetros con valor por defecto deben ir siempre después de los posicionales en la definición.",
      "Nunca uses un objeto mutable (lista, diccionario) como valor por defecto. Se comparte entre llamadas. Usa None y asigna dentro de la función.",
      "Escribe el docstring antes de implementar la función. Te obliga a pensar en qué debe hacer antes de pensar en cómo.",
      "Las funciones pequeñas con un único propósito son más fáciles de testear, reutilizar y entender.",
    ],
    commonMistakes: [
      "Usar una lista mutable como valor por defecto: def agregar(item, lista=[]). La lista se comparte entre todas las llamadas a la función.",
      "Asumir que una variable local modifica la global sin usar la palabra clave global.",
      "Olvidar que return sin valor devuelve None, no lanza error.",
      "Mezclar *args y **kwargs en el orden incorrecto. El orden correcto es: posicionales, *args, keyword con default, **kwargs.",
    ],
    resources: JSON.stringify([
      {
        type: "documentation",
        title: "Python Functions - Docs oficiales",
        url: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions",
      },
      {
        type: "guide",
        title: "Python Scope y LEGB Rule - Real Python",
        url: "https://realpython.com/python-scope-legb-rule/",
      },
    ]),
  },

  // ─── MÓDULO 5: Listas, tuplas, diccionarios y sets ──────────────────────────
  {
    name: "Listas, tuplas, diccionarios y sets",
    slug: "python-lists-tuples-dicts-sets",
    level: "BEGINNER" as const,
    subjectId: pythonId,
    description:
      "Las cuatro estructuras de datos fundamentales de Python: cuándo usar cada una, cómo manipularlas y las list/dict comprehensions para escribir código más expresivo.",
    whyMatters:
      "Elegir la estructura correcta es una decisión de diseño que impacta la legibilidad, el rendimiento y la correctitud del programa. Un desarrollador que entiende bien estas cuatro estructuras puede resolver la mayoría de los problemas de datos sin librerías externas.",
    explanation: `**Lista (list)**
Colección ordenada y mutable de elementos de cualquier tipo. Es la estructura más usada en Python.

\`\`\`
mi_lista = [1, "texto", True, 3.14]
\`\`\`

Operaciones principales:
- \`append(x)\`: agrega al final.
- \`insert(i, x)\`: inserta en posición i.
- \`remove(x)\`: elimina la primera ocurrencia de x.
- \`pop(i)\`: elimina y devuelve el elemento en posición i (último por defecto).
- \`sort()\`: ordena en sitio.
- \`sorted(lista)\`: devuelve una nueva lista ordenada sin modificar la original.
- \`reverse()\`: invierte en sitio.
- \`index(x)\`: devuelve el índice de la primera ocurrencia.
- \`count(x)\`: cuenta ocurrencias.
- \`len(lista)\`: longitud.

Slicing: \`lista[inicio:fin:paso]\`

**Tupla (tuple)**
Colección ordenada e inmutable. Se define con paréntesis o separando elementos por comas. Usa una tupla cuando los datos no deben cambiar: coordenadas, registros, valores de retorno múltiple.

\`\`\`
punto = (10, 20)
rgb = 255, 128, 0   # también es una tupla
\`\`\`

**Diccionario (dict)**
Colección de pares clave-valor. Las claves deben ser inmutables. Desde Python 3.7 mantienen el orden de inserción.

\`\`\`
usuario = {"nombre": "Ana", "edad": 28, "activo": True}
\`\`\`

Operaciones principales:
- \`dict[clave]\`: accede al valor; lanza KeyError si no existe.
- \`dict.get(clave, defecto)\`: accede sin lanzar error.
- \`dict[clave] = valor\`: asigna o actualiza.
- \`del dict[clave]\`: elimina la clave.
- \`clave in dict\`: verifica existencia.
- \`dict.keys()\`, \`dict.values()\`, \`dict.items()\`: vistas del diccionario.
- \`dict.update(otro)\`: fusiona otro diccionario.

**Set (conjunto)**
Colección no ordenada de elementos únicos. Ideal para eliminar duplicados y operaciones de conjuntos.

\`\`\`
colores = {"rojo", "verde", "azul"}
\`\`\`

Operaciones: \`union()\` o \`|\`, \`intersection()\` o \`&\`, \`difference()\` o \`-\`, \`issubset()\`, \`issuperset()\`.

**Comprehensions**
Forma compacta y expresiva de construir colecciones aplicando transformaciones y filtros.

List comprehension:
\`\`\`
cuadrados = [x ** 2 for x in range(10)]
pares = [x for x in range(20) if x % 2 == 0]
\`\`\`

Dict comprehension:
\`\`\`
cuadrados_dict = {x: x ** 2 for x in range(5)}
\`\`\`

**Cuándo usar cada una**
- list: colecciones que cambian, necesitan orden y permiten duplicados.
- tuple: datos fijos, coordenadas, retornos múltiples.
- dict: relaciones clave-valor, configuraciones, registros.
- set: verificar pertenencia, eliminar duplicados, operaciones de conjuntos.`,
    codeExample: `# Lista
tareas = ["diseñar", "codear", "testear"]
tareas.append("desplegar")
tareas.insert(0, "planificar")
tareas.sort()
print(tareas)
print(tareas[1:3])

# Tupla y unpacking
coordenadas = (40.7128, -74.0060)
lat, lon = coordenadas
print(f"Lat: {lat}, Lon: {lon}")

# Diccionario
config = {
    "host": "localhost",
    "puerto": 5432,
    "base_datos": "pathforge",
}
print(config["host"])
print(config.get("usuario", "admin"))

config["ssl"] = True
del config["puerto"]

for clave, valor in config.items():
    print(f"{clave} = {valor}")

# Set
emails_vistos = set()
nuevos = ["a@x.com", "b@x.com", "a@x.com"]
for email in nuevos:
    emails_vistos.add(email)
print(emails_vistos)   # {'a@x.com', 'b@x.com'}

tecnologias_a = {"Python", "JavaScript", "SQL"}
tecnologias_b = {"JavaScript", "TypeScript", "SQL"}
print(tecnologias_a & tecnologias_b)   # intersección
print(tecnologias_a | tecnologias_b)   # unión

# List comprehension
numeros = list(range(1, 11))
cuadrados = [n ** 2 for n in numeros if n % 2 == 0]
print(cuadrados)   # [4, 16, 36, 64, 100]

# Dict comprehension
palabras = ["python", "javascript", "rust"]
longitudes = {palabra: len(palabra) for palabra in palabras}
print(longitudes)

# Eliminar duplicados preservando tipo
con_duplicados = [1, 2, 2, 3, 3, 3, 4]
sin_duplicados = list(set(con_duplicados))`,
    practicalTips: [
      "Usa .get(clave, defecto) para acceder a diccionarios cuando la clave puede no existir. Evita KeyError sin necesidad de try/except.",
      "Las list comprehensions son más rápidas que un for loop equivalente y más legibles para transformaciones simples. Si la lógica es compleja, usa el loop.",
      "Para verificar membresía en colecciones grandes convierte a set. 'x in set' es O(1); 'x in lista' es O(n).",
      "Para contar ocurrencias usa collections.Counter en lugar de un diccionario manual. Es parte de la librería estándar.",
    ],
    commonMistakes: [
      "Modificar una lista mientras se itera sobre ella con for. Itera sobre una copia: for item in lista[:].",
      "Usar una lista como clave de diccionario. Las listas son mutables y no hashables. Usa tuplas.",
      "Asumir que un set mantiene orden. No lo hace. Si necesitas unicidad con orden, usa dict.fromkeys(lista).",
      "Confundir dict[clave] con dict.get(clave). El primero lanza KeyError si la clave no existe; el segundo devuelve None.",
    ],
    resources: JSON.stringify([
      {
        type: "documentation",
        title: "Python Data Structures - Docs oficiales",
        url: "https://docs.python.org/3/tutorial/datastructures.html",
      },
    ]),
  },

  // ─── MÓDULO 6: Programación orientada a objetos en Python ───────────────────
  {
    name: "Programación orientada a objetos en Python",
    slug: "python-oop",
    level: "BEGINNER" as const,
    subjectId: pythonId,
    description:
      "Clases, objetos, atributos, métodos, herencia y encapsulación en Python. Métodos especiales (__init__, __str__, __repr__) y el uso de @property y @classmethod.",
    whyMatters:
      "La mayoría de los frameworks y librerías de Python están construidos sobre clases. Entender POO es necesario para trabajar con Django, Flask, SQLAlchemy o Pydantic, diseñar código reutilizable y modelar problemas del mundo real de forma estructurada.",
    explanation: `**Clase y objeto**
Una clase es una plantilla que describe un tipo de objeto: qué datos tiene y qué puede hacer. Un objeto es una instancia concreta de esa clase.

\`\`\`
class Persona:
    pass

ana = Persona()   # ana es un objeto (instancia) de Persona
\`\`\`

**El método __init__ (constructor)**
Se ejecuta automáticamente cuando se crea una instancia. Aquí se definen los atributos de instancia.

\`\`\`
class Persona:
    def __init__(self, nombre, edad):
        self.nombre = nombre
        self.edad = edad
\`\`\`

\`self\` es una referencia al objeto actual. Siempre es el primer parámetro de cualquier método de instancia.

**Tipos de atributos y métodos**
- Atributos de instancia: propios de cada objeto (\`self.nombre\`).
- Atributos de clase: compartidos por todos los objetos de la clase.
- Métodos de instancia: operan sobre \`self\`.
- Métodos de clase (\`@classmethod\`): operan sobre la clase (\`cls\`). Útiles como constructores alternativos.
- Métodos estáticos (\`@staticmethod\`): no reciben self ni cls. Son funciones que conceptualmente pertenecen a la clase.

**Métodos especiales (dunder methods)**
Python usa métodos con nombres como \`__nombre__\` para definir comportamiento con operadores y funciones nativas:
- \`__str__\`: define qué devuelve \`str(objeto)\` y \`print(objeto)\`.
- \`__repr__\`: representación técnica del objeto.
- \`__len__\`: permite usar \`len(objeto)\`.
- \`__eq__\`: define el comportamiento de \`==\`.

**Herencia**
Una clase puede heredar atributos y métodos de otra:

\`\`\`
class Empleado(Persona):
    def __init__(self, nombre, edad, empresa):
        super().__init__(nombre, edad)
        self.empresa = empresa
\`\`\`

\`super()\` da acceso a la clase padre. Python permite herencia múltiple.

**Encapsulación**
Python no tiene modificadores de acceso estrictos. La convención es:
- \`_atributo\`: uso interno (convención, no forzado).
- \`__atributo\`: name mangling, Python modifica el nombre para dificultar el acceso externo.

**@property**
Permite definir getters con sintaxis de atributo:

\`\`\`
@property
def nombre_completo(self):
    return f"{self.nombre} {self.apellido}"
\`\`\`

**Composición vs herencia**
La herencia modela relaciones "es un". La composición ("tiene un") suele ser más flexible. Si una clase necesita funcionalidad de otra sin ser del mismo tipo, úsala como atributo en lugar de heredar.`,
    codeExample: `class CuentaBancaria:
    tasa_interes = 0.03   # atributo de clase

    def __init__(self, titular, saldo_inicial=0):
        self.titular = titular
        self._saldo = saldo_inicial
        self._historial = []

    @property
    def saldo(self):
        return self._saldo

    def depositar(self, monto):
        if monto <= 0:
            raise ValueError("El monto debe ser positivo")
        self._saldo += monto
        self._historial.append(f"Depósito: +{monto}")

    def retirar(self, monto):
        if monto > self._saldo:
            raise ValueError("Saldo insuficiente")
        self._saldo -= monto
        self._historial.append(f"Retiro: -{monto}")

    def aplicar_interes(self):
        interes = self._saldo * self.tasa_interes
        self.depositar(interes)

    @classmethod
    def crear_con_bono(cls, titular, bono):
        """Constructor alternativo: crea una cuenta con bono inicial."""
        return cls(titular, bono)

    def __str__(self):
        return f"Cuenta de {self.titular} | Saldo: ${self._saldo:.2f}"

    def __repr__(self):
        return f"CuentaBancaria(titular={self.titular!r}, saldo={self._saldo})"


class CuentaAhorro(CuentaBancaria):
    tasa_interes = 0.05

    def __init__(self, titular, saldo_inicial=0, limite_retiros=3):
        super().__init__(titular, saldo_inicial)
        self.limite_retiros = limite_retiros
        self._retiros_mes = 0

    def retirar(self, monto):
        if self._retiros_mes >= self.limite_retiros:
            raise ValueError("Límite de retiros mensuales alcanzado")
        super().retirar(monto)
        self._retiros_mes += 1


# Uso
cuenta = CuentaBancaria("Ana García", 1000)
cuenta.depositar(500)
cuenta.aplicar_interes()
print(cuenta)

cuenta_vip = CuentaBancaria.crear_con_bono("Luis", 2000)
print(repr(cuenta_vip))

ahorro = CuentaAhorro("Eva", 5000)
ahorro.retirar(200)
print(ahorro.saldo)`,
    practicalTips: [
      "Prefiere composición sobre herencia cuando la relación no es claramente 'es un tipo de'. Heredar solo para reutilizar código genera jerarquías frágiles.",
      "Implementa __str__ en todas tus clases. Facilita enormemente el debugging con print().",
      "Usa @property para validar al acceder o modificar un atributo sin cambiar la interfaz pública de la clase.",
      "No abuses de la POO. Python es multi-paradigma. Una función simple es mejor que una clase con un solo método.",
    ],
    commonMistakes: [
      "Olvidar self como primer parámetro de los métodos de instancia. Python no lo agrega automáticamente.",
      "Usar atributos mutables (listas, dicts) como atributos de clase. Se comparten entre todas las instancias.",
      "Crear jerarquías de herencia profundas. Si tienes más de 2 niveles, es señal de rediseñar con composición.",
      "Invocar super() con argumentos incorrectos. En Python 3 basta con super() sin argumentos.",
    ],
    resources: JSON.stringify([
      {
        type: "documentation",
        title: "Python Classes - Docs oficiales",
        url: "https://docs.python.org/3/tutorial/classes.html",
      },
      {
        type: "guide",
        title: "Dunder Methods en Python",
        url: "https://docs.python.org/3/reference/datamodel.html#special-method-names",
      },
    ]),
  },

  // ─── MÓDULO 7: Archivos, excepciones y módulos ──────────────────────────────
  {
    name: "Archivos, excepciones y módulos",
    slug: "python-files-exceptions-modules",
    level: "BEGINNER" as const,
    subjectId: pythonId,
    description:
      "Cómo leer y escribir archivos de texto y JSON, el sistema de manejo de excepciones (try/except/finally) y cómo organizar el código en módulos y paquetes.",
    whyMatters:
      "Cualquier herramienta real lee configuración, escribe logs, importa datos o guarda resultados. Las excepciones son el mecanismo que diferencia un script que falla silenciosamente de uno que falla de forma controlada y comprensible.",
    explanation: `**Manejo de archivos**
Python provee la función \`open()\` para trabajar con archivos. El parámetro \`mode\` define la operación:
- "r": lectura (por defecto)
- "w": escritura (crea o sobreescribe)
- "a": añadir al final
- "rb", "wb": lectura/escritura en modo binario

Siempre usa el context manager \`with\`. Garantiza que el archivo se cierre aunque ocurra un error:

\`\`\`
with open("archivo.txt", "r", encoding="utf-8") as f:
    contenido = f.read()
\`\`\`

Métodos de lectura:
- \`f.read()\`: lee todo el contenido como string.
- \`f.readline()\`: lee una línea.
- \`f.readlines()\`: devuelve lista de líneas.
- Iterar con \`for linea in f:\` es eficiente para archivos grandes.

**JSON**
El módulo \`json\` convierte entre strings JSON y estructuras Python:
- \`json.dumps(objeto)\`: Python → JSON string.
- \`json.loads(string)\`: JSON string → Python.
- \`json.dump(objeto, archivo)\`: escribe JSON a archivo.
- \`json.load(archivo)\`: lee JSON desde archivo.

**Excepciones**
Una excepción es un objeto que Python lanza cuando ocurre un error en tiempo de ejecución.

\`\`\`
try:
    # código que puede fallar
except TipoDeError as e:
    # qué hacer si ocurre ese error
except (Tipo1, Tipo2) as e:
    # captura múltiples tipos
else:
    # se ejecuta si no hubo excepción
finally:
    # se ejecuta siempre, con o sin excepción
\`\`\`

Excepciones comunes:
- \`ValueError\`: valor incorrecto para la operación.
- \`TypeError\`: tipo incorrecto.
- \`KeyError\`: clave no existe en diccionario.
- \`IndexError\`: índice fuera de rango.
- \`FileNotFoundError\`: archivo no encontrado.
- \`ZeroDivisionError\`: división por cero.
- \`AttributeError\`: atributo no existe en el objeto.

**Crear excepciones propias**

\`\`\`
class SaldoInsuficienteError(ValueError):
    pass
\`\`\`

**Módulos y paquetes**
Un módulo es cualquier archivo \`.py\`. Un paquete es una carpeta con un archivo \`__init__.py\`.

\`\`\`
import modulo
from modulo import funcion
from modulo import funcion as fn
import modulo as mod
\`\`\`

El bloque \`if __name__ == "__main__":\` permite que un módulo sea importado sin ejecutar su código principal, y ejecutado directamente cuando se invoca como script.`,
    codeExample: `import json
import os

def leer_configuracion(ruta):
    """Lee un archivo JSON de configuración."""
    try:
        with open(ruta, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Archivo no encontrado: {ruta}")
        return {}
    except json.JSONDecodeError as e:
        print(f"JSON inválido: {e}")
        return {}

def guardar_resultado(datos, ruta):
    """Guarda datos como JSON."""
    with open(ruta, "w", encoding="utf-8") as f:
        json.dump(datos, f, ensure_ascii=False, indent=2)
    print(f"Guardado en {ruta}")

def dividir(a, b):
    try:
        resultado = a / b
    except ZeroDivisionError:
        print("Error: no se puede dividir por cero")
        return None
    except TypeError as e:
        print(f"Error de tipo: {e}")
        return None
    else:
        print(f"Resultado: {resultado}")
        return resultado
    finally:
        print("Operación intentada")

dividir(10, 2)
dividir(10, 0)

# Excepción personalizada
class EmailInvalidoError(ValueError):
    def __init__(self, email):
        super().__init__(f"'{email}' no es un email válido")
        self.email = email

def validar_email(email):
    if "@" not in email:
        raise EmailInvalidoError(email)
    return True

try:
    validar_email("no-es-email")
except EmailInvalidoError as e:
    print(e)

# Leer línea por línea (eficiente para archivos grandes)
def contar_lineas(ruta):
    if not os.path.exists(ruta):
        raise FileNotFoundError(f"No existe: {ruta}")
    total = 0
    with open(ruta, "r", encoding="utf-8") as f:
        for _ in f:
            total += 1
    return total

if __name__ == "__main__":
    config = leer_configuracion("config.json")
    print(config)`,
    practicalTips: [
      "Siempre usa with para abrir archivos. Garantiza que el archivo se cierre incluso si ocurre un error.",
      "Captura excepciones específicas, no Exception a secas. Capturar todo oculta bugs y hace el código impredecible.",
      "Usa encoding='utf-8' siempre que leas o escribas archivos de texto. Evita problemas con caracteres especiales en distintos sistemas operativos.",
      "El bloque else en try/except se ejecuta solo si no hubo excepción, a diferencia del código después del bloque que siempre se ejecuta.",
    ],
    commonMistakes: [
      "Abrir archivos sin with y olvidar llamar f.close(). Si ocurre un error el archivo queda abierto y puede corromperse.",
      "Capturar Exception cuando solo se esperan tipos específicos. Esto captura errores de programación que deberían propagarse.",
      "No manejar el caso donde un archivo no existe antes de intentar leerlo.",
      "Relanzar una excepción con raise e en lugar de raise. El primero pierde el traceback original; el segundo lo preserva.",
    ],
    resources: JSON.stringify([
      {
        type: "documentation",
        title: "Python Errors and Exceptions - Docs oficiales",
        url: "https://docs.python.org/3/tutorial/errors.html",
      },
      {
        type: "documentation",
        title: "Python json module",
        url: "https://docs.python.org/3/library/json.html",
      },
    ]),
  },

  // ─── MÓDULO 8: Librería estándar esencial y pip ─────────────────────────────
  {
    name: "Librería estándar esencial y pip",
    slug: "python-stdlib-pip",
    level: "BEGINNER" as const,
    subjectId: pythonId,
    description:
      "Los módulos más útiles de la librería estándar de Python (os, sys, pathlib, datetime, collections, re) y cómo gestionar paquetes externos con pip y entornos virtuales.",
    whyMatters:
      "Python viene con baterías incluidas. Conocer la librería estándar evita reinventar la rueda, reduce dependencias externas y demuestra madurez como desarrollador. Saber gestionar entornos virtuales es obligatorio para cualquier proyecto real.",
    explanation: `**os y sys**
- \`os\`: interactúa con el sistema operativo. Variables de entorno, rutas, directorios.
- \`sys\`: acceso a parámetros del intérprete. \`sys.argv\` contiene los argumentos de línea de comandos; \`sys.exit()\` termina el programa con un código de salida.

**pathlib (la forma moderna de manejar rutas)**
Introduce \`Path\`, un objeto que representa rutas de forma orientada a objetos y multiplataforma. Reemplaza a \`os.path\`.

\`\`\`
from pathlib import Path

ruta = Path("datos") / "archivo.txt"
ruta.exists()
ruta.read_text(encoding="utf-8")
ruta.write_text("contenido", encoding="utf-8")
list(Path(".").glob("*.py"))
\`\`\`

**datetime**
Manejo de fechas y horas:
- \`datetime.now()\`: fecha y hora actual.
- \`timedelta\`: representa una duración.
- \`strftime()\`: formatea una fecha como string.
- \`strptime()\`: parsea un string como fecha.

**collections**
Tipos de datos especializados:
- \`Counter\`: cuenta elementos. Counter(lista) devuelve frecuencias.
- \`defaultdict\`: diccionario con valor por defecto para claves nuevas.
- \`deque\`: lista con inserciones y eliminaciones eficientes en ambos extremos.
- \`namedtuple\`: tupla cuyos elementos tienen nombre.

**re (expresiones regulares)**
Búsqueda y manipulación de texto con patrones:
- \`re.search(patron, texto)\`: busca en cualquier posición.
- \`re.match(patron, texto)\`: busca al inicio.
- \`re.findall(patron, texto)\`: devuelve todas las coincidencias.
- \`re.sub(patron, reemplazo, texto)\`: reemplaza coincidencias.

**Entornos virtuales y pip**
Un entorno virtual es un directorio que contiene una instalación Python aislada. Cada proyecto debe tener el suyo para evitar conflictos de versiones.

\`\`\`
# Crear entorno virtual
python -m venv .venv

# Activar en Mac/Linux
source .venv/bin/activate

# Activar en Windows
.venv\Scripts\activate

# Instalar paquetes
pip install requests

# Guardar dependencias
pip freeze > requirements.txt

# Instalar desde requirements.txt
pip install -r requirements.txt

# Desactivar
deactivate
\`\`\`

**Estructura de proyecto recomendada**

\`\`\`
mi_proyecto/
├── .venv/
├── src/
│   ├── __init__.py
│   └── modulo.py
├── tests/
├── requirements.txt
└── README.md
\`\`\``,
    codeExample: `import os
import sys
from pathlib import Path
from datetime import datetime, timedelta
from collections import Counter, defaultdict
import re

# os y sys
env = os.environ.get("ENTORNO", "desarrollo")
print(f"Entorno: {env}")

args = sys.argv[1:]
print(f"Argumentos: {args}")

# pathlib
carpeta = Path("reportes")
carpeta.mkdir(exist_ok=True)

archivo = carpeta / f"reporte_{datetime.now().strftime('%Y%m%d')}.txt"
archivo.write_text("Contenido del reporte", encoding="utf-8")

archivos_txt = list(Path(".").glob("**/*.txt"))
print(f"Archivos .txt encontrados: {len(archivos_txt)}")

# datetime
ahora = datetime.now()
hace_una_semana = ahora - timedelta(weeks=1)
print(ahora.strftime("%d/%m/%Y %H:%M"))

fecha_str = "15/03/2024"
fecha = datetime.strptime(fecha_str, "%d/%m/%Y")

# collections
lenguajes = ["Python", "JavaScript", "Python", "Rust", "Python", "JavaScript"]
frecuencias = Counter(lenguajes)
print(frecuencias.most_common(2))   # [('Python', 3), ('JavaScript', 2)]

grupos = defaultdict(list)
datos = [("backend", "Python"), ("frontend", "React"), ("backend", "Node.js")]
for categoria, tech in datos:
    grupos[categoria].append(tech)
print(dict(grupos))

# re
texto = "Contacto: soporte@empresa.com o ventas@empresa.com"
patron_email = r'[\w.+-]+@[\w-]+\.[a-z]+'
emails = re.findall(patron_email, texto)
print(emails)

telefono = "Mi número es 555-123-4567"
normalizado = re.sub(r'[\s\-\(\)]', '', telefono)
print(normalizado)

# Leer variable de entorno obligatoria
def requerir_env(nombre):
    valor = os.environ.get(nombre)
    if valor is None:
        print(f"Error: la variable de entorno {nombre} es obligatoria")
        sys.exit(1)
    return valor`,
    practicalTips: [
      "Usa pathlib.Path en lugar de os.path. Es más legible y orientado a objetos. Path('a') / 'b' / 'c.txt' es más claro que os.path.join('a', 'b', 'c.txt').",
      "Siempre trabaja con entornos virtuales. Nunca instales paquetes globalmente para proyectos específicos.",
      "Counter es la forma más pythonica de contar elementos. Evita el patrón manual de dict con if/else para inicializar contadores.",
      "Compila las expresiones regulares que uses múltiples veces con re.compile(). Es más eficiente y más legible.",
    ],
    commonMistakes: [
      "No usar entornos virtuales y contaminar la instalación global de Python con paquetes de proyectos específicos.",
      "Commitear el directorio .venv al repositorio. Agrega .venv/ a .gitignore. Solo el archivo requirements.txt debe commitearse.",
      "Usar os.path en código nuevo cuando pathlib es más claro y está disponible desde Python 3.4.",
      "No escapar correctamente los caracteres especiales en expresiones regulares. Usa siempre raw strings con r'patron'.",
    ],
    resources: JSON.stringify([
      {
        type: "documentation",
        title: "Python Standard Library",
        url: "https://docs.python.org/3/library/",
      },
      {
        type: "documentation",
        title: "pathlib - Docs oficiales",
        url: "https://docs.python.org/3/library/pathlib.html",
      },
      {
        type: "documentation",
        title: "pip documentation",
        url: "https://pip.pypa.io/en/stable/",
      },
    ]),
  },

  // ─── MÓDULO 9: Proyecto: herramienta de automatización CLI ──────────────────
  {
    name: "Proyecto: herramienta de automatización CLI",
    slug: "python-project-cli-automation",
    level: "BEGINNER" as const,
    subjectId: pythonId,
    description:
      "Construcción de una herramienta de línea de comandos completa que integre todo lo aprendido: argumentos CLI con argparse, lectura/escritura de archivos, manejo de excepciones, módulos propios y estructura de proyecto profesional.",
    whyMatters:
      "Un proyecto integrador es donde la teoría se convierte en habilidad real. Una herramienta CLI demuestra que puedes construir algo útil, estructurado y mantenible, y es el tipo de proyecto que se puede mostrar en un portafolio y discutir con detalle en una entrevista técnica.",
    explanation: `**¿Qué es una herramienta CLI?**
Una herramienta CLI (Command Line Interface) es un programa que se ejecuta desde la terminal y acepta comandos y argumentos. Son la base de la automatización en entornos de desarrollo, DevOps y data engineering. Ejemplos reales: git, pip, npm, aws, docker.

**argparse: el módulo estándar para CLIs**
\`argparse\` analiza los argumentos que el usuario pasa al script y genera automáticamente mensajes de ayuda.

\`\`\`
import argparse

parser = argparse.ArgumentParser(description="Descripción de la herramienta")
parser.add_argument("archivo", help="Ruta del archivo a procesar")
parser.add_argument("--formato", choices=["json", "csv"], default="json")
parser.add_argument("--verbose", action="store_true")

args = parser.parse_args()
print(args.archivo, args.formato)
\`\`\`

**Proyecto propuesto: gestor de tareas CLI**
Una herramienta que permite gestionar tareas desde la terminal, almacenándolas en un archivo JSON local.

Comandos disponibles:
- \`python tareas.py agregar "Revisar el PR de Laura"\`
- \`python tareas.py listar\`
- \`python tareas.py completar 2\`
- \`python tareas.py eliminar 2\`

**Estructura del proyecto**

\`\`\`
gestor-tareas/
├── .venv/
├── src/
│   ├── __init__.py
│   ├── models.py
│   ├── storage.py
│   └── cli.py
├── tareas.py
├── requirements.txt
└── README.md
\`\`\`

**Principios aplicados**
1. Separación de responsabilidades: cada módulo tiene un rol claro.
2. Manejo de errores: el programa nunca debe caerse sin un mensaje claro.
3. Persistencia: los datos sobreviven entre ejecuciones mediante un archivo JSON.
4. Extensibilidad: agregar un nuevo comando no requiere tocar el resto del código.
5. Interfaz amigable: mensajes claros y ayuda integrada con \`--help\`.

**Patrón de subcomandos con argparse**
Para herramientas con múltiples comandos usa \`add_subparsers()\`:

\`\`\`
subparsers = parser.add_subparsers(dest="comando")
agregar_parser = subparsers.add_parser("agregar")
agregar_parser.add_argument("descripcion")
\`\`\`

**dataclasses**
El decorador \`@dataclass\` genera automáticamente \`__init__\`, \`__repr__\` y \`__eq__\` a partir de las anotaciones de tipo, eliminando boilerplate repetitivo.`,
    codeExample: `# tareas.py — punto de entrada
from src.cli import ejecutar

if __name__ == "__main__":
    ejecutar()


# src/models.py
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional
import uuid

@dataclass
class Tarea:
    descripcion: str
    id: str = field(default_factory=lambda: str(uuid.uuid4())[:8])
    completada: bool = False
    creada_en: str = field(default_factory=lambda: datetime.now().isoformat())
    completada_en: Optional[str] = None

    def completar(self):
        self.completada = True
        self.completada_en = datetime.now().isoformat()

    def to_dict(self):
        return {
            "id": self.id,
            "descripcion": self.descripcion,
            "completada": self.completada,
            "creada_en": self.creada_en,
            "completada_en": self.completada_en,
        }

    @classmethod
    def from_dict(cls, datos):
        return cls(**datos)


# src/storage.py
import json
from pathlib import Path
from src.models import Tarea

RUTA_DATOS = Path.home() / ".gestor_tareas" / "tareas.json"

def cargar_tareas():
    if not RUTA_DATOS.exists():
        return []
    try:
        datos = json.loads(RUTA_DATOS.read_text(encoding="utf-8"))
        return [Tarea.from_dict(d) for d in datos]
    except (json.JSONDecodeError, KeyError):
        return []

def guardar_tareas(tareas):
    RUTA_DATOS.parent.mkdir(parents=True, exist_ok=True)
    RUTA_DATOS.write_text(
        json.dumps([t.to_dict() for t in tareas], ensure_ascii=False, indent=2),
        encoding="utf-8"
    )


# src/cli.py
import argparse
import sys
from src.storage import cargar_tareas, guardar_tareas
from src.models import Tarea

def cmd_agregar(args):
    tareas = cargar_tareas()
    tarea = Tarea(descripcion=args.descripcion)
    tareas.append(tarea)
    guardar_tareas(tareas)
    print(f"[{tarea.id}] Tarea agregada: {tarea.descripcion}")

def cmd_listar(args):
    tareas = cargar_tareas()
    if not tareas:
        print("No hay tareas.")
        return
    for tarea in tareas:
        estado = "x" if tarea.completada else " "
        print(f"[{estado}] {tarea.id} — {tarea.descripcion}")

def cmd_completar(args):
    tareas = cargar_tareas()
    coincidencias = [t for t in tareas if t.id == args.id]
    if not coincidencias:
        print(f"No se encontró tarea con id: {args.id}")
        sys.exit(1)
    coincidencias[0].completar()
    guardar_tareas(tareas)
    print(f"Tarea {args.id} marcada como completada.")

def ejecutar():
    parser = argparse.ArgumentParser(
        prog="tareas",
        description="Gestor de tareas desde la terminal"
    )
    subparsers = parser.add_subparsers(dest="comando", required=True)

    p_agregar = subparsers.add_parser("agregar", help="Agregar una tarea")
    p_agregar.add_argument("descripcion", help="Descripción de la tarea")

    subparsers.add_parser("listar", help="Listar todas las tareas")

    p_completar = subparsers.add_parser("completar", help="Marcar tarea como completada")
    p_completar.add_argument("id", help="ID de la tarea")

    args = parser.parse_args()

    comandos = {
        "agregar": cmd_agregar,
        "listar": cmd_listar,
        "completar": cmd_completar,
    }
    comandos[args.comando](args)`,
    practicalTips: [
      "Usa dataclasses para modelos simples. Eliminan el boilerplate de __init__, __repr__ y __eq__ sin la complejidad de una clase completa.",
      "Guarda los datos del usuario en Path.home() / '.nombre_herramienta'. Es la convención en herramientas CLI en todos los sistemas operativos.",
      "Trata este proyecto como si fuera real: escribe un README, agrega requirements.txt, usa un entorno virtual. La presentación importa tanto como el código.",
      "Prueba la herramienta con python tareas.py --help. Si la ayuda no es clara, el diseño de la interfaz necesita revisión.",
    ],
    commonMistakes: [
      "Poner toda la lógica en un solo archivo. La separación en módulos no es opcional en proyectos reales.",
      "No manejar el caso donde el archivo de datos está corrupto. Siempre envuelve la lectura en try/except.",
      "Mezclar la lógica de negocio con la de presentación. El módulo storage no debe saber nada sobre argparse ni sobre cómo se muestran los datos.",
      "No usar sys.exit(1) cuando ocurre un error. Las herramientas CLI deben devolver códigos de salida distintos de cero en caso de fallo; otros scripts y pipelines dependen de esto.",
    ],
    resources: JSON.stringify([
      {
        type: "documentation",
        title: "argparse - Docs oficiales",
        url: "https://docs.python.org/3/library/argparse.html",
      },
      {
        type: "documentation",
        title: "dataclasses - Docs oficiales",
        url: "https://docs.python.org/3/library/dataclasses.html",
      },
    ]),
  },
  
    
    
    
  ];

  for (const concept of concepts) {
    await prisma.concept.upsert({
      where: { slug: concept.slug },
      update: concept,
      create: concept,
    });
    console.log(`Concepto "${concept.name}" seedado o actualizado.`);
  }

 

}

// async function seedConceptsToModules() {
//   // JavaScript desde Cero
//   const jsPath = await prisma.pathTemplate.findUniqueOrThrow({ where: { slug: "javascript-beginner" } });
//   const jsModules = await prisma.pathModule.findMany({
//     where: { pathTemplateId: jsPath.id },
//     orderBy: { orderIndex: "asc" },
//   });

//   const conceptMappings: { moduleSlug: string; conceptSlugs: string[] }[] = [
//     {
//       moduleSlug: "Fundamentos de JavaScript",
//       conceptSlugs: ["js-variables", "js-functions"],
//     },
//     {
//       moduleSlug: "Funciones y Scope",
//       conceptSlugs: ["js-functions", "js-closures"],
//     },
//     {
//       moduleSlug: "Arrays y Objetos",
//       conceptSlugs: ["js-arrays-objects"],
//     },
//     {
//       moduleSlug: "DOM y Eventos",
//       conceptSlugs: ["js-dom", "js-events"],
//     },
//     {
//       moduleSlug: "Asincronismo y APIs",
//       conceptSlugs: ["js-async", "js-fetch"],
//     },
//     {
//       moduleSlug: "Proyecto Final",
//       conceptSlugs: ["js-modules", "js-patterns"],
//     },
//   ];

//   for (const mapping of conceptMappings) {
//     const module = jsModules.find((m) => m.title === mapping.moduleSlug);
//     if (!module) continue;

//     for (const conceptSlug of mapping.conceptSlugs) {
//       const concept = await prisma.concept.findUnique({ where: { slug: conceptSlug } });
//       if (!concept) continue;

//       await prisma.conceptOnModule.upsert({
//         where: { moduleId_conceptId: { moduleId: module.id, conceptId: concept.id } },
//         update: {},
//         create: { moduleId: module.id, conceptId: concept.id },
//       });
//     }
//   }

//   console.log("✅ Concepts mapped to modules");
// }

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });