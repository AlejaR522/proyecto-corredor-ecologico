// 'use client';

// import { ApplyJobModal } from './apply-job-modal';
// import { useState } from 'react';
// import { MapPin, Building2, Calendar, Briefcase } from 'lucide-react';
// import { Job } from '@/prisma/generated/prisma/client';

// export function JobsList({ jobs }: { jobs: Job[] }) {
//   const [selectedJob, setSelectedJob] = useState<Job | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleApply = (job: Job) => {
//     setSelectedJob(job);
//     setIsModalOpen(true);
//   };

//   const formatDate = (date: Date) => {
//     return new Date(date).toLocaleDateString('es-CO', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   if (jobs.length === 0) {
//     return (
//       <div className="text-center py-16">
//         <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
//           <Briefcase className="h-10 w-10 text-green-600" />
//         </div>
//         <h3 className="text-2xl font-bold text-green-800 mb-2">
//           No hay empleos disponibles
//         </h3>
//         <p className="text-green-600">
//           Intenta ajustar los filtros para ver más resultados
//         </p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-green-800">
//           {jobs.length} {jobs.length === 1 ? 'Oferta disponible' : 'Ofertas disponibles'}
//         </h2>
//       </div>

//       <div className="grid grid-cols-1 gap-6">
//         {jobs.map((job) => (
//           <div
//             key={job.id}
//             className="group bg-white rounded-2xl shadow-md hover:shadow-xl border border-green-100 p-6 transition-all duration-300 hover:border-green-300 hover:-translate-y-1"
//           >
//             <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//               <div className="flex-1">
//                 <div className="flex items-start gap-3 mb-3">
//                   <div className="bg-linear-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-md">
//                     <Briefcase className="h-6 w-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-bold text-green-800 mb-1 group-hover:text-green-600 transition-colors">
//                       {job.title}
//                     </h3>
//                     <div className="flex flex-wrap items-center gap-3 text-sm text-green-600">
//                       <span className="flex items-center gap-1">
//                         <Building2 className="h-4 w-4" />
//                         {job.company}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <MapPin className="h-4 w-4" />
//                         {job.location}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <Calendar className="h-4 w-4" />
//                         {formatDate(job.postedAt)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <p className="text-gray-700 leading-relaxed mb-4 line-clamp-2">
//                   {job.description}
//                 </p>

//                 <div className="flex flex-wrap gap-2">
//                   <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
//                     {job.experienceYears} {job.experienceYears === 1 ? 'año' : 'años'} de experiencia
//                   </span>
//                 </div>
//               </div>

//               <button
//                 onClick={() => handleApply(job)}
//                 className="md:self-center px-8 py-3 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105 whitespace-nowrap"
//               >
//                 Aplicar ahora
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedJob && (
//         <ApplyJobModal
//           job={selectedJob}
//           isOpen={isModalOpen}
//           onClose={() => {
//             setIsModalOpen(false);
//             setSelectedJob(null);
//           }}
//         />
//       )}
//     </>
//   );
// }

'use client';

import { ApplyJobModal } from './apply-job-modal';
import { useState, useEffect } from 'react';
import { MapPin, Building2, Calendar, Briefcase, CheckCircle2 } from 'lucide-react';
import { Job } from '@/prisma/generated/prisma/client';

export function JobsList({ jobs, userApplications }: { jobs: Job[], userApplications?: string[] }) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<string[]>(userApplications || []);

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleApplicationSuccess = (jobId: string) => {
    setAppliedJobs(prev => [...prev, jobId]);
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const hasApplied = (jobId: string) => {
    return appliedJobs.includes(jobId);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (jobs.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Briefcase className="h-10 w-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">
          No hay empleos disponibles
        </h3>
        <p className="text-green-600">
          Intenta ajustar los filtros para ver más resultados
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-green-800">
          {jobs.length} {jobs.length === 1 ? 'Oferta disponible' : 'Ofertas disponibles'}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {jobs.map((job) => {
          const applied = hasApplied(job.id);
          
          return (
            <div
              key={job.id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl border border-green-100 p-6 transition-all duration-300 hover:border-green-300 hover:-translate-y-1"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-md">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-green-800 mb-1 group-hover:text-green-600 transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-green-600">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(job.postedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-4 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {job.experienceYears} {job.experienceYears === 1 ? 'año' : 'años'} de experiencia
                    </span>
                  </div>
                </div>

                {applied ? (
                  <button
                    disabled
                    className="md:self-center px-8 py-3 bg-gray-200 text-gray-500 rounded-xl font-semibold cursor-not-allowed whitespace-nowrap flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    Ya aplicaste
                  </button>
                ) : (
                  <button
                    onClick={() => handleApply(job)}
                    className="md:self-center px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105 whitespace-nowrap"
                  >
                    Aplicar ahora
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedJob && (
        <ApplyJobModal
          job={selectedJob}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedJob(null);
          }}
          onSuccess={() => handleApplicationSuccess(selectedJob.id)}
        />
      )}
    </>
  );
}
