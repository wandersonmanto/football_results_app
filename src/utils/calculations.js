export const calculateProfitSimulation = (games, filters) => {
  let filteredGames = games;
  
  // Filtrar por horário se especificado
  if (filters.horarioInicio || filters.horarioFim) {
    filteredGames = games.filter(game => {
      const gameTime = game.hora.replace(':', '');
      const startTime = filters.horarioInicio?.replace(':', '') || '0000';
      const endTime = filters.horarioFim?.replace(':', '') || '2359';
      return gameTime >= startTime && gameTime <= endTime;
    });
  }

  let totalProfit = 0;
  let totalBets = 0;
  let wins = 0;

  filteredGames.forEach(game => {
    if (game.status !== 'FT') return; // Apenas jogos finalizados
    
    const oddCasa = parseFloat(game.odd_casa);
    const oddVisitante = parseFloat(game.odd_visitante);
    const favoriteIsHome = oddCasa < oddVisitante;
    const favoriteOdd = Math.min(oddCasa, oddVisitante);
    
    totalBets++;
    
    const homeWon = game.resultado_casa > game.resultado_visitante;
    const favoriteWon = favoriteIsHome ? homeWon : !homeWon;
    
    if (favoriteWon) {
      wins++;
      totalProfit += (filters.valorAposta * favoriteOdd) - filters.valorAposta;
    } else {
      totalProfit -= filters.valorAposta;
    }
  });

  return {
    totalProfit,
    totalBets,
    wins,
    winRate: totalBets > 0 ? (wins / totalBets * 100) : 0,
    roi: totalBets > 0 ? ((totalProfit / (totalBets * filters.valorAposta)) * 100) : 0
  };
};