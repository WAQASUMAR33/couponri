import React from "react";
import CategoryCouponDetail from './MainPage';

// Await `params` in the function parameter destructuring
export async function generateMetadata({ params }) {
  const baseUrl = 'https://www.couponri.com';
  
  try {
    // Avoid accessing params synchronously; instead, destructure it properly
    const { id } = params; 
    const res = await fetch(`${baseUrl}/api/category_coupon/${id}`);
    
    if (!res.ok) {
      console.error(`Error: ${res.status} ${res.statusText}`);
      throw new Error('Failed to fetch category coupon data');
    }

    const categorycoupon = await res.json();
    console.log("Meta data is : ", categorycoupon);

    const canonicalUrl = `${baseUrl}/categorycoupons/${id}`;
    return {
      title: categorycoupon.meta_title,
      description: categorycoupon.meta_description,
      keywords: categorycoupon.meta_focusKeyword,
      alternates: {
        canonical: canonicalUrl,
      },
    };
  } catch (error) {
    console.error('Error fetching categorycoupon data:', error);
    return {
      title: 'CouponRI - Category Coupons',
      description: 'Explore the best coupons available',
      alternates: {
        canonical: `${baseUrl}/categorycoupons`,
      },
    };
  }
}

export default function Home({ params }) {
  const { id } = params; // Destructure params properly
  return (
    <>
      <CategoryCouponDetail id={id} />
    </>
  );
}
