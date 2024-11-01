import React from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';
import type { ArbitrageOpportunity } from '../types/trading';
import { useTradingStore } from '../services/trading';

const mockOpportunities: ArbitrageOpportunity[] = [
  {
    fromExchange: 'KuCoin',
    toExchange: 'Uniswap',
    symbol: 'ETH',
    priceDifference: 12.50,
    potentialProfit: 25.75,
    timestamp: Date.now()
  }
];

export function ArbitrageOpportunities() {
  const { executeArbitrage, isTrading, settings } = useTradingStore();

  const handleExecuteTrade = async (opportunity: ArbitrageOpportunity) => {
    if (opportunity.potentialProfit < settings.minimumProfitThreshold) {
      alert('Profit below minimum threshold');
      return;
    }

    const success = await executeArbitrage(opportunity);
    if (success) {
      alert('Trade executed successfully!');
    } else {
      alert('Trade execution failed');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Arbitrage Opportunities</h2>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <RefreshCw className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      <div className="space-y-4">
        {mockOpportunities.map((opp, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{opp.fromExchange}</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <span className="font-medium">{opp.toExchange}</span>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(opp.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Symbol: {opp.symbol}</p>
                <p className="text-sm text-gray-600">Difference: ${opp.priceDifference}</p>
              </div>
              <div className="text-right">
                <p className="text-green-600 font-semibold">+${opp.potentialProfit}</p>
                <button 
                  onClick={() => handleExecuteTrade(opp)}
                  disabled={isTrading || !settings.tradingEnabled}
                  className={`mt-2 px-4 py-1 text-sm rounded-full ${
                    isTrading || !settings.tradingEnabled
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isTrading ? 'Executing...' : 'Execute Trade'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}