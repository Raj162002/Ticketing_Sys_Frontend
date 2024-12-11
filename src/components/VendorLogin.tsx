import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Vendor } from '../types';

const VendorLogin = () => {
  const [formData, setFormData] = useState({ vendorEmail: '', vendorPassword: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error

    try {
      // Send login request to the backend
      const response = await axios.post<Vendor>('http://localhost:8080/vendor/login', formData);

      // If login is successful, navigate to the Vendor Dashboard with vendor data
      if (response.status === 200) {
        console.log('Login successful', response.data);
        const vendor = response.data;
        navigate('/vendor/dashboard', { state: { vendor } }); // Passing vendor object
      }
    } catch (err: any) {
      // Handle login failure (invalid email/password)
      if (err.response && err.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  // Handle redirection to the signup page
  const handleSignup = () => {
    navigate('/vendor/signup');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="absolute top-4 right-4">
            <button
              onClick={() => navigate("/")}
              className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-sm"
            >
              Logout
            </button>
          </div>
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Vendor Login</h2>
        
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="vendorEmail" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="vendorEmail"
              name="vendorEmail"
              value={formData.vendorEmail}
              onChange={handleChange}
              required
              className="mt-1 px-3 py-2 border border-gray-300 rounded-lg w-full"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="vendorPassword" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="vendorPassword"
              name="vendorPassword"
              value={formData.vendorPassword}
              onChange={handleChange}
              required
              className="mt-1 px-3 py-2 border border-gray-300 rounded-lg w-full"
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleSignup}
            className="text-blue-500 hover:text-blue-700"
          >
            Don't have an account? Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;
