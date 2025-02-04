import React from 'react';

export default function IntroCallForm() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Fill out the form to book intro call</h2>
          <p className="text-gray-700 mb-4">Register for the Zoom presentation and receive:</p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>A comprehensive blueprint for designing the ideal marketing department.</li>
            <li>Detailed analysis of successful case studies tailored to your industry.</li>
            <li>Personal recommendations from a strategic marketing expert.</li>
            <li>A preliminary work plan outlining actionable steps.</li>
            <li>Exclusive terms for packages from 3 months.</li>
          </ul>
        </div>
        <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="name">Your name</label>
              <input className="w-full border border-gray-300 p-3 rounded-lg" type="text" id="name" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="email">Your email</label>
              <input className="w-full border border-gray-300 p-3 rounded-lg" type="email" id="email" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="subject">Subject</label>
              <input className="w-full border border-gray-300 p-3 rounded-lg" type="text" id="subject" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="message">Your message (optional)</label>
              <textarea className="w-full border border-gray-300 p-3 rounded-lg" id="message" rows="4"></textarea>
            </div>
            <button className="w-full bg-blue-900 text-white font-medium py-3 rounded-lg" type="submit">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
