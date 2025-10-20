import React from 'react';
import { Camera, Package } from 'lucide-react';

function Header({ onDetectClick }) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-black p-2 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SmartInventory</h1>
              <p className="text-sm text-gray-500">AI-Powered Inventory Management</p>
            </div>
          </div>
          <button
            onClick={onDetectClick}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            <Camera className="w-5 h-5" />
            Detect Objects
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;