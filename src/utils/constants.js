export const MONTHS = [
  '01-2025', '02-2025', '03-2025', '04-2025', '05-2025', '06-2025',
  '07-2025', '08-2025', '09-2025', '10-2025', '11-2025', '12-2025'
];

export const DAYS = Array.from({length: 31}, (_, i) => 
  String(i + 1).padStart(2, '0')
);

export const GAME_STATUS = {
  FT: 'Finalizado',
  HT: 'Intervalo',
  LIVE: 'Ao Vivo',
  NS: 'Não Iniciado'
};