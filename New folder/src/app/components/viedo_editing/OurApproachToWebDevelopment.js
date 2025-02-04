// components/OurApproachToWebDevelopment.js
import { PencilSquareIcon } from '@heroicons/react/24/outline';

export default function OurApproachToWebDevelopment() {
  const steps = [
    {
      number: "1",
      title: "Remove Avoided Footage",
      description: "This is the simplest and most frequent action in the editorial function.",
    },
    {
      number: "2",
      title: "Choose the Best Footage",
      description: "The idea of having a lot more recording material than you will probably need is common.",
    },
    {
      number: "3",
      title: "Create the Best Flow",
      description: "The majority of videos often have a specific goal of either telling a story or aiding with providing fresh information.",
    },
    {
      number: "4",
      title: "Add More Effects",
      description: "This statement captures attention by suggesting an enhancement to typical videos.",
    },
    {
      number: "5",
      title: "Manipulate the Style",
      description: "A competent editor, on the other hand, will produce mood clichés nearly every time, without trying.",
    },
    {
      number: "6",
      title: "Give the Video a Unique Perspective",
      description: "The agenda can be effectively fulfilled by using the fact that video can be made to be the link with a particular viewpoint.",
    },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">Our Approach to Web Development</h2>
        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-500 mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
