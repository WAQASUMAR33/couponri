// components/WhyPartnerWithUs.js

import { TrophyIcon, LightBulbIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function WhyPartnerWithUs() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">Why partner with us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-[#2D2D6B] text-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <TrophyIcon className="h-8 w-8 text-yellow-500 mr-4" />
              <h3 className="text-xl font-bold">We’re More Than a Development Agency</h3>
            </div>
            <p>
              We do more than create WordPress websites. Our team is skilled in various digital marketing areas like SEO, and social media. Our comprehensive approach to web development services gives you the best results possible. Plus, we offer flexible pricing for our development services.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-[#2D2D6B] text-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <LightBulbIcon className="h-8 w-8 text-yellow-500 mr-4" />
              <h3 className="text-xl font-bold">We make Strategies for Your Success</h3>
            </div>
            <p>
              Our focus is on your business goals. We start by understanding what you want to achieve, whether it’s getting more leads, building your brand, or selling products. Our development services are designed to create a website that’s authentic, high-converting, and unique to your needs.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-[#2D2D6B] text-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <ClockIcon className="h-8 w-8 text-yellow-500 mr-4" />
              <h3 className="text-xl font-bold">On-Time Delivery, Every Time</h3>
            </div>
            <p>
              We respect your time and deliver projects on schedule. Depending on complexity, development can take anywhere from four to twenty weeks. We commit to realistic timelines and ensure you’re satisfied with our work. We value your success and strive for 100% customer satisfaction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
