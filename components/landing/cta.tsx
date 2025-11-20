import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <Card className="p-12 md:p-16 bg-linear-to-br from-emerald-700 to-emerald-600 text-white text-center relative overflow-hidden border-0">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
              Comienza tu Carrera Verde Hoy
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 text-pretty leading-relaxed">
              Únete a miles de profesionales que ya están construyendo un futuro
              más sostenible
            </p>
            <Button
              size="lg"
              className="bg-white hover:bg-stone-100 text-emerald-700 text-lg px-8"
            >
              Crear Cuenta Gratis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
