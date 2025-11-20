import { Leaf, Users, TrendingUp, Briefcase, CheckCircle } from "lucide-react";
import { Card } from "../ui/card";

export function About() {
  return (
    <section id="que-es" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">
            ¿Qué es el Corredor Ecológico?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty leading-relaxed">
            Un espacio que impulsa la empleabilidad verde, conectando empresas
            ecológicas con personas que buscan trabajos sostenibles.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Large Card */}
          <Card className="md:col-span-2 lg:col-span-2 p-8 bg-emerald-800 text-white overflow-hidden relative border-0">
            <div className="relative z-10">
              <Briefcase className="w-12 h-12 mb-4 opacity-90" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-balance">
                Empleos que Cuidan el Planeta
              </h3>
              <p className="text-white/90 leading-relaxed text-pretty">
                Encuentra oportunidades en empresas comprometidas con el medio
                ambiente, desde energías renovables hasta agricultura sostenible
                y conservación.
              </p>
            </div>
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </Card>

          {/* Vertical Card */}
          <Card className="p-8 bg-emerald-600 text-white lg:row-span-2 border-0">
            <Users className="w-12 h-12 mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-4 text-balance">
              Red de Profesionales
            </h3>
            <p className="text-white/90 leading-relaxed mb-6 text-pretty">
              Conecta con una comunidad de profesionales comprometidos con la
              sostenibilidad.
            </p>
            <ul className="space-y-3">
              {[
                "Networking verde",
                "Eventos sostenibles",
                "Mentorías ambientales",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Horizontal Card */}
          <Card className="md:col-span-2 p-8 bg-white border border-stone-200">
            <TrendingUp className="w-12 h-12 mb-4 text-emerald-600" />
            <h3 className="text-2xl font-bold mb-4 text-gray-900 text-balance">
              Desarrollo Sostenible
            </h3>
            <p className="text-gray-600 leading-relaxed text-pretty">
              Promovemos el desarrollo ambiental, económico y social. Cada
              empleo en nuestra plataforma contribuye a un futuro más verde y
              próspero para todos.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
