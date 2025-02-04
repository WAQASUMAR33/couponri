// app/pages/inspire_me/page.js

import FAQ from '../../../app/components/FAQs';
import HappyClients from '../../../app/components/HappyClients';
import Portfolio from '../../../app/components/Portfolio';
import RecentProjects from '../../../app/components/RecentProjects';
import OurApproachToWebDevelopment from '../../../app/components/viedo_editing/OurApproachToWebDevelopment';
import OverVideoEditingServiceWorkProcess from '../../../app/components/viedo_editing/OverVideoEditingServiceWorkProcess';
import VideoEditingServices from '../../../app/components/viedo_editing/VideoEditingServices';
import WhyChooseVideoEditing from '../../../app/components/viedo_editing/WhyChooseVideoEditing';
import WhyPartnerWithUs from '../../../app/components/viedo_editing/WhyPartnerWithUs';
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
    src="/herosection/4.png"
    alt="Inspiration Image"
    layout="fill"
    objectFit="cover"
    className="w-full h-[300px]"
  />
  <span className="absolute flex-col inset-0 w-[700px] ml-40 font-bold flex justify-center text-6xl text-white z-30">
  Improve Your Brand with Our Video Editing Services
    <button className='bg-purple-800 mt-10 w-[200px] text-sm px-2 py-1 left-0 text-white rounded-full'>Request a Free Proposal</button>
  </span>
  
</div>
<p className='px-20 py-10'>In the latest week of HubSpot data, more than 66% of online buyers have been found reporting that they have made a purchase decision only after watching a product video. Therefore, the growth in the revenue of a brand through video ads is self-evident. On the plus side of it, an interesting piece of content that is worth sharing takes time to come by.

</p>
<p className='px-20'>
The ultimate goal is to create the perfect script trim the shots and make them flow just right, which brings everything together into coherence. But making a film or video project mostly involves good editing, where you see all the magic that’s been put on the screen. Video editing is indeed where this magic occurs, so let’s go through the basic steps you this dream come true.

 
</p>

      {/* Portfolio Section */}
      <div className="py-12">
        <VideoEditingServices/>
        <WhyChooseVideoEditing/>
        <WhyPartnerWithUs/>
        <HappyClients/>
        <OurApproachToWebDevelopment/>
        <OverVideoEditingServiceWorkProcess/>
        <RecentProjects/>
        <FAQ/>
      </div>
      </CustomerRootLayout>
    // </Layout>
  );
}
