import React from "react";
import Home from "./MainPage";

export async function generateMetadata({ params }) {
  const baseUrl = 'https://www.couponri.com'; // Base URL for API calls
    return {
      title: 'Shop by Brand - Coupons & Deals for Top Online Stores | Couponri',
      description: 'Explore all your favorite brands in one place at Couponri. Find exclusive coupons, promo codes, and deals for top online stores. Save more on every purchase!',
      // keywords: 'CouponRI blogs keyword',
      alternates: {
        canonical: `${baseUrl}`,
      },
      openGraph: {
        title: "Shop by Brand - Coupons & Deals for Top Online Stores | Couponri",
        description: "Explore all your favorite brands in one place at Couponri. Find exclusive coupons, promo codes, and deals for top online stores. Save more on every purchase!",
        url: 'https://www.couponri.com/',
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
        title: "Shop by Brand - Coupons & Deals for Top Online Stores | Couponri",
        description: "Explore all your favorite brands in one place at Couponri. Find exclusive coupons, promo codes, and deals for top online stores. Save more on every purchase!.",
        creator: '@CouponRi',
        images: {
          url: 'https://www.couponri.com/logo/logo2.jpg',
          alt: 'Preview image for CouponRi',
        }
      },
    }
  }

export default function MainWebsitePage() {
  return (
    <>
     <Home />
    </>
  );
}

   