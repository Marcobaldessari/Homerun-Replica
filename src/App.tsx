import React from 'react';
import { CheckoutPage } from './components/CheckoutPage';

export function App() {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-xl overflow-hidden">
        <CheckoutPage />
      </div>
    </div>
  );
}