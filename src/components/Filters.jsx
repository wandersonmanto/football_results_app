// src/components/Filters.jsx
import React from 'react';
import { Filter, X } from 'lucide-react';

const Filters = ({ filters, setFilters }) => {
  const clearFilters = () => {
    setFilters({
      hora: '',
      resultado: '',
      oddMin: '',
      oddMax: '',
      classificacaoMax: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Filter className="text-blue-500" />
          Filtros
        </h2>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:text-red-800 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
          >
            <X className="w-4 h-4" />
            Limpar Filtros
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Horário
          </label>
          <input
            type="time"
            value={filters.hora}
            onChange={(e) => setFilters({...filters, hora: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Odd Mínima
          </label>
          <input
            type="number"
            step="0.01"
            min="1"
            placeholder="Ex: 1.50"
            value={filters.oddMin}
            onChange={(e) => setFilters({...filters, oddMin: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Odd Máxima
          </label>
          <input
            type="number"
            step="0.01"
            min="1"
            placeholder="Ex: 5.00"
            value={filters.oddMax}
            onChange={(e) => setFilters({...filters, oddMax: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Classificação Máxima
          </label>
          <input
            type="number"
            min="1"
            max="20"
            placeholder="Ex: 10"
            value={filters.classificacaoMax}
            onChange={(e) => setFilters({...filters, classificacaoMax: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>
      </div>
      
      {hasActiveFilters && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Filtros ativos:</strong> {' '}
            {filters.hora && `Horário: ${filters.hora}`}
            {filters.resultado && `${filters.hora ? ', ' : ''}Resultado: ${filters.resultado}`}
            {filters.oddMin && `${(filters.hora || filters.resultado) ? ', ' : ''}Odd min: ${filters.oddMin}`}
            {filters.oddMax && `${(filters.hora || filters.resultado || filters.oddMin) ? ', ' : ''}Odd max: ${filters.oddMax}`}
            {filters.classificacaoMax && `${(filters.hora || filters.resultado || filters.oddMin || filters.oddMax) ? ', ' : ''}Classificação max: ${filters.classificacaoMax}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default Filters;