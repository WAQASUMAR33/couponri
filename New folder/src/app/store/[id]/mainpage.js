'use client';
import React, { useEffect, useState } from "react";
import RightSide from "../../user/components/RightSide";
import LeftSide from "../../user/components/LeftSide";
import CouponHeader from "../../user/components/CouponHeader";
import FaqComponent from "../../user/components/FaqComponent";
import CustomerRootLayout from "../../user/layout";
import OffersTable from "../../user/components/CouponTable";
import SimilarStores from "../components/SimilarStores";
import DOMPurify from "dompurify";
import BreadCrumbs from "../../components/BreadCrumbs";

const CompanyDetail = ({ id }) => {
  const [company, setCompany] = useState([]);
  const [offers, setOffers] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loadingCompany, setLoadingCompany] = useState(true);
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [loadingFaqs, setLoadingFaqs] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [jsonLd,setjsonLd] = useState([])

  // Detect if screen is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // mobile if screen width is less than 768px
    };

    handleResize(); // Call on initial render
    window.addEventListener("resize", handleResize); // Add resize listener
    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyResponse = await fetch(`/api/onecompany/${id}`);
        if (!companyResponse.ok) {
          throw new Error("Failed to fetch company data");
        }
        const companyData = await companyResponse.json();
        setCompany(companyData);
        const jsonLdmain = {
          '@context': 'https://schema.org',
          '@type': 'Store',
          title: companyData.com_title,
          image: `https://m3xtrader.com/coupon/uploads/${companyData.comp_logo}` ,
          description: companyData.comp_description,
        }
        setjsonLd(jsonLdmain);
        setLoadingCompany(false);
        const offersResponse = await fetch(`/api/gettingoffers/${companyData.id}`);
        if (!offersResponse.ok) {
          throw new Error("Failed to fetch offers data");
        }
        const offersData = await offersResponse.json();
        setOffers(offersData);
        setLoadingOffers(false);

        const faqsResponse = await fetch(`/api/gettingfaqs/${companyData.id}`);
        if (!faqsResponse.ok) {
          throw new Error("Failed to fetch FAQs data");
        }
        const faqsData = await faqsResponse.json();
        setFaqs(faqsData);
        setLoadingFaqs(false);
      } catch (error) {
        console.error("Error fetching data:", error);
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

  const breadcrumbs = [
    {name:"Home", url: '/'},
    {name: "Stores",url:"/store"},
    {name: `${company.com_title?.substring(0,50)} `,url:`/store/${company.web_slug}`},
  ]

  return (
    <CustomerRootLayout>
       <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    {company&&(<>
      <BreadCrumbs breadCrumbs={breadcrumbs}/>
    </>)}
    
      <div className="min-h-screen bg-gray-100 p-4 ">
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
          {/* Left Side only on non-mobile screens */}
          {!isMobile && (
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
          )}

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

        {isMobile && (
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
          )}

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
        <div className="bg-white md:p-20 p-6 rounded text-lg m-4">
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
            className="text-sm "
            dangerouslySetInnerHTML={{
              __html: company.comp_details && company.comp_details.length > 0
                ? sanitizeDescription(company.comp_details)
                : "No Details Available",
            }}
          />
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
