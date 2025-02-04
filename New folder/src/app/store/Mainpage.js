"use client";

import React, { useEffect, useState } from 'react';
import CustomerRootLayout from '../user/layout';
import CompanyCard from './components/companycard';
import BreadCrumbs from '../components/BreadCrumbs';
import Loader from '../Loader';

const AllStores = () => {
  const [companies, setCompanies] = useState([]);
  const [topDiscounts, setTopDiscounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [jsonLd,setjsonLd] = useState([])


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
        const jsonLdmain = {
          '@context': 'https://schema.org',
          '@type': 'Store',
          name: 'StoreShop by Brand - Coupons & Deals for Top Online Stores | Couponri',
          image: 'https://www.couponri.com/logo/logo2.jpg',
          description: companiesData,
        }
        setjsonLd(jsonLdmain);
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

  const breadcrumbs = [
    {name:"Home", url: '/'},
    {name: "Stores",url:"/store"},
    // {name: `${category.title?.substring(0,50)} `,url:`/blogcategories/${category.web_slug}`},
  ]

  return (
    <CustomerRootLayout>
      <BreadCrumbs breadCrumbs={breadcrumbs}/>
      <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />

      <div className="bg-white py-6 sm:py-12">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-xl sm:text-3xl font-bold text-center text-blue-800 mb-6 sm:mb-12">
            Featured Stores
          </h1>

          {/* Alphabet Filter */}
          <div className="flex w-full flex-wrap md:flex-nowrap justify-center gap-2 mb-6 ">
            {alphabet.map(letter => (
              <button
                key={letter}
                onClick={() => handleAlphabetClick(letter)}
                className={`px-3 py-2 mx-1 text-sm font-semibold border rounded ${selectedLetter === letter ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                  }`}
              >
                {letter}
              </button>
            ))}
          </div>


          {/* Store list in a grid with responsive columns */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredCompanies.map((company) => (
              <div key={company.id} className="flex items-center justify-center">
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
