import React from 'react';
import { ShoppingCart } from 'lucide-react';

const UserProductManagement = () => {
  // Sample products data
  const products = [
    { id: 1, name: 'Product 1', price: 10, quantity: 5 },
    { id: 2, name: 'Product 2', price: 20, quantity: 8 },
    { id: 3, name: 'Product 3', price: 15, quantity: 3 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <div className="bg-white shadow-md rounded-md">
        <table className="w-full border-collapse table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-sm font-semibold text-gray-700 border">ID</th>
              <th className="py-2 px-4 text-sm font-semibold text-gray-700 border">Name</th>
              <th className="py-2 px-4 text-sm font-semibold text-gray-700 border">Price</th>
              <th className="py-2 px-4 text-sm font-semibold text-gray-700 border">Quantity</th>
              <th className="py-2 px-4 text-sm font-semibold text-gray-700 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="py-2 px-4 text-sm text-gray-700 border">{product.id}</td>
                <td className="py-2 px-4 text-sm text-gray-700 border">{product.name}</td>
                <td className="py-2 px-4 text-sm text-gray-700 border">{product.price}</td>
                <td className="py-2 px-4 text-sm text-gray-700 border">{product.quantity}</td>
                <td className="py-2 px-4 text-sm text-gray-700 border">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">
                    Add to Cart
                    <ShoppingCart className="h-4 w-4 ml-1 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProductManagement;
