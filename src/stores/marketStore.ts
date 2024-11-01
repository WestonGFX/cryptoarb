import { create } from 'zustand';
import type { Market } from '../types/trading';

interface MarketState {
  markets: Market[];
  updatePrice: (symbol: string, price: number) => void;
  addMarket: (market: Market) => void;
}

export const useMarketStore = create<MarketState>((set) => ({
  markets: [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      currentPrice: 65432.10,
      priceChangePercent: 2.5,
      volume24h: 28945671234
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      currentPrice: 3456.78,
      priceChangePercent: -1.2,
      volume24h: 15678923456
    }
  ],
  updatePrice: (symbol: string, price: number) =>
    set((state) => ({
      markets: state.markets.map((market) =>
        market.symbol === symbol
          ? { ...market, currentPrice: price }
          : market
      ),
    })),
  addMarket: (market: Market) =>
    set((state) => ({
      markets: [...state.markets, market],
    })),
}));