'use client';
import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import Image from "next/image";
export default function Footer() {
  const [categories, setCategories] = useState([]);
  const [trendingOffers, setTrendingOffers] = useState([]);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category_coupon'); // Adjust the API endpoint as necessary
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchTrendingOffers = async () => {
      try {
        const response = await fetch('/api/offers'); // Adjust the API endpoint as necessary
        if (!response.ok) {
          throw new Error('Failed to fetch trending offers');
        }
        const data = await response.json();
        console.log("Footer data: ",data);
        const filtereddata = data
        .filter(offer => offer.offer_status === 'Best Selling')
        console.log("Filtered data: ",filtereddata);
        setTrendingOffers(filtereddata);
      } catch (error) {
        console.error('Error fetching trending offers:', error);
      }
    };
    
    fetchCategories();
    fetchTrendingOffers();
  }, []);

  return (
    <footer className="bg-white text-gray-700 pt-12">
      <div className="container mx-auto px-6">
        {/* Footer Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
          {/* Logo and Description */}
          <div className="md:w-1/2 flex flex-col items-start justify-start ">
            <img
                //  width={1000}
                //   height={1000}
                //   placeholder="data:image/jpeg;base64,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"
           src="/logo/logo2.jpg" alt="CouponRI" className=" h-16 " />
            <p className="text-gray-600 text-justify">
            CouponRI helps you save money by providing and listing the most current promo codes, coupon codes, and discount deals available for top online retailers. Should you make a purchase using the discount links or voucher codes provided by us, we earn a commission. For your further assurance of saving maximum, we will be obliged if you check the validity of any coupon or promo code on the website of the retailer where you intend to make the purchase. For more discounts, visit our blog for expert shopping tips, hot sales, and top product recommendations.
            </p>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full md:w-3/4 mt-2">
            {/* About CouponRI */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Site Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/pages/aboutus" className="text-gray-600 hover:text-black">About Us</a>
                </li>
                <li>
                  <a href="/pages/contactus" className="text-gray-600 hover:text-black">Contact Us</a>
                </li>
                <li>
                  <a href="/pages/submitoffer" className="text-gray-600 hover:text-black">Submit Coupon</a>
                </li>
                <li>
                  <a href="/blog" className="text-gray-600 hover:text-black">Blogs</a>
                </li>
                <li>
                  <a href="/store" className="text-gray-600 hover:text-black">Stores</a>
                </li>
                <li>
                  <a href="/pages/privacypolicy" className="text-gray-600 hover:text-black">Privacy Policy</a>
                </li>
              </ul>
            </div>

             {/* Browse Coupons */}
             <div className="space-y-4">
              <h3 className="text-xl font-bold">Special Offers</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <a href={`/pages/categorycoupons/${category.web_slug}`} className="text-gray-600 hover:text-black">
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Special Discounts */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Top Coupons</h3>
              <ul className="space-y-2">
                
                  <li >
                    <a href={`/category/apparel-coupons`} className="text-gray-600 hover:text-black">
                     Apparel
                    </a>
                  </li>
                  <li >
                    <a href={`/category/Footwear`} className="text-gray-600 hover:text-black">
                     Shoes
                    </a>
                  </li>
                  <li >
                    <a href={`/category/Digital-Services`} className="text-gray-600 hover:text-black">
                     Digital Services
                    </a>
                  </li>
                  <li >
                    <a href={`/category/beauty-and-personal-care`} className="text-gray-600 hover:text-black">
                     Health And Beauty
                    </a>
                  </li>
                  <li >
                    <a href={`/category/Electronics`} className="text-gray-600 hover:text-black">
                     Electronics
                    </a>
                  </li>
                  <li >
                    <a href={`/category/Home-and-Garden`} className="text-gray-600 hover:text-black">
                     Home Decor
                    </a>
                  </li>
                  <li >
                    <a href={`/category/beauty-and-personal-care`} className="text-gray-600 hover:text-black">
                     Health & Beauty
                    </a>
                  </li>
                
              </ul>

              <div className="flex space-x-8 mt-6">
                {/* Social Media Icons using React Icons */}
                <a href="https://www.facebook.com/couponri/" aria-label="Facebook" className="text-gray-700 hover:text-black">
                  <FaFacebookF className="w-6 h-6" />
                </a>
                <a href="https://x.com/CouponRi" aria-label="Twitter" className="text-gray-700 hover:text-black">
                  <FaTwitter className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/coupon_ri/" aria-label="Instagram" className="text-gray-700 hover:text-black">
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a href="https://youtube.com/@couponri" aria-label="Instagram" className="text-gray-700 hover:text-black">
                  <FaYoutube className="w-6 h-6" />
                </a>
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </footer>
  );
}
