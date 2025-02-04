// pages/privacy-policy.js
import React from 'react';
import CustomerRootLayout from '../../user/layout';
import BreadCrumbs from '../../components/BreadCrumbs';

const PrivacyPolicy = () => {
    const breadcrumbs = [
      {name:"Home", url: '/'},
      {name: "Privacy Policy",url:"/pages/privacypolicy"},
      // {name: `${blog.title?.substring(0,30)} ...`,url:`/blog/${blog.web_slug}`},
  
    ]
  return (
    <CustomerRootLayout>
      <BreadCrumbs breadCrumbs={breadcrumbs}/>
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-6 lg:px-12">
      <h1 className="text-4xl text-center font-extrabold mb-8 text-gray-900 border-b pb-4">
            Privacy Policy for CouponRI
          </h1>
        <div className="bg-white shadow-xl rounded-lg p-10 lg:p-16">
         
          
          <p className="text-gray-600 mb-6 text-lg"><strong>Effective Date:</strong> [Insert Date]</p>

          <p className="text-gray-700 mb-8 text-lg leading-relaxed">
            At CouponRI, your privacy is our priority. This Privacy Policy outlines how we collect, use,
            disclose, and safeguard your information when you visit our website and use our services.
          </p>

          <div className="space-y-8">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">1. Information We Collect</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Personal Information:</strong> When you sign up for our newsletter or create an account, we may collect personal details such as your name, email address, and any other information you provide.</li>
                <li><strong>Usage Data:</strong> We automatically collect certain information when you visit our site, including your IP address, browser type, pages visited, and the time and date of your visit.</li>
                <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to enhance your experience on our website. Cookies help us recognize your preferences and provide personalized content.</li>
              </ul>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>To provide, maintain, and improve our services.</li>
                <li>To communicate with you, including sending newsletters, updates, and promotional materials.</li>
                <li>To analyze usage trends and enhance user experience.</li>
                <li>To verify your identity and prevent fraud.</li>
              </ul>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">3. Disclosure of Your Information</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent, except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Service Providers:</strong> We may share your information with trusted third-party service providers who assist us in operating our website and delivering our services.</li>
                <li><strong>Legal Compliance:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
              </ul>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">4. Data Security</h2>
              <p className="text-gray-700 mb-6">
                We take the security of your personal information seriously and use appropriate technical and organizational measures to protect it from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, so we cannot guarantee its absolute security.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">5. Your Rights</h2>
              <p className="text-gray-700 mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>The right to access and receive a copy of the personal information we hold about you.</li>
                <li>The right to request correction of any inaccurate or incomplete data.</li>
                <li>The right to request the deletion of your personal information.</li>
              </ul>
              <p className="text-gray-700 mt-4">To exercise these rights, please contact us using the information provided below.</p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">6. Third-Party Links</h2>
              <p className="text-gray-700 mb-6">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to read the privacy policies of any third-party sites you visit.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">7. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-6">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this Privacy Policy periodically to stay informed about our practices.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">8. Contact Us</h2>
              <p className="text-gray-700 mb-2">
                If you have any questions or concerns about this Privacy Policy, please contact us at:
              </p>
              <p className="text-gray-700"><strong>Email:</strong> info@couponri.com</p>
              <p className="text-gray-700 mb-6"><strong>Web Address:</strong> couponri.com</p>
              <p className="text-gray-700 font-semibold">
                Thank you for being a part of the CouponRI community!
              </p>
            </div>
          </div>

         
        </div>
      </div>
    </div>
    </CustomerRootLayout>
  );
};

export default PrivacyPolicy;
