// components/ApproachToWebDevelopment.js

export default function ApproachToWebDevelopment() {
    const steps = [
      {
        number: "1",
        title: "Discovery & Analysis",
        description: "Our first step is to define the goal exactly. By doing in-depth analysis we collect information about your purpose of business, your clients, and your competitors. We believe in a solid foundation that your website has to be constructed on it."
      },
      {
        number: "2",
        title: "Strategic Planning",
        description: "Subsequently, we create a strategic plan that outlines the project schedule, milestones, and deliverables. We walk through the planning process with great detail to set you up for success in achieving your desired goals along the way."
      },
      {
        number: "3",
        title: "Innovative Design",
        description: "We convert your brand into an illustrated story in our design team. As a design agency that values user experience, we produce alluring and interactive websites that excite visitors and prompt them to interact."
      },
      {
        number: "4",
        title: "Technical Execution",
        description: "Content is undoubtedly the key and therefore we give it priority. We create highly appealing content your consumers will be able to relate to, build your brand and enhance your search engine position."
      },
      {
        number: "5",
        title: "Content Development",
        description: "Content is undoubtedly the key and therefore we give it priority. We create highly appealing content your consumers will be able to relate to, build your brand and enhance your search engine position."
      },
      {
        number: "6",
        title: "Ongoing Support",
        description: "By choosing our ongoing support plan, you can focus on scaling your business while we take care of all the technical aspects of your website, giving you peace of mind and more time to grow your brand."
      },
    ];
  
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-4">Our Approach to Web Development</h2>
          <p className="text-center text-gray-600 mb-12">
            We designed our web development services to cover every detail from idea generation to deployment. Even then, our passionate website development team is still on hand post-deployment to provide on-demand support and continued improvement that optimizes your online performance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-gray-50 text-gray-800 rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500 text-white font-bold text-lg mr-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                </div>
                <p>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  