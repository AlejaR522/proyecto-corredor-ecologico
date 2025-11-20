"use server"

import db from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function approveApplication(applicationId: string) {
  try {
    await db.jobApplication.update({
      where: { id: applicationId },
      data: { 
        status: 'APROBADO'
      }
    });

    revalidatePath('/postulaciones');
    return { success: true, message: 'Postulación aprobada exitosamente' };
  } catch (error) {
    console.error('Error al aprobar postulación:', error);
    throw new Error('No se pudo aprobar la postulación');
  }
}

export async function rejectApplication(applicationId: string) {
  try {
    await db.jobApplication.update({
      where: { id: applicationId },
      data: { 
        status: 'RECHAZADO'
      }
    });

    revalidatePath('/postulaciones');
    return { success: true, message: 'Postulación rechazada exitosamente' };
  } catch (error) {
    console.error('Error al rechazar postulación:', error);
    throw new Error('No se pudo rechazar la postulación');
  }
}

export async function getApplicationById(applicationId: string) {
  try {
    const application = await db.jobApplication.findUnique({
      where: { id: applicationId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        job: {
          select: {
            id: true,
            title: true,
            company: true,
            description: true,
            location: true,
            experienceYears: true
          }
        }
      }
    });

    return application;
  } catch (error) {
    console.error('Error al obtener postulación:', error);
    throw new Error('No se pudo obtener la postulación');
  }
}

export async function getApplicationsByUserId(userId: string) {
  try {
    const applications = await db.jobApplication.findMany({
      where: { userId },
      include: {
        job: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return applications;
  } catch (error) {
    console.error('Error al obtener postulaciones del usuario:', error);
    throw new Error('No se pudieron obtener las postulaciones');
  }
}

export async function getApplicationsByJobId(jobId: string) {
  try {
    const applications = await db.jobApplication.findMany({
      where: { jobId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return applications;
  } catch (error) {
    console.error('Error al obtener postulaciones del trabajo:', error);
    throw new Error('No se pudieron obtener las postulaciones');
  }
}