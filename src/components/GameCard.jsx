// src/components/GameCard.jsx
import React from 'react';

const GameCard = ({ game }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'FT':
        return 'bg-green-100 text-green-800';
      case 'HT':
        return 'bg-yellow-100 text-yellow-800';
      case 'LIVE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFavorite = () => {
    const oddCasa = parseFloat(game.odd_casa);
    const oddVisitante = parseFloat(game.odd_visitante);
    return oddCasa < oddVisitante ? 'casa' : 'visitante';
  };

  const favorite = getFavorite();

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Informações do Jogo */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-blue-600">{game.liga}</span>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                {game.short}
              </span>
            </div>
            <span className="text-sm text-gray-500 font-mono">{game.hora}</span>
          </div>
          
          <div className="space-y-1">
            <div className={`text-lg font-semibold flex items-center gap-2 ${
              favorite === 'casa' ? 'text-green-600' : ''
            }`}>
              <span>{game.time_casa}</span>
              {favorite === 'casa' && (
                <span className="text-xs bg-green-100 text-green-800 px-1 rounded">FAV</span>
              )}
            </div>
            
            <div className="text-sm text-gray-400 font-medium">vs</div>
            
            <div className={`text-lg font-semibold flex items-center gap-2 ${
              favorite === 'visitante' ? 'text-green-600' : ''
            }`}>
              <span>{game.time_visitante}</span>
              {favorite === 'visitante' && (
                <span className="text-xs bg-green-100 text-green-800 px-1 rounded">FAV</span>
              )}
            </div>
          </div>
          
          <div className="text-sm text-gray-600 mt-2">
            {game.pais} • {game.data}
          </div>
        </div>
        
        {/* Resultado */}
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800 mb-1">
            {game.resultado_casa} - {game.resultado_visitante}
          </div>
          <div className="text-sm text-gray-500 mb-2">
            HT: {game.resultado_casa_ht} - {game.resultado_visitante_ht}
          </div>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(game.status)}`}>
            {game.status}
          </span>
        </div>
        
        {/* Estatísticas */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-600 mb-1">Odds</div>
              <div className="font-mono font-medium">
                <span className={favorite === 'casa' ? 'text-green-600 font-bold' : ''}>
                  {game.odd_casa}
                </span>
                <span className="text-gray-400 mx-1">/</span>
                <span className={favorite === 'visitante' ? 'text-green-600 font-bold' : ''}>
                  {game.odd_visitante}
                </span>
              </div>
            </div>
            
            <div>
              <div className="text-gray-600 mb-1">Posição</div>
              <div className="font-medium">
                {game.classificacao_casa}º / {game.classificacao_visitante}º
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-600 mb-1">Eficiência</div>
              <div className="font-medium">
                {game.eficiencia_casa}% / {game.eficiencia_visitante}%
              </div>
            </div>
            
            <div>
              <div className="text-gray-600 mb-1">Favorito</div>
              <div className="font-medium text-green-600">
                {favorite === 'casa' ? 'Casa' : 'Visitante'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;