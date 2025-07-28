// Serviço de preços de ativos fictício que não depende da API Alpha Vantage
// API foi removida devido a problemas de estabilidade

// Mock de preços para alguns ativos comuns
const mockPrices: Record<string, number> = {
  // Ações
  'AAPL': 185.92,
  'MSFT': 415.56,
  'GOOGL': 175.33,
  'AMZN': 178.15,
  'META': 480.20,
  'TSLA': 230.65,
  'NVDA': 108.92,
  // Criptomoedas
  'BTC': 66124.50,
  'ETH': 3287.92,
  'XRP': 0.52,
  'BNB': 573.25,
  'ADA': 0.47,
  'SOL': 147.56,
  'DOGE': 0.12,
  // Euros para outras moedas
  'USD': 1.08,
  'GBP': 0.85,
  'BRL': 6.07
};

// Função para gerar um preço aleatório próximo ao preço base (simulando flutuações)
const generateRandomPrice = (basePrice: number): number => {
  // Variação aleatória de -5% a +5%
  const variation = (Math.random() * 0.10) - 0.05;
  return basePrice * (1 + variation);
};

export const getAssetPrice = async (symbol: string): Promise<number> => {
  // Verificar se temos um preço mock para o símbolo
  const basePrice = mockPrices[symbol] || 100; // Preço padrão se não encontrado
  
  // Gera um preço com pequena variação aleatória
  const price = generateRandomPrice(basePrice);
  
  console.log(`[Mock Service] Preço simulado para ${symbol}: ${price.toFixed(2)}`);
  return price;
};

export const getCryptoPrice = async (symbol: string): Promise<number> => {
  // Verificar se temos um preço mock para a criptomoeda
  const basePrice = mockPrices[symbol] || 1000; // Preço padrão se não encontrado
  
  // Gera um preço com pequena variação aleatória
  const price = generateRandomPrice(basePrice);
  
  console.log(`[Mock Service] Preço simulado para crypto ${symbol}: ${price.toFixed(2)}`);
  return price;
};