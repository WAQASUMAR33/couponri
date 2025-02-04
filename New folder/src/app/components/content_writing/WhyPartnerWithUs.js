import { StarIcon, ClipboardIcon, DocumentIcon } from '@heroicons/react/24/outline';

export default function WhyPartnerWithUs() {
  const reasons = [
    {
      title: "Get Top-Quality Content",
      description: "At Div Enclave, we make sure you get top-quality content that's perfect for search engines and your website visitors. We do lots of research and creativity and check our work before giving it to you. This makes sure that your SEO content is unique and matches your brand perfectly. Our experts also use advanced tools to check for any copied content, so you can be sure your website content is real and original.",
      icon: StarIcon,
    },
    {
      title: "Broad market experience",
      description: "Different businesses need different levels of expertise and writing styles. We make sure that the content we create is just right for your audience and their interests. That's why we have experts who know your industry well. Our team has a lot of experience writing for different types of businesses, like e-learning, computer repair, restoration, and delivery services. Let's talk about how we can help with your SEO content strategy.",
      icon: ClipboardIcon, // Changed to ClipboardIcon
    },
    {
      title: "Rights of the mind",
      description: "We know that every brand has its way of doing things and different budgets. That's why we don't make you sign long contracts. Once you pay for your writing content, you own all the rights to it. Also, we provide white-label SEO writing services. This means you can get content marketing solutions that you can use for your brand and show to your clients as your own.",
      icon: DocumentIcon,
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
