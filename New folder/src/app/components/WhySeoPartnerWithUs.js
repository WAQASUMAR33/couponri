// components/WhyPartnerWithUs.js

import { StarIcon, ChartBarIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function WhyPartnerWithUs() {
  const reasons = [
    {
      title: "Having Experience",
      description: "Having experience is important. We help all kinds of businesses grow online and make more money. Our SEO experts are experienced and have been top leaders in the industry for more than ten years. We work together as a team, so if anyone needs help, we all pitch in.",
      icon: StarIcon,
    },
    {
      title: "We always improve",
      description: "We’re always improving. SEO changes a lot because of Google updates, so we keep up with the latest news and trends. Our SEO company is always learning new tricks to stay ahead. We’re proactive, not reactive.",
      icon: ChartBarIcon,
    },
    {
      title: "On-Time Delivery, Every Time",
      description: "We believe in being clear so you can see exactly how our work is helping your online sales. Our detailed reports include Google Analytics data, showing how your website is doing with SEO. Plus, we can give you a video summary each month.",
      icon: ClockIcon,
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
