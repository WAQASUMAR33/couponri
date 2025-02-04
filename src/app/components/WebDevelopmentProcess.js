// components/WebDevelopmentProcess.js

import { ChartBarIcon, PencilSquareIcon, CodeBracketIcon, CogIcon } from '@heroicons/react/24/outline';

export default function WebDevelopmentProcess() {
  const steps = [
    {
      number: "1",
      title: "Discovery and Planning",
      icon: ChartBarIcon,
    },
    {
      number: "2",
      title: "Design and Prototyping",
      icon: PencilSquareIcon,
    },
    {
      number: "3",
      title: "Development and Implementation",
      icon: CodeBracketIcon,
    },
    {
      number: "4",
      title: "Deployment and Maintenance",
      icon: CogIcon,
    },
  ];

  return (
    <section className="py-12 bg-yellow-100">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">
          Our Web Development Service Work Process
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center w-full md:w-1/2 lg:w-1/4">
              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 text-white font-bold text-lg mb-4">
                  {step.number}
                </div>
                <step.icon className="h-12 w-12 text-yellow-500 mb-4" />
                <h3 className="text-center text-lg font-semibold text-gray-800">{step.title}</h3>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-600 mt-8">
          If you're ready to elevate your online presence, get in touch with us today!
        </p>
      </div>
    </section>
  );
}
