import { Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  onCreateJob?: () => void
}

export function EmployeesEmptyState({ onCreateJob }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="rounded-full bg-muted p-6 mb-6">
        <Briefcase className="h-12 w-12 text-muted-foreground" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2 text-balance text-center">
        No hay empleos registrados
      </h3>
      
      <p className="text-muted-foreground text-center text-balance mb-6 max-w-md">
        Comienza creando tu primer empleo para empezar a gestionar las oportunidades laborales.
      </p>
      
      <Button 
        onClick={onCreateJob}
        size="lg"
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        <Briefcase className="mr-2 h-5 w-5" />
        Crear primer empleo
      </Button>
    </div>
  )
}
