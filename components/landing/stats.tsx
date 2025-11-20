export function Stats() {
  return (
    <section className="py-16 bg-white/60">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "2,500+", label: "Empleos Verdes" },
            { value: "850+", label: "Empresas Sostenibles" },
            { value: "5,200+", label: "Profesionales Registrados" },
            { value: "98%", label: "Satisfacción" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-700 mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
