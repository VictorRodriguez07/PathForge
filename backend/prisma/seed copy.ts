import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding subjects and learning paths...");
  await seedSubjects();
  console.log("✅ Subjects seeded.");
  await seedPathTemplates();
  console.log("✅ Path templates seeded.");
}

// SUBJECTS
// ─────────────────────────────────────────
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
      title: "JavaScript desde Cero",
      slug: "javascript-beginner",
      description:
        "Aprende JavaScript desde variables y funciones hasta asincronía, Fetch API y módulos ES6. El lenguaje de la web que todo desarrollador debe dominar. Al terminar construirás una aplicación web interactiva que consume datos de una API real.",
      level: "BEGINNER" as const,
      goal: "frontend",
      weeklyHours: 10,
      subjectId: javascript.id,
      modules: [
        {
          title: "Sintaxis, variables y tipos de datos",
          orderIndex: 1,
          durationDays: 10,
        },
        {
          title: "Condicionales y ciclos",
          orderIndex: 2,
          durationDays: 8,
        },
        {
          title: "Funciones, scope y closures",
          orderIndex: 3,
          durationDays: 10,
        },
        {
          title: "Arrays y objetos en profundidad",
          orderIndex: 4,
          durationDays: 12,
        },
        {
          title: "DOM: selección y manipulación dinámica",
          orderIndex: 5,
          durationDays: 12,
        },
        {
          title: "Eventos del navegador y delegación",
          orderIndex: 6,
          durationDays: 10,
        },
        {
          title: "JavaScript asíncrono: event loop, Promises y async/await",
          orderIndex: 7,
          durationDays: 12,
        },
        {
          title: "Fetch API y consumo de APIs REST",
          orderIndex: 8,
          durationDays: 10,
        },
        {
          title: "ES6+ y módulos de JavaScript",
          orderIndex: 9,
          durationDays: 10,
        },
        {
          title: "Proyecto: aplicación web interactiva con API",
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

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });