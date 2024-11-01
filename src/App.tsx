import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { MarketOverview } from './components/MarketOverview';
import { ArbitrageOpportunities } from './components/ArbitrageOpportunities';
import { TradingControls } from './components/TradingControls';
import { SettingsPanel } from './components/SettingsPanel';

function Dashboard() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <MarketOverview />
          <ArbitrageOpportunities />
        </div>
        
        <div className="space-y-6">
          <TradingControls />
          <SettingsPanel />
        </div>
      </div>
    </main>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;