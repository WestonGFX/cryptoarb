import React from 'react';
import { Power, Shield, DollarSign } from 'lucide-react';
import { useTradingStore } from '../services/trading';

export function TradingControls() {
  const { settings, updateSettings } = useTradingStore();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Trading Controls</h2>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Power className="h-5 w-5 text-gray-600" />
            <span className="font-medium">Trading Status</span>
          </div>
          <button
            onClick={() => updateSettings({ tradingEnabled: !settings.tradingEnabled })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
              settings.tradingEnabled ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
              settings.tradingEnabled ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="h-5 w-5 text-gray-600" />
            <span className="font-medium">Risk Level</span>
          </div>
          <div className="flex space-x-2">
            {(['low', 'medium', 'high'] as const).map((level) => (
              <button
                key={level}
                onClick={() => updateSettings({ riskLevel: level })}
                className={`px-4 py-2 rounded-full text-sm ${
                  settings.riskLevel === level
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="h-5 w-5 text-gray-600" />
            <span className="font-medium">Minimum Profit Threshold</span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={settings.minimumProfitThreshold}
            onChange={(e) => updateSettings({ minimumProfitThreshold: Number(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-sm text-gray-600 mt-1">
            ${settings.minimumProfitThreshold}
          </div>
        </div>
      </div>
    </div>
  );
}