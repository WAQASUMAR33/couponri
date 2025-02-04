// app/pages/inspire_me/page.js


import AdvancedWebDevelopment from '../../../app/components/AdvancedWebDevelopment';
import ApproachToWebDevelopment from '../../../app/components/ApproachToWebDevelopment';
import BuildForFuture from '../../../app/components/BuildForFuture';
import FAQ from '../../../app/components/FAQs';
import HappyClients from '../../../app/components/HappyClients';
import OurExpertise from '../../../app/components/OurExpertise';
import RecentProjects from '../../../app/components/RecentProjects';
import WebDevelopmentProcess from '../../../app/components/WebDevelopmentProcess';
import WebDevelopmentSection from '../../../app/components/WebDevelopmentSection';
import WhyPartnerWithUs from '../../../app/components/WhyPartnerWithUs';

import Image from 'next/image';
import CustomerRootLayout from '../../../app/user/layout';

export default function InspireMePage() {
  return (
    
    <CustomerRootLayout>
     
      <div className="relative w-full h-screen">
  <Image
    src="/herosection/1.jpg"
    alt="Inspiration Image"
    layout="fill"
    objectFit="cover"
    className="w-full h-[300px]"
  />
  <span className="absolute flex-col inset-0 w-[700px] ml-40 font-bold flex justify-center text-6xl text-white z-30">
    Empower Your Online Presence with Expert Web Development Solutions
    <button className='bg-purple-800 mt-10 w-[200px] text-sm px-2 py-1 left-0 text-white rounded-full'>Request a Free Proposal</button>
  </span>
  
</div>


      {/* Portfolio Section */}
      <div className="py-12">
        
        <BuildForFuture/>
        <WebDevelopmentSection/>
        <AdvancedWebDevelopment/>
        <WhyPartnerWithUs/>
        <OurExpertise/>
        <HappyClients/>
        <ApproachToWebDevelopment/>
        <WebDevelopmentProcess/>
        <RecentProjects/>
        <FAQ/>
      </div>
      </CustomerRootLayout>
    // </Layout>
  );
}
