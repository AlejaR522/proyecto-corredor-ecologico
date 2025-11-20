import { ArrowRight, Briefcase, CheckCircle, Leaf, TrendingUp, Users } from "lucide-react";
import { Card } from "../ui/card";

export function Benefits() {
  return (
    <section id="beneficios" className="py-20 md:py-32 bg-amber-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">
            Beneficios de Unirte
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty leading-relaxed">
            Descubre las ventajas de formar parte del Corredor Ecológico
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Leaf,
              title: "Impacto Ambiental",
              description:
                "Contribuye directamente a la protección del medio ambiente con tu trabajo diario",
            },
            {
              icon: TrendingUp,
              title: "Crecimiento Profesional",
              description:
                "Desarrolla habilidades en el sector de mayor crecimiento del futuro",
            },
            {
              icon: Users,
              title: "Comunidad Global",
              description:
                "Forma parte de una red internacional de profesionales sostenibles",
            },
            {
              icon: Briefcase,
              title: "Empleos de Calidad",
              description:
                "Accede a posiciones bien remuneradas en empresas líderes del sector",
            },
            {
              icon: CheckCircle,
              title: "Verificación Rigurosa",
              description:
                "Todas las empresas son verificadas por su compromiso ambiental real",
            },
            {
              icon: ArrowRight,
              title: "Proceso Simple",
              description:
                "Regístrate, aplica y comienza tu carrera verde en minutos",
            },
          ].map((benefit, i) => (
            <Card
              key={i}
              className="p-6 hover:shadow-lg transition-shadow bg-white border border-stone-200"
            >
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-pretty">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
