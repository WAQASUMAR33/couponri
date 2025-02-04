"use client";

import React, { useEffect, useState } from 'react';
import CustomerRootLayout from '../../../app/user/layout';
import CompanyCard from './components/companycard'; 
import Loader from '../../../app/Loader';

const AllStores = () => {
  const [companies, setCompanies] = useState([]);
  const [topDiscounts, setTopDiscounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState(null); 

  useEffect(() => {
    const fetchCompaniesAndOffers = async () => {
      try {
        const [companiesResponse, offersResponse] = await Promise.all([
          fetch('/api/company'),
          fetch('/api/offers')
        ]);

        if (!companiesResponse.ok || !offersResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const companiesData = await companiesResponse.json();
        const offersData = await offersResponse.json();

        // Calculate top discounts
        const discounts = {};
        offersData.forEach(offer => {
          const discountMatch = offer.offer_title.match(/^(\d+)%/);
          if (discountMatch) {
            const discount = parseInt(discountMatch[1], 10);
            const companyId = offer.comp_id;
            if (!discounts[companyId] || discounts[companyId] < discount) {
              discounts[companyId] = discount;
            }
          }
        });

        const discountWithFallback = {};
        companiesData.forEach(company => {
          discountWithFallback[company.id] = discounts[company.id] || 'Not Available';
        });

        setTopDiscounts(discountWithFallback);
        setCompanies(companiesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCompaniesAndOffers();
  }, []);

  // Filter companies by selected alphabet
  const filteredCompanies = selectedLetter
    ? companies.filter(company => company.com_title.toUpperCase().startsWith(selectedLetter))
    : companies;

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const handleAlphabetClick = (letter) => {
    setSelectedLetter(letter);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100"><Loader/></div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-700">{`Error: ${error}`}</div>;
  }

  if (!companies.length) {
    return <div className="flex items-center justify-center min-h-screen bg-yellow-100 text-yellow-700">No companies available.</div>;
  }

  return (
    <CustomerRootLayout>
      <div className="bg-white py-6 sm:py-12">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-center text-blue-800 mb-6 sm:mb-12">Featured Stores</h1>

          {/* Alphabet Filter */}
          <div className="flex justify-center mb-6">
            {alphabet.map(letter => (
              <button
                key={letter}
                onClick={() => handleAlphabetClick(letter)}
                className={`px-4 py-2 mx-1 text-sm font-semibold border rounded ${
                  selectedLetter === letter ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Store list in a grid with 5 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredCompanies.map((company) => (
              <div
                key={company.id}
                className="flex items-center justify-center "
              >
                <CompanyCard company={company} topDiscount={topDiscounts[company.id]} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </CustomerRootLayout>
  );
};

export default AllStores;
