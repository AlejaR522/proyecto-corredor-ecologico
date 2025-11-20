"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client"; //import the auth client
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import Link from "next/link";
import { FormWrapper } from "./form-wrapper";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

const registerSchema = z
  .object({
    name: z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Introduce un email válido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirma la contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });

type RegisterSchema = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  async function onSubmit({ password, email, name }: RegisterSchema) {
    try {
      const { error } = await authClient.signUp.email(
        {
          name,
          email,
          password,
          callbackURL: "/",
        },
        {
          onSuccess: (ctx) => {
            toast.success("Usuario creado exitosamente")
            router.push("/");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        }
      );

      console.log(error);
    } catch (err: any) {
      toast.error("Algo salió mal al registrar al usuario");
    }
  }

  return (
    <FormWrapper
      title="Crear tu cuenta"
      description="Únete al portal ecológico y empieza a conectar oportunidades verdes"
      className="max-w-lg"
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* NAME */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="mb-4 text-left">
              <FieldLabel htmlFor={field.name}>Nombre completo</FieldLabel>
              <div>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="Ej. Ana Pérez"
                  aria-invalid={fieldState.invalid}
                  autoComplete="name"
                  className="bg-white w-full p-3 border border-green-200 rounded-lg text-base transition-all duration-300 focus:border-green-600 focus:shadow-[0_0_8px_rgba(67,160,71,0.4)] focus:ring-0 focus:outline-none"
                />
              </div>
              <FieldDescription>
                Tu nombre completo o como quieras que te llamemos.
              </FieldDescription>
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />

        {/* EMAIL */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="mb-4 text-left">
              <FieldLabel htmlFor={field.name}>Correo electrónico</FieldLabel>
              <div>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  placeholder="tu@ejemplo.com"
                  aria-invalid={fieldState.invalid}
                  autoComplete="email"
                  className="bg-white w-full p-3 border border-green-200 rounded-lg text-base transition-all duration-300 focus:border-green-600 focus:shadow-[0_0_8px_rgba(67,160,71,0.4)] focus:ring-0 focus:outline-none"
                />
              </div>
              <FieldDescription>
                Usa un email válido para recuperar tu cuenta si lo necesitas.
              </FieldDescription>
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />

        {/* PASSWORD */}
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="mb-4 text-left">
              <FieldLabel htmlFor={field.name}>Contraseña</FieldLabel>
              <div>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="••••••••"
                  aria-invalid={fieldState.invalid}
                  autoComplete="new-password"
                  className="bg-white w-full p-3 border border-green-200 rounded-lg text-base transition-all duration-300 focus:border-green-600 focus:shadow-[0_0_8px_rgba(67,160,71,0.4)] focus:ring-0 focus:outline-none"
                />
              </div>
              <FieldDescription>Al menos 6 caracteres.</FieldDescription>
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />

        {/* CONFIRM PASSWORD */}
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="mb-6 text-left">
              <FieldLabel htmlFor={field.name}>Confirmar contraseña</FieldLabel>
              <div>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="••••••••"
                  aria-invalid={fieldState.invalid}
                  autoComplete="new-password"
                  className="bg-white w-full p-3 border border-green-200 rounded-lg text-base transition-all duration-300 focus:border-green-600 focus:shadow-[0_0_8px_rgba(67,160,71,0.4)] focus:ring-0 focus:outline-none"
                />
              </div>
              <FieldDescription>
                Repite la contraseña para confirmar.
              </FieldDescription>
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />

        <Button
          type="submit"
          className="w-full h-auto bg-[#43A047] hover:bg-[#2E7D32] text-white font-semibold text-[17px] py-3.5 px-6 rounded-full transition-all duration-300 mt-2 shadow-[0_6px_15px_rgba(0,0,0,0.25)] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting && <Spinner className="size-5" />}
          {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
        </Button>

        <div className="mt-7 mb-4 text-base text-black">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/login"
            className="text-green-900 font-semibold hover:underline"
          >
            Inicia sesión aquí
          </Link>
        </div>
      </form>
    </FormWrapper>
  );
}
