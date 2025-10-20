export const initialInventory = [
  { id: 1, name: 'Laptop', category: 'Electronics', quantity: 15, minStock: 5, price: 899.99, image: null, detectedAt: '2025-01-15' },
  { id: 2, name: 'Office Chair', category: 'Furniture', quantity: 8, minStock: 3, price: 249.99, image: null, detectedAt: '2025-01-20' },
  { id: 3, name: 'Desk Lamp', category: 'Lighting', quantity: 3, minStock: 5, price: 45.99, image: null, detectedAt: '2025-02-01' },
  { id: 4, name: 'Monitor', category: 'Electronics', quantity: 12, minStock: 4, price: 299.99, image: null, detectedAt: '2025-02-10' },
  { id: 5, name: 'Keyboard', category: 'Electronics', quantity: 25, minStock: 10, price: 79.99, image: null, detectedAt: '2025-02-15' },
];

export const categories = ['Electronics', 'Furniture', 'Lighting', 'Office Supplies', 'Equipment'];

export const simulateObjectDetection = (imageData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockObjects = [
        { id: Date.now() + 1, name: 'Laptop', confidence: 0.95, category: 'Electronics', quantity: 2 },
        { id: Date.now() + 2, name: 'Mouse', confidence: 0.89, category: 'Electronics', quantity: 3 },
        { id: Date.now() + 3, name: 'Notebook', confidence: 0.76, category: 'Office Supplies', quantity: 5 }
      ];
      resolve(mockObjects);
    }, 2000);
  });
};