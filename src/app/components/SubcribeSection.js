'use client';

import React, { useState } from 'react';

const SubscribeSection = () => {
  const [form, setForm] = useState({
    email: '',
    subject: 'Subscription',
    message: 'Apply for subscription',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(form.email)) {
      setErrorMessage('Please enter a valid email address.');
      setSuccessMessage('');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/sendemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      if (result.success) {
        setSuccessMessage('Subscription successful! Check your inbox for updates.');
        setErrorMessage('');
        setForm({ email: '', subject: 'Subscription', message: 'Apply for subscription' });
      } else {
        setErrorMessage('Failed to subscribe. Please try again later.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      setSuccessMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 h-80 items-center flex py-8">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
          Subscribe For More Info And Updates About Coupons
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-2/3 lg:w-1/2 flex items-center"
        >
          <div className="flex-1">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email here"
              className="w-full px-5 py-3 rounded-l-full text-gray-700"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`${
              isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-800 hover:bg-blue-700'
            } text-white px-6 py-3 rounded-r-full transition duration-300`}
          >
            {isLoading ? 'Subscribing...' : 'Subscribe Now'}
          </button>
        </form>

        {successMessage && (
          <p className="text-white mt-4 text-center">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-black mt-4 text-center">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default SubscribeSection;
