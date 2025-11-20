"use client"

import { Button } from '@/components/ui/button'
import { Job } from '@/prisma/generated/prisma/client'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { CreateJobDialog } from './create-job-dialog'
import { toast } from 'sonner'

interface EditButtonProps {
  job: Job
}

export function EditButton({ job }: EditButtonProps) {
  const [open, setOpen] = useState(false)

  const handleUpdate = async () => {
    setOpen(true)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="px-3 py-1 rounded-md bg-green-400 hover:bg-green-500 text-white text-sm font-medium">
        <Pencil className='size-4' /> Editar
      </Button>

      <CreateJobDialog type='update' open={open} onOpenChange={setOpen} job={job} />
    </>
  )
}
