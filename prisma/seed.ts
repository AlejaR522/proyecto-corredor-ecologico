import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // -------------------------------
  // 1. Crear Usuarios
  // -------------------------------
  const users = await prisma.user.createMany({
    data: [
      { id: "user_01", name: "Carlos Rodríguez", email: "carlos@example.com" },
      { id: "user_02", name: "María Torres", email: "maria@example.com" },
      { id: "user_03", name: "Juan Pérez", email: "juan@example.com" },
      { id: "user_04", name: "Ana Gómez", email: "ana@example.com" },
      { id: "user_05", name: "Lucía Herrera", email: "lucia@example.com" },
      { id: "user_06", name: "Sergio Aguilar", email: "sergio@example.com" },
      { id: "user_07", name: "Diana Velásquez", email: "diana@example.com" },
      { id: "user_08", name: "Pedro Castillo", email: "pedro@example.com" },
      { id: "user_09", name: "Valentina Ruiz", email: "valentina@example.com" },
      { id: "user_10", name: "Mateo López", email: "mateo@example.com" }
    ]
  });

  console.log("👤 Usuarios creados:", users);

  // -------------------------------
  // 2. Crear Empleos
  // -------------------------------
  const jobs = await prisma.job.createMany({
    data: [
      {
        title: "Desarrollador Frontend React",
        company: "TechNova",
        description:
          "Responsable de crear interfaces modernas y dinámicas usando React, TypeScript, Zustand, TailwindCSS y buenas prácticas de UI. El candidato trabajará en un entorno ágil y deberá integrarse con el backend mediante APIs REST y WebSockets.",
        location: "Remoto",
        experienceYears: 2
      },
      {
        title: "Backend Developer Node.js",
        company: "SoftCore Systems",
        description:
          "Diseño y desarrollo de APIs escalables con Node.js, Express, PostgreSQL y Prisma ORM. Se requiere experiencia creando arquitecturas limpias y optimizadas, autenticación segura y manejo avanzado de middlewares.",
        location: "Bogotá, Colombia",
        experienceYears: 3
      },
      {
        title: "Full Stack Developer Next.js",
        company: "DigitalWave",
        description:
          "Construcción de plataformas modernas usando Next.js App Router, Server Actions, React Server Components y SSR. El puesto requiere conocimiento de despliegues en Vercel, Prisma, Tailwind y sockets en tiempo real.",
        location: "Medellín, Colombia",
        experienceYears: 1
      },
      {
        title: "UI/UX Designer",
        company: "Creativa Studio",
        description:
          "Responsable del diseño de interfaces y experiencias centradas en el usuario. Debe manejar Figma a nivel avanzado, sistemas de diseño, prototipado y pruebas con usuarios. Se valorará experiencia con motion graphics.",
        location: "Remoto",
        experienceYears: 2
      },
      {
        title: "Ingeniero de Software",
        company: "InnovaTech",
        description:
          "Desarrollo de soluciones empresariales utilizando TypeScript, Node.js, clean architecture y patrones de diseño. El puesto implica colaborar con equipos multidisciplinarios y garantizar el rendimiento del sistema.",
        location: "Lima, Perú",
        experienceYears: 4
      },
      {
        title: "QA Tester Manual",
        company: "QualityFirst",
        description:
          "Ejecución de pruebas funcionales, regresión, smoke testing y documentación de resultados. Reporte detallado de bugs mediante herramientas de ticketing como Jira o Linear.",
        location: "Ciudad de México",
        experienceYears: 1
      },
      {
        title: "DevOps Engineer",
        company: "CloudBridge",
        description:
          "Administración de pipelines CI/CD, contenedores Docker, Kubernetes, monitoreo, infraestructura cloud (AWS o GCP) y automatización con Terraform. Se requiere experiencia sólida en Linux.",
        location: "Remoto",
        experienceYears: 3
      },
      {
        title: "Mobile Developer Flutter",
        company: "AppsFactory",
        description:
          "Desarrollo de aplicaciones móviles multiplataforma con Flutter, Dart, Firebase y Clean Architecture. Integración con APIs externas y optimización de rendimiento.",
        location: "Buenos Aires, Argentina",
        experienceYears: 2
      },
      {
        title: "Data Analyst",
        company: "Insight Data",
        description:
          "Extracción, análisis e interpretación de datos utilizando SQL, Python, Power BI y Excel. Creación de dashboards interactivos y modelos estadísticos básicos.",
        location: "Santiago, Chile",
        experienceYears: 1
      },
      {
        title: "Project Manager",
        company: "GlobalSoft",
        description:
          "Gestión de proyectos bajo metodologías ágiles Scrum y Kanban. Coordinación de equipos, seguimiento de KPIs, estimaciones y planificación. Requiere excelente comunicación y liderazgo.",
        location: "Madrid, España",
        experienceYears: 5
      }
    ]
  });

  console.log("💼 Empleos creados:", jobs);

  console.log("🎉 Seed completado con éxito.");
}

main()
  .catch((e) => {
    console.error("❌ Error en el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
