import React from 'react';
import { ClipboardDocumentCheckIcon, PencilSquareIcon, Cog6ToothIcon, UsersIcon } from '@heroicons/react/24/outline';

export default function ContentWritingProcess() {
  const steps = [
    {
      number: '1',
      title: 'Research and Strategy Development',
      icon: ClipboardDocumentCheckIcon,
    },
    {
      number: '2',
      title: 'Content Creation',
      icon: PencilSquareIcon,
    },
    {
      number: '3',
      title: 'SEO Content Optimization',
      icon: Cog6ToothIcon,
    },
    {
      number: '4',
      title: 'Ongoing Content Management',
      icon: UsersIcon,
    },
  ];

  return (
    <section className="py-12 bg-yellow-100">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">
          Over Content Writing Service Work Process
        </h2>
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-lg shadow-md flex flex-col items-center w-1/4 mx-2"
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-yellow-100 text-yellow-500 text-2xl font-bold flex items-center justify-center">
                {step.number}
              </div>
              <step.icon className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-center text-lg font-semibold text-gray-800">{step.title}</h3>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-600 mt-12">
          If you're ready to elevate your online presence, get in touch with us today!
        </p>
      </div>
    </section>
  );
}
