import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Vendor } from '../types';  

const VendorSignup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);


    const newVendor: Vendor = {
      vendorName: name,
      vendorEmail: email,
      vendorContactNumber: parseInt(contactNumber,10),
      vendorPassword: password,
    };

    try {
      // Send POST request to backend to create a vendor
      const response = await axios.post('http://localhost:8080/vendor/create', newVendor);

      // Validate the response contains a valid vendor object
      if (response.data) {
        const createdVendor: Vendor = response.data;

        // Check if the response contains essential fields
        if (
          createdVendor.vendorName &&
          createdVendor.vendorEmail &&
          createdVendor.vendorContactNumber &&
          createdVendor.vendorPassword
        ) {
          console.log('Vendor created successfully:', createdVendor);

          // Redirect to login page
          navigate('/vendor/login');
        } else {
          setError('Received invalid vendor data. Please try again.');
        }
      } else {
        setError('Failed to create vendor. Please try again.');
      }
    } catch (err) {
      console.error('Error during signup:', err);
      setError('Error signing up. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Vendor Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Vendor Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Vendor Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default VendorSignup;
