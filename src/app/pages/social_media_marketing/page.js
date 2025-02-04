// app/pages/inspire_me/page.js


import FAQ from '../../../app/components/FAQs';
import RecentProjects from '../../../app/components/RecentProjects';
import ServicesWeOffer from '../../../app/components/socialmedia/ServicesWeOffer';
import SocialMediaMarketing from '../../../app/components/socialmedia/SocialMediaMarketing';
import SocialMediaMarketingProcess from '../../../app/components/socialmedia/SocialMediaMarketingProcess';
import SocialMediaSteps from '../../../app/components/socialmedia/SocialMediaSteps';
import WhyPartnerWithUs from '../../../app/components/socialmedia/WhyPartnerWithUs';
import Image from 'next/image';
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
    src="/herosection/3.jpeg"
    alt="Inspiration Image"
    layout="fill"
    objectFit="cover"
    className="w-full h-[300px]"
  />
  <span className="absolute flex-col inset-0 md:w-[700px]  ml-40 font-bold flex justify-center text-4xl md:text-6xl text-white z-30">
  Elevate Your Brand’s Presence with Social Media Marketing
    <button className='bg-purple-800 mt-10 w-[200px] text-sm px-2 py-1 left-0 text-white rounded-full'>Request a Free Proposal</button>
  </span>
  
</div>
<p className='py-10 px-20'>
Social media marketing (popularly known as digital marketing) is the new era’s method of advertising goods or services through social media websites or platforms. Our SEO and Social media marketing services continue to be seen as the dominant technique in academic practice. However, many academicians and researchers prefer traditional digital marketing methods.
Social media sites allow the marketer to create a brand identity, step up sales, gather traffic to the official website, and engage a loyal community of users in content sharing and communication.
</p>

      {/* Portfolio Section */}
      <div className="py-12">
        <SocialMediaMarketing/>
        <WhyPartnerWithUs/>
        <ServicesWeOffer/>
        <SocialMediaSteps/>
        <SocialMediaMarketingProcess/>
        <RecentProjects/>
        <FAQ/>
      </div>
      </CustomerRootLayout>
    // </Layout>
  );
}
