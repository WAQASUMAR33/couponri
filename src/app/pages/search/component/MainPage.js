
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'; // Import useSearchParams from Next.js
import CompanyCard from "./companycard";
import CustomerRootLayout from "../../../user/layout";
import Loader from "../../../../app/Loader";

export default function MainSearchPage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams(); // Use useSearchParams hook to get search params from the URL

  const searchQuery = searchParams.get('query') || ''; // Get the search query from URL or default to an empty string

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/searchStore?query=${searchQuery}`);
        if (response.ok) {
          const data = await response.json();
          setStores(data); // Store the fetched data
        } else {
          setError('Failed to fetch stores');
        }
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchStores(); // Fetch stores when query is present
    } else {
      setStores([]); // Clear stores if no query is present
    }
  }, [searchQuery]); // Dependency on searchQuery ensures it fetches new stores when the query changes

  if (loading) {
    return <p className="text-center text-xl"><Loader/></p>;
  }

  if (error) {
    return <p className="text-center text-xl text-red-600">{error}</p>;
  }

  return (
    <CustomerRootLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Search Results for "{searchQuery}"
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stores.length > 0 ? (
            stores.map((store) => (
              <CompanyCard
                key={store.id}
                company={store}
                topDiscount={store.topDiscount || 'Not Available'}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-lg">No stores found</p>
          )}
        </div>
      </div>
    </CustomerRootLayout>
  );
}
