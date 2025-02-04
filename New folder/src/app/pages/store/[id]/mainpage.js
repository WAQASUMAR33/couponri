'use client';

import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import RightSide from '../../../user/components/RightSide';
import LeftSide from '../../../user/components/LeftSide';
import CouponHeader from '../../../user/components/CouponHeader';
import FaqComponent from '../../../user/components/FaqComponent';
import CustomerRootLayout from '../../../user/layout';
import OffersTable from '../../../user/components/CouponTable';
import SimilarStores from '../../../store/components/SimilarStores';

const CompanyDetail = ({ id }) => {
  const [company, setCompany] = useState(null);
  const [offers, setOffers] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loadingCompany, setLoadingCompany] = useState(true);
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [loadingFaqs, setLoadingFaqs] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch company data
        const companyResponse = await fetch(`/api/onecompany/${id}`);
        if (!companyResponse.ok) {
          throw new Error('Failed to fetch company data');
        }
        const companyData = await companyResponse.json();
        setCompany(companyData);
        setLoadingCompany(false);

        // Fetch offers related to this company
        const offersResponse = await fetch(`/api/gettingoffers/${companyData.id}`);
        if (!offersResponse.ok) {
          throw new Error('Failed to fetch offers data');
        }
        const offersData = await offersResponse.json();
        setOffers(offersData);
        setLoadingOffers(false);

        // Fetch FAQs related to this company
        const faqsResponse = await fetch(`/api/gettingfaqs/${companyData.id}`);
        if (!faqsResponse.ok) {
          throw new Error('Failed to fetch FAQs data');
        }
        const faqsData = await faqsResponse.json();
        setFaqs(faqsData);
        setLoadingFaqs(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoadingCompany(false);
        setLoadingOffers(false);
        setLoadingFaqs(false);
      }
    };

    fetchData();
  }, [id]);

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
    <CustomerRootLayout>
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
        {/* Header Section */}
        {loadingCompany ? (
          <div className="animate-pulse">
            <div className="h-36 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        ) : (
          <CouponHeader company={company} />
        )}

        {/* Main Content Section */}
        <div className="container mx-auto flex flex-col md:flex-row gap-4 sm:gap-6">
          {/* Left Side */}
          <div className="w-full md:w-1/3 p-4 bg-white shadow-md rounded-lg">
            {loadingCompany || loadingOffers ? (
              <div className="animate-pulse">
                <div className="h-6 bg-gray-300 rounded mb-4 w-2/3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ) : (
              <LeftSide company={company} offers={offers} />
            )}
          </div>

          {/* Right Side */}
          <div className="w-full md:w-2/3 p-4 bg-white shadow-md rounded-lg">
            {loadingOffers ? (
              <div className="animate-pulse">
                <div className="h-6 bg-gray-300 rounded mb-4 w-1/2"></div>
                <div className="space-y-2">
                  {[...Array(3)].map((_, idx) => (
                    <div key={idx} className="h-4 bg-gray-300 rounded"></div>
                  ))}
                </div>
              </div>
            ) : (
              <RightSide offers={offers} company={company} />
            )}
          </div>
        </div>

        {/* Offers Table */}
        <div className="my-4 bg-white p-4 shadow-md rounded-lg">
          {loadingOffers ? (
            <div className="animate-pulse">
              <div className="h-6 bg-gray-300 rounded mb-4 w-1/3"></div>
              <div className="space-y-2">
                {[...Array(5)].map((_, idx) => (
                  <div key={idx} className="h-4 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          ) : (
            <OffersTable offers={offers} company={company} />
          )}
        </div>

        {/* Company Details */}
        <div className="bg-white p-10 rounded text-xl m-4">
          {loadingCompany ? (
            <div className="animate-pulse">
              <div className="h-6 bg-gray-300 rounded mb-4 w-1/4"></div>
              <div className="space-y-2">
                {[...Array(3)].map((_, idx) => (
                  <div key={idx} className="h-4 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          ) : (
            <div
              className="md:text-lg text-sm"
              dangerouslySetInnerHTML={{ __html: sanitizeDescription(company.comp_details) }}
            ></div>
          )}
        </div>

        {/* Similar Stores */}
        <div className="my-4 bg-white p-4 shadow-md rounded-lg">
          {loadingCompany ? (
            <div className="animate-pulse">
              <div className="h-6 bg-gray-300 rounded mb-4 w-1/2"></div>
              <div className="space-y-2">
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} className="h-4 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          ) : (
            <SimilarStores company={company} />
          )}
        </div>

        {/* FAQs Section */}
        <div className="mt-8 bg-white p-4 sm:p-6 shadow-md rounded-lg">
          {loadingFaqs ? (
            <div className="animate-pulse">
              <div className="h-6 bg-gray-300 rounded mb-4 w-1/2"></div>
              <div className="space-y-2">
                {[...Array(4)].map((_, idx) => (
                  <div key={idx} className="h-4 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          ) : (
            <FaqComponent faqs={faqs} companyName={company.com_title} />
          )}
        </div>
      </div>
    </CustomerRootLayout>
  );
};

export default CompanyDetail;
