"use client"

import { useState } from "react"
import { CandidatesEmptyState } from "@/components/states/candidates-empty-state"

export function CandidatesClient({
  children,
  applications,
}: {
  children: React.ReactNode
  applications: any[]
}) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-green-800">
            Postulaciones Recibidas
          </h2>
          <p className="text-green-700 max-w-xl">
            Administra las postulaciones relacionadas a cada una de las ofertas laborales publicadas.
          </p>
        </div>
      </div>

      {/* empty state */}
      {applications.length === 0 ? (
        <CandidatesEmptyState />
      ) : (
        children
      )}
    </>
  )
}