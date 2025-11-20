'use client';

import { approveApplication } from '@/actions/applications';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function ApproveButton({
  applicationId,
  currentStatus,
  fullWidth = false
}: {
  applicationId: string;
  currentStatus: string;
  fullWidth?: boolean;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const isDisabled = currentStatus === 'APROBADO';

  const handleApprove = async () => {
    if (isDisabled) return;
    if (!confirm('¿Estás seguro de aprobar esta postulación?')) return;

    setIsLoading(true);
    try {
      await approveApplication(applicationId);
      router.refresh();
    } catch (error) {
      console.error('Error al aprobar:', error);
      alert('Error al aprobar la postulación');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleApprove}
      disabled={isLoading || isDisabled}
      className={`${fullWidth ? 'w-full' : ''} px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isLoading ? 'Procesando...' : isDisabled ? 'Ya aprobado' : 'Aprobar'}
    </button>
  );
}