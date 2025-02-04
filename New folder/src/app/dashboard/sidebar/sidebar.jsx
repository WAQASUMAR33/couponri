"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; // Dynamically import icons to reduce initial load
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaAd } from 'react-icons/fa';
import Image from "next/image";

const FaSignOutAlt = dynamic(() => import('react-icons/fa').then((mod) => mod.FaSignOutAlt));
const FaChevronDown = dynamic(() => import('react-icons/fa').then((mod) => mod.FaChevronDown));
const FaBuilding = dynamic(() => import('react-icons/fa').then((mod) => mod.FaBuilding));
const FaTags = dynamic(() => import('react-icons/fa').then((mod) => mod.FaTags));
const FaBlog = dynamic(() => import('react-icons/fa').then((mod) => mod.FaBlog));
const FaCog = dynamic(() => import('react-icons/fa').then((mod) => mod.FaCog));
const FaQuestionCircle = dynamic(() => import('react-icons/fa').then((mod) => mod.FaQuestionCircle));
const FaPercent = dynamic(() => import('react-icons/fa').then((mod) => mod.FaPercent));
const FaTicketAlt = dynamic(() => import('react-icons/fa').then((mod) => mod.FaTicketAlt));
const FaInbox = dynamic(() => import('react-icons/fa').then((mod) => mod.FaInbox));
const FaFolderOpen = dynamic(() => import('react-icons/fa').then((mod) => mod.FaFolderOpen));
const FaUser = dynamic(() => import('react-icons/fa').then((mod) => mod.FaUser));

const Sidebar = () => {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState({});
  const router = useRouter();

  const toggleDropdown = (key) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/admin');
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      alert('Login to see the dashboard!');
      router.push('/admin');
    } else {
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.name);
      setUserEmail(decodedToken.email);
      setUserRole(decodedToken.role);
      console.log("---DECODED----", decodedToken);
    }
  }, [router]);

  const menuItems = [
    {
      title: "Users",
      path: "/admin/AdminUser",
      icon: <FaUser className="h-5 w-5" />,
      roles: ["admin"],
    },
    {
      title: "Companies",
      path: "/admin/Companies",
      icon: <FaBuilding className="h-5 w-5" />,
      roles: ["admin", "sub admin"],
    },
    {
      title: "Categories",
      path: "/admin/Categories",
      icon: <FaTags className="h-5 w-5" />,
      roles: ["admin", "sub admin"],
    },
    {
      title: "Offers",
      path: "/admin/Offers",
      icon: <FaPercent className="h-5 w-5" />,
      roles: ["admin", "sub admin"],
    },
    {
      title: "Category Coupon",
      path: "/admin/Category_Coupon",
      icon: <FaTicketAlt className="h-5 w-5" />,
      roles: ["admin", "sub admin"],
    },
    {
      title: "Submissions",
      path: "/admin/Submittions",
      icon: <FaInbox className="h-5 w-5" />,
      roles: ["admin"],
    },
    {
      title: "Blog Categories",
      path: "/admin/BlogCategories",
      icon: <FaFolderOpen className="h-5 w-5" />,
      roles: ["admin", "sub admin"],
    },
    {
      title: "Blogs",
      path: "/admin/Blogs",
      icon: <FaBlog className="h-5 w-5" />,
      roles: ["admin", "sub admin"],
    },
    {
      title: "FAQ's",
      path: "/admin/Faqs",
      icon: <FaQuestionCircle className="h-5 w-5" />,
      roles: ["admin"],
    },
    {
      title: "Banners",
      path: "/admin/Banners",
      icon: <FaAd className="h-5 w-5" />,
      roles: ["admin"],
    },
  ];

  const dropdownMenuItems = [
    {
      title: "CouponRI",
      roles: ["admin"],
      list: [
        {
          title: "Settings",
          path: "/dashboard/settings",
          icon: <FaCog />,
          roles: ["admin"],
        },
      ],
    },
  ];

  return (
    <div className="bg-gray-700 text-white w-full min-h-screen flex flex-col">
      <div className="p-6 text-center">
        <Image
                 width={1000}
                  height={1000}
                  placeholder="data:image/jpeg;base64,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"
           src="/logo/logo.jpg" alt="Profile" className="rounded-full mx-auto mb-4 w-24 h-24" />
        <h2 className="text-xl font-semibold">{userName}</h2>
        <p className="text-green-400 mt-1">● Online</p>
      </div>

      <div className="flex-1 p-4 border-t border-gray-600">
        <ul className="mt-6 space-y-3">
          {menuItems.map(
            (item) =>
              item.roles.includes(userRole) && (
                <li key={item.title}>
                  <Link href={item.path} passHref prefetch>
                    <button className="flex items-center p-3 hover:bg-blue-700 rounded-md w-full">
                      {item.icon}
                      <span className="ml-3 text-sm font-medium">{item.title}</span>
                    </button>
                  </Link>
                </li>
              )
          )}

          {dropdownMenuItems.map(
            (category, index) =>
              category.roles.includes(userRole) && (
                <li key={category.title}>
                  <button
                    className="flex items-center w-full p-3 hover:bg-blue-700 rounded-md focus:outline-none"
                    onClick={() => toggleDropdown(index)}
                  >
                    <span className="ml-3 text-sm font-medium">{category.title}</span>
                    <FaChevronDown
                      className={`h-4 w-4 ml-auto transform transition-transform duration-200 ${
                        isDropdownOpen[index] ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isDropdownOpen[index] && (
                    <ul className="ml-6 mt-2 space-y-2">
                      {category.list.map(
                        (item) =>
                          item.roles.includes(userRole) && (
                            <li key={item.title}>
                              <Link href={item.path} passHref prefetch>
                                <button className="flex items-center p-2 hover:bg-blue-700 rounded-md w-full">
                                  {item.icon}
                                  <span className="ml-3 text-sm font-medium">{item.title}</span>
                                </button>
                              </Link>
                            </li>
                          )
                      )}
                    </ul>
                  )}
                </li>
              )
          )}

          <li className="mt-6">
            <button
              className="flex items-center w-full p-3 hover:bg-blue-700 rounded-md focus:outline-none"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="h-5 w-5" />
              <span className="ml-3 text-sm font-medium">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
