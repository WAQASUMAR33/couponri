import React, { useEffect, useState } from 'react';
import { StarIcon, FireIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import DOMPurify from 'dompurify';
import Loader from '../../../app/Loader';

const LeftSide = ({ company, offers }) => {
  const [similarStores, setSimilarStores] = useState([]);
  const [topDiscounts, setTopDiscounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryCoupons, setCategoryCoupons] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarStores = async () => {
      try {
        const response = await fetch('/api/company');
        if (!response.ok) throw new Error('Failed to fetch data');

        const companiesData = await response.json();
        const discounts = {};

        offers?.forEach((offer) => {
          const discountMatch = offer.offer_title.match(/^(\d+)%/);
          if (discountMatch) {
            const discount = parseInt(discountMatch[1], 10);
            const companyId = offer.comp_id;
            if (!discounts[companyId] || discounts[companyId] < discount) {
              discounts[companyId] = discount;
            }
          }
        });

        const companyCategories = company.comp_category?.split(',').map(Number) || [];
        const matchedStores = companiesData.filter((comp) => {
          const compCategories = comp.comp_category?.split(',').map(Number) || [];
          return comp.id !== company.id && compCategories.some((catId) => companyCategories.includes(catId));
        });

        const discountWithFallback = {};
        matchedStores.forEach((store) => {
          discountWithFallback[store.id] = discounts[store.id] || 'Not Available';
        });

        setTopDiscounts(discountWithFallback);
        setSimilarStores(matchedStores);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchCategoryCoupons = async () => {
      try {
        const response = await fetch('/api/category_coupon');
        if (!response.ok) throw new Error('Failed to fetch category coupons');

        const data = await response.json();
        setCategoryCoupons(data);
        setCategoryLoading(false);
      } catch (error) {
        console.error('Error fetching category coupons:', error);
        setError(error.message);
        setCategoryLoading(false);
      }
    };

    if (company) fetchSimilarStores();
    fetchCategoryCoupons();
  }, [company, offers]);

  if (!company) return <div><Loader/>.</div>;

  const sanitizeDescription = (description) => {
    // Regex to match and remove `body` styling only within <style> tags
    const bodyStyleRegex = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
    const updatedDescription = description.replace(bodyStyleRegex, (match) => {
      return match.replace(/body\s*{[^}]*}/gi, ''); // Remove body styles
    });

    // Sanitize the updated description with DOMPurify
    return DOMPurify.sanitize(updatedDescription);
  };



  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-lg space-y-6">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          {company?.com_title || 'SuperMade'}
        </h2>
        <div className="flex justify-center items-center my-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-5 w-5 sm:h-6 sm:w-6 ${i < Math.round(company?.comp_rating || 0) ? 'text-yellow-500' : 'text-gray-300'
                  }`}
              />
            ))}
            <span className="ml-2 text-gray-600 text-sm sm:text-base">
              {company?.comp_rating || 0} Rating
            </span>
          </div>
        </div>
        <p className="text-sm sm:text-base text-gray-500">
          {company?.comp_description || 'SuperMade discount codes are available for a limited time.'}
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h3 className="text-lg sm:text-xl font-semibold mb-4">
          {company?.com_title || 'SuperMade'} Discount Code Summary
        </h3>
        <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
          <li className="flex items-center">
            <FireIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mr-2" />
            <span>Total Offers: {offers?.length || 0}</span>
          </li>
          {offers.length > 0 && (
            <>
              <li className="flex items-center">
                <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mr-2" />
                <span>Verified: {offers.filter((offer) => offer.offer_isverify === 'Yes').length || 0}</span>
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mr-2" />
                <span>
                  Best Discount: {Math.max(...offers.map((offer) => {
                    const discountMatch = offer.offer_title.match(/^(\d+)%/);
                    return discountMatch ? parseInt(discountMatch[1], 10) : 0;
                  })) || 0}% code
                </span>
              </li>
            </>
          )}
        </ul>
        <p className="text-blue-600 mt-4 underline cursor-pointer">
          <a href={`${company.comp_affiliateLink}`} target="_blank" rel="noopener noreferrer">
            Coupon Codes &gt; {company?.com_title || 'SuperMade'} Discount Code
          </a>
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h3 className="text-lg sm:text-xl font-semibold mb-4">
          Stores with {company?.com_title || 'SuperMade'}-Like Promo Codes
        </h3>
        {loading ? (
          <div>Loading similar stores...</div>
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : !similarStores.length ? (
          <div>No similar stores found.</div>
        ) : (
          <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base">
            {similarStores.slice(0, 10).map((store) => (
              <a href={`/store/${store.web_slug}`} className='hover:text-blue-500'>
              <li key={store.id}>{store.com_title}</li>
              </a>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <div
          className="text-sm sm:text-base"
          dangerouslySetInnerHTML={{
            __html: company.comp_other_details && company.comp_other_details.length > 0
              ? sanitizeDescription(company.comp_other_details)
              : "No Details Available",
          }}
        />

      </div>
    </div>
  );
};

export default LeftSide;
