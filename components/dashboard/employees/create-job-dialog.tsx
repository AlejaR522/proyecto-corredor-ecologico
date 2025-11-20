"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { createJob, updateJob } from "@/actions/jobs"
import { Job } from "@/prisma/generated/prisma/client"
import { toast } from "sonner"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

// Schema del formulario basado en tu modelo Prisma
const jobFormSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres."),
  company: z.string().min(2, "La empresa es obligatoria."),
  location: z.string().min(2, "La ubicación es obligatoria."),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres."),
  experienceYears: z
    .number()
    .min(0, "No puede ser negativo.")
    .max(50, "Máximo 50 años de experiencia."),
})

type JobFormValues = z.infer<typeof jobFormSchema>

export function CreateJobDialog({
  job,
  type,
  open,
  onOpenChange,
}: {
  job?: Job
  type: "create" | "update",
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: job?.title ?? "",
      company: job?.company ?? "",
      location: job?.location ?? "",
      description: job?.description ?? "",
      experienceYears: job?.experienceYears ?? 0,
    },
  })

  const { isValid, isSubmitting } = form.formState

  useEffect(() => {
    if (type === "update" && job) {
      form.reset({
        title: job.title,
        company: job.company,
        location: job.location,
        description: job.description,
        experienceYears: job.experienceYears,
      })
    }
  }, [job])

  async function onSubmit(values: JobFormValues) {
    if (type === "create") {
      const res = await createJob(values)
      if (res.success) {
        toast.success("Empleo creado exitosamente")
        onOpenChange(false)
        form.reset()
      }
    } else {
      const res = await updateJob(job?.id!, values)
      console.log(res)
      if (res.success) {
        toast.success("Empleo actualizado exitosamente")
        onOpenChange(false)
        form.reset()
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{type === "create" ? "Crear nuevo empleo" : "Editar empleo"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {/* Título */}
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Título del empleo</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Ej: Desarrollador Frontend"
                />

                <FieldDescription>
                  Nombre del cargo que se ofrecerá.
                </FieldDescription>

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Empresa */}
          <Controller
            name="company"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Empresa</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Ej: Google, Meta..."
                />

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Ubicación */}
          <Controller
            name="location"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Ubicación</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Ej: Bogotá, CDMX, Remoto..."
                />

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Años de experiencia */}
          <Controller
            name="experienceYears"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Años de experiencia
                </FieldLabel>

                <Input
                  type="number"
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="0"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Descripción */}
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Descripción</FieldLabel>

                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Describe las responsabilidades del cargo..."
                  className="min-h-[120px]"
                />

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <DialogFooter>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isSubmitting && <Loader2 className="size-5 animate-spin" />}
              {type === "create" ? "Crear empleo" : "Editar empleo"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
