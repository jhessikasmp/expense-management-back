import axios from 'axios';

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY || 'demo';
const BASE_URL = 'https://www.alphavantage.co/query';

interface ApiCallLog {
  symbol: string;
  date: string;
  calls: number;
}

const dailyCalls: Map<string, ApiCallLog> = new Map();

export const getAssetPrice = async (symbol: string): Promise<number> => {
  const today = new Date().toDateString();
  const key = `${symbol}_${today}`;
  
  const log = dailyCalls.get(key) || { symbol, date: today, calls: 0 };
  
  if (log.calls >= 3) {
    throw new Error(`Limite de 3 chamadas diárias atingido para ${symbol}`);
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: symbol,
        apikey: ALPHA_VANTAGE_API_KEY
      }
    });

    const quote = response.data['Global Quote'];
    if (!quote) throw new Error('Dados não encontrados');

    log.calls++;
    dailyCalls.set(key, log);

    return parseFloat(quote['05. price']);
  } catch (error) {
    console.error(`Erro ao buscar cotação para ${symbol}:`, error);
    return 0;
  }
};

export const getCryptoPrice = async (symbol: string): Promise<number> => {
  const today = new Date().toDateString();
  const key = `${symbol}_${today}`;
  
  const log = dailyCalls.get(key) || { symbol, date: today, calls: 0 };
  
  if (log.calls >= 3) {
    throw new Error(`Limite de 3 chamadas diárias atingido para ${symbol}`);
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'CURRENCY_EXCHANGE_RATE',
        from_currency: symbol,
        to_currency: 'EUR',
        apikey: ALPHA_VANTAGE_API_KEY
      }
    });

    const rate = response.data['Realtime Currency Exchange Rate'];
    if (!rate) throw new Error('Dados não encontrados');

    log.calls++;
    dailyCalls.set(key, log);

    return parseFloat(rate['5. Exchange Rate']);
  } catch (error) {
    console.error(`Erro ao buscar cotação crypto para ${symbol}:`, error);
    return 0;
  }
};