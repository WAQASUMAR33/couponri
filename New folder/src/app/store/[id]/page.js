import React from "react";
import CompanyDetail from "./mainpage";
import ErrorPage from "./ErrorPage";

export async function generateMetadata({ params }) {
  const baseUrl = "https://www.couponri.com/";
  console.log("Meta data for: ", params.id);

  try {
    console.log("Meta data is going to fetch....");
    const res = await fetch(`${baseUrl}/api/onecompany/${params.id}`);

    if (!res.ok) {
      console.error(`Error: ${res.status} ${res.statusText}`);
      // Return fallback metadata and log the error
      throw new Error(`Company not found: ${params.id}`);
    }

    const result = await res.json();
    const company = result;
    console.log("Company is: ", company);

    const canonicalUrl = `${baseUrl}/store/${params.id}`;
    return {
      title: company.meta_title || "CouponRI",
      description: company.meta_description || "Best coupon website",
      keywords: company.meta_focusKeyword || "Couponri blogs keyword",
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: company.meta_title,
        description: company.meta_description,
        url: `https://www.couponri.com/store/${company.web_slug}`,
        siteName: "CouponRi",
        type: 'website',
        images: [
          {
            url: `https://m3xtrader.com/coupon/uploads/${company.comp_logo}`,
            secureUrl: `https://m3xtrader.com/coupon/uploads/${company.comp_logo}`,
            alt: company.meta_title,
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        site: '@CouponRi',
        title: company.meta_title,
        description: company.meta_description,
        creator: '@CouponRi',
        images: {
          url: `https://m3xtrader.com/coupon/uploads/${company.comp_logo}`,
          alt: company.meta_title,
        }
      },
    };
  } catch (error) {
    console.error("Error fetching company data:", error);

    // Fallback metadata for error case
    return {
      title: "CouponRI",
      description: "Best coupon website",
      keywords: "Couponri blogs keyword",
      alternates: {
        canonical: `${baseUrl}/store`,
      },
      
    };
  }
}

export default async function Home({ params }) {
  const baseUrl = "https://www.couponri.com/";
  let company = null;

  try {
    console.log("Fetching company details for:", params.id);
    const res = await fetch(`${baseUrl}/api/onecompany/${params.id}`);

    if (!res.ok) {
      console.error(`Error: ${res.status} ${res.statusText}`);
      if (res.status === 404) {
        return <ErrorPage />; // Render 404 page if the company is not found
      }
      throw new Error("Failed to fetch company data");
    }

    company = await res.json();
  } catch (error) {
    console.error("Error fetching company data:", error);
    return <ErrorPage />; // Render 404 page on other errors
  }

  return (
    <>
      <CompanyDetail id={params.id} company={company} />
    </>
  );
}
