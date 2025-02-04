// app/pages/inspire_me/page.js

import Portfolio from '../../../app/components/Portfolio';
import Image from 'next/image';
import CustomerRootLayout from '../../../app/user/layout';
// import Portfolio from '../../components/Portfolio';
// import Layout

export default function InspireMePage() {
  return (
    // <Layout>
    <CustomerRootLayout>
      {/* Full-Width Image */}
      <div className="relative w-full flex justify-center items-center h-[300px]">
        <Image
          src="/herosection/image.png"
          alt="Inspiration Image"
          layout="fill"
          objectFit="cover"
          className="w-full h-[300px]"
        />
        <h1 className='text-6xl relative inset-0 text-white font-bold text-center'>Portfolio</h1>
      </div>

      {/* Portfolio Section */}
      <div className="py-12">
        <Portfolio/>
      </div>
      </CustomerRootLayout>
    // </Layout>
  );
}
