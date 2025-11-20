'use client';

import { ApplicationViewModal } from '@/components/jobs/application-view-modal';
import { useState } from 'react';

export function ViewButton({ applicationId }: { applicationId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          console.log("entra")
          setIsOpen(true)
        }}
        className="px-4 py-2 bg-green-400 hover:bg-green-500 text-white rounded-md transition-colors"
      >
        Ver
      </button>

      <ApplicationViewModal
        applicationId={applicationId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}