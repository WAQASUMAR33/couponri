// components/OurExpertise.js

import { CodeBracketIcon, CogIcon, ServerStackIcon, ShieldCheckIcon, ShoppingCartIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

export default function OurExpertise() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-4">Our Expertise</h2>
        <p className="text-center text-gray-600 mb-12">
          We are experts in many technologies, such as HTML, CSS, JavaScript, and a range of frameworks needed for your website to be trendy and competitive.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white text-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <CodeBracketIcon className="h-8 w-8 text-yellow-500 mr-4" />
              <h3 className="text-xl font-bold">Custom Development Solutions</h3>
            </div>
            <p>
              Every business is unique, and so should its website. Our service provides tailor-made coding to meet your unique requirements and objectives.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-white text-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <ServerStackIcon className="h-8 w-8 text-yellow-500 mr-4" />
              <h3 className="text-xl font-bold">Content Management Systems</h3>
            </div>
            <p>
              Make your content manageable with popular content management systems (CMS) such as WordPress, Joomla, and Drupal which are tailored to benefit you and your team.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-white text-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <ShoppingCartIcon className="h-8 w-8 text-yellow-500 mr-4" />
              <h3 className="text-xl font-bold">E-commerce Development</h3>
            </div>
            <p>
              Stepping into the online sales world with our e-commerce solutions. We provide your customers with the best payment options for a smooth shopping experience.
            </p>
          </div>
          {/* Card 4 */}
          <div className="bg-white text-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <DevicePhoneMobileIcon className="h-8 w-8 text-yellow-500 mr-4" />
              <h3 className="text-xl font-bold">Responsive Design</h3>
            </div>
            <p>
              Mobile usage is experiencing rapid growth which we take care of by making sure your website looks good and functions well not only on desktops but also on all mobile devices for the best user experience.
            </p>
          </div>
          {/* Card 5 */}
          <div className="bg-white text-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <CogIcon className="h-8 w-8 text-yellow-500 mr-4" />
              <h3 className="text-xl font-bold">Performance Optimization</h3>
            </div>
            <p>
              The fast and effective way is essential to keep the audience involved. We optimize your website to guarantee small loading times and a smooth experience.
            </p>
          </div>
          {/* Card 6 */}
          <div className="bg-white text-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <ShieldCheckIcon className="h-8 w-8 text-yellow-500 mr-4" />
              <h3 className="text-xl font-bold">Security Measures</h3>
            </div>
            <p>
              The security of your website is so crucial. We implement strong security protocols that prevent your site from falling victim to threats and break-ins.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
