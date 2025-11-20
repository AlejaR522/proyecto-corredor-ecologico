import { CandidatesClient } from "@/components/dashboard/candidates/candidates-client";
import { ViewButton } from "@/components/dashboard/candidates/view-button";
import { ApproveButton } from "@/components/dashboard/candidates/approve-button";
import { RejectButton } from "@/components/dashboard/candidates/reject-button";
import db from '@/lib/prisma';

export default async function CandidatesPage() {
  // Obtener postulaciones con usuario y trabajo relacionados
  const applications = await db.jobApplication.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      },
      job: {
        select: {
          id: true,
          title: true,
          company: true
        }
      }
    }
  });

  // Formateador de fecha
  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString('es-CO');

  // Función para obtener el estilo del badge según el estado
  const getStatusBadge = (status: string) => {
    const styles = {
      PENDIENTE: 'bg-yellow-50 text-yellow-800',
      APROBADO: 'bg-green-200 text-green-800',
      RECHAZADO: 'bg-red-200 text-red-800'
    };
    
    const labels = {
      PENDIENTE: 'Pendiente',
      APROBADO: 'Aprobado',
      RECHAZADO: 'Rechazado'
    };

    return (
      <span className={`px-4 py-2 rounded-full text-sm font-medium ${styles[status as keyof typeof styles] || 'bg-gray-200 text-gray-800'}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  return (
    <section>
      <CandidatesClient applications={applications}>
        <div className="overflow-x-auto rounded-lg shadow mt-10">
          <table className="min-w-full divide-y divide-green-200">
            <thead className="bg-green-100 h-14">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-green-800">
                  Postulante
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-green-800">
                  Empleo
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-green-800">
                  Fecha
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-green-800">
                  Estado
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-green-800">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-green-100">
              {applications.map((application) => (
                <tr key={application.id} className="hover:bg-green-50">
                  <td className="px-4 py-3 font-medium text-green-800">
                    {application.user.name}
                  </td>
                  <td className="px-4 py-3 text-green-700">
                    {application.job.title}
                  </td>
                  <td className="px-4 py-3 text-green-700">
                    {formatDate(application.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(application.status)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex gap-2">
                      <ViewButton applicationId={application.id} />
                      <ApproveButton applicationId={application.id} currentStatus={application.status} />
                      <RejectButton applicationId={application.id} currentStatus={application.status} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CandidatesClient>
    </section>
  );
}