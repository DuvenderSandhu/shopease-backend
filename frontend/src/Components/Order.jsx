import React from 'react';

const OrderMangement = () => {
    // Dummy data for orders
    const orders = [
        { id: 1, orderNumber: 'ORD12345', date: '2024-04-09', name: 'Product A', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', total: 100 },
        { id: 2, orderNumber: 'ORD12346', date: '2024-04-08', name: 'Product B', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', total: 150 },
        { id: 3, orderNumber: 'ORD12347', date: '2024-04-07', name: 'Product C', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', total: 200 },
        { id: 4, orderNumber: 'ORD12348', date: '2024-04-06', name: 'Product D', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', total: 120 },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Order History</h1>
            <div className="overflow-x-auto">
                <div className="min-w-full overflow-hidden overflow-x-scroll">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Number</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.orderNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-indigo-600 hover:text-indigo-900">View Invoice</button>
                                        <button className="ml-4 text-indigo-600 hover:text-indigo-900">View Product</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OrderMangement;
