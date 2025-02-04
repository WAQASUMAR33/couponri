// app/pages/inspire_me/page.js


import FAQ from '../../../app/components/FAQs';
import CustomVisuals from '../../../app/components/graphic_design/CustomVisuals';
import GraphicDesignWorkProcess from '../../../app/components/graphic_design/GraphicDesignWorkProcess';
import OurExpertise from '../../../app/components/graphic_design/OurExpertise';
import OurPartnershipJourney from '../../../app/components/graphic_design/OurPartnershipJourney';
import WhyPartnerWithUs from '../../../app/components/graphic_design/WhyPartnerWithUs';
import HappyClients from '../../../app/components/HappyClients';
import RecentProjects from '../../../app/components/RecentProjects';
import Image from 'next/image';
import CustomerRootLayout from '../../../app/user/layout';
// import Portfolio from '../../components/Portfolio';
// import Layout

export default function InspireMePage() {
  return (
    // <Layout>
    <CustomerRootLayout>
      {/* Full-Width Image */}
      Graphic-Desging
      <div className="relative w-full h-screen">
  <Image
    src="/herosection/Graphic-Desging.jpeg"
    alt="Inspiration Image"
    layout="fill"
    objectFit="cover"
    className="w-full h-[300px]"
  />
  <span className="absolute flex-col inset-0 w-[700px] ml-40 font-bold flex justify-center text-6xl text-white z-30">
  Visualize Your Brand with Exceptional Graphic Design Service
    <button className='bg-purple-800 mt-10 w-[200px] text-sm px-2 py-1 left-0 text-white rounded-full'>Request a Free Proposal</button>
  </span>
  
</div>
<p  className='py-10 px-20'>
  
In the latest week of HubSpot data, more than 66% of online buyers have been found reporting that they have made a purchase decision only after watching a product video. Therefore, the growth in the revenue of a brand through video ads is self-evident. On the plus side of it, an interesting piece of content that is worth sharing takes time to come by. The ultimate goal is to create the perfect script and trim the shots and make them flow just right, which brings everything together into coherence. But making a film or video project mostly involves good editing, where you see all the magic that’s been put on the screen. Video editing is indeed where this magic occurs, so let’s go through the basic steps you this dream come true.


</p>

      {/* Portfolio Section */}
      <div className="py-12">
        <CustomVisuals/>
        <WhyPartnerWithUs/>
        <OurExpertise/>
        <HappyClients/>
        <OurPartnershipJourney/>
        <GraphicDesignWorkProcess/>
        <RecentProjects/>
        <FAQ/>
      </div>
      </CustomerRootLayout>
    // </Layout>
  );
}
