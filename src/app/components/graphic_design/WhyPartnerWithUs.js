'use client'

import { StarIcon, ClipboardDocumentIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function WhyPartnerWithUs() {
  const reasons = [
    {
      title: "Client-Centric Approach",
      description: "When it comes to graphic design, choosing the right team can make all the difference. At our agency, we are committed to ensuring client satisfaction above all else. This commitment sets us apart from the rest. We value open communication, and feedback throughout every step.",
      icon: StarIcon,
    },
    {
      title: "Industry-specific expertise",
      description: "Our graphic design service is built on industry-specific expertise, which affects a deep understanding of a particular sector of your brand. Our team is specialized in this which is crucial for our professionals as it contrasts them in a competitive market offering a unique edge to our clients.",
      icon: ClipboardDocumentIcon,
    },
    {
      title: "Exceeding Expectations",
      description: "Our goal is to go above and beyond for our clients. We understand the importance of delivering high-quality designs that not only look great but also effectively communicate your message and brand identity.",
      icon: ChartBarIcon,
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">Why partner with us?</h2>
        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-blue-900 text-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-500 mb-4">
                <reason.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
              <p className="text-white">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
