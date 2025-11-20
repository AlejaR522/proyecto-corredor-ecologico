'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface DeleteJobDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  jobTitle?: string
}

export function DeleteJobDialog({
  open,
  onOpenChange,
  onConfirm,
  jobTitle
}: DeleteJobDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            {jobTitle ? (
              <>
                Esta acción eliminará permanentemente el empleo{' '}
                <span className="font-semibold text-foreground">"{jobTitle}"</span>.
                Esta acción no se puede deshacer.
              </>
            ) : (
              <>
                Esta acción eliminará permanentemente este empleo.
                Esta acción no se puede deshacer.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white"
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
