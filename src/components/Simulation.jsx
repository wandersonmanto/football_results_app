// src/components/Simulation.jsx
import React from 'react';
import { Target, TrendingUp, TrendingDown, DollarSign, Award, Clock } from 'lucide-react';

const Simulation = ({ simulationFilters, setSimulationFilters, simulationResults }) => {
  return (
    <div className="space-y-6">
      {/* Configurações da Simulação */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Target className="text-green-500" />
          Configurações da Simulação
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="inline w-4 h-4 mr-1" />
              Horário Início
            </label>
            <input
              type="time"
              value={simulationFilters.horarioInicio}
              onChange={(e) => setSimulationFilters({
                ...simulationFilters, 
                horarioInicio: e.target.value
              })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
            />
            <p className="text-xs text-gray-500 mt-1">
              Deixe vazio para incluir todos os horários
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="inline w-4 h-4 mr-1" />
              Horário Fim
            </label>
            <input
              type="time"
              value={simulationFilters.horarioFim}
              onChange={(e) => setSimulationFilters({
                ...simulationFilters, 
                horarioFim: e.target.value
              })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
            />
            <p className="text-xs text-gray-500 mt-1">
              Deixe vazio para incluir todos os horários
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="inline w-4 h-4 mr-1" />
              Valor da Aposta (R$)
            </label>
            <input
              type="number"
              min="1"
              step="0.01"
              value={simulationFilters.valorAposta}
              onChange={(e) => setSimulationFilters({
                ...simulationFilters, 
                valorAposta: parseFloat(e.target.value) || 100
              })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
            />
            <p className="text-xs text-gray-500 mt-1">
              Valor apostado por jogo
            </p>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
            <Award className="w-4 h-4" />
            Estratégia de Simulação
          </h3>
          <p className="text-green-700 text-sm">
            Esta simulação calcula o lucro apostando sempre no time <strong>favorito</strong> (menor odd) de cada jogo.
            O cálculo considera apenas jogos finalizados (FT) e usa o resultado real para determinar vitórias.
          </p>
        </div>
      </div>

      {/* Resultados da Simulação */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Resultados da Simulação - Apostando no Favorito
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {simulationResults.totalBets}
            </div>
            <div className="text-sm text-gray-600 font-medium">Total de Apostas</div>
            <div className="text-xs text-gray-500 mt-1">
              Jogos analisados
            </div>
          </div>
          
          <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {simulationResults.wins}
            </div>
            <div className="text-sm text-gray-600 font-medium">Vitórias</div>
            <div className="text-xs text-gray-500 mt-1">
              Apostas vencedoras
            </div>
          </div>
          
          <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {simulationResults.winRate.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600 font-medium">Taxa de Acerto</div>
            <div className="text-xs text-gray-500 mt-1">
              Percentual de vitórias
            </div>
          </div>
          
          <div className="text-center p-6 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className={`text-3xl font-bold mb-2 flex items-center justify-center gap-1 ${
              simulationResults.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {simulationResults.totalProfit >= 0 ? (
                <TrendingUp className="w-6 h-6" />
              ) : (
                <TrendingDown className="w-6 h-6" />
              )}
              R$ {Math.abs(simulationResults.totalProfit).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              {simulationResults.totalProfit >= 0 ? 'Lucro' : 'Prejuízo'}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Resultado líquido
            </div>
          </div>
        </div>
        
        {/* Métricas Avançadas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">ROI (Return on Investment)</h3>
            <div className={`text-2xl font-bold mb-1 ${
              simulationResults.roi >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {simulationResults.roi >= 0 ? '+' : ''}{simulationResults.roi.toFixed(2)}%
            </div>
            <p className="text-sm text-gray-600">
              Retorno sobre investimento total
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Investimento Total</h3>
            <div className="text-2xl font-bold text-blue-600 mb-1">
              R$ {(simulationResults.totalBets * simulationFilters.valorAposta).toFixed(2)}
            </div>
            <p className="text-sm text-gray-600">
              Capital investido na estratégia
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Derrotas</h3>
            <div className="text-2xl font-bold text-red-600 mb-1">
              {simulationResults.totalBets - simulationResults.wins}
            </div>
            <p className="text-sm text-gray-600">
              Apostas perdedoras
            </p>
          </div>
        </div>
        
        {/* Análise Detalhada */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-3">💡 Análise da Estratégia</h3>
          <div className="space-y-2 text-sm text-gray-700">
            {simulationResults.totalBets === 0 ? (
              <p>⚠️ Nenhum jogo encontrado para análise. Verifique os filtros de horário.</p>
            ) : (
              <>
                <p>
                  🎯 <strong>Performance:</strong> {' '}
                  {simulationResults.winRate >= 60 ? 'Excelente' : 
                   simulationResults.winRate >= 50 ? 'Boa' : 
                   simulationResults.winRate >= 40 ? 'Regular' : 'Baixa'} taxa de acerto
                </p>
                <p>
                  💰 <strong>Rentabilidade:</strong> {' '}
                  {simulationResults.roi > 10 ? 'Muito lucrativa' :
                   simulationResults.roi > 0 ? 'Lucrativa' :
                   simulationResults.roi > -10 ? 'Quase no ponto de equilíbrio' : 'Prejuízo significativo'}
                </p>
                <p>
                  📊 <strong>Recomendação:</strong> {' '}
                  {simulationResults.roi > 5 && simulationResults.winRate > 50 ? 
                    'Estratégia promissora para este período' :
                    'Considere ajustar filtros ou estratégia'}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;