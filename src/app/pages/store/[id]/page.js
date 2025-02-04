import React from "react";
import CompanyDetail from "./mainpage";

export async function generateMetadata({ params }) {
  // Get the base URL from environment variables
  const baseUrl = 'https://www.couponri.com'; 

  // const baseUrl = 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/onecompany/${params.id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch company data');
  }
  const result = await res.json();
  const company  = result;
  console.log("This is company",company);
  console.log("-------------------------------------------------------------------------------------");
  console.log("meta title", company.meta_title,"company keyword", company.meta_focusKeyword);

  // Return metadata with the fetched company title and description
  return {
    title: company.meta_title || 'CouponRI',
    description: company.meta_description || 'Best coupon website',
    keywords: company.meta_focusKeyword || 'keywords',
  };
}


export default function Home({ params }) {
  return (
    <>
      <CompanyDetail id={params.id} />
    </>
  );
}
