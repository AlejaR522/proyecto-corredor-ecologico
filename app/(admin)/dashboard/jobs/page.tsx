import { DeleteButton } from '@/components/dashboard/employees/delete-button';
import { EditButton } from '@/components/dashboard/employees/edit-button';
import { JobsClient } from '@/components/dashboard/employees/jobs-client';
import db from '@/lib/prisma';
import { Job } from '@/prisma/generated/prisma/client';


// Componente de servidor: obtiene empleos desde la base de datos
export default async function JobsPage() {
  // Obtiene todos los empleos ordenados por fecha de publicación
  const jobs: Job[] = await db.job.findMany({
    orderBy: { postedAt: 'desc' }
  });

  // Formateador de fecha al español (es-CO)
  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString('es-CO');

  // Convertir años de experiencia a texto
  const formatExperience = (years: number) =>
    years === 1 ? '1 Año' : `${years} Años`;

  return (
    <section>
      <JobsClient jobs={jobs}>
        <div className="overflow-x-auto rounded-lg shadow mt-10">
          <table className="min-w-full divide-y divide-green-200">
            <thead className="bg-green-100 h-14">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-green-800">
                  Título
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-green-800">
                  Empresa
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-green-800">
                  Ubicación
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-green-800">
                  Publicado
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-green-800">
                  Experiencia
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-green-800">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-green-100">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-green-50">
                  <td className="px-4 py-3 font-medium text-green-800">
                    {job.title}
                  </td>
                  <td className="px-4 py-3 text-green-700">
                    {job.company}
                  </td>
                  <td className="px-4 py-3 text-green-700">
                    {job.location}
                  </td>
                  <td className="px-4 py-3 text-green-700">
                    {formatDate(job.postedAt)}
                  </td>
                  <td className="px-4 py-3 text-green-700">
                    {formatExperience(job.experienceYears)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap flex flex-wrap gap-2">
                    <EditButton job={job} />
                    <DeleteButton job={job} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </JobsClient>
    </section>
  );
}
