'use client';

import React, { useEffect, useState } from 'react';
import CouponCard from './Couponcards';
import Loader from '../../../app/Loader';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [topDiscounts, setTopDiscounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchCompaniesAndOffers = async () => {
      try {
        const [companyResponse, offersResponse] = await Promise.all([
          fetch('/api/company'),
          fetch('/api/offers')
        ]);

        if (!companyResponse.ok || !offersResponse.ok) {
          throw new Error('Failed to fetch companies or offers');
        }

        const companyData = await companyResponse.json();
        const offersData = await offersResponse.json();

        setCompanies(companyData);

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
        companyData.forEach(company => {
          discountWithFallback[company.id] = discounts[company.id] || 'Not Available';
        });

        setTopDiscounts(discountWithFallback);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompaniesAndOffers();
  }, []);

  const handleShowAll = () => {
    setShowAll(true);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader/></div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const displayedCompanies = showAll ? companies : companies.slice(0, 5);

  return (
    <div className="bg-white">
      <div className="py-4 text-center text-xl sm:text-2xl font-bold">
        <h1>All Offers</h1>
      </div>
      <div className="px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {displayedCompanies.map((company) => (
            <CouponCard
              key={company.id}
              company={company}
              topDiscount={topDiscounts[company.id]}
            />
          ))}
        </div>
        {!showAll && companies.length > 5 && (
          <div className="text-center mt-4">
            <button
              onClick={handleShowAll}
              className="text-base sm:text-lg font-bold px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyList;
