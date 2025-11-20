import { FileText } from 'lucide-react'

export function CandidatesEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="rounded-full bg-muted p-6 mb-6">
        <FileText className="h-12 w-12 text-muted-foreground" />
      </div>

      <h3 className="text-xl font-semibold mb-2 text-balance text-center">
        No hay postulaciones recibidas
      </h3>

      <p className="text-muted-foreground text-center text-balance mb-6 max-w-md">
        Aún no has recibido postulaciones para tus ofertas laborales. Cuando los candidatos se postulen, aparecerán aquí.
      </p>
    </div>
  )
}