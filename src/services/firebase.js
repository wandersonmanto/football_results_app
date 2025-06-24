import { db } from '../config/firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export const getGamesByMonthAndDay = async (month, day) => {
  try {
    const docRef = doc(db, month, day);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("Documento não encontrado!");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw error;
  }
};

export const getGamesByCollection = async (month, day) => {
  try {
    const gamesRef = collection(db, month, day, 'jogos');
    const querySnapshot = await getDocs(gamesRef);
    
    const games = [];
    querySnapshot.forEach((doc) => {
      games.push({ id: doc.id, ...doc.data() });
    });
    
    return games;
  } catch (error) {
    console.error("Erro ao buscar jogos:", error);
    throw error;
  }
};