"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "../common/logo";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

interface HeaderProps {
  hasSession: boolean;
}

export function Header({ hasSession }: HeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh()
  };

  return (
    <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-xl font-bold text-gray-900">
            Corredor Ecológico
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#que-es"
            className="text-gray-600 hover:text-emerald-700 transition-colors"
          >
            ¿Qué es?
          </a>
          <a
            href="#beneficios"
            className="text-gray-600 hover:text-emerald-700 transition-colors"
          >
            Beneficios
          </a>
        </nav>
        <div className="flex items-center gap-3">
          {!hasSession && (
            <>
              <Button
                variant="ghost"
                className="text-gray-900 hover:text-emerald-700 hover:bg-emerald-50"
                onClick={() => router.push("/login")}
              >
                Iniciar sesión
              </Button>
              <Button
                variant="outline"
                className="hidden sm:flex border-emerald-700 text-emerald-700 hover:bg-emerald-50"
                onClick={() => router.push("/register")}
              >
                Regístrate
              </Button>
            </>
          )}
          {hasSession && (
            <Button onClick={handleLogout} className="bg-rose-100 hover:bg-rose-200 text-rose-500">
              <LogOut />
            </Button>
          )}
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={() => {
              router.push(hasSession ? "/jobs" : "/login");
            }}
          >
            Empleos
          </Button>
        </div>
      </div>
    </header>
  );
}
