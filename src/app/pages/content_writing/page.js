// app/pages/inspire_me/page.js

import ContentStrategy from '../../../app/components/content_writing/ContentStrategy';
import ContentWritingProcess from '../../../app/components/content_writing/ContentWritingProcess';
import ContentWritingService from '../../../app/components/content_writing/ContentWritingService';
import WhyPartnerWithUs from '../../../app/components/content_writing/WhyPartnerWithUs';
import FAQ from '../../../app/components/FAQs';
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
      <div className="relative w-full h-screen">
  <Image
    src="/herosection/Content-writing.jpeg"
    alt="Inspiration Image"
    layout="fill"
    objectFit="cover"
    className="w-full h-[300px]"
  />
  <span className="absolute flex-col inset-0 w-[700px] ml-40 font-bold flex justify-center text-6xl text-white z-30">
  Elevate Your Content with Our Premium Content Writing Services
    <button className='bg-purple-800 mt-10 w-[200px] text-sm px-2 py-1 left-0 text-white rounded-full'>Request a Free Proposal</button>
  </span>
  
</div>
<h1 className="text-2xl font-bold px-20 py-10">Professionally write articles for your brand to boost your brand and increase the interaction and interest among the users.</h1>
<p className='px-20 py-10'>
Content writing is about making written materials for sites on the internet, for instance, blog posts, articles, posts on social media, and website content. A key objective of this marketing technique is to bring the brand and its viewers together. Nowadays, pretty much all businesses invest in some sort of content marketing, with whatever marketers report points at around 70% of marketers invest in it.


</p>
<p className='px-20 py-1'>
Content writers are all-encompassing in this process, and they are expected to write tales representing the brand’s spirit and correspondence to the audience. The message should be perceived as interesting and informative rather than a linear sequence of product specifications. Improving your content writing is one key to success. So, what are some advice for doing so?
</p>
      {/* Portfolio Section */}
      <div className="py-12">
        <ContentWritingService/>
        <WhyPartnerWithUs/>
        <HappyClients/>
        <ContentStrategy/>
        <ContentWritingProcess/>
        <RecentProjects/>
        <FAQ/>
        
      </div>
      </CustomerRootLayout>
    // </Layout>
  );
}
