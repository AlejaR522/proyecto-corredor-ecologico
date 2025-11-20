"use client"

import { useState } from "react"
import { EmployeesEmptyState } from "@/components/states/employees-empty-state"
import { CreateJobDialog } from "./create-job-dialog"
import { Plus } from "lucide-react"

export function JobsClient({
  children,
  jobs,
}: {
  children: React.ReactNode
  jobs: any[]
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* modal controlado */}
      <CreateJobDialog type="create" open={open} onOpenChange={setOpen} />

      <div className="flex justify-between items-center mb-6">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-green-800">
            Listado de empleos
          </h2>
          <p className="text-green-700 max-w-xl">
            Administra las ofertas laborales registradas en el sistema. Aquí puedes crear nuevos empleos,
            o revisar las postulaciones asociadas.
          </p>
        </div>

        {/* Solo se muestra si hay empleos */}
        {jobs.length > 0 && (
          <button
            onClick={() => setOpen(true)}
            className=" flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold"
          >
            <Plus className="size-5" /> Crear empleo
          </button>
        )}
      </div>

      {/* empty state */}
      {jobs.length === 0 ? (
        <EmployeesEmptyState onCreateJob={() => setOpen(true)} />
      ) : (
        children
      )}
    </>
  )
}
