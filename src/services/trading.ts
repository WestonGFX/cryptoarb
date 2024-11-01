import { KuCoinService } from './exchanges/kucoin';
import { UniswapService } from './exchanges/uniswap';
import { create } from 'zustand';
import type { TradeSettings, ArbitrageOpportunity } from '../types/trading';

interface TradingState {
  settings: TradeSettings;
  isTrading: boolean;
  currentTrade: ArbitrageOpportunity | null;
  executeArbitrage: (opportunity: ArbitrageOpportunity) => Promise<boolean>;
  updateSettings: (settings: Partial<TradeSettings>) => void;
}

const kucoin = new KuCoinService();
const uniswap = new UniswapService();

export const useTradingStore = create<TradingState>((set, get) => ({
  settings: {
    riskLevel: 'medium',
    tradingEnabled: false,
    minimumProfitThreshold: 10,
    maxTradeAmount: 1000,
    preferredExchanges: ['KuCoin', 'Uniswap']
  },
  isTrading: false,
  currentTrade: null,

  executeArbitrage: async (opportunity: ArbitrageOpportunity) => {
    const { settings, isTrading } = get();
    
    if (!settings.tradingEnabled || isTrading) {
      return false;
    }

    try {
      set({ isTrading: true, currentTrade: opportunity });

      // Execute buy on lower-priced exchange
      const buyExchange = opportunity.fromExchange === 'KuCoin' ? kucoin : uniswap;
      const sellExchange = opportunity.fromExchange === 'KuCoin' ? uniswap : kucoin;

      // Calculate trade amount based on risk level
      const tradeAmount = Math.min(
        settings.maxTradeAmount,
        opportunity.potentialProfit * (settings.riskLevel === 'high' ? 2 : settings.riskLevel === 'medium' ? 1 : 0.5)
      );

      // Execute trades
      await buyExchange.executeTrade(
        opportunity.symbol,
        tradeAmount,
        'buy',
        opportunity.priceDifference
      );

      await sellExchange.executeTrade(
        opportunity.symbol,
        tradeAmount,
        'sell',
        opportunity.priceDifference + opportunity.potentialProfit
      );

      return true;
    } catch (error) {
      console.error('Trade execution failed:', error);
      return false;
    } finally {
      set({ isTrading: false, currentTrade: null });
    }
  },

  updateSettings: (newSettings: Partial<TradeSettings>) => {
    set((state) => ({
      settings: { ...state.settings, ...newSettings }
    }));
  }
}));