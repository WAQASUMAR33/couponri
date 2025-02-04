import React from 'react';

export default function ContentStrategy() {
  const strategySteps = [
    {
      number: '1',
      title: 'Tone, Voice & Style',
      description: 'Our style and voice towards your content are shaped to enable it to be understood even before it is uttered by different audiences while at the same time being conveyed through the channels of communication seamlessly.',
    },
    {
      number: '2',
      title: 'Language, Words, & Messaging',
      description: 'We ensure that the language and information you want to convey will be expressed accurately and will be able to persuade your potential customers that the brand values, messages, and objectives are serious and worthy of their attention.',
    },
    {
      number: '3',
      title: 'Content Gap & Surplus Analysis',
      description: 'Our analysis can be utilized to discover deficiencies in your existing content strategy, including extra areas and inadequate places; this will enable you to make an optimal content creation effort.',
    },
    {
      number: '4',
      title: 'Content Inventory',
      description: 'We conduct thorough content audit sessions of your now existing assets, that is, listing and grading them by their relevance, quality, and effectiveness.',
    },
    {
      number: '5',
      title: 'Content Mapping',
      description: 'By applying strategic mapping methods we plan to artfully organize your content in a way that leads to seamless flow and a perfect understanding of your target groups thus raising your interaction and conversion.',
    },
    {
      number: '6',
      title: 'Content Creation',
      description: 'Exploiting our competence and topics, we produce high-quality, profit-bringing content of various formats to be published on different platforms that work to meet your purpose in particular.',
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">
          Our aspects of content strategy and development
        </h2>
        <p className="text-center text-gray-600 mb-12">
          At Div Enclave, we innovate with the generative capacity to retool challenging content into digestible, actionable, and understandable materials.
        </p>
        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
          {strategySteps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-100 text-yellow-500 text-2xl font-bold flex items-center justify-center mr-4">
                {step.number}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
