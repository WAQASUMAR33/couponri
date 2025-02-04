'use client'
import React, { useState, useEffect } from 'react';
import CustomerRootLayout from "./user/layout";
import BlogSlider from "./components/BlogSlider";
import BlogCategorySlider from "./components/CategoryBlogSlider";
import AdsBanner from "./components/AdsBanner";
import TopTrendingOffers from "./components/TopTrendingOffers";
import BlogSlider2 from "./components/BlogSlider2";
import HotOffers from "./components/HotOffers";
import BlogSection from "./components/BlogSection";
import FeaturedCategories from "./components/TopCategories";
import FAQSection from "./components/FAQsection";
import LatestBlogPage from "./components/LatestBlogs";
import SubscribeSection from "./components/SubcribeSection";
import CouponCategories from "./components/CouponCategories";
import FeaturedStores from './components/FeaturedStores';
import Loader from './Loader'
async function fetchBlogs() {
  const response = await fetch('/api/blog');
  

  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }
  
  const data = await response.json();
  return data;
}

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [jsonLd,setjsonLd] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadBlogs() {
      try {
        const blogsData = await fetchBlogs();
        setBlogs(blogsData);
        setLoading(false)
        const jsonLdmain = {
          '@context': 'https://schema.org',
          '@type': 'CouponRi',
          name: 'Shop by Brand - Coupons & Deals for Top Online Stores | Couponri',
          image: 'https://www.couponri.com/logo/logo2.jpg',
          description: 'Explore all your favorite brands in one place at Couponri. Find exclusive coupons, promo codes, and deals for top online stores. Save more on every purchase!',
        }
        setjsonLd(jsonLdmain);
        
        console.log("All blogs are: ", blogsData);

      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    }
    loadBlogs();
  }, []);

  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  useEffect(() => {
    const fetchblogslider = async () => {
      try {
        const response = await fetch('/api/banners');
        if (!response.ok) {
          throw new Error('Failed to fetch slider');
        }
        const banners = await response.json();

        // Assuming you want the first banner's adsbanner URL
        if (banners.length > 0) {
          setSlider1(banners[0].blogslider1);
          setSlider2(banners[0].blogslider2)
        }
      } catch (error) {
        console.error('Error fetching slider:', error);
      }
    };

    fetchblogslider();
  }, []);

  if(loading){
    return <div className='h-screen'><Loader/></div>
  }

  return (
    <CustomerRootLayout>
      <div
        className="max-h-screen "
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/bluebg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <BlogSlider blogs={blogs} />
      </div>
      <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
      <FeaturedStores />
      <BlogCategorySlider category={slider1} blogs={blogs} />
      <AdsBanner />
      <TopTrendingOffers />
      <BlogSlider2 blogs={blogs} />
      <HotOffers />
      <BlogSection blogs={blogs} title={slider2} />
      <FeaturedCategories />
      <FAQSection />
      <LatestBlogPage />
      <SubscribeSection />
      <CouponCategories />
    </CustomerRootLayout>
  );
}
