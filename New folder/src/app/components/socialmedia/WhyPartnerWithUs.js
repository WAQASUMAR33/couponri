// components/WhyPartnerWithUs.js
import { StarIcon, TrophyIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function WhyPartnerWithUs() {
  const reasons = [
    {
      title: "Committed account manager",
      description: "We give you account managers who focus on your industry, social media needs, and goals. This might mean you have a team of experts working on your brand. Your dedicated managers are there to answer questions and talk with you by email or phone whenever you need them.",
      icon: StarIcon,
    },
    {
      title: "Paid & Organic Team",
      description: "We have experts in both paid and organic social media marketing on our team. They have lots of experience and know-how to handle your campaign well. Even though paid and organic social media marketing are different, we use a smart plan to get you the best results from your social media ads.",
      icon: TrophyIcon,
    },
    {
      title: "Various experience in marketing",
      description: "Whether you're just starting, a big company, or have multiple locations, our social media marketing team aims to exceed what you expect. We'll help your brand become known on social media and build a good reputation online by keeping up with trends and using research to make smart changes.",
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
