'use client';
import { useEffect, useState } from 'react';
import Image from "next/image";

export default function AdsBanner() {
  const [adsBannerUrl, setAdsBannerUrl] = useState(null);
  const [adsBannerlink, setAdsBannerlink] = useState(null);
  

  useEffect(() => {
    const fetchAdsBanner = async () => {
      try {
        const response = await fetch('/api/banners');
        if (!response.ok) {
          throw new Error('Failed to fetch ads banner');
        }
        const banners = await response.json();
        
        // Assuming you want the first banner's adsbanner URL
        if (banners.length > 0) {
          setAdsBannerUrl(banners[0].adsbanner);
          setAdsBannerlink(banners[0].bannerurl);
        }
      } catch (error) {
        console.error('Error fetching ads banner:', error);
      }
    };

    fetchAdsBanner();
  }, []);

  return (
    <div className="h-[400px] bg-gray-400 flex justify-center items-center">
      {adsBannerUrl ? (
        <a href={adsBannerlink} className='h-full w-full'>
        <img
                   src={adsBannerUrl} alt="Ads Banner" className="h-full w-full object-fill" />
        </a>
      ) : (
        <h1 className="text-6xl font-bold text-white">Ads Banner</h1>
      )}
    </div>
  );
}
