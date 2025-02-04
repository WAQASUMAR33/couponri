'use client'

export default function OurPartnershipJourney() {
  const steps = [
    {
      number: "1",
      title: "Understanding Your Vision:",
      description: "We play a complementary role to that by sensibly listening to your dream and generating fanciful and imaginative concepts in the beginning.",
    },
    {
      number: "2",
      title: "Market Insight:",
      description: "Acquiring enough information on your audience, industry, and competitors, we make design strategic decisions based on each detail.",
    },
    {
      number: "3",
      title: "Mock-ups and Approval:",
      description: "Data powered us, and we produced initial mock-ups successfully for your approval which was set in cooperation with what your brand was saying.",
    },
    {
      number: "4",
      title: "Hands-On Design Process:",
      description: "We work on elements including structuring illustrations of wireframes, and functional prototypes of the interface to ensure that you are updated.",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">Our Partnership Journey</h2>
        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
          {steps.map((step, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center mr-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
              </div>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
