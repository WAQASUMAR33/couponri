// components/WhatWeDo.js
'use client'
// components/WhatWeDo.js

import { CodeBracketIcon, ChartBarIcon, ArrowTrendingUpIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function WhatWeDo() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">What We Do</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* CREATE */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <CodeBracketIcon className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">CREATE</h3>
            <p>
              First, we don’t just take on projects; we become strategic partners. We start by creating roadmaps that outline clear goals and milestones, increasing your project’s success rate.
            </p>
          </div>

          {/* FOCUS */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ChartBarIcon className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">FOCUS</h3>
            <p>
              Quality is at the core of everything we do. Our exact approach ensures every step of the project’s journey is completed with precision and exceeds your expectations.
            </p>
          </div>

          {/* RANK */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ArrowTrendingUpIcon className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">RANK</h3>
            <p>
              We understand the competitive landscape. When it comes to ranking, we excel at detailed & in-depth competitor research, identifying opportunities to determine your brand.
            </p>
          </div>

          {/* REACH */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <GlobeAltIcon className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">REACH</h3>
            <p>
              We are all about extending your potential reach. Our data-driven strategies push your business forward and unlock its full potential.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
