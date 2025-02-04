import React from "react";
import BlogDetailPage from "./mainpage"; // Ensure you are importing the correct component


export async function generateMetadata({ params }) {
  const baseUrl = 'https://www.couponri.com';
  // const baseUrl = 'http://localhost:3000';
  console.log("id is :",params.id);
  
  try {
    const res = await fetch(`${baseUrl}/api/blogcategoryslug/${params.id}`);
   
    
    // if (!res.ok) {
    //   consoleaerror(`Error: ${res.status} ${res.statusText}`);
    //   throw new Error('Failed to fetch blog data');
    // }

    const blog = await res.json();
    console.log("Result: ",res);
   
    // Return metadata with the fetched blog title and description
    const canonicalUrl = `${baseUrl}/blogcategories/${params.id}`;
    return {
      title: blog.meta_title || 'CouponRI',
      description: blog.meta_description || 'Best coupon website',
      keywords: blog.meta_focusKeyword || "Couponri blogs keyword",
      alternates: {
        canonical: canonicalUrl,
      },
    };
  } catch (error) {
    console.error('Error fetching blog data:', error);

    // Provide fallback metadata in case of an error
    return {
      title: 'CouponRI',
      description: 'Best coupon website',
      keywords: 'Couponri blogs keyword',
      alternates: {
        canonical: `${baseUrl}/blogcategories`,
      },
    };
  }
}

export default function Home({ params }) {
  return (
    <>
      <BlogDetailPage id={params.id} />
    </>
  );
}
