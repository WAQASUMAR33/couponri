// components/SocialMediaSteps.js
export default function SocialMediaSteps() {
    const steps = [
      {
        number: "1",
        title: "Getting Online",
        description:
          "Social media marketing keeps getting better and more powerful for businesses and brands. If you have a smart strategy for what you post on social media, you can get more people to like, share, and talk about your business, which brings more attention to you.",
      },
      {
        number: "2",
        title: "Target Audience",
        description:
          "We provide essential services for companies of diverse natures that aim to have greater consideration online. Whether you're a startup or an old player on the market, we have the marketing background well-trained, and a broad selection of marketing instruments to take your business to the heights of success.",
      },
      {
        number: "3",
        title: "Boosting Search Rankings",
        description:
          "Search engines like Google and Bing now include social media updates and comments in their search results. This means the more people talk about your business on social media, the more visitors you get on your website, and that makes your website show up higher in search results.",
      },
      {
        number: "4",
        title: "Building Trust",
        description:
          "Many people use social media to learn about products and brands. They also listen to recommendations from social media influencers. With a good social media strategy, you can make more people aware of your brand and show them why they should trust you.",
      },
      {
        number: "5",
        title: "Creating Meaningful Connections",
        description:
          "Knowing how to use social media for marketing helps you become a leader in your industry and connect deeply with your followers. Our social media experts share useful content and talk about your business online to understand what your audience wants.",
      },
      {
        number: "6",
        title: "Get Started",
        description:
          "If you think that now is the time to increase your social media presence then don't wait. Are you ready to finally close the communication gap? Call us today for a free consultation.",
      },
    ];
  
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">Social Media Marketing Steps</h2>
          <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative bg-white p-6 rounded-lg shadow-md border border-gray-200 flex"
              >
                <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-500 text-2xl font-bold">
                  {step.number}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  