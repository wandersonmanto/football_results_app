// src/components/LoadingSpinner.jsx
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ message = "Carregando jogos..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
        <div className="absolute inset-0 h-12 w-12 border-4 border-blue-200 rounded-full animate-pulse"></div>
      </div>
      <p className="text-gray-600 mt-4 text-lg font-medium">{message}</p>
      <p className="text-gray-400 text-sm mt-1">Aguarde um momento...</p>
    </div>
  );
};

export default LoadingSpinner;