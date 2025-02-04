import React from "react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

const BreadCrumbs = ({ breadCrumbs }) => {
  return (
    <section className="py-3 bg-blue-50">
      <div className="container max-w-screen-xl mx-auto px-4">
        <ol className="flex items-center space-x-3 text-gray-700">
          {breadCrumbs?.map((breadCrumb, index) => (
            <li key={index} className="inline-flex items-center">
              <Link
                href={breadCrumb.url}
                className="text-xs md:text-sm font-medium text-gray-600 hover:text-yellow-500 transition-colors duration-200"
              >
                {breadCrumb.name}
              </Link>
              {breadCrumbs?.length - 1 !== index && (
                <FaChevronRight className="mx-2 text-gray-400" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default BreadCrumbs;
