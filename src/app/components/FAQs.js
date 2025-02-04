'use client'
// components/FAQ.js
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between w-full p-4 text-left focus:outline-none"
      >
        <span className={isOpen ? "text-gray-800 font-semibold" : "text-gray-600"}>
          {question}
        </span>
        <span>
          {isOpen ? (
            <ChevronUpIcon className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-600" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="p-4 text-gray-600">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function FAQ() {
  const faqs = [
    {
      question: "How does CouponRI help brands build personal relationships with their customers?",
      answer:
        "We help our customers to link with their clients by using customized digital solutions made for the target customers. We give value appreciation to engagement and loyalty through the customization process.",
    },
    {
      question: "What sets CouponRI apart from other digital agencies?",
      answer:
        "Our uniqueness consists of a complete review of techniques, modern technologies, and individual treatment of each customer. We feed most of that on complex projects and we always do our best to over-deliver for every you undertake.",
    },
    {
      question: "What is the team's approach to project management and client communication?",
      answer:
        "We ensure to communicate simply and clearly along the project process making sure that the client is aware of every single step there. Utilizing our flexible project management methodology, experimenting and modifications are utilized whenever they are necessary.",
    },
    {
      question: "Can you provide examples of successful projects CouponRI has completed?",
      answer:
        "Of course, we have an extensive case studies section that features our companies and their projects in different markets. We are happy to direct you to the portfolio page of our website for you to see what some of our previous achievements look like.",
    },
    {
      question: "How does CouponRI ensure the security and scalability of its web solutions?",
      answer:
        "We stick to industry best practices and provide the most reliable security solutions connecting our customers’ data and infrastructure securely. To be fully equipped, we have developed our solutions taking scalability into account which means, they can be upscaled as our clients’ needs grow.",
    },
    {
      question: "What is CouponRI's approach to pricing and project timelines?",
      answer:
        "We implement an open pricing policy based on factors of the project and clients’ demand, and we cooperate with clients to set achievable deadlines in line with their objectives and due dates.",
    },
    {
      question: "How can I get started with CouponRI on my next digital project?",
      answer:
        "To initiate, you may reach us through the “Contact Us” section and also you can request a consultation. Now we’ll be able to talk about any project requirements, you have, and maybe ask us how we can make your vision a reality.",
    },
  ];

  return (
    <section className="bg-white p-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">FAQ’s</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
