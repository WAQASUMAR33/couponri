'use client'

import { PencilIcon, CodeBracketIcon, PhotoIcon, PaintBrushIcon, CubeIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';

export default function OurExpertise() {
  const expertiseItems = [
    {
      title: "Logo Design:",
      description: "That's why we understand that it does not matter whether we design right from the bottom or polish a previously existing logo design, we appreciate the huge role we play as a source of identity.",
      icon: PencilIcon,
    },
    {
      title: "Custom Web Design",
      description: "We serve you with custom web designs that are not general templates but are rather adjustable in such a way that your business personality is integrated, becoming the visual narrative.",
      icon: CodeBracketIcon,
    },
    {
      title: "Print and Signage Design",
      description: "We can design not only online material but also print ads and customer signs. This gives our clients a unifying positive brand that is clear everywhere they go.",
      icon: PhotoIcon,
    },
    {
      title: "UX and UI Design",
      description: "We excel in developing helpful and user-friendly user experiences. Our UX decision leading to a visually attractive, easy-to-learn, logically structured, and expressive approach will be unquestionable.",
      icon: PaintBrushIcon,
    },
    {
      title: "Business Cards, and Infographics",
      description: "Boost your marketing capabilities with compelling and informative visual materials such as brochures and infographics that are specifically tailored to empower your business.",
      icon: CubeIcon,
    },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">Our Expertise</h2>
        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
          {expertiseItems.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-500 mb-4">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
