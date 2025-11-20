"use client";

import { approveApplication } from "@/actions/applications";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmDialog } from "./confirm-dialog";

export function ApproveButton({
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

  const isDisabled = currentStatus === "APROBADO";

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      await approveApplication(applicationId);
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.error("Error al aprobar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        disabled={isDisabled}
        className={`${fullWidth ? "w-full" : ""} px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition disabled:opacity-50`}
      >
        {isDisabled ? "Ya aprobado" : "Aprobar"}
      </button>

      <ConfirmDialog
        open={isOpen}
        title="Confirmar aprobación"
        description="¿Estás seguro de que deseas aprobar esta postulación?"
        confirmLabel="Aprobar"
        loading={isLoading}
        onConfirm={handleApprove}
        onCancel={() => setIsOpen(false)}
        buttonClassName="bg-green-600 hover:bg-green-700 text-white"
      />
    </>
  );
}
