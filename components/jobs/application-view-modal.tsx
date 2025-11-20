'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  User, 
  Mail, 
  Briefcase, 
  MapPin, 
  Calendar, 
  Building2, 
  FileText,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { getApplicationById } from '@/actions/applications';

interface ApplicationData {
  id: string;
  status: string;
  createdAt: Date;
  cvUrl: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
  job: {
    id: string;
    title: string;
    company: string;
    description: string;
    location: string;
    experienceYears: number;
    postedAt: Date;
  };
}

export function ApplicationViewModal({
  applicationId,
  isOpen,
  onClose,
}: {
  applicationId: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [application, setApplication] = useState<ApplicationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && applicationId) {
      loadApplication();
    }
  }, [isOpen, applicationId]);

  const loadApplication = async () => {
    setIsLoading(true);
    try {
      const data = await getApplicationById(applicationId);
      setApplication(data);
    } catch (error) {
      console.error('Error al cargar postulación:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      PENDIENTE: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      APROBADO: 'bg-green-100 text-green-800 border-green-300',
      RECHAZADO: 'bg-red-100 text-red-800 border-red-300'
    };
    
    const labels = {
      PENDIENTE: 'Pendiente',
      APROBADO: 'Aprobado',
      RECHAZADO: 'Rechazado'
    };

    return (
      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-800">
            Detalle de Postulación
          </DialogTitle>
          <DialogDescription>
            Información completa del candidato y la oferta laboral
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          </div>
        ) : application ? (
          <div className="space-y-6">
            {/* Estado */}
            <div className="flex items-center justify-between pb-4 border-b border-green-100">
              <span className="text-sm font-medium text-gray-600">Estado actual:</span>
              {getStatusBadge(application.status)}
            </div>

            {/* Información del Candidato */}
            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-green-600 p-2 rounded-lg">
                  <User className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-green-800">
                  Información del Candidato
                </h3>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-linear-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0">
                  {application.user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 space-y-2">
                  <h4 className="text-xl font-bold text-green-800">
                    {application.user.name}
                  </h4>
                  <div className="space-y-1 text-sm text-green-700">
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {application.user.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Postulado el {formatDate(application.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* CV PDF */}
              {application.cvUrl && (
                <div className="mt-4 pt-4 border-t border-green-200">
                  <div className="flex flex-col gap-4 justify-between bg-white rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="bg-red-100 p-2 rounded-lg">
                        <FileText className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-green-800">Currículum Vitae</p>
                        <p className="text-xs text-green-600">Archivo PDF</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={application.cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Ver CV
                      </a>
                      <a
                        href={application.cvUrl}
                        download
                        className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg text-sm font-medium transition-colors"
                      >
                        Descargar
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Información del Empleo */}
            <div className="bg-white rounded-xl p-6 border border-green-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-green-600 p-2 rounded-lg">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-green-800">
                  Información del Empleo
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-bold text-green-800 mb-2">
                    {application.job.title}
                  </h4>
                  <div className="flex flex-wrap gap-3 text-sm text-green-600">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      {application.job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {application.job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Publicado: {formatDate(application.job.postedAt)}
                    </span>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-green-800 mb-2">Descripción del puesto</h5>
                  <p className="text-gray-700 leading-relaxed">
                    {application.job.description}
                  </p>
                </div>

                <div>
                  <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {application.job.experienceYears} {application.job.experienceYears === 1 ? 'año' : 'años'} de experiencia requerida
                  </span>
                </div>
              </div>
            </div>

            {/* Botón de cierre */}
            <div className="flex justify-end pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No se pudo cargar la información de la postulación
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}