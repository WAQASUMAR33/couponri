// components/SeoServicesProcess.js

export default function SeoServicesProcess() {
  const steps = [
    {
      number: "1",
      title: "Research",
      description: "We start by learning about your business, industry, competitors, existing content, and future needs. Then, we create a unique strategy for long-term success and better Google rankings. We analyze over 100 critical factors to tailor our approach to your needs.",
    },
    {
      number: "2",
      title: "Optimization",
      description: "With a clear understanding of your needs, we optimize your website to improve its speed and functionality. This involves tweaking many factors, like titles, meta descriptions, and website structure, to make sure your site performs well.",
    },
    {
      number: "3",
      title: "Link Building and Off-Page SEO",
      description: "We help boost your website’s visibility by building links and promoting your content on other websites and digital platforms through our ongoing support. Our extensive network ensures your content gets noticed across different industries.",
    },
    {
      number: "4",
      title: "Keyword Selection",
      description: "We conduct thorough keyword research and select the best keywords to attract traffic to your website. We also monitor their performance over time to adjust our strategy accordingly for sustained success and long-term profit.",
    },
    {
      number: "5",
      title: "Content Creation",
      description: "We work with skilled writers to create engaging content that informs your audience, showcases your expertise, and describes your products and services.",
    },
    {
      number: "6",
      title: "Testing, Review, Launch",
      description: "Before your site goes live, we thoroughly test it to ensure a smooth launch. Once it’s live, we monitor its performance, making adjustments as needed to keep it climbing in search rankings.",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">Our SEO Services Process</h2>
        <p className="text-center text-gray-600 mb-12">
          We boost your business with expert affordable SEO services and achieve success in our industry! We follow these steps to make sure you get great results:
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-500 mb-4 text-2xl font-bold">
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
