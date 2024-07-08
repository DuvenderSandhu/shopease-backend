import React from 'react';
import { CheckCircle } from 'lucide-react';

const AdminOrder = () => {
  // Dummy data for orders
  const orders = [
    { id: 1, customer: 'John Doe', status: 'Processing', date: '2024-04-10', mobile: '123-456-7890', email: 'john@example.com' },
    { id: 2, customer: 'Jane Smith', status: 'Shipped', date: '2024-04-09', mobile: '987-654-3210', email: 'jane@example.com' },
    { id: 3, customer: 'Mike Johnson', status: 'Delivered', date: '2024-04-08', mobile: '456-789-0123', email: 'mike@example.com' },
  ];

  const handleUpdateStatus = (orderId) => {
    // Update order status logic goes here
    console.log(`Update status for order ${orderId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>
      <div className="bg-white shadow-md rounded-md">
        <table className="w-full border-collapse table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-sm font-semibold text-gray-700 border">Order ID</th>
              <th className="py-2 px-4 text-sm font-semibold text-gray-700 border">Customer</th>
              <th className="py-2 px-4 text-sm font-semibold text-gray-700 border">Order Date</th>
              <th className="py-2 px-4 text-sm font-semibold text-gray-700 border">Mobile</th>
              <th className="py-2 px-4 text-sm font-semibold text-gray-700 border">Email</th>
              <th className="py-2 px-4 text-sm font-semibold text-gray-700 border">Status</th>
              <th className="py-2 px-4 text-sm font-semibold text-gray-700 border"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="py-2 px-4 text-sm text-gray-700 border">{order.id}</td>
                <td className="py-2 px-4 text-sm text-gray-700 border">{order.customer}</td>
                <td className="py-2 px-4 text-sm text-gray-700 border">{order.date}</td>
                <td className="py-2 px-4 text-sm text-gray-700 border">{order.mobile}</td>
                <td className="py-2 px-4 text-sm text-gray-700 border">{order.email}</td>
                <td className="py-2 px-4 text-sm text-gray-700 border flex items-center">
                  <span className="mr-2">{order.status}</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </td>
                <td className="py-2 px-4 text-sm text-gray-700 border">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleUpdateStatus(order.id)}
                  >
                    Update Status
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

export default AdminOrder;
