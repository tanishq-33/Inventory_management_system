import React from 'react';
import { Check, AlertCircle, Package } from 'lucide-react';
import { categories } from '../utils/mockData';

function Analytics({ inventory }) {
  const lowStockItems = inventory.filter(item => item.quantity <= item.minStock);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h3>
          <div className="space-y-3">
            {categories.map(cat => {
              const count = inventory.filter(item => item.category === cat).length;
              const percentage = inventory.length > 0 ? (count / inventory.length) * 100 : 0;
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{cat}</span>
                    <span className="text-sm text-gray-500">{count} items</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-black h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stock Status */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">In Stock</p>
                <p className="text-2xl font-bold text-green-700">
                  {inventory.filter(item => item.quantity > item.minStock).length}
                </p>
              </div>
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-red-700">{lowStockItems.length}</p>
              </div>
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
          </div>
        </div>

        {/* Top Items by Value */}
        <div className="bg-white rounded-lg shadow-sm border p-6 md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Items by Value</h3>
          <div className="space-y-2">
            {inventory
              .sort((a, b) => (b.quantity * b.price) - (a.quantity * a.price))
              .slice(0, 5)
              .map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                      <Package className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.quantity} units × ${item.price}</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-gray-900">
                    ${(item.quantity * item.price).toFixed(2)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;