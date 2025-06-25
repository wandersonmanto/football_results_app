// src/services/firebase.js
import { db } from '../config/firebase';
import { collection, doc, getDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';

/**
 * Busca jogos por mês e dia específico
 * @param {string} month - Formato: "06-2025"
 * @param {string} day - Formato: "07"
 * @returns {Promise<Object|null>} Dados do documento ou null
 */
export const getGamesByMonthAndDay = async (month, day) => {
  try {
    console.log(`Buscando jogos para ${month}/${day}`);
    
    const docRef = doc(db, month, day);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log(`Encontrados ${data.quantidade_jogos || 0} jogos`);
      return data;
    } else {
      console.log("Documento não encontrado!");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar dados do Firebase:", error);
    throw new Error(`Falha ao carregar dados: ${error.message}`);
  }
};

/**
 * Busca jogos da subcoleção 'jogos'
 * @param {string} month - Formato: "06-2025"
 * @param {string} day - Formato: "07"
 * @returns {Promise<Array>} Lista de jogos
 */
export const getGamesFromSubcollection = async (month, day) => {
  try {
    console.log(`Buscando jogos da subcoleção ${month}/${day}/jogos`);
    
    const gamesRef = collection(db, month, day, 'jogos');
    const q = query(gamesRef, orderBy('__name__')); // Ordena pelo ID do documento
    const querySnapshot = await getDocs(q);
    
    const games = [];
    querySnapshot.forEach((doc) => {
      games.push({ 
        id: doc.id, 
        ...doc.data() 
      });
    });
    
    console.log(`Encontrados ${games.length} jogos na subcoleção`);
    return games;
  } catch (error) {
    console.error("Erro ao buscar jogos da subcoleção:", error);
    throw new Error(`Falha ao carregar jogos: ${error.message}`);
  }
};

/**
 * Busca todos os dias disponíveis para um mês
 * @param {string} month - Formato: "06-2025"
 * @returns {Promise<Array>} Lista de dias disponíveis
 */
export const getAvailableDays = async (month) => {
  try {
    console.log(`Buscando dias disponíveis para ${month}`);
    
    const monthRef = collection(db, month);
    const querySnapshot = await getDocs(monthRef);
    
    const days = [];
    querySnapshot.forEach((doc) => {
      days.push(doc.id);
    });
    
    // Ordenar os dias numericamente
    days.sort((a, b) => parseInt(a) - parseInt(b));
    
    console.log(`Dias disponíveis: ${days.join(', ')}`);
    return days;
  } catch (error) {
    console.error("Erro ao buscar dias disponíveis:", error);
    throw new Error(`Falha ao carregar dias: ${error.message}`);
  }
};

/**
 * Busca estatísticas gerais de um mês
 * @param {string} month - Formato: "06-2025"
 * @returns {Promise<Object>} Estatísticas do mês
 */
export const getMonthStats = async (month) => {
  try {
    console.log(`Buscando estatísticas para ${month}`);
    
    const monthRef = collection(db, month);
    const querySnapshot = await getDocs(monthRef);
    
    let totalGames = 0;
    let totalDays = 0;
    const countries = new Set();
    const leagues = new Set();
    
    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      totalDays++;
      
      if (data.quantidade_jogos) {
        totalGames += data.quantidade_jogos;
      }
      
      if (data.jogos && Array.isArray(data.jogos)) {
        data.jogos.forEach(game => {
          if (game.pais) countries.add(game.pais);
          if (game.liga) leagues.add(game.liga);
        });
      }
    }
    
    const stats = {
      totalGames,
      totalDays,
      countries: Array.from(countries),
      leagues: Array.from(leagues),
      avgGamesPerDay: totalDays > 0 ? (totalGames / totalDays).toFixed(1) : 0
    };
    
    console.log('Estatísticas do mês:', stats);
    return stats;
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    throw new Error(`Falha ao carregar estatísticas: ${error.message}`);
  }
};

/**
 * Busca jogos recentes (últimos N jogos)
 * @param {number} limitCount - Número máximo de jogos
 * @returns {Promise<Array>} Lista de jogos recentes
 */
export const getRecentGames = async (limitCount = 50) => {
  try {
    console.log(`Buscando ${limitCount} jogos mais recentes`);
    
    // Esta função seria mais complexa na prática, 
    // pois precisaria buscar em múltiplas coleções/documentos
    // Por simplicidade, vamos buscar do mês atual
    const currentMonth = new Date().toISOString().slice(0, 7).replace('-', '-') + '-2025';
    const today = String(new Date().getDate()).padStart(2, '0');
    
    const data = await getGamesByMonthAndDay(currentMonth, today);
    
    if (data && data.jogos) {
      return data.jogos.slice(0, limitCount);
    }
    
    return [];
  } catch (error) {
    console.error("Erro ao buscar jogos recentes:", error);
    return [];
  }
};

/**
 * Função helper para testar conexão com Firebase
 * @returns {Promise<boolean>} True se conectado com sucesso
 */
export const testFirebaseConnection = async () => {
  try {
    console.log("Testando conexão com Firebase...");
    
    // Tenta buscar um documento simples
    const testMonth = '06-2025';
    const testDay = '07';
    
    await getGamesByMonthAndDay(testMonth, testDay);
    
    console.log("✅ Conexão com Firebase funcionando!");
    return true;
  } catch (error) {
    console.error("❌ Erro na conexão com Firebase:", error);
    return false;
  }
};