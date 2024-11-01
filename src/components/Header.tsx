import React from 'react';
import { Bell, Settings, User } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">CryptoArb</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Account</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}