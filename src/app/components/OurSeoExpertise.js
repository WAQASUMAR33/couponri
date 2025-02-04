import {
    ChartBarIcon,
    Cog6ToothIcon, // Updated for Heroicons v2
    LinkIcon,
    GlobeAltIcon,
    DocumentTextIcon,
    PencilSquareIcon,
    ClipboardDocumentListIcon,
    DocumentCheckIcon
  } from '@heroicons/react/24/outline';
  
  export default function OurSeoExpertise() {
    const expertiseItems = [
      {
        title: "Keyword Research",
        description: "We start by learning about your business, industry, competitors, existing content, and future needs and create a strategy for long-term success and better Google rankings.",
        icon: ChartBarIcon,
      },
      {
        title: "Optimization",
        description: "With a clear understanding of your needs, we optimize your website to improve its speed and functionality. This involves many factors, like titles, descriptions, and website structure.",
        icon: Cog6ToothIcon, // Updated name in Heroicons v2
      },
      {
        title: "Link Building and Off-Page SEO",
        description: "We help boost your website's visibility by building links and promoting your content on other websites and digital platforms through our ongoing support.",
        icon: LinkIcon,
      },
      {
        title: "On-page SEO",
        description: "On-page SEO is about making your website more visible online and getting visitors. We follow the best rules of search engines to make your site trustworthy.",
        icon: GlobeAltIcon,
      },
      {
        title: "Technical SEO",
        description: "Technical SEO optimizes the behind-the-scenes aspects of your website, like speeding up page loading times. When you fix these issues, search engines find it easier to scan the site.",
        icon: Cog6ToothIcon, // Updated name in Heroicons v2
      },
      {
        title: "Local SEO",
        description: "Many customers look for local businesses on the internet. You can make your business easier to find by improving its local SEO with Google Business Profile.",
        icon: GlobeAltIcon,
      },
      {
        title: "Keyword Selection",
        description: "We conduct thorough keyword research and select the best keywords to attract traffic to your website. We also monitor their performance over time to adjust our strategy for sustained success.",
        icon: DocumentCheckIcon,
      },
      {
        title: "Content Creation",
        description: "We work with skilled writers to create engaging content that informs your audience, showcases your expertise, describes your products and services, and enhances your brand communication.",
        icon: PencilSquareIcon,
      },
      {
        title: "Testing, Review, Launch",
        description: "Before your site goes live, we conduct strict testing to ensure a smooth launch. Once it’s live, we continuously monitor its performance.",
        icon: ClipboardDocumentListIcon,
      },
    ];
  
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">Our Expertise</h2>
          <p className="text-center text-gray-600 mb-12">
            We are experts in many technologies, such as HTML, CSS, JavaScript, and a range of frameworks needed for your website to be trendy and competitive.
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
  