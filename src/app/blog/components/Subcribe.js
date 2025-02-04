// components/Subscribe.js
import React from 'react';

export default function Subscribe() {
  return (
    <div className="bg-blue-600 min-h-[300px] h-auto text-white py-12 px-6  flex flex-col justify-center items-center">
      <h2 className="text-2xl md:text-4xl lg:text-5xl w-full font-bold mb-4 text-center">
        Subscribe For More Info And Updates About Coupons
      </h2>
      <div className="flex flex-col md:flex-row items-center md:max-w-lg w-full mt-8">
        <div className="flex items-center w-full bg-white text-blue-600 rounded-full px-4 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 12V2m-4 4v2m4 6h6m-4 4h2M2 16V4a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H6l-4 4z"
            />
          </svg>
          <input
            type="email"
            placeholder="Your email here"
            className="flex-1 px-4 py-2 text-black focus:outline-none w-full md:w-auto"
          />
        </div>
        <button className="bg-blue-800 hover:bg-blue-900  text-white font-semibold px-6 py-2 rounded-full md:ml-2 mt-4 md:mt-0 w-full md:w-64 md:py-4">
          Subscribe Now
        </button>
      </div>
    </div>
  );
}
