// app/pages/inspire_me/page.js

import AboutSection from '../../../app/components/AboutSection';
import ImpressivePortfolio from '../../../app/components/ImpressivePortfolio';
import Image from 'next/image';
import CustomerRootLayout from '../../../app/user/layout';
import BreadCrumbs from '../../components/BreadCrumbs';
// import Portfolio from '../../components/Portfolio';
// import Layout

export default function InspireMePage() {
  const breadcrumbs = [
    {name:"Home", url: '/'},
    {name: "About Us",url:"/pages/aboutus"},
    // {name: `${blog.title?.substring(0,30)} ...`,url:`/blog/${blog.web_slug}`},

  ]

  return (
    // <Layout>
    <CustomerRootLayout>
     <BreadCrumbs breadCrumbs={breadcrumbs}/>
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto px-4 lg:px-8">
          {/* About Us Section */}
          <section className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">About Us</h1>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Welcome to CouponRI. The perfect destination for amazing deals and discounts in the retail shopping industry. 
              Born with the need to make online shopping a necessity rather than a luxurious experience, CouponRI is an ultimate 
              savings expert that will save you time and money in finding the best product available. We believe every person 
              deserves to shop smart and get hold of their products without those guilty feelings attached to spending more.
            </p>
          </section>

          {/* Our Mission Section */}
          <section className="mb-12 text-center">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              At CouponRI, we're dedicated to empowering consumers in making smart purchasing decisions using reliable tools 
              and resources. We curate a comprehensive selection of coupons, promo codes, and exclusive offers that cover every 
              single niche of the retail world—from fashion and beauty to home goods and tech gadgets.
            </p>
          </section>

          {/* User-Friendly Experience Section */}
          <section className="mb-12 text-center">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">A User-Friendly Experience</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              With the sheer number of offers and volume that exists with online shopping, CouponRI streamlines your shopping 
              needs. You can easily access incredible discounts of up to 80% off and free shipping deals from your favorite 
              retailers, all with just a few clicks.
            </p>
          </section>

          {/* The CouponRI Difference Section */}
          <section className="mb-12 text-center">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">The CouponRI Difference</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Our solid commitment to quality and accuracy is what separates us, having a thorough team of deal-hunters working incessantly around the clock to ensure every offer accessible on our website is verified and ready to help you save. That defines us from all the other similar sites that feature outdated or misleading coupons; it is because we pride ourselves on being able to give you real-time updates as well as authentic information.
We realize that the world of discounts is in a constant change so we merge high tech and human expertise in our algorithm. With this, each coupon and promotion is tested with utmost detail to ensure validity so you may shop confidently.

            </p>
          </section>

          {/* Offers and Savings Section */}
          <section className="mb-12 text-center">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Offers for Every Need</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            At CouponRI, we understand that savings manifest in a variety of ways. This is why we have the variety of deals to help you in any shopping needs. From coupons for fashion retailers and expensive clothing items to low-priced home helpers, our wide collection of everything in between has been kept under the same roof. Just one click will get you all the best deals available on clothing, beauty products, electronics, and travel bookings and much more.
            </p>
          </section>

          {/* Seasonal Savings Section */}
          <section className="mb-12 text-center">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Seasonal Savings and Events</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            We know that special events provide excellent opportunities to save money. Here at CouponRI, we track seasonal saving events – not just the best holiday sales or back-to-school shopping and other major events of the year. From last-minute shopping for Black Friday deals to Mother's Day gift ideas, you will not miss here any of the latest promotions and discounts.
            </p>
          </section>

          {/* Community Section */}
          <section className="mb-12 text-center">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Community-Focused Strategy</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            CouponRI always believed that in power lies community. This website is not merely a couponing platform; we're also sharing knowledge for those saavy shoppers to make them even stronger. We encourage our users to join our dynamic community, sharing tips, tricks, and experiences with fellow coupon enthusiasts. Do follow our blog for clever articles on shopping strategies, style advice, and money-saving secrets from our industry experts.
            </p>
          </section>

          {/* Join Us Section */}
          <section className="mb-12 text-center">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Join Us on This Journey</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            We invite you to this exciting journey with us as we continue to grow. Your response and experience are valuable to us and help shape the future of CouponRI. At CouponRI, we will commit to evolving our platform in a manner that meets the needs of those users and makes this your number one source for all things related to savings. Our Commitment to Excellence We strive for perfection. Every day, our team does something in the way of service improvement, developing new partnerships, and making a better user experience. We want to become your ally in online shopping, helping you get the best possible ways to save money and enjoy every purchase. 
In Conclusion Sign up with us today and find out how shopping with CouponRI can be one of the most luxurious yet meaningful journeys on your way to getting that desired lifestyle. Have every coupon push you to realizing your fantasies. Try applying the coupons now to start unraveling savings from your preferred products. This is a start of a journey toward smarter shopping.

            </p>
          </section>

        
        </div>
      </div>
 
      {/* Portfolio Section */}
      {/* <div className="py-12">
        <AboutSection/>
        <ImpressivePortfolio/>
      </div> */}
      </CustomerRootLayout>
    // </Layout>
  );
}
