// components/ServicesWeOffer.js
import {
    ChartBarIcon,
    ChartPieIcon,
    DevicePhoneMobileIcon,
    VideoCameraIcon,
    EnvelopeIcon,
    ClipboardDocumentCheckIcon,
    ArrowTrendingUpIcon,
    LinkIcon,
  } from "@heroicons/react/24/outline";
  
  export default function ServicesWeOffer() {
    const services = [
      {
        title: "Improve Your SEO",
        description: "SEO helps more people find your website. We research to find the best keywords and create content that people are searching for. This gets you more organic traffic and helps your website rank better on search engines.",
        icon: ChartBarIcon,
      },
      {
        title: "Get More From PPC Ads",
        description: "PPC ads on social media can get more clicks and engagement. We figure out your target audience, use the right keywords, and create eye-catching ads to increase your ad’s return on investment.",
        icon: ChartPieIcon,
      },
      {
        title: "Enhance Your Website",
        description: "Your website needs to show off your social media presence. We design pages that match your brand visibility and showcase your social media reviews to build your trust with visitors.",
        icon: DevicePhoneMobileIcon,
      },
      {
        title: "Create Engaging Videos",
        description: "Good videos on social media get attention and make people interested. They help your brand look good and build trust. Videos are a fun way to show your products and share useful information.",
        icon: VideoCameraIcon,
      },
      {
        title: "Expand With Email Marketing",
        description: "Email marketing is a great way to reach more people. We integrate email marketing with your social media strategy to create a better customer experience and increase engagement.",
        icon: EnvelopeIcon,
      },
      {
        title: "Effective Content",
        description: "Good content is key to success in the online world. We create quality content for all your digital platforms, using research to understand your audience and make your brand stand out.",
        icon: ClipboardDocumentCheckIcon,
      },
      {
        title: "Optimize Your Conversion Rates",
        description: "We help improve your conversion rates on social media by optimizing your landing pages, creating effective calls-to-action, and testing different content types. And through this, we reach your audience.",
        icon: ArrowTrendingUpIcon,
      },
      {
        title: "Build Quality Links",
        description: "Link building is imperative for online presence. We use social media and other platforms to get more backlinks to your website, boosting your visibility and lead-generation efforts.",
        icon: LinkIcon,
      },
    ];
  
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">Services We Offered</h2>
          <p className="text-center text-gray-600 mb-12">
            Using the facilities we provide, you could begin the work from account setup to content creation, managing the community, and advertising. We have a full range of services at your disposal. Our technology-driven approach is a conventional way of ensuring all the actions are based on data.
          </p>
          <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-500 mb-4">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  