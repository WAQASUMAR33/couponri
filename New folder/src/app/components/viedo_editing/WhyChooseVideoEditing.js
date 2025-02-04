// components/WhyChooseVideoEditing.js
import { PencilSquareIcon } from '@heroicons/react/24/outline';

export default function WhyChooseVideoEditing() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md flex flex-col">
            <div className="flex items-center mb-4">
              <PencilSquareIcon className="h-8 w-8 text-white mr-4" />
              <h3 className="text-2xl font-semibold">Why Choose Our Video Editing Services?</h3>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>Wedding video editing services</li>
              <li>YouTube video editing services</li>
              <li>Social media video editing</li>
              <li>Film editing services</li>
              <li>Post-production video editing</li>
              <li>Promotional video editing</li>
              <li>Educational videos</li>
              <li>Podcast videos</li>
              <li>Testimonial videos</li>
              <li>And much more...</li>
            </ul>
          </div>
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md flex flex-col">
            <div className="flex items-center mb-4">
              <PencilSquareIcon className="h-8 w-8 text-white mr-4" />
              <h3 className="text-2xl font-semibold">What We Offer</h3>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>Reformatting of video</li>
              <li>Trimming of any video</li>
              <li>Culling of videos</li>
              <li>Color grading</li>
              <li>Logo animation</li>
              <li>Adding music and sound effects</li>
              <li>Adding the best motion graphics</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
