// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Configuração do Firebase usando import.meta.env (Vite)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Verificar se todas as variáveis necessárias estão definidas
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID'
];

const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Variáveis de ambiente do Firebase não configuradas:', missingVars);
  console.log('📝 Crie um arquivo .env na raiz do projeto com as seguintes variáveis:');
  console.log(`
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_projeto_id
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
  `);
}

// Inicializar Firebase
let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  
  // Conectar ao emulador do Firestore em desenvolvimento (opcional)
  if (import.meta.env.DEV && import.meta.env.VITE_USE_FIRESTORE_EMULATOR === 'true') {
    try {
      connectFirestoreEmulator(db, 'localhost', 8080);
      console.log('🔧 Conectado ao emulador do Firestore');
    } catch (error) {
      console.log('⚠️ Emulador do Firestore não disponível, usando produção');
    }
  }
  
  console.log('🔥 Firebase inicializado com sucesso!');
  console.log('📊 Projeto:', firebaseConfig.projectId);
  
} catch (error) {
  console.error('❌ Erro ao inicializar Firebase:', error);
  console.log('🔄 Usando dados mockados como fallback');
}

export { db };
export default app;

// Helper para verificar se o Firebase está configurado corretamente
export const isFirebaseConfigured = () => {
  return missingVars.length === 0 && db !== undefined;
};

// Função para obter informações de debug
export const getFirebaseInfo = () => {
  return {
    configured: isFirebaseConfigured(),
    projectId: firebaseConfig.projectId,
    environment: import.meta.env.MODE,
    usingEmulator: import.meta.env.VITE_USE_FIRESTORE_EMULATOR === 'true'
  };
};