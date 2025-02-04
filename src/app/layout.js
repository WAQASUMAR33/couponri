import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { GoogleTagManager } from '@next/third-parties/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Couponri - Best Coupons & Deals for Online Shopping Savings",
  description: "Discover the best coupons and deals for online shopping at Couponri. Save big on top brands with exclusive promo codes and discounts. Shop smarter today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
         <head> 
         {/* <title>CouponRI</title>
         <meta name="description" content="CouponRi is the best couponing website." /> */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','G-KTM9M8VF4R');
        `}
      </Script>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-KTM9M8VF4R"></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-KTM9M8VF4R');
        `}
      </Script>
      <meta name="google-site-verification" content="NodXbkQGs8AUEwglf0ssr4GGHi5In4YGAYo6PVD6syc" />
      </head>
    <body className=" bg-white">
    <GoogleTagManager gtmId="G-KTM9M8VF4R" />
    <GoogleAnalytics gaId="G-KTM9M8VF4R" />
      {children}
    </body>
  </html>
  );
}
