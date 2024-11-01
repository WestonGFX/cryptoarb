export interface ApiKeys {
  coingecko: {
    isPro: boolean;
    apiKey?: string;
  };
  livecoinwatch: {
    apiKey: string;
  };
  // Add more API configurations
}

export const DEFAULT_API_KEYS: ApiKeys = {
  coingecko: {
    isPro: false,
  },
  livecoinwatch: {
    apiKey: '40303b84-14f3-4533-aaec-3c1ff6600d65',
  },
};