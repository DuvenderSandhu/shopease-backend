import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const ProductManagement = () => {
  // Dummy data for products
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: 100, quantity: 10 },
    { id: 2, name: 'Product 2', price: 200, quantity: 20 },
    { id: 3, name: 'Product 3', price: 150, quantity: 15 },
  ]);

  // State for new product form
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, quantity: 0 });

  // Function to handle adding a new product
  const handleAddProduct = () => {
    setProducts([...products, { id: products.length + 1, ...newProduct }]);
    setNewProduct({ name: '', price: 0, quantity: 0 });
  };

  // Function to handle deleting a product
  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <div className="bg-white shadow-md rounded-md">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Add New Product</h2>
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              className="border p-2 flex-1"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type="number"
              className="border p-2 flex-1"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <input
              type="number"
              className="border p-2 flex-1"
              placeholder="Quantity"
              value={newProduct.quantity}
              onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddProduct}
            >
              <PlusCircle className="h-6 w-6 mr-2" /> Add
            </button>
          </div>
        </div>
        <table className="w-full border-collapse table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-sm font-semibold text-gray-700 border">ID</th>
              <th className="py-2 px-4 text-sm font-semibold text-gray-700 border">Name</th>
              <th className="py-2 px-4 text-sm font-semibold text-gray-700 border">Price</th>
              <th className="py-2 px-4 text-sm font-semibold text-gray-700 border">Quantity</th>
              <th className="py-2 px-4 text-sm font-semibold text-gray-700 border"></th>
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
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                  {/* Add Edit functionality here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
