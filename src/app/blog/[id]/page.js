import React from "react";
import BlogDetailPage from "./mainpage"; // Ensure you are importing the correct component
import ErrorPage from "../../store/[id]/ErrorPage"; // Ensure this path is correct

export async function generateMetadata({ params }) {
  const baseUrl = "https://www.couponri.com/";

  try {
    const res = await fetch(`${baseUrl}/api/blog/${params.id}`);

    if (!res.ok) {
      console.error(`Error: ${res.status} ${res.statusText}`);
      if (res.status === 404) {
        throw new Error("Blog not found");
      }
      throw new Error("Failed to fetch blog data");
    }

    const blog = await res.json();
    console.log("Meta data is: ", blog);

    const canonicalUrl = `${baseUrl}/blog/${params.id}`;
    return {
      title: blog.meta_title || "CouponRI",
      description: blog.meta_description || "Best coupon website",
      keywords: blog.meta_focusKeyword || "Couponri blogs keyword",
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: blog.meta_title,
        description: blog.meta_description,
        url: `https://www.couponri.com/blog/${blog.web_slug}`,
        siteName: "CouponRi",
        type: 'website',
        images: [
          {
            url: `https://couponri.divenclave.com/uploads/${blog.image}`,
            secureUrl: `https://couponri.divenclave.com/uploads/${blog.image}`,
            alt: blog.meta_title,
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        site: '@CouponRi',
        title: blog.meta_title,
        description: blog.meta_description,
        creator: '@CouponRi',
        images: {
          url: `https://couponri.divenclave.com/uploads/${blog.image}`,
          alt: blog.meta_title,
        }
      },
    };
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return {
      title: "Blog Not Found",
      description: "The blog you are looking for does not exist.",
    };
  }
}

export default async function Home({ params }) {
  const baseUrl = "https://www.couponri.com/";
  let blog = null;

  try {
    const res = await fetch(`${baseUrl}/api/blog/${params.id}`);

    if (!res.ok) {
      console.error(`Error: ${res.status} ${res.statusText}`);
      if (res.status === 404) {
        return <ErrorPage />; // Render the custom 404 error page
      }
      throw new Error("Failed to fetch blog data");
    }

    blog = await res.json();
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return <ErrorPage />; // Render the custom 404 error page on other errors
  }

  return (
    <>
      <BlogDetailPage id={params.id} blog={blog} />
    </>
  );
}
