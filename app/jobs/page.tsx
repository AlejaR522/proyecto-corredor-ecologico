// // app/(public)/empleos/page.tsx
// // import { JobsList } from "@/components/public/jobs-list";
// // import { JobFilters } from "@/components/public/job-filters";
// import { JobFilters } from '@/components/jobs/job-filters';
// import { JobsList } from '@/components/jobs/job-list';
// import db from '@/lib/prisma';
// import { Leaf } from 'lucide-react';

// export default async function JobsPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ category?: string; location?: string }>;
// }) {
//   // Await searchParams en Next.js 15+
//   const params = await searchParams;
  
//   // Construir filtros
//   const whereFilter: any = {};
  
//   if (params.category && params.category !== 'Todas') {
//     whereFilter.company = params.category;
//   }
  
//   if (params.location && params.location !== 'Todas') {
//     whereFilter.location = params.location;
//   }

//   // Obtener empleos públicos con filtros
//   const jobs = await db.job.findMany({
//     where: whereFilter,
//     orderBy: { postedAt: 'desc' },
//   });

//   // Obtener categorías y ubicaciones únicas para los filtros
//   const categories = await db.job.findMany({
//     select: { company: true },
//     distinct: ['company'],
//   });

//   const locations = await db.job.findMany({
//     select: { location: true },
//     distinct: ['location'],
//   });

//   return (
//     <div className="min-h-screen bg-linear-to-br from-green-50 via-emerald-50 to-teal-50">
//       {/* Header moderno con glassmorphism */}
//       <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-green-100 shadow-sm">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <div className="bg-linear-to-br from-green-500 to-emerald-600 p-2 rounded-xl shadow-lg">
//               <Leaf className="h-6 w-6 text-white" />
//             </div>
//             <h1 className="text-2xl font-bold bg-linear-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
//               Corredor Ecológico
//             </h1>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-12 max-w-6xl">
//         {/* Hero Section */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
//             Encuentra tu próximo empleo
//           </h2>
//           <p className="text-lg text-green-600 max-w-2xl mx-auto">
//             Oportunidades laborales comprometidas con el medio ambiente y la sostenibilidad
//           </p>
//         </div>

//         {/* Filtros con diseño card moderno */}
//         <JobFilters
//           categories={categories.map((c) => c.company)}
//           locations={locations.map((l) => l.location)}
//         />

//         {/* Lista de empleos */}
//         <JobsList jobs={jobs} />
//       </main>

//       {/* Footer moderno */}
//       <footer className="bg-linear-to-r from-green-700 via-emerald-700 to-green-800 text-white mt-24">
//         <div className="container mx-auto px-4 py-8">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <div className="flex items-center gap-2">
//               <Leaf className="h-5 w-5" />
//               <p className="font-medium">© 2025 Corredor Ecológico</p>
//             </div>
//             <p className="text-green-100">Todos los derechos reservados.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }import { JobFilters } from '@/components/jobs/job-filters';
import { JobsList } from '@/components/jobs/job-list';
import db from '@/lib/prisma';
import { Leaf } from 'lucide-react';
import { auth } from "@/lib/auth";
import { serverSession } from '@/lib/auth-server';
import { JobFilters } from '@/components/jobs/job-filters';

export default async function JobsPage({ searchParams }: {
  searchParams: Promise<{ category?: string; location?: string }>;
}) {

  const params = await searchParams;

  const whereFilter: any = {};

  if (params.category && params.category !== "Todas") {
    whereFilter.company = params.category;
  }

  if (params.location && params.location !== "Todas") {
    whereFilter.location = params.location;
  }

  const session = await serverSession();

  let userApplications: string[] = [];

  if (session?.user?.id) {
    const apps = await db.jobApplication.findMany({
      where: { userId: session.user.id },
      select: { jobId: true },
    });
    userApplications = apps.map((a) => a.jobId);
  }

  const jobs = await db.job.findMany({
    where: whereFilter,
    orderBy: { postedAt: "desc" },
  });

  const categories = await db.job.findMany({
    select: { company: true },
    distinct: ["company"],
  });

  const locations = await db.job.findMany({
    select: { location: true },
    distinct: ["location"],
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-emerald-50 to-teal-50">

      {/* ... header ... */}

      <main className="container mx-auto px-4 py-12 max-w-6xl">

        <JobFilters
          categories={categories.map((c) => c.company)}
          locations={locations.map((l) => l.location)}
        />

        <JobsList jobs={jobs} userApplications={userApplications} />

      </main>

      {/* ... footer ... */}
    </div>
  );
}
