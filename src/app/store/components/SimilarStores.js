import React, { useEffect, useState } from 'react';
import CompanyCard from '../../pages/stores/components/companycard';

const SimilarStores = ({ company }) => {
  const [similarStores, setSimilarStores] = useState([]);
  const [topDiscounts, setTopDiscounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSimilarStoresAndOffers = async () => {
      try {
        const [companiesResponse, offersResponse] = await Promise.all([
          fetch('/api/company'),
          fetch('/api/offers'),
        ]);

        if (!companiesResponse.ok || !offersResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const companiesData = await companiesResponse.json();
        const offersData = await offersResponse.json();

        const discounts = {};
        offersData.forEach((offer) => {
          const discountMatch = offer.offer_title.match(/^(\d+)%/);
          if (discountMatch) {
            const discount = parseInt(discountMatch[1], 10);
            const companyId = offer.comp_id;
            if (!discounts[companyId] || discounts[companyId] < discount) {
              discounts[companyId] = discount;
            }
          }
        });

        // Parse the current company's categories
        const companyCategories = company.comp_category.split(',').map((cat) => cat.trim());

        const matchedStores = companiesData.filter((comp) => {
          // Parse the categories of the other stores
          const storeCategories = comp.comp_category.split(',').map((cat) => cat.trim());

          // Check if any of the store's categories match the current company's categories
          const hasMatchingCategory = storeCategories.some((storeCat) =>
            companyCategories.includes(storeCat)
          );

          return comp.id !== company.id && hasMatchingCategory;
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

    fetchSimilarStoresAndOffers();
  }, [company]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        Loading similar stores...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-700">
        {`Error: ${error}`}
      </div>
    );
  }

  if (!similarStores.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-yellow-100 text-yellow-700">
        No similar stores found.
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl sm:text-4xl font-bold mb-6 text-center">
        Stores Similar to {company.com_title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
  {similarStores.slice(0, 6).map((store) => (
    <div key={store.id} className="p-4">
      <CompanyCard company={store} topDiscount={topDiscounts[store.id]} />
    </div>
  ))}
</div>

    </div>
  );
};

export default SimilarStores;
