'use client';

import { useState } from 'react';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import { applyToJob } from '@/actions/apply-job';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Job } from '@/prisma/generated/prisma/client';

export function ApplyJobModal({
  job,
  isOpen,
  onClose,
  onSuccess,
}: {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Solo se permiten archivos PDF');
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('El archivo no debe superar los 5MB');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError('Por favor selecciona un archivo');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('jobId', job.id);

      const result = await applyToJob(formData);

      if (result.success) {
        setFile(null);
        onSuccess(); // Llamar al callback de éxito
      } else {
        setError(result.error || 'Error al enviar la postulación');
      }
    } catch (err) {
      setError('Error al enviar la postulación');
    } finally {
      setIsUploading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setFile(null);
      setError('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-800">
            Aplicar a esta oferta
          </DialogTitle>
          <DialogDescription className="text-green-600 font-medium">
            {job.title}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-green-800 mb-3">
              Sube tu CV en formato PDF
            </label>
            
            <div className="relative border-2 border-dashed border-green-300 rounded-xl p-8 text-center hover:border-green-500 hover:bg-green-50/50 transition-all group cursor-pointer">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="cv-upload"
              />
              
              {file ? (
                <div className="flex flex-col items-center">
                  <div className="bg-green-100 p-3 rounded-xl mb-3">
                    <FileText className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-green-800">{file.name}</p>
                  <p className="text-xs text-green-600 mt-1">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-xs font-medium">Archivo cargado</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="bg-green-100 p-3 rounded-xl mb-3 group-hover:bg-green-200 transition-colors">
                    <Upload className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-green-800 mb-1">
                    Haz clic para subir tu CV
                  </p>
                  <p className="text-xs text-green-600">
                    PDF hasta 5MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isUploading || !file}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none"
            >
              {isUploading ? 'Enviando...' : 'Enviar postulación'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
