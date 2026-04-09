import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding learning paths...");

  await seedSubjects();
  await seedPathTemplates();

  console.log("Seed completed successfully.");
  await seedExercises();
  console.log("Exercises seeded successfully.");
  await seedConcepts();
  console.log("Concepts seeded successfully.");

}

async function seedSubjects() {
  const subjects = [
    {
      name: "HTML/CSS",
      slug: "html-css",
      description: "Fundamentos de estructura y estilos para la web",
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
      name: "C#",
      slug: "csharp",
      description: "Lenguaje de propósito general del ecosistema Microsoft",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    },

    {
      name: "Kubernetes",
      slug: "kubernetes",
      description: "Plataforma de orquestación de contenedores",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    },
    {
      name: "Azure",
      slug: "azure",
      description: "Plataforma cloud de Microsoft",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    },
    {
      name: "GCP",
      slug: "gcp",
      description: "Google Cloud Platform para infraestructura y datos",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    },
    {
      name: "React Native",
      slug: "react-native",
      description: "Framework para aplicaciones móviles con React",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },


    {
      name: "Postman",
      slug: "postman",
      description: "Herramienta para probar y documentar APIs",
      iconUrl: "https://www.postman.com/favicon-32x32.png",
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
  const s = async (slug: string) => prisma.subject.findUniqueOrThrow({ where: { slug } });

  const htmlCss = await s("html-css");
  const javascript = await s("javascript");
  const typescript = await s("typescript");
  const react = await s("react");
  const vue = await s("vue");
  const angular = await s("angular");
  const nodejs = await s("nodejs");
  const python = await s("python");
  const aws = await s("aws");
  const git = await s("git");
  const linux = await s("linux");
  const docker = await s("docker");
  const sql = await s("sql");
  const postgresql = await s("postgresql");
  const mongodb = await s("mongodb");
  const java = await s("java");
  const csharp = await s("csharp");
  const kubernetes = await s("kubernetes");
  const azure = await s("azure");
  const gcp = await s("gcp");
  const reactNative = await s("react-native");
  const postman = await s("postman");



  const paths = [
    {
      title: "HTML y CSS desde Cero",
      slug: "html-css-beginner",
      description: "Aprende a construir y estilizar páginas web desde cero con HTML y CSS",
      level: "BEGINNER" as const,
      goal: "frontend",
      weeklyHours: 10,
      subjectId: htmlCss.id,
      modules: [
        { title: "Estructura HTML", orderIndex: 1, durationDays: 10 },
        { title: "Textos, enlaces y listas", orderIndex: 2, durationDays: 8 },
        { title: "Formularios", orderIndex: 3, durationDays: 10 },
        { title: "CSS básico", orderIndex: 4, durationDays: 12 },
        { title: "Box model y layout", orderIndex: 5, durationDays: 12 },
        { title: "Proyecto responsive", orderIndex: 6, durationDays: 12 },
      ],
    },
    {
      title: "JavaScript desde Cero",
      slug: "javascript-beginner",
      description: "Aprende los fundamentos de JavaScript desde cero hasta construir aplicaciones web interactivas",
      level: "BEGINNER" as const,
      goal: "frontend",
      weeklyHours: 10,
      subjectId: javascript.id,
      modules: [
        { title: "Sintaxis, variables y tipos", orderIndex: 1, durationDays: 10 },
        { title: "Condicionales y ciclos", orderIndex: 2, durationDays: 8 },
        { title: "Funciones y scope", orderIndex: 3, durationDays: 10 },
        { title: "Arrays y objetos", orderIndex: 4, durationDays: 12 },
        { title: "DOM y eventos", orderIndex: 5, durationDays: 12 },
        { title: "Proyecto final", orderIndex: 6, durationDays: 10 },
      ],
    },
    {
      title: "Git Esencial",
      slug: "git-beginner",
      description: "Domina el control de versiones para trabajar como desarrollador profesional",
      level: "BEGINNER" as const,
      goal: "fullstack",
      weeklyHours: 6,
      subjectId: git.id,
      modules: [
        { title: "Fundamentos de Git", orderIndex: 1, durationDays: 6 },
        { title: "Repositorios y commits", orderIndex: 2, durationDays: 6 },
        { title: "Branches y merge", orderIndex: 3, durationDays: 8 },
        { title: "GitHub y colaboración", orderIndex: 4, durationDays: 8 },
      ],
    },
    {
      title: "Linux Esencial para DevOps",
      slug: "linux-beginner",
      description: "Domina la terminal y los fundamentos de Linux para trabajar en cloud y servidores",
      level: "BEGINNER" as const,
      goal: "devops",
      weeklyHours: 8,
      subjectId: linux.id,
      modules: [
        { title: "Terminal y navegación", orderIndex: 1, durationDays: 8 },
        { title: "Permisos y usuarios", orderIndex: 2, durationDays: 8 },
        { title: "Procesos y servicios", orderIndex: 3, durationDays: 8 },
        { title: "Redirecciones y pipes", orderIndex: 4, durationDays: 8 },
      ],
    },
    {
      title: "SQL para Desarrollo Profesional",
      slug: "sql-beginner",
      description: "Aprende SQL para consultar y modelar datos de forma profesional",
      level: "BEGINNER" as const,
      goal: "backend",
      weeklyHours: 8,
      subjectId: sql.id,
      modules: [
        { title: "SELECT y filtros", orderIndex: 1, durationDays: 8 },
        { title: "JOINs", orderIndex: 2, durationDays: 10 },
        { title: "GROUP BY y agregaciones", orderIndex: 3, durationDays: 8 },
        { title: "Subqueries y CTEs", orderIndex: 4, durationDays: 10 },
        { title: "Modelado básico", orderIndex: 5, durationDays: 8 },
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
        { title: "Tipos básicos y narrowing", orderIndex: 1, durationDays: 10 },
        { title: "Interfaces y type aliases", orderIndex: 2, durationDays: 8 },
        { title: "Generics", orderIndex: 3, durationDays: 10 },
        { title: "Utility types", orderIndex: 4, durationDays: 8 },
        { title: "TypeScript en React y Node", orderIndex: 5, durationDays: 12 },
      ],
    },
    {
      title: "React para Frontend Developers",
      slug: "react-frontend",
      description: "Conviértete en Frontend Developer profesional dominando React y su ecosistema",
      level: "INTERMEDIATE" as const,
      goal: "frontend",
      weeklyHours: 15,
      subjectId: react.id,
      modules: [
        { title: "Componentes y JSX", orderIndex: 1, durationDays: 10 },
        { title: "Estado y hooks básicos", orderIndex: 2, durationDays: 12 },
        { title: "Renderizado y composición", orderIndex: 3, durationDays: 8 },
        { title: "Routing y navegación", orderIndex: 4, durationDays: 7 },
        { title: "Forms y validación", orderIndex: 5, durationDays: 8 },
        { title: "Performance y testing", orderIndex: 6, durationDays: 10 },
        { title: "Proyecto final", orderIndex: 7, durationDays: 14 },
      ],
    },
    {
      title: "Vue para Frontend Developers",
      slug: "vue-frontend",
      description: "Aprende Vue para construir interfaces modernas y reactivas",
      level: "INTERMEDIATE" as const,
      goal: "frontend",
      weeklyHours: 12,
      subjectId: vue.id,
      modules: [
        { title: "Fundamentos de Vue", orderIndex: 1, durationDays: 10 },
        { title: "Templates y reactividad", orderIndex: 2, durationDays: 10 },
        { title: "Componentes y props", orderIndex: 3, durationDays: 10 },
        { title: "Composables y estado", orderIndex: 4, durationDays: 10 },
        { title: "Routing y formularios", orderIndex: 5, durationDays: 10 },
        { title: "Proyecto final", orderIndex: 6, durationDays: 12 },
      ],
    },
    {
      title: "Angular para Frontend Developers",
      slug: "angular-frontend",
      description: "Domina Angular para crear aplicaciones web empresariales",
      level: "INTERMEDIATE" as const,
      goal: "frontend",
      weeklyHours: 12,
      subjectId: angular.id,
      modules: [
        { title: "Fundamentos de Angular", orderIndex: 1, durationDays: 10 },
        { title: "Componentes y templates", orderIndex: 2, durationDays: 10 },
        { title: "Servicios e inyección de dependencias", orderIndex: 3, durationDays: 10 },
        { title: "Routing y forms", orderIndex: 4, durationDays: 10 },
        { title: "RxJS y estado", orderIndex: 5, durationDays: 12 },
        { title: "Proyecto final", orderIndex: 6, durationDays: 12 },
      ],
    },
    {
      title: "Node.js Backend Developer",
      slug: "nodejs-backend",
      description: "Construye APIs robustas y escalables con Node.js, Express y bases de datos",
      level: "INTERMEDIATE" as const,
      goal: "backend",
      weeklyHours: 15,
      subjectId: nodejs.id,
      modules: [
        { title: "Node.js core", orderIndex: 1, durationDays: 8 },
        { title: "Express y REST APIs", orderIndex: 2, durationDays: 12 },
        { title: "PostgreSQL y Prisma", orderIndex: 3, durationDays: 12 },
        { title: "Auth, JWT y seguridad", orderIndex: 4, durationDays: 10 },
        { title: "Testing y calidad", orderIndex: 5, durationDays: 10 },
        { title: "Deploy y observabilidad", orderIndex: 6, durationDays: 10 },
      ],
    },
    {
      title: "PostgreSQL Profesional",
      slug: "postgresql-intermediate",
      description: "Domina PostgreSQL para construir backends y sistemas de datos confiables",
      level: "INTERMEDIATE" as const,
      goal: "backend",
      weeklyHours: 10,
      subjectId: postgresql.id,
      modules: [
        { title: "Tablas y constraints", orderIndex: 1, durationDays: 10 },
        { title: "Relaciones y normalización", orderIndex: 2, durationDays: 10 },
        { title: "Transacciones y locks", orderIndex: 3, durationDays: 10 },
        { title: "Consultas avanzadas", orderIndex: 4, durationDays: 10 },
        { title: "Performance y tuning", orderIndex: 5, durationDays: 12 },
      ],
    },
    {
      title: "MongoDB para Backend",
      slug: "mongodb-intermediate",
      description: "Aprende bases de datos NoSQL con MongoDB en escenarios reales",
      level: "INTERMEDIATE" as const,
      goal: "backend",
      weeklyHours: 10,
      subjectId: mongodb.id,
      modules: [
        { title: "Documentos y colecciones", orderIndex: 1, durationDays: 8 },
        { title: "Modelado de datos", orderIndex: 2, durationDays: 10 },
        { title: "Consultas y agregaciones", orderIndex: 3, durationDays: 10 },
        { title: "Índices y performance", orderIndex: 4, durationDays: 10 },
        { title: "Integración con Node.js", orderIndex: 5, durationDays: 12 },
      ],
    },
    {
      title: "Java desde Cero",
      slug: "java-beginner",
      description: "Aprende Java entendiendo tipos, control de flujo, objetos y la lógica de un lenguaje orientado a objetos.",
      level: "BEGINNER" as const,
      goal: "backend",
      weeklyHours: 10,
      subjectId: java.id,
      modules: [
        { title: "Qué hace diferente a Java y cómo compilarlo", orderIndex: 1, durationDays: 8 },
        { title: "Sintaxis, tipos y operadores", orderIndex: 2, durationDays: 10 },
        { title: "Control de flujo y métodos", orderIndex: 3, durationDays: 10 },
        { title: "Arrays, String y estructuras básicas", orderIndex: 4, durationDays: 12 },
        { title: "POO introductoria", orderIndex: 5, durationDays: 14 },
        { title: "Mini proyecto de consola", orderIndex: 6, durationDays: 12 },
      ],
    },
    {
      title: "Java Profesional",
      slug: "java-intermediate",
      description: "Consolida Java para escribir software más sólido, mantenible y listo para backend.",
      level: "INTERMEDIATE" as const,
      goal: "backend",
      weeklyHours: 12,
      subjectId: java.id,
      modules: [
        { title: "POO sólida y diseño de clases", orderIndex: 1, durationDays: 10 },
        { title: "Herencia, interfaces y polimorfismo", orderIndex: 2, durationDays: 10 },
        { title: "Colecciones y genéricos", orderIndex: 3, durationDays: 12 },
        { title: "Excepciones, archivos y streams", orderIndex: 4, durationDays: 12 },
        { title: "Testing con JUnit y organización del código", orderIndex: 5, durationDays: 12 },
        { title: "Proyecto intermedio bien estructurado", orderIndex: 6, durationDays: 14 },
      ],
    },
    {
      title: "Java Avanzado",
      slug: "java-advanced",
      description: "Profundiza en concurrencia, performance y patrones de diseño para software de nivel profesional.",
      level: "ADVANCED" as const,
      goal: "backend",
      weeklyHours: 12,
      subjectId: java.id,
      modules: [
        { title: "Generics avanzados y APIs robustas", orderIndex: 1, durationDays: 10 },
        { title: "Concurrencia y thread safety", orderIndex: 2, durationDays: 12 },
        { title: "Java Collections y performance", orderIndex: 3, durationDays: 10 },
        { title: "Patrones de diseño aplicados", orderIndex: 4, durationDays: 12 },
        { title: "Arquitectura limpia en Java", orderIndex: 5, durationDays: 12 },
        { title: "Preparación para Spring Boot", orderIndex: 6, durationDays: 14 },
      ],
    },
    {
      title: "Spring Boot Backend",
      slug: "spring-boot-backend",
      description: "Aprende a construir APIs y servicios backend con Spring Boot, con foco en estructura, validación, persistencia y seguridad.",
      level: "ADVANCED" as const,
      goal: "backend",
      weeklyHours: 15,
      subjectId: java.id,
      modules: [
        { title: "Estructura de proyecto y arranque", orderIndex: 1, durationDays: 10 },
        { title: "Controllers, services y dependency injection", orderIndex: 2, durationDays: 12 },
        { title: "REST APIs y validación", orderIndex: 3, durationDays: 12 },
        { title: "Persistencia con JPA y bases de datos", orderIndex: 4, durationDays: 14 },
        { title: "Seguridad, configuración y profiles", orderIndex: 5, durationDays: 12 },
        { title: "Testing y despliegue", orderIndex: 6, durationDays: 14 },
      ],
    },

    {
      title: "Docker para Desarrolladores",
      slug: "docker-intermediate",
      description: "Aprende a contenerizar aplicaciones y trabajar con entornos reproducibles",
      level: "INTERMEDIATE" as const,
      goal: "devops",
      weeklyHours: 10,
      subjectId: docker.id,
      modules: [
        { title: "Imágenes y contenedores", orderIndex: 1, durationDays: 8 },
        { title: "Dockerfile", orderIndex: 2, durationDays: 10 },
        { title: "Volúmenes y redes", orderIndex: 3, durationDays: 8 },
        { title: "Docker Compose", orderIndex: 4, durationDays: 10 },
        { title: "Buenas prácticas y optimización", orderIndex: 5, durationDays: 10 },
      ],
    },
    {
      title: "Kubernetes Esencial",
      slug: "kubernetes-intermediate",
      description: "Orquesta contenedores y despliega aplicaciones modernas en clústeres",
      level: "INTERMEDIATE" as const,
      goal: "devops",
      weeklyHours: 12,
      subjectId: kubernetes.id,
      modules: [
        { title: "Pods y deployments", orderIndex: 1, durationDays: 10 },
        { title: "Services e ingress", orderIndex: 2, durationDays: 10 },
        { title: "ConfigMaps y secrets", orderIndex: 3, durationDays: 10 },
        { title: "Escalado y troubleshooting", orderIndex: 4, durationDays: 12 },
        { title: "Proyecto de despliegue", orderIndex: 5, durationDays: 12 },
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
        { title: "Fundamentos de cloud", orderIndex: 1, durationDays: 8 },
        { title: "IAM y seguridad", orderIndex: 2, durationDays: 10 },
        { title: "Compute: EC2 y Lambda", orderIndex: 3, durationDays: 10 },
        { title: "Storage: S3", orderIndex: 4, durationDays: 8 },
        { title: "Networking básico", orderIndex: 5, durationDays: 10 },
        { title: "Preparación para examen", orderIndex: 6, durationDays: 14 },
      ],
    },
    {
      title: "AWS para Backend y Serverless",
      slug: "aws-intermediate",
      description: "Construye y despliega arquitecturas modernas con AWS",
      level: "INTERMEDIATE" as const,
      goal: "devops",
      weeklyHours: 12,
      subjectId: aws.id,
      modules: [
        { title: "Lambda y API Gateway", orderIndex: 1, durationDays: 12 },
        { title: "DynamoDB y RDS", orderIndex: 2, durationDays: 12 },
        { title: "VPC y networking", orderIndex: 3, durationDays: 12 },
        { title: "CloudWatch y monitoreo", orderIndex: 4, durationDays: 10 },
        { title: "Seguridad y buenas prácticas", orderIndex: 5, durationDays: 10 },
      ],
    },
    {
      title: "AWS Well-Architected",
      slug: "aws-advanced",
      description: "Diseña arquitecturas seguras, confiables y eficientes en AWS",
      level: "ADVANCED" as const,
      goal: "devops",
      weeklyHours: 12,
      subjectId: aws.id,
      modules: [
        { title: "Operational Excellence", orderIndex: 1, durationDays: 10 },
        { title: "Security Pillar", orderIndex: 2, durationDays: 10 },
        { title: "Reliability Pillar", orderIndex: 3, durationDays: 10 },
        { title: "Performance Efficiency", orderIndex: 4, durationDays: 10 },
        { title: "Cost Optimization", orderIndex: 5, durationDays: 10 },
        { title: "Sustainability", orderIndex: 6, durationDays: 10 },
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
        { title: "Python fundamentals", orderIndex: 1, durationDays: 12 },
        { title: "Estructuras de datos", orderIndex: 2, durationDays: 10 },
        { title: "NumPy", orderIndex: 3, durationDays: 12 },
        { title: "Pandas", orderIndex: 4, durationDays: 14 },
        { title: "Matplotlib", orderIndex: 5, durationDays: 10 },
        { title: "Proyecto de análisis", orderIndex: 6, durationDays: 14 },
      ],
    },

    {
      title: "React Native para Mobile Developers",
      slug: "react-native-intermediate",
      description: "Construye apps móviles con React Native y buenas prácticas modernas",
      level: "INTERMEDIATE" as const,
      goal: "mobile",
      weeklyHours: 12,
      subjectId: reactNative.id,
      modules: [
        { title: "Fundamentos de React Native", orderIndex: 1, durationDays: 10 },
        { title: "Componentes y estilos", orderIndex: 2, durationDays: 10 },
        { title: "Navegación", orderIndex: 3, durationDays: 10 },
        { title: "APIs y almacenamiento local", orderIndex: 4, durationDays: 10 },
        { title: "Proyecto final", orderIndex: 5, durationDays: 14 },
      ],
    },
    {
      title: "QA Automation con JavaScript",
      slug: "qa-javascript-intermediate",
      description: "Aprende automatización de pruebas para aplicaciones web modernas",
      level: "INTERMEDIATE" as const,
      goal: "qa",
      weeklyHours: 10,
      subjectId: javascript.id,
      modules: [
        { title: "Fundamentos de testing", orderIndex: 1, durationDays: 8 },
        { title: "Pruebas unitarias", orderIndex: 2, durationDays: 10 },
        { title: "Pruebas de integración", orderIndex: 3, durationDays: 10 },
        { title: "E2E con Cypress o Playwright", orderIndex: 4, durationDays: 12 },
        { title: "Reportes y estrategia QA", orderIndex: 5, durationDays: 10 },
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

async function seedConcepts() {
  const javascript = await prisma.subject.findUniqueOrThrow({ where: { slug: "javascript" } });
  const typescript = await prisma.subject.findUniqueOrThrow({ where: { slug: "typescript" } });
  const react = await prisma.subject.findUniqueOrThrow({ where: { slug: "react" } });
  const nodejs = await prisma.subject.findUniqueOrThrow({ where: { slug: "nodejs" } });
  const python = await prisma.subject.findUniqueOrThrow({ where: { slug: "python" } });
  const aws = await prisma.subject.findUniqueOrThrow({ where: { slug: "aws" } });

  const concepts = [
    // JavaScript
    { name: "Variables, tipos de datos y operadores", slug: "js-variables", level: "BEGINNER" as const, subjectId: javascript.id },
    { name: "Funciones y scope", slug: "js-functions", level: "BEGINNER" as const, subjectId: javascript.id },
    { name: "Arrays y objetos", slug: "js-arrays-objects", level: "BEGINNER" as const, subjectId: javascript.id },
    { name: "Manipulación del DOM", slug: "js-dom", level: "BEGINNER" as const, subjectId: javascript.id },
    { name: "Eventos del navegador", slug: "js-events", level: "BEGINNER" as const, subjectId: javascript.id },
    { name: "Promesas y async/await", slug: "js-async", level: "INTERMEDIATE" as const, subjectId: javascript.id },
    { name: "Closures y callbacks", slug: "js-closures", level: "INTERMEDIATE" as const, subjectId: javascript.id },
    { name: "Módulos ES6+", slug: "js-modules", level: "INTERMEDIATE" as const, subjectId: javascript.id },
    { name: "Fetch API y consumo de APIs REST", slug: "js-fetch", level: "INTERMEDIATE" as const, subjectId: javascript.id },
    { name: "Patrones de diseño en JavaScript", slug: "js-patterns", level: "ADVANCED" as const, subjectId: javascript.id },
    { name: "Performance y optimización", slug: "js-performance", level: "ADVANCED" as const, subjectId: javascript.id },
    { name: "Testing con Jest", slug: "js-testing", level: "ADVANCED" as const, subjectId: javascript.id },

    // TypeScript
    { name: "Tipos básicos y anotaciones", slug: "ts-basic-types", level: "BEGINNER" as const, subjectId: typescript.id },
    { name: "Interfaces y type aliases", slug: "ts-interfaces", level: "BEGINNER" as const, subjectId: typescript.id },
    { name: "Funciones tipadas", slug: "ts-functions", level: "BEGINNER" as const, subjectId: typescript.id },
    { name: "Generics", slug: "ts-generics", level: "INTERMEDIATE" as const, subjectId: typescript.id },
    { name: "Utility types", slug: "ts-utility-types", level: "INTERMEDIATE" as const, subjectId: typescript.id },
    { name: "Decoradores", slug: "ts-decorators", level: "ADVANCED" as const, subjectId: typescript.id },
    { name: "TypeScript con React", slug: "ts-react", level: "INTERMEDIATE" as const, subjectId: typescript.id },
    { name: "Configuración avanzada de tsconfig", slug: "ts-config", level: "ADVANCED" as const, subjectId: typescript.id },

    // React
    { name: "Componentes y JSX", slug: "react-components", level: "BEGINNER" as const, subjectId: react.id },
    { name: "Props y estado con useState", slug: "react-state", level: "BEGINNER" as const, subjectId: react.id },
    { name: "useEffect y ciclo de vida", slug: "react-effects", level: "BEGINNER" as const, subjectId: react.id },
    { name: "Manejo de formularios", slug: "react-forms", level: "INTERMEDIATE" as const, subjectId: react.id },
    { name: "Context API y useContext", slug: "react-context", level: "INTERMEDIATE" as const, subjectId: react.id },
    { name: "Custom hooks", slug: "react-custom-hooks", level: "INTERMEDIATE" as const, subjectId: react.id },
    { name: "React Router y navegación", slug: "react-router", level: "INTERMEDIATE" as const, subjectId: react.id },
    { name: "Estado global con Zustand", slug: "react-zustand", level: "INTERMEDIATE" as const, subjectId: react.id },
    { name: "Optimización con useMemo y useCallback", slug: "react-optimization", level: "ADVANCED" as const, subjectId: react.id },
    { name: "Testing de componentes", slug: "react-testing", level: "ADVANCED" as const, subjectId: react.id },

    // Node.js
    { name: "Módulos y sistema de archivos", slug: "node-modules", level: "BEGINNER" as const, subjectId: nodejs.id },
    { name: "HTTP nativo y Express básico", slug: "node-express-basic", level: "BEGINNER" as const, subjectId: nodejs.id },
    { name: "Manejo de rutas y middlewares", slug: "node-routes", level: "BEGINNER" as const, subjectId: nodejs.id },
    { name: "Conexión a bases de datos con Prisma", slug: "node-prisma", level: "INTERMEDIATE" as const, subjectId: nodejs.id },
    { name: "Autenticación y JWT", slug: "node-auth", level: "INTERMEDIATE" as const, subjectId: nodejs.id },
    { name: "Validación con Zod", slug: "node-validation", level: "INTERMEDIATE" as const, subjectId: nodejs.id },
    { name: "Testing con Jest y Supertest", slug: "node-testing", level: "ADVANCED" as const, subjectId: nodejs.id },
    { name: "Deploy y variables de entorno", slug: "node-deploy", level: "ADVANCED" as const, subjectId: nodejs.id },

    // Python
    { name: "Variables, tipos y estructuras de datos", slug: "py-basics", level: "BEGINNER" as const, subjectId: python.id },
    { name: "Funciones y módulos", slug: "py-functions", level: "BEGINNER" as const, subjectId: python.id },
    { name: "POO en Python", slug: "py-oop", level: "INTERMEDIATE" as const, subjectId: python.id },
    { name: "NumPy y operaciones vectorizadas", slug: "py-numpy", level: "INTERMEDIATE" as const, subjectId: python.id },
    { name: "Pandas y análisis de datos", slug: "py-pandas", level: "INTERMEDIATE" as const, subjectId: python.id },
    { name: "Visualización con Matplotlib", slug: "py-matplotlib", level: "INTERMEDIATE" as const, subjectId: python.id },
    { name: "Machine Learning con Scikit-learn", slug: "py-sklearn", level: "ADVANCED" as const, subjectId: python.id },
    { name: "Deep Learning básico", slug: "py-deep-learning", level: "ADVANCED" as const, subjectId: python.id },

    // AWS
    { name: "Fundamentos de cloud y regiones", slug: "aws-fundamentals", level: "BEGINNER" as const, subjectId: aws.id },
    { name: "IAM y gestión de permisos", slug: "aws-iam", level: "BEGINNER" as const, subjectId: aws.id },
    { name: "EC2 y cómputo en la nube", slug: "aws-ec2", level: "BEGINNER" as const, subjectId: aws.id },
    { name: "S3 y almacenamiento", slug: "aws-s3", level: "BEGINNER" as const, subjectId: aws.id },
    { name: "Lambda y serverless", slug: "aws-lambda", level: "INTERMEDIATE" as const, subjectId: aws.id },
    { name: "API Gateway", slug: "aws-api-gateway", level: "INTERMEDIATE" as const, subjectId: aws.id },
    { name: "RDS y bases de datos", slug: "aws-rds", level: "INTERMEDIATE" as const, subjectId: aws.id },
    { name: "VPC y networking", slug: "aws-vpc", level: "INTERMEDIATE" as const, subjectId: aws.id },
    { name: "CloudFormation e IaC", slug: "aws-cloudformation", level: "ADVANCED" as const, subjectId: aws.id },
    { name: "CI/CD con CodePipeline", slug: "aws-cicd", level: "ADVANCED" as const, subjectId: aws.id },
  ];

  for (const concept of concepts) {
    await prisma.concept.upsert({
      where: { slug: concept.slug },
      update: concept,
      create: concept,
    });
  }

  console.log(`✅ ${concepts.length} concepts seeded`);

  // Asociar conceptos a módulos
  await seedConceptsToModules();
}

async function seedConceptsToModules() {
  // JavaScript desde Cero
  const jsPath = await prisma.pathTemplate.findUniqueOrThrow({ where: { slug: "javascript-beginner" } });
  const jsModules = await prisma.pathModule.findMany({
    where: { pathTemplateId: jsPath.id },
    orderBy: { orderIndex: "asc" },
  });

  const conceptMappings: { moduleSlug: string; conceptSlugs: string[] }[] = [
    {
      moduleSlug: "Fundamentos de JavaScript",
      conceptSlugs: ["js-variables", "js-functions"],
    },
    {
      moduleSlug: "Funciones y Scope",
      conceptSlugs: ["js-functions", "js-closures"],
    },
    {
      moduleSlug: "Arrays y Objetos",
      conceptSlugs: ["js-arrays-objects"],
    },
    {
      moduleSlug: "DOM y Eventos",
      conceptSlugs: ["js-dom", "js-events"],
    },
    {
      moduleSlug: "Asincronismo y APIs",
      conceptSlugs: ["js-async", "js-fetch"],
    },
    {
      moduleSlug: "Proyecto Final",
      conceptSlugs: ["js-modules", "js-patterns"],
    },
  ];

  for (const mapping of conceptMappings) {
    const module = jsModules.find((m) => m.title === mapping.moduleSlug);
    if (!module) continue;

    for (const conceptSlug of mapping.conceptSlugs) {
      const concept = await prisma.concept.findUnique({ where: { slug: conceptSlug } });
      if (!concept) continue;

      await prisma.conceptOnModule.upsert({
        where: { moduleId_conceptId: { moduleId: module.id, conceptId: concept.id } },
        update: {},
        create: { moduleId: module.id, conceptId: concept.id },
      });
    }
  }

  console.log("✅ Concepts mapped to modules");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });