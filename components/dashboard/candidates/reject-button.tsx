"use client";

import { rejectApplication } from "@/actions/applications";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmDialog } from "./confirm-dialog";

export function RejectButton({
  applicationId,
  currentStatus,
  fullWidth = false,
}: {
  applicationId: string;
  currentStatus: string;
  fullWidth?: boolean;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isDisabled = currentStatus === "RECHAZADO";

  const handleReject = async () => {
    setIsLoading(true);
    try {
      await rejectApplication(applicationId);
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.error("Error al rechazar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        disabled={isDisabled}
        className={`${fullWidth ? "w-full" : ""} px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition disabled:opacity-50`}
      >
        {isDisabled ? "Ya rechazado" : "Rechazar"}
      </button>

      <ConfirmDialog
        open={isOpen}
        title="Confirmar rechazo"
        description="¿Estás seguro de que deseas rechazar esta postulación?"
        confirmLabel="Rechazar"
        loading={isLoading}
        onConfirm={handleReject}
        onCancel={() => setIsOpen(false)}
        buttonClassName="bg-red-600 hover:bg-red-700 text-white"
      />
    </>
  );
}
