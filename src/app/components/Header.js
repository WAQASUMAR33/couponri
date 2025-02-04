'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [stores, setStores] = useState([]);
  const [recommendations, setRecommendations] = useState([]); // Filtered recommendations
  const router = useRouter();

  useEffect(() => {
    // Fetch all store data from the API when the component mounts
    const fetchStores = async () => {
      try {
        const res = await fetch('/api/company');
        if (res.ok) {
          const data = await res.json();
          setStores(data);
        } else {
          console.error('Error fetching store data:', res.statusText);
        }
      } catch (error) {
        console.error('Error fetching store data:', error);
      }
    };

    fetchStores();
  }, []);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchText(''); // Clear search text when closing search input
  };

  const handleSearchSubmit = () => {
    if (searchText.trim() !== '') {
      router.push(`/pages/search?query=${searchText}`);
      setIsSearchOpen(true); // Hide the search input after submission
    }
  };

  // useEffect(() => {
  //   if (searchText.trim() === '') {
  //     setRecommendations([]); // Clear recommendations if the search text is empty
  //     return;
  //   }

  //   const filtered = stores
  //     .filter((store) =>
  //       store.com_title.toLowerCase().startsWith(searchText.toLowerCase())
  //     )
  //     .map((store) => ({
  //       keyword: store.com_title, // Display the full title of the company
  //       id: store.id,
  //       slug: store.web_slug
  //     }));

  //   setRecommendations(filtered);
  // }, [searchText, stores]);

  useEffect(() => {
    if (searchText.trim() === '') {
      setRecommendations([]); // Clear recommendations if the search text is empty
      return;
    }

    const filtered = stores
      .filter((store) =>
        store.com_title.toLowerCase().startsWith(searchText.toLowerCase())
      )
      .map((store) => ({
        keyword: store.com_title, // Display the full title of the company
        id: store.id,
        slug: store.web_slug, // Ensure this is included
      }));

    console.log('Filtered Recommendations:', filtered); // Debug log
    setRecommendations(filtered);
  }, [searchText, stores]);


  return (
    <header className="bg-white  py-2 border-b-2 text-black px-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/">
            <Image
                 width={1000}
                  height={1000}
                  // placeholder="data:image/jpeg;base64,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"
           src="/logo/logo2.jpg" alt="Logo" className="md:w-40 md:py-1 w-24" />
          </a>
        </div>

        {/* Navigation for Desktop */}
        <nav className="hidden lg:flex text-md space-x-8  font-semibold">
          <a href="/blog" className="hover:text-blue-700">
            Blog
          </a>
          {/* <a href="/blogcategories" className=" hover:text-blue-700">
            Blog Categories
          </a> */}
          <a href="/store" className=" hover:text-blue-700">
            Stores
          </a>
          <a href="/categories" className=" hover:text-blue-700">
            Categories
          </a>
          <a href="/pages/alloffers" className="hover:text-blue-700">
            Coupons
          </a>
          <a href="/pages/submitoffer" className="hover:text-blue-700">
            Submit Offer
          </a>
        </nav>

        {/* Search Icon and Input for Desktop */}
        <div className="hidden lg:flex items-center">
          <div className="flex items-center">
            {isSearchOpen ? (
              <div className="relative">
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="border border-gray-300 rounded-lg py-1 px-3"
                  placeholder="Search..."
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                />
                <button
                  onClick={handleSearchSubmit}
                  className="absolute right-0 top-0 h-full px-3 text-black"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>

                {/* Recommendations Dropdown */}
                {recommendations.length > 0 && (
                    <ul className="absolute left-0 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg max-h-48 overflow-y-auto z-50">
                      {recommendations.map((rec, index) => (
                        <li key={index} className="px-3 py-2 hover:bg-gray-100">
                          <a
                            href={rec.slug ? `https://www.couponri.com/store/${rec.slug}` : '#'}
                            className="block text-black hover:text-blue-700"
                          >
                            {rec.keyword}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            ) : (
              <MagnifyingGlassIcon
                className="h-5 w-5 text-black cursor-pointer hover:text-blue-700"
                onClick={handleSearchToggle}
              />
            )}
          </div>
          <div className="flex space-x-3 ml-4">
            <a href="https://www.facebook.com/couponri/" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-black hover:text-blue-700" />
            </a>
            <a href="https://x.com/CouponRi" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-black hover:text-blue-700" />
            </a>
            <a href="https://www.instagram.com/coupon_ri/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-black hover:text-blue-700" />
            </a>
            <a href="https://youtube.com/@couponri" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="text-black hover:text-blue-700" />
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-black focus:outline-none"
        >
          &#9776; {/* Hamburger icon */}
        </button>
      </div>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 z-50 right-0 h-full w-64 bg-white shadow-lg transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={toggleMenu} className="text-black focus:outline-none">
            &times; {/* Close icon */}
          </button>
        </div>
        <nav className="p-4 space-y-4">
          <a href="/blog" className="block hover:text-blue-700">
            Blog
          </a>
          {/* <a href="/blogcategories" className="block hover:text-blue-700">
            Blog Categories
          </a> */}
          <a href="/store" className="block hover:text-blue-700">
            Stores
          </a>
          <a href="/categories" className="block hover:text-blue-700">
            Categories
          </a>
          <a href="/pages/alloffers" className="block hover:text-blue-700">
            Coupons
          </a>
          <a href="/pages/submitoffer" className="block hover:text-blue-700">
            Submit Offer
          </a>

          {/* Search Option for Mobile */}
          <div className="flex flex-col items-center gap-8 pt-4 border-t mt-4">
            <div className="flex items-center">
              {isSearchOpen ? (
                <div className="relative">
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="border border-gray-300 rounded-lg py-1 px-3"
                    placeholder="Search..."
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                  />
                  <button
                    onClick={handleSearchSubmit}
                    className="absolute right-0 top-0 h-full px-3 text-black"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5" />
                  </button>

         
                  {/* Recommendations Dropdown */}
                  {recommendations.length > 0 && (
                    <ul className="absolute left-0 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg max-h-48 overflow-y-auto z-50">
                      {recommendations.map((rec, index) => (
                        <li key={index} className="px-3 py-2 hover:bg-gray-100">
                          <a
                            href={rec.slug ? `https://www.couponri.com/store/${rec.slug}` : '#'}
                            className="block text-black hover:text-blue-700"
                          >
                            {rec.keyword}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}


                </div>
              ) : (
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-black cursor-pointer hover:text-blue-700"
                  onClick={handleSearchToggle}
                />
              )}
            </div>
            <div className="flex space-x-10 ml-4 text-2xl">
              <a href="https://www.facebook.com/couponri/" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="text-black hover:text-blue-700" />
              </a>
              <a href="https://youtube.com/@couponri" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-black hover:text-blue-700" />
              </a>
              <a href="https://www.instagram.com/coupon_ri/" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-black hover:text-blue-700" />
              </a>
              <a href="https://youtube.com/@couponri" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="text-black hover:text-blue-700" />
              </a>
            </div>
          </div>

        </nav>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </header>
  );
}
