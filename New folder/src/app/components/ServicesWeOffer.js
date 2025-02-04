'use client'
// components/ServicesWeOffer.js

// components/ServicesWeOffer.js

import {
    PencilSquareIcon,
    ChartBarIcon,
    VideoCameraIcon,
    CogIcon,
    CodeBracketIcon,
    GlobeAltIcon,
  } from '@heroicons/react/24/outline';
  
  export default function ServicesWeOffer() {
    return (
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Services We Are Offers</h2>
          <p className="text-gray-600 mb-12">
            How to create a website tailored to your unique business goals? Take a look at our design process that helps us deliver customized and goal-oriented digital solutions.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {/* UX & UI Designing */}
            <div className="flex flex-col items-center">
              <div className="relative mb-4 group">
                <div className="bg-white p-4 rounded-full shadow-lg transition-transform transform group-hover:scale-105">
                  <PencilSquareIcon className="h-12 w-12 text-yellow-500 group-hover:text-blue-800 transition-colors duration-300" />
                </div>
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-white rounded-full shadow-sm"></div>
              </div>
              <h3 className="text-lg font-bold">UX & UI Designing</h3>
            </div>
  
            {/* Web Development */}
            <div className="flex flex-col items-center">
              <div className="relative mb-4 group">
                <div className="bg-white p-4 rounded-full shadow-lg transition-transform transform group-hover:scale-105">
                  <CodeBracketIcon className="h-12 w-12 text-yellow-500 group-hover:text-blue-800 transition-colors duration-300" />
                </div>
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-white rounded-full shadow-sm"></div>
              </div>
              <h3 className="text-lg font-bold">Web Development</h3>
            </div>
  
            {/* Content */}
            <div className="flex flex-col items-center">
              <div className="relative mb-4 group">
                <div className="bg-white p-4 rounded-full shadow-lg transition-transform transform group-hover:scale-105">
                  <CogIcon className="h-12 w-12 text-yellow-500 group-hover:text-blue-800 transition-colors duration-300" />
                </div>
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-white rounded-full shadow-sm"></div>
              </div>
              <h3 className="text-lg font-bold">Content</h3>
            </div>
  
            {/* Google SEO */}
            <div className="flex flex-col items-center">
              <div className="relative mb-4 group">
                <div className="bg-white p-4 rounded-full shadow-lg transition-transform transform group-hover:scale-105">
                  <ChartBarIcon className="h-12 w-12 text-yellow-500 group-hover:text-blue-800 transition-colors duration-300" />
                </div>
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-white rounded-full shadow-sm"></div>
              </div>
              <h3 className="text-lg font-bold">Google SEO</h3>
            </div>
  
            {/* Social Media Marketing */}
            <div className="flex flex-col items-center">
              <div className="relative mb-4 group">
                <div className="bg-white p-4 rounded-full shadow-lg transition-transform transform group-hover:scale-105">
                  <GlobeAltIcon className="h-12 w-12 text-yellow-500 group-hover:text-blue-800 transition-colors duration-300" />
                </div>
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-white rounded-full shadow-sm"></div>
              </div>
              <h3 className="text-lg font-bold">Social Media Marketing</h3>
            </div>
  
            {/* Video Creating */}
            <div className="flex flex-col items-center">
              <div className="relative mb-4 group">
                <div className="bg-white p-4 rounded-full shadow-lg transition-transform transform group-hover:scale-105">
                  <VideoCameraIcon className="h-12 w-12 text-yellow-500 group-hover:text-blue-800 transition-colors duration-300" />
                </div>
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-white rounded-full shadow-sm"></div>
              </div>
              <h3 className="text-lg font-bold">Video Creating</h3>
            </div>
          </div>
        </div>
      </section>
    );
  }
  