'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { headers } from 'next/headers';

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function applyToJob(formData: FormData) {
  try {
    // Verificar autenticación
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: 'Debes iniciar sesión para postularte' };
    }

    const file = formData.get('file') as File;
    const jobId = formData.get('jobId') as string;

    if (!file || !jobId) {
      return { success: false, error: 'Datos incompletos' };
    }

    // Verificar si ya aplicó
    const existingApplication = await db.jobApplication.findFirst({
      where: {
        userId: session.user.id,
        jobId: jobId,
      },
    });

    if (existingApplication) {
      return { success: false, error: 'Ya has aplicado a este empleo' };
    }

    // Convertir archivo a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Subir a Cloudinary
    const uploadResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'cv-uploads',
          resource_type: 'auto',
          public_id: `cv_${session.user.id}_${Date.now()}`,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    // Crear postulación
    await db.jobApplication.create({
      data: {
        userId: session.user.id,
        jobId: jobId,
        status: 'PENDIENTE',
        cvUrl: uploadResult.secure_url,
      },
    });

    return { success: true, cvUrl: uploadResult.secure_url };
  } catch (error) {
    console.error('Error al aplicar:', error);
    return { success: false, error: 'Error al procesar la postulación' };
  }
}
