import React from "react";
import CategoryPage from "./Mainpage";

export async function generateMetadata({ params }) {
  const baseUrl = 'https://www.couponri.com'; // Base URL for API calls
    return {
      title: 'Explore Categories - Best Coupons & Deals by Category | Couponri',
      description: 'Browse all shopping categories at Couponri and find the best coupons, promo codes, and deals. Save on every category, from fashion to electronics and more!',
      // keywords: 'CouponRI blogs keyword',
      alternates: {
        canonical: `${baseUrl}/categories`,
      },
      openGraph: {
        title: "Explore Categories - Best Coupons & Deals by Category | Couponri",
        description: "Browse all shopping categories at Couponri and find the best coupons, promo codes, and deals. Save on every category, from fashion to electronics and more!",
        url: 'https://www.couponri.com/categories',
        siteName: "CouponRi",
        type: 'website',
        images: [
          {
            url: 'https://www.couponri.com/logo/logo2.jpg',
            secureUrl: 'https://www.couponri.com/logo/logo2.jpg',
            alt: 'Preview image for couponri',
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        site: '@CouponRi',
        title: "Explore Categories - Best Coupons & Deals by Category | Couponri",
        description: "Browse all shopping categories at Couponri and find the best coupons, promo codes, and deals. Save on every category, from fashion to electronics and more!",
        creator: '@CouponRi',
        images: {
          url: 'https://www.couponri.com/logo/logo2.jpg',
          alt: 'Preview image for CouponRi',
        }
      },
    }
  }

export default function MainStorePage({ params }) {
  return (
    <>
     <CategoryPage params={params}/>
    </>
  );
}

   