'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Filter, MapPin, Briefcase } from 'lucide-react';

export function JobFilters({
  categories,
  locations,
}: {
  categories: string[];
  locations: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState(searchParams.get('category') || 'Todas');
  const [location, setLocation] = useState(searchParams.get('location') || 'Todas');

  const handleFilter = () => {
    const params = new URLSearchParams();
    if (category !== 'Todas') params.set('category', category);
    if (location !== 'Todas') params.set('location', location);

    router.push(`/empleos?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 mb-10 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-green-100 p-2 rounded-lg">
          <Filter className="h-5 w-5 text-green-700" />
        </div>
        <h2 className="text-xl font-bold text-green-800">
          Filtrar ofertas de empleo
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-green-800">
            <Briefcase className="h-4 w-4" />
            Empresa
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 bg-green-50 border-2 border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-green-900 font-medium"
          >
            <option>Todas</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-green-800">
            <MapPin className="h-4 w-4" />
            Ubicación
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 bg-green-50 border-2 border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-green-900 font-medium"
          >
            <option>Todas</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleFilter}
            className="w-full px-6 py-3 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Aplicar filtros
          </button>
        </div>
      </div>
    </div>
  );
}