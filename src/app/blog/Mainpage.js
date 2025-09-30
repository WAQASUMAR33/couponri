// pages/blog.js
'use client'
import { useState, useEffect } from 'react';
import CustomerRootLayout from '../user/layout';
import Head from 'next/head';
import Link from 'next/link';
import BlogCategorySlider from '../components/CategoryBlogSlider';
import Subscribe from './components/Subcribe'
import BlogSection from './components/Blogsection';
import NewBlogCategorySlider from './components/blogcategoryslider';
import BreadCrumbs from '../components/BreadCrumbs';
import Loader from '../Loader';
import Image from 'next/image';

export default function Blog() {
  const [featuredPost, setFeaturedPost] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [visibleBlogs, setVisibleBlogs] = useState(6); // Number of blogs to display initially
  const [jsonLd,setjsonLd] = useState([])
  const [loading, setloading]= useState(true);

  useEffect(() => {
    // Fetch blogs from API
    const fetchBlogs = async () => {
      const response = await fetch('/api/blog');
      const data = await response.json();
      setBlogs(data);
      const jsonLdmain = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Saving Tips, Offers & Shopping Guides - Blog | Couponri',
        image: 'https://www.couponri.com/logo/logo2.jpg',
        description: 'Explore all your favorite brands in one place at Couponri. Find exclusive coupons, promo codes, and deals for top online stores. Save more on every purchase!',
      }
      setjsonLd(jsonLdmain);
      setloading(false)
      setFeaturedPost(data[0]);
    };

    fetchBlogs();
  }, []);

  const handleRelatedPostClick = (post) => {
    setFeaturedPost(post);
  };

  const showMoreBlogs = () => {
    setloading(true)
    setVisibleBlogs((prev) => prev + 6); // Show 6 more blogs each time button is clicked
    setloading(false)
  };

  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  useEffect(() => {
    const fetchblogslider = async () => {
      try {
        setloading(true)
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
        setloading(false)
      } catch (error) {
        console.error('Error fetching slider:', error);
      }
    };

    fetchblogslider();
  }, []);
  const breadcrumbs = [
    {name:"Home", url: '/'},
    {name: "blog",url:"/blog"},

  ]

  if(loading){
    return <div className='w-full h-screen flex flex-col justify-center items-center'><Loader/></div>
  }
 
  return (
    <CustomerRootLayout>
      <BreadCrumbs breadCrumbs={breadcrumbs}/>
      <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />

      <div className=" bg-white">
        <main className="container mx-auto px-4 py-4">
          <NewBlogCategorySlider />
          {/* <h1 className='text-4xl font-bold text-center '>Blog Page</h1> */}
          {blogs.length > 0 && (
            <BlogCategorySlider category={slider1} blogs={blogs} />
          )}
          <BlogPosts blogs={blogs.slice(0, visibleBlogs)} />
          {visibleBlogs < blogs.length && (
            <div className="text-center mt-8">
              <button
                onClick={showMoreBlogs}
                className="bg-[#06089B] text-white w-40 h-10 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-yellow-600"
              >
                Show More Blogs
              </button>
            </div>
          )}
        </main>
        <BlogSection blogs={blogs} title={slider2} />
        <Subscribe />
      </div>
    </CustomerRootLayout>
  );
}

// Utility function to strip HTML tags and truncate description
const stripHtmlTags = (htmlString, charLimit = 100) => {
  const plainText = htmlString.replace(/<[^>]+>/g, ''); // Remove HTML tags
  return plainText.length > charLimit ? plainText.slice(0, charLimit) + '...' : plainText;
}

function BlogPosts({ blogs }) {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-8">Latest Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((post, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link href={`/blog/${post.web_slug}`} className="hover:text-blue-600 hover:underline">
              <Image
                 width={1000}
                  height={1000}
                  placeholder="data:image/jpeg;base64,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"
          
                src={`https://couponri.divenclave.com/uploads/${post.image}`}
                alt={post.title}
                className="w-full h-64 object-cover"
              />
            </Link>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</span>
                {/* <span className="text-sm bg-green-500 rounded-full px-2 py-1 text-white">
                  {post.category.length > 30 ? `${post.category.slice(0, 30)}...` : post.category}
                </span> */}

              </div>
              <Link href={`/blog/${post.web_slug}`} className="hover:text-blue-600 hover:underline">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              </Link>
              <div
                className="text-gray-700 text-sm overflow-hidden text-ellipsis"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3, // Limit to 3 lines
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {stripHtmlTags(post.description, 100)} {/* Truncated and stripped description */}
              </div>
              <Link href={`/blog/${post.web_slug}`} className="text-blue-600 hover:underline">
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
