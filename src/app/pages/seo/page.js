// app/pages/inspire_me/page.js


import FAQ from '../../../app/components/FAQs';
import HappyClients from '../../../app/components/HappyClients';
import OurExpertise from '../../../app/components/OurSeoExpertise';
import RecentProjects from '../../../app/components/RecentProjects';
import SeoCards from '../../../app/components/SeoCards';
import SeoServicesProcess from '../../../app/components/SeoServicesProcess';
import SeoServiceWorkProcess from '../../../app/components/SeoServiceWorkProcess';
import WhyPartnerWithUs from '../../../app/components/WhySeoPartnerWithUs';
import Image  from 'next/image';
import CustomerRootLayout from '../../../app/user/layout';
// import Portfolio from '../../components/Portfolio';
// import Layout

export default function InspireMePage() {
  return (
    // <Layout>
    <CustomerRootLayout>
      {/* Full-Width Image */}
      <div className="relative w-full h-screen">
  <Image
    src="/herosection/Seo.jpeg"
    alt="Inspiration Image"
    layout="fill"
    objectFit="cover"
    className="w-full h-[300px]"
  />
  <span className="absolute flex-col inset-0 md:w-[700px] ml-40 font-bold flex justify-center text-4xl md:text-6xl text-white z-30">
  Maximize Your Online Presence with SEO Services
    <button className='bg-purple-800 mt-10 w-[200px] text-sm px-2 py-1 left-0 text-white rounded-full'>Request a Free Proposal</button>
  </span>
  
</div>
<p className='px-20 py-10'>
SEO, the practice that maximizes the website’s technical condition, content relevance, and link popularity to enhance its ranking and visibility on SERP(search engine result page) is commonly known as Search Engine Optimization. SEO, by checking numerous elements on the website such as keywords, meta tags, URL structure, and schema markup, ensures that a website appears in the relevant search results for users.
Ultimately, it raises the possibility for websites to get more organic traffic from search engines by making them appear rather higher in the search results. This raises their chances of being clicked on by the users.
</p>

      {/* Portfolio Section */}
      <div className="py-12">
        <SeoCards/>
        {/* <OurExpertise/> */}
        <WhyPartnerWithUs/>
        <HappyClients/>
        <SeoServicesProcess/>
        <SeoServiceWorkProcess/>
        <RecentProjects/>
        <FAQ/>
        </div>
      </CustomerRootLayout>
    // </Layout>
  );
}
