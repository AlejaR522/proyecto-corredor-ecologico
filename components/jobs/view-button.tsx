'use client';

import { useRouter } from 'next/navigation';

export function ViewButton({ applicationId }: { applicationId: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/postulaciones/${applicationId}`)}
      className="px-4 py-2 bg-green-400 hover:bg-green-500 text-white rounded-md transition-colors"
    >
      Ver
    </button>
  );
}