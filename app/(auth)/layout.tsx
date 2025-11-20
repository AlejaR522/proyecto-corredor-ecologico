import { serverSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import React from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await serverSession();
  const hasSession = Boolean(data?.session);

  if (hasSession) {
    redirect("/")
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-no-repeat pt-5 pb-14">
      <div className="fixed inset-0 bg-[url('/images/login-bg.jpg')] bg-cover bg-center" />
      <div className="bg-[linear-gradient(rgba(46,125,50,0.55),rgba(27,94,32,0.55))] absolute inset-0 z-10" />
      {children}

      <footer className="absolute bottom-4 w-full text-center text-white text-sm z-20">
        © 2025 Corredor Ecológico | Conectando oportunidades verdes
      </footer>
    </div>
  );
}
