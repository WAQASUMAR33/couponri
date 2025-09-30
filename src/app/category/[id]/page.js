import React from "react";
import CategoryDetail from './MainPage'
import ErrorPage from '../../store/[id]/ErrorPage'


export async function generateMetadata({ params }) {
  const baseUrl = 'https://www.couponri.com'; // Base URL for API calls

  // Helper function to fetch category ID from slug
  const getIdFromSlug = async (slug) => {
    try {
      console.log("Slug sent to API is:", slug);
      const response = await fetch(`${baseUrl}/api/getidfromslug/${slug}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch category ID: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Fetched category ID is:", data.id);
      return data.id;
    } catch (error) {
      console.error("Error Fetching category ID:", error);
      throw new Error("Error fetching category ID");
    }
  };

  try {
    console.log("Params received in metadata function:", params);
    
    // Ensure params is valid and get the category ID
    const categorySlug = params.id; // params.id is the slug
    const categoryId = await getIdFromSlug(categorySlug);

    // Fetch category metadata
    const response = await fetch(`${baseUrl}/api/category/${categoryId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch category metadata: ${response.statusText}`);
    }

    const category = await response.json();
    console.log("Fetched category metadata:", category);

    // Construct metadata
    const canonicalUrl = `${baseUrl}/category/${categorySlug}`;
    return {
      title: category.meta_title || 'CouponRI',
      description: category.meta_description || 'Best coupon website',
      keywords: category.meta_focusKeyword || 'CouponRI blogs keyword',
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: category.meta_title,
        description: category.meta_description,
        url: `https://www.couponri.com/category/${category.web_slug}`,
        siteName: "CouponRi",
        type: 'website',
        images: [
          {
            url: `https://couponri.divenclave.com/uploads/${category.category_image}`,
            secureUrl: `https://couponri.divenclave.com/uploads/${category.category_image}`,
            alt: category.meta_title,
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        site: '@CouponRi',
        title: category.meta_title,
        description: category.meta_description,
        creator: '@CouponRi',
        images: {
          url: `https://couponri.divenclave.com/uploads/${category.category_image}`,
          alt: category.meta_title,
        }
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);

    // Fallback metadata
    return {
      title: 'CouponRI',
      description: 'Best coupon website',
      keywords: 'CouponRI blogs keyword',
      alternates: {
        canonical: `${baseUrl}/category`,
      },
    };
  }
}

export default async function MainCategoryPage({ params }) {
  const baseUrl = "https://www.couponri.com/";
  let blog = null;

  try {
    const res = await fetch(`${baseUrl}/api/getidfromslug/${params.id}`);

    if (!res.ok) {
      console.error(`Error: ${res.status} ${res.statusText}`);
      if (res.status === 404) {
        return <ErrorPage />; // Render the custom 404 error page
      }
      throw new Error("Failed to fetch blog data");
    }

    blog = await res.json();
  } catch (error) {
    console.error("Error fetching category data:", error);
    return <ErrorPage />; // Render the custom 404 error page on other errors
  }
  return (
    <>
     <CategoryDetail params={params.id}/>
    </>
  );
}

   