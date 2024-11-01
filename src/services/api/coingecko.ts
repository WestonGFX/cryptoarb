import { useSettingsStore } from '../../stores/settingsStore';

const BASE_URL = 'https://api.coingecko.com/api/v3';
const PRO_URL = 'https://pro-api.coingecko.com/api/v3';

class RateLimiter {
  private lastCall: number = 0;
  private interval: number = 60000; // 1 minute for free tier

  async waitForNext(): Promise<void> {
    const now = Date.now();
    const timeSinceLastCall = now - this.lastCall;
    
    if (timeSinceLastCall < this.interval) {
      await new Promise(resolve => 
        setTimeout(resolve, this.interval - timeSinceLastCall)
      );
    }
    
    this.lastCall = Date.now();
  }
}

const rateLimiter = new RateLimiter();

export async function getMarketData(currency = 'usd') {
  const settings = useSettingsStore.getState();
  const isPro = settings.apiKeys.coingecko.isPro;
  const apiKey = settings.apiKeys.coingecko.apiKey;

  if (!isPro) {
    await rateLimiter.waitForNext();
  }

  const url = `${isPro ? PRO_URL : BASE_URL}/coins/markets`;
  const response = await fetch(`${url}?vs_currency=${currency}&order=market_cap_desc&per_page=100&sparkline=true`, {
    headers: isPro && apiKey ? {
      'X-CG-Pro-API-Key': apiKey
    } : {}
  });

  if (!response.ok) {
    throw new Error(`CoinGecko API error: ${response.statusText}`);
  }

  return response.json();
}