import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-emerald-50 via-green-50 to-emerald-100" />
      <div className="container mx-auto px-4 py-20 md:py-32 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 font-medium text-sm mb-6">
            <Leaf className="w-4 h-4" />
            Empleabilidad Verde
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 text-balance leading-tight">
            Conectando oportunidades con la naturaleza
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 text-pretty max-w-2xl mx-auto leading-relaxed">
            Únete al Corredor Ecológico y encuentra oportunidades laborales
            sostenibles que cuidan el planeta y promueven el desarrollo verde.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-lg px-8"
            >
              Comienza Ahora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-emerald-700 text-emerald-700 hover:bg-emerald-50"
            >
              Ver Empleos Disponibles
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
