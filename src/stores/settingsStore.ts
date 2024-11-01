import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_API_KEYS, type ApiKeys } from '../config/api-keys';

interface Settings {
  theme: 'light' | 'dark';
  currency: string;
  chartType: 'line' | 'candlestick';
  showLiveUpdates: boolean;
  timeScale: '1h' | '24h' | '7d' | '30d' | '1y';
  indicators: {
    macd: boolean;
    rsi: boolean;
    volume: boolean;
  };
  apiKeys: ApiKeys;
  updateSettings: (settings: Partial<Settings>) => void;
  updateApiKey: (provider: keyof ApiKeys, key: string) => void;
}

export const useSettingsStore = create<Settings>()(
  persist(
    (set) => ({
      theme: 'light',
      currency: 'USD',
      chartType: 'line',
      showLiveUpdates: true,
      timeScale: '24h',
      indicators: {
        macd: false,
        rsi: false,
        volume: true,
      },
      apiKeys: DEFAULT_API_KEYS,
      
      updateSettings: (newSettings) =>
        set((state) => ({ ...state, ...newSettings })),
      
      updateApiKey: (provider, key) =>
        set((state) => ({
          apiKeys: {
            ...state.apiKeys,
            [provider]: {
              ...state.apiKeys[provider],
              apiKey: key,
            },
          },
        })),
    }),
    {
      name: 'crypto-arb-settings',
    }
  )
);