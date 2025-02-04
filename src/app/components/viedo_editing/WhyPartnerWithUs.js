// components/WhyPartnerWithUs.js
import { StarIcon, ChartBarIcon, DocumentCheckIcon } from '@heroicons/react/24/outline';

export default function WhyPartnerWithUs() {
  const reasons = [
    {
      title: "Expert & Creative Team",
      description: "We work with our expert team to make & edit cool videos where people talk about how great your business is.",
      icon: StarIcon,
    },
    {
      title: "Unique Storytelling Methods",
      description: "We know that each brand is different and has its audience. Our team for making & editing videos takes the time to know your goals.",
      icon: ChartBarIcon,
    },
    {
      title: "Intense Customer Attention",
      description: "We care about making you happy. We believe in talking openly, working together, and hearing your thoughts at every step.",
      icon: DocumentCheckIcon,
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
