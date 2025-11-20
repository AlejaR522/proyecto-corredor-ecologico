"use client"

import { Button } from '@/components/ui/button'
import { Job } from '@/prisma/generated/prisma/client'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { DeleteJobDialog } from './delete-job-dialog'
import { toast } from 'sonner'
import { deleteJob } from '@/actions/jobs'

interface DeleteButtonProps {
  job: Job
}

export function DeleteButton({ job }: DeleteButtonProps) {
  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    try {
      const res = await deleteJob(job.id)

      if (res.success) {
        setOpen(false)
        toast.success("Empleo eliminado exitosamente")
      }
    } catch (error) {
      toast.error("Error al eliminar el empleo")
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="px-3 py-1 rounded-md bg-red-400 hover:bg-red-500 text-white text-sm font-medium">
        <Trash className='size-4' /> Eliminar
      </Button>

      <DeleteJobDialog onConfirm={handleDelete} onOpenChange={setOpen} open={open} jobTitle={job.title} />
    </>
  )
}
