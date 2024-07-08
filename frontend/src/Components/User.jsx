import React from 'react';
import { Home, Phone, CreditCard, User as UserIcon } from 'lucide-react';

const User = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="bg-white shadow-md rounded-md p-6">
        <div className="mb-4">
          <div className="flex items-center">
            <UserIcon className="h-6 w-6 mr-2 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Username:</span>
          </div>
          <p className="mt-1 text-sm text-gray-600">JohnDoe123</p>
        </div>
        <div className="mb-4">
          <div className="flex items-center">
            <Home className="h-6 w-6 mr-2 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Address:</span>
          </div>
          <p className="mt-1 text-sm text-gray-600">123 Main St, Anytown, USA</p>
        </div>
        <div className="mb-4">
          <div className="flex items-center">
            <Phone className="h-6 w-6 mr-2 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Phone:</span>
          </div>
          <p className="mt-1 text-sm text-gray-600">123-456-7890</p>
        </div>
        <div className="mb-4">
          <div className="flex items-center">
            <CreditCard className="h-6 w-6 mr-2 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Payment Method:</span>
          </div>
          <p className="mt-1 text-sm text-gray-600">Visa ending in 1234</p>
        </div>
        <div className="flex justify-end">
          <button type="button" className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
