"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import Link from "next/link";
import { FormWrapper } from "./form-wrapper";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const loginSchema = z.object({
  email: z.string().email("Introduce un email válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  async function onSubmit({ email, password }: LoginSchema) {
    try {
      await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: (ctx) => {
            router.push("/");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        }
      );
    } catch (err: any) {
      toast.error("Algo salió mal al iniciar sesión");
    }
  }

  return (
    <FormWrapper
      title="Bienvenido"
      description="Inicia sesión para acceder al portal ecológico"
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* EMAIL */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="mb-6 text-left">
              <FieldLabel
                htmlFor={field.name}
                className="text-black font-semibold text-base"
              >
                Correo Electrónico
              </FieldLabel>
              <div className="">
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  placeholder="Ingresa tu Correo Electrónico"
                  aria-invalid={fieldState.invalid}
                  autoComplete="email"
                  className="bg-white w-full p-3 border border-green-200 rounded-lg text-base transition-all duration-300 focus:border-green-600 focus:shadow-[0_0_8px_rgba(67,160,71,0.4)] focus:ring-0 focus:outline-none"
                />
              </div>
              {fieldState.error && (
                <FieldError className="text-red-600 text-sm mt-1">
                  {fieldState.error.message}
                </FieldError>
              )}
            </Field>
          )}
        />

        {/* PASSWORD */}
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="mb-6 text-left">
              <FieldLabel
                htmlFor={field.name}
                className="text-black font-semibold text-base"
              >
                Contraseña
              </FieldLabel>
              <div className="">
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="••••••••"
                  aria-invalid={fieldState.invalid}
                  autoComplete="current-password"
                  className="bg-white w-full p-3 border border-green-200 rounded-lg text-base transition-all duration-300 focus:border-green-600 focus:shadow-[0_0_8px_rgba(67,160,71,0.4)] focus:ring-0 focus:outline-none"
                />
              </div>
              {fieldState.error && (
                <FieldError className="text-red-600 text-sm mt-1">
                  {fieldState.error.message}
                </FieldError>
              )}
            </Field>
          )}
        />

        <Button
          type="submit"
          className="w-full h-auto bg-[#43A047] hover:bg-[#2E7D32] text-white font-semibold text-[17px] py-3.5 px-6 rounded-full transition-all duration-300 mt-2 shadow-[0_6px_15px_rgba(0,0,0,0.25)] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting && <Spinner className="size-5" />}
          {isSubmitting ? "Ingresando..." : "Ingresar"}
        </Button>

        <div className="mt-7 mb-4 text-base text-black">
          ¿No tienes cuenta?{" "}
          <Link
            href="/register"
            className="text-green-900 font-semibold hover:underline"
          >
            Crea una aquí
          </Link>
        </div>
      </form>
    </FormWrapper>
  );
}
