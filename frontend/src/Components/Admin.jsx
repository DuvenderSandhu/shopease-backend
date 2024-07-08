import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    // Fetch products from the backend when the component mounts
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Make an API call to fetch products
      // Example:
      // const response = await fetch('your_api_endpoint_here');
      // const data = await response.json();
      // setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProduct = async () => {
    try {
      // Create a new product object
      const newProduct = {
        name: name,
        description: description,
        price: price
      };

      // Make an API call to add the new product
      // Example:
      // await fetch('your_api_endpoint_here', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(newProduct)
      // });

      // After adding the product, fetch the updated list of products
      // fetchProducts();

      // Clear input fields
      setName('');
      setDescription('');
      setPrice(0);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      // Make an API call to delete the product
      // Example:
      // await fetch(`your_api_endpoint_here/${productId}`, {
      //   method: 'DELETE'
      // });

      // After deleting the product, fetch the updated list of products
      // fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold mb-4 m-auto">Admin Dashboard</h1>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Add Product</h2>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 mr-4 w-1/3"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 mr-4 w-1/3"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-1/3"
          />
          <button
            onClick={addProduct}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md ml-4"
          >
            Add Product
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id} className="border border-gray-300 rounded-md p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-semibold">{product.name}</span>
                  <span className="block text-gray-600">{product.description}</span>
                  <span className="block text-gray-600">${product.price}</span>
                </div>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
