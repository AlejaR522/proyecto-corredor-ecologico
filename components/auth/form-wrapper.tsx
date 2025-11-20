import React from "react";
import { Card } from "../ui/card";
import { Logo } from "../common/logo";
import { cn } from "@/lib/utils";

interface FormWrapperProps {
  title: string;
  description: string;
  className?: string;
  children: React.ReactNode;
}

export function FormWrapper({
  title,
  description,
  className,
  children,
}: FormWrapperProps) {
  return (
    <Card
      className={cn(
        "bg-white/96 rounded-3xl shadow-2xl px-12 py-8 min-w-[500px] text-center animate-[fadeIn_1s_ease-in-out] z-20",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center">
        <Logo className="mb-2 mt-7" />

        {/* Título */}
        <h2 className="text-green-900 font-bold text-[2rem]">{title}</h2>

        {/* Subtítulo */}
        <p className="text-green-700 text-base mb-4">{description}</p>
      </div>

      {children}
    </Card>
  );
}
