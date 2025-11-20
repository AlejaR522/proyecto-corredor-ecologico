import { Logo } from "../common/logo";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Logo />
              <span className="text-lg font-bold text-gray-900">
                Corredor Ecológico
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Conectando oportunidades laborales sostenibles con el talento del
              futuro.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Plataforma</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-700 transition-colors"
                >
                  Buscar Empleos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-700 transition-colors"
                >
                  Para Empresas
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-700 transition-colors"
                >
                  Recursos
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Compañía</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-700 transition-colors"
                >
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-700 transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-700 transition-colors"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-700 transition-colors"
                >
                  Privacidad
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-700 transition-colors"
                >
                  Términos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-700 transition-colors"
                >
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-stone-200 text-center text-sm text-gray-600">
          © 2025 Corredor Ecológico. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
