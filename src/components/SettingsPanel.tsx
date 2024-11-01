import React from 'react';
import { Settings as SettingsIcon, Key } from 'lucide-react';
import { useSettingsStore } from '../stores/settingsStore';

export function SettingsPanel() {
  const { 
    currency, 
    chartType, 
    showLiveUpdates, 
    timeScale,
    indicators,
    apiKeys,
    updateSettings,
    updateApiKey
  } = useSettingsStore();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <SettingsIcon className="h-5 w-5 text-gray-600" />
        <h2 className="text-lg font-semibold">Settings</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Currency
          </label>
          <select
            value={currency}
            onChange={(e) => updateSettings({ currency: e.target.value })}
            className="w-full rounded-md border border-gray-300 p-2"
          >
            <option value="USD">USD</option>
            <option value="CAD">CAD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chart Type
          </label>
          <div className="flex space-x-2">
            {(['line', 'candlestick'] as const).map((type) => (
              <button
                key={type}
                onClick={() => updateSettings({ chartType: type })}
                className={`px-4 py-2 rounded-full text-sm ${
                  chartType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Scale
          </label>
          <div className="flex flex-wrap gap-2">
            {(['1h', '24h', '7d', '30d', '1y'] as const).map((scale) => (
              <button
                key={scale}
                onClick={() => updateSettings({ timeScale: scale })}
                className={`px-3 py-1 rounded-full text-sm ${
                  timeScale === scale
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {scale}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Indicators
          </label>
          {Object.entries(indicators).map(([key, value]) => (
            <div key={key} className="flex items-center">
              <input
                type="checkbox"
                checked={value}
                onChange={() =>
                  updateSettings({
                    indicators: { ...indicators, [key]: !value },
                  })
                }
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-600">
                {key.toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Key className="h-5 w-5 text-gray-600" />
            <h3 className="text-sm font-medium text-gray-700">API Keys</h3>
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              CoinGecko Pro
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={apiKeys.coingecko.apiKey || ''}
                onChange={(e) => updateApiKey('coingecko', e.target.value)}
                placeholder="Enter API key"
                className="flex-1 rounded-md border border-gray-300 p-2 text-sm"
              />
              <input
                type="checkbox"
                checked={apiKeys.coingecko.isPro}
                onChange={(e) =>
                  updateSettings({
                    apiKeys: {
                      ...apiKeys,
                      coingecko: {
                        ...apiKeys.coingecko,
                        isPro: e.target.checked,
                      },
                    },
                  })
                }
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <span className="text-sm text-gray-600">Pro</span>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              LiveCoinWatch
            </label>
            <input
              type="text"
              value={apiKeys.livecoinwatch.apiKey}
              onChange={(e) => updateApiKey('livecoinwatch', e.target.value)}
              placeholder="Enter API key"
              className="w-full rounded-md border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}