import React from "react";
import Blog from "./Mainpage";

export async function generateMetadata({ params }) {
  const baseUrl = 'https://www.couponri.com'; 
    return {
      title: 'Saving Tips, Offers & Shopping Guides - Blog | Couponri',
      description: 'Discover expert saving tips, shopping guides, and the latest offers on the Couponri blog. Learn how to shop smarter and save big on every purchase!',
      // keywords: 'CouponRI blogs keyword',
      alternates: {
        canonical: `${baseUrl}/blog`,
      },
      openGraph: {
        title: "Saving Tips, Offers & Shopping Guides - Blog | Couponri",
        description: "Explore all your favorite brands in one place at Couponri. Find exclusive coupons, promo codes, and deals for top online stores. Save more on every purchase!",
        url: 'https://www.couponri.com/blog/',
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
        title: "Saving Tips, Offers & Shopping Guides - Blog | Couponri",
        description: "Explore all your favorite brands in one place at Couponri. Find exclusive coupons, promo codes, and deals for top online stores. Save more on every purchase!",
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
     <Blog params={params}/>
    </>
  );
}
