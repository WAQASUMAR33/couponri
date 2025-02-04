'use client'
import React, { useState, useEffect } from 'react';
import CustomerRootLayout from '../../user/layout';
import BlogSlider from "../../components/BlogSlider";
import BlogCategorySlider from "../../components/CategoryBlogSlider";
import AdsBanner from "../../components/AdsBanner";
import TopTrendingOffers from "../../components/TopTrendingOffers";
import BlogSlider2 from "../../components/BlogSlider2";
import HotOffers from "../../components/HotOffers";
import BlogSection from "../../components/BlogSection";
import FeaturedCategories from "../../components/TopCategories";
import FAQSection from "../../components/FAQsection";
import LatestBlogPage from "../../components/LatestBlogs";
import SubscribeSection from "../../components/SubcribeSection";
import CouponCategories from "../../components/CouponCategories";
import FeaturedStores from "../../components/FeaturedStores"

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

  useEffect(() => {
    async function loadBlogs() {
      try {
        const blogsData = await fetchBlogs();
        setBlogs(blogsData);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    }
    loadBlogs();
  }, []);

  return (
    <CustomerRootLayout>
   <div 
   className=" max-h-screen"
   style={{
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/bluebg.png')`,
    backgroundSize: 'cover',  // Ensures the image covers the entire background
    backgroundPosition: 'center',  // Centers the image
  }}
>
  <BlogSlider blogs={blogs} />
</div>
      <FeaturedStores />
      <BlogCategorySlider category="Money Saving" blogs={blogs} />
      <AdsBanner />
      <TopTrendingOffers />
      <BlogSlider2 blogs={blogs} />
      <HotOffers />
      <BlogSection blogs={blogs} title="Technology" />
      <FeaturedCategories />
      <FAQSection />
      <LatestBlogPage />
      <SubscribeSection />
      <CouponCategories />
    </CustomerRootLayout>
  );
}
