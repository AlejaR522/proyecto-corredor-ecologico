"use server"

import db from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export type JobPayload = {
  title: string
  company: string
  location: string
  description: string
  experienceYears: number
}

export async function createJob(data: JobPayload) {
  try {
    await db.job.create({
      data: {
        title: data.title,
        company: data.company,
        location: data.location,
        description: data.description,
        experienceYears: data.experienceYears,
      },
    })

    // Forzar refresco del listado
    revalidatePath("/dashboard/jobs")

    return { success: true }
  } catch (err) {
    console.error("Error creando empleo:", err)
    return { success: false, error: "Error al crear empleo" }
  }
}

export async function updateJob(id: string, data: JobPayload) {
  try {
    const job = await db.job.update({
      where: { id },
      data: {
        title: data.title,
        company: data.company,
        location: data.location,
        description: data.description,
        experienceYears: data.experienceYears,
      },
    })

    revalidatePath("/dashboard/jobs")

    return { success: true, data: job }
  } catch (error) {
    console.error("Error al actualizar empleo:", error)
    return { success: false, error: "No se pudo actualizar el empleo." }
  }
}

export async function deleteJob(id: string) {
  try {
    await db.job.delete({
      where: { id },
    })

    revalidatePath("/dashboard/jobs")

    return { success: true }
  } catch (error) {
    console.error("Error al eliminar empleo:", error)
    return { success: false, error: "No se pudo eliminar el empleo." }
  }
}

