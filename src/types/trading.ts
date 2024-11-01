export interface Market {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  priceChangePercent: number;
  volume24h: number;
}

export interface ArbitrageOpportunity {
  fromExchange: string;
  toExchange: string;
  symbol: string;
  priceDifference: number;
  potentialProfit: number;
  timestamp: number;
}

export interface TradeSettings {
  riskLevel: 'low' | 'medium' | 'high';
  tradingEnabled: boolean;
  minimumProfitThreshold: number;
  maxTradeAmount: number;
  preferredExchanges: string[];
}

export interface PortfolioAsset {
  symbol: string;
  amount: number;
  valueUSD: number;
  profitLoss: number;
  profitLossPercent: number;
}

export interface ExchangeService {
  connect(credentials: string, secret?: string): Promise<boolean>;
  getPrice(symbol: string): Promise<number>;
  executeTrade(symbol: string, amount: number, side: 'buy' | 'sell', price: number): Promise<boolean>;
}