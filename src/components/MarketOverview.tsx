import React, { useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useWebSocket } from '../services/websocket';
import { useMarketStore } from '../stores/marketStore';
import { TradingChart } from './TradingChart';

// Generate unique timestamps for mock data
const mockChartData = Array.from({ length: 100 }, (_, i) => ({
  time: new Date(Date.now() - (100 - i) * 3600000).toISOString().split('T')[0],
  value: 50000 + Math.random() * 10000,
}));

export function MarketOverview() {
  const { connect, disconnect } = useWebSocket();
  const markets = useMarketStore((state) => state.markets);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Market Overview</h2>
        <div className="grid gap-4">
          {markets.map((market) => (
            <div key={market.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">{market.name}</h3>
                <p className="text-sm text-gray-500">{market.symbol}/USD</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${market.currentPrice.toLocaleString()}</p>
                <div className={`flex items-center ${market.priceChangePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {market.priceChangePercent >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-sm">{Math.abs(market.priceChangePercent)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <TradingChart symbol="BTC/USD" data={mockChartData} />
    </div>
  );
}