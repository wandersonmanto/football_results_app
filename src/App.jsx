// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, Filter, TrendingUp, Clock, Trophy, Target } from 'lucide-react';
import { getGamesByMonthAndDay } from './services/firebase';
import { calculateProfitSimulation } from './utils/calculations';
import { MONTHS, DAYS } from './utils/constants';
import GameCard from './components/GameCard';
import Filters from './components/Filters';
import Simulation from './components/Simulation';
import LoadingSpinner from './components/LoadingSpinner';

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState('06-2025');
  const [selectedDay, setSelectedDay] = useState('07');
  const [activeTab, setActiveTab] = useState('results');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estados dos filtros
  const [filters, setFilters] = useState({
    hora: '',
    resultado: '',
    oddMin: '',
    oddMax: '',
    classificacaoMax: ''
  });

  const [simulationFilters, setSimulationFilters] = useState({
    horarioInicio: '',
    horarioFim: '',
    valorAposta: 100
  });

  // Carregar dados do Firebase
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getGamesByMonthAndDay(selectedMonth, selectedDay);
        if (data && data.jogos) {
          setGames(data.jogos);
        } else {
          setGames([]);
        }
      } catch (err) {
        setError('Erro ao carregar jogos: ' + err.message);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [selectedMonth, selectedDay]);

  // Filtrar jogos
  const filteredGames = games.filter(game => {
    if (filters.hora && !game.hora.includes(filters.hora)) return false;
    if (filters.resultado && !`${game.resultado_casa}-${game.resultado_visitante}`.includes(filters.resultado)) return false;
    if (filters.oddMin && Math.min(parseFloat(game.odd_casa), parseFloat(game.odd_visitante)) < parseFloat(filters.oddMin)) return false;
    if (filters.oddMax && Math.max(parseFloat(game.odd_casa), parseFloat(game.odd_visitante)) > parseFloat(filters.oddMax)) return false;
    if (filters.classificacaoMax && Math.max(parseInt(game.classificacao_casa), parseInt(game.classificacao_visitante)) > parseInt(filters.classificacaoMax)) return false;
    return true;
  });

  // Calcular resultados da simulação
  const simulationResults = calculateProfitSimulation(games, simulationFilters);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <Trophy className="text-yellow-500" />
            Análise de Resultados de Jogos
          </h2>
          
          {/* Seletores de Mês e Dia */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                Selecionar Mês
              </label>
              <select 
                value={selectedMonth} 
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {MONTHS.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline w-4 h-4 mr-1" />
                Selecionar Dia
              </label>
              <select 
                value={selectedDay} 
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {DAYS.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('results')}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'results' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Trophy className="inline w-4 h-4 mr-2" />
              Resultados
            </button>
            <button
              onClick={() => setActiveTab('simulation')}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'simulation' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <TrendingUp className="inline w-4 h-4 mr-2" />
              Simulação
            </button>
          </div>
        </div>

        {/* Conteúdo das Tabs */}
        {activeTab === 'results' && (
          <div className="space-y-6">
            {/* Filtros */}
            <Filters filters={filters} setFilters={setFilters} />

            {/* Lista de Jogos */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Jogos ({filteredGames.length})
              </h2>
              
              {loading ? (
                <LoadingSpinner />
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-600">{error}</p>
                </div>
              ) : filteredGames.length === 0 ? (
                <p className="text-gray-600 text-center py-8">Nenhum jogo encontrado.</p>
              ) : (
                <div className="space-y-4">
                  {filteredGames.map((game, index) => (
                    <GameCard key={index} game={game} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'simulation' && (
          <Simulation 
            simulationFilters={simulationFilters}
            setSimulationFilters={setSimulationFilters}
            simulationResults={simulationResults}
          />
        )}
      </div>
    </div>
  );
};

export default App;