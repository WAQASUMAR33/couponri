import React, { useState, useRef } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import Image from "next/image";

const RightSide = ({ offers, company }) => {
  const offersArray = Array.isArray(offers) ? offers : [];

  if (offersArray.length === 0) {
    return <div>No offers set by this company.</div>;
  }

  return (
    <div className="w-full p-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Verified Coupons</h2>
      <div className="space-y-4">
        {offersArray.map((offer, index) => (
          <OfferCard key={index} offer={offer} company={company} />
        ))}
      </div>
    </div>
  );
};

const OfferCard = ({ offer, company }) => {
  const newTabRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [copyMessage, setCopyMessage] = useState(''); // New state for copy message

  // Function to parse offer title for % discounts, $ discounts, or Free offers
  const getOfferDetails = (title) => {
    let leftSideText = '';
    let rightSideText = '';
    let offerType = '';

    // Check for percentage discount first
    const percentageMatch = title.match(/(\d+)%/);
    if (percentageMatch) {
      leftSideText = `${percentageMatch[1]}%`; // Include the percentage sign
      rightSideText = 'OFF'; // Display "OFF" below the percentage value
      offerType = 'percentage';
    } else {
      // Check for dollar discount
      const dollarMatch = title.match(/\$(\d+)/);
      if (dollarMatch) {
        leftSideText = `$${dollarMatch[1]}`; // Include the dollar sign
        rightSideText = 'OFF'; // Display "OFF" below the dollar value
        offerType = 'dollar';
      } else {
        // Check for "Free" offer
        if (title.toLowerCase().includes('free')) {
          leftSideText = 'Free'; // Display "Free"
          rightSideText = 'Shipping'; // Or any other relevant word
          offerType = 'free';
        }
      }
    }

    return { leftSideText, rightSideText, offerType };
  };

  const { leftSideText, rightSideText } = getOfferDetails(offer.offer_title);

  const handleShowCode = (offer) => {
    newTabRef.current = window.open(offer.offer_affiliateLink, '_blank', 'noopener,noreferrer');
    setShowPopup(true);
  };

  const handleGetOffer = (offer) => {
    newTabRef.current = window.open(offer.offer_affiliateLink, '_blank', 'noopener,noreferrer');
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setCopyMessage(''); // Reset copy message when closing popup
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCopyCode = () => {
    if (offer.offer_code) {
      navigator.clipboard.writeText(offer.offer_code);
      setCopyMessage('Coupon code copied!'); // Set copy message
      setTimeout(() => setCopyMessage(''), 2000); // Clear message after 2 seconds
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-b border-gray-200 relative flex flex-col justify-between h-full ">
      <div className="flex justify-center items-center space-x-4">
        <div className="flex flex-col items-center px-4">
          {/* Display the offer value and the sign (e.g., %, $, or Free) */}
          <span className="text-blue-600 text-xl sm:text-2xl font-bold">{leftSideText}</span>
          <span className="text-gray-600 text-sm">{rightSideText}</span> {/* Display the word below */}
          {/* Display "Code" or "Free" based on offer type */}
          {offer.offer_type !== 'Offer' ? (
            <span className="bg-orange-400 text-white text-xs font-bold rounded px-2 py-1 mt-2">Code</span>
          ) : (
            <span className="bg-green-500 text-white text-xs font-bold rounded px-2 py-1 mt-2">Offer</span>
          )}
        </div>
        <div className="ml-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1">{offer.offer_title}</h3>
            <p className="text-gray-600 text-sm sm:text-base mb-2">{offer.offer_description}</p>
            <p className="text-sm text-gray-500 flex items-center">
              <FaCheckCircle className="text-blue-600 mr-1" /> Verified coupon
            </p>
          </div>
          {/* Button on the right side */}
          <div className="flex justify-end">
            {offer.offer_type !== 'Offer' ? (
              <button
                className="relative min-w-[150px] bg-[#07069F] text-white py-3 px-8 text-sm font-bold rounded-lg cursor-pointer overflow-hidden transition duration-300 ease-in-out hover:bg-[#07069F] group"
                onClick={() => handleShowCode(offer)}
              >
                Show Code
                <span className="corner top-right-corner absolute top-0 right-0 w-[30px] h-[30px] bg-[#cdcdf8] clip-path-polygon-100_0_0_0_100_100 transition-transform duration-0 transform-origin-top-right group-hover:scale-125 group-hover:right-[3px] group-hover:-translate-x-[0px] group-hover:-translate-y-[0px]"></span>
                <span className="corner bottom-left-corner absolute top-0 right-0 w-[30px] h-[30px] bg-[#5858c3] clip-path-polygon-0_100_100_100_0_0 transition-transform duration-0 transform-origin-bottom-left group-hover:scale-125 group-hover:right-[3px] group-hover:-translate-x-[0px] group-hover:translate-y-[0px]"></span>
              </button>
            ) : (
              <button
                className="relative min-w-[150px] bg-[#07069F] text-white py-3 px-8 text-sm font-bold rounded-lg cursor-pointer overflow-hidden transition duration-300 ease-in-out hover:bg-[#07069F] group"
                onClick={() => handleGetOffer(offer)}
              >
                Get Offer
              </button>
            )}
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 sm:p-8 flex flex-col justify-center rounded-lg shadow-lg w-full h-[90vh] max-w-3xl relative">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold"
            >
              &times;
            </button>
            <Image
                 width={1000}
                  height={1000}
                  placeholder="data:image/jpeg;base64,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"
          
              src={`https://m3xtrader.com/coupon/uploads/${company.comp_logo}`}
              alt={company.com_title}
              className="h-40 w-40 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-center">
              {offer.offer_title}
            </h3>
            <div className='px-16 py-2 border-[1px] mb-4 w-auto mx-auto border-gray-800 h-auto flex justify-center items-center'>
            <p className="text-3xl text-center font-semibold ">
              {offer.offer_code ? offer.offer_code : 'No coupon code needed'}
            </p>
            </div>
            {/* Copy Code Button */}
            {offer.offer_code && (
              <button
                onClick={handleCopyCode}
                className="bg-gray-200 text-gray-700 px-4 py-2 mx-auto rounded-full hover:bg-gray-300 w-auto mb-4"
              >
                Copy Code
              </button>
            )}

            {copyMessage && (
              <p className="text-green-600 text-center mb-2">{copyMessage}</p>
            )}

            <button
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-auto mx-auto mb-4"
              onClick={() => window.open(offer.offer_affiliateLink, '_blank')}
            >
              Use a {company.com_title}
            </button>

            <p className="text-center text-sm text-gray-600 mb-2">
              Copy the code, then go to {company.com_title} and paste it in during checkout.
            </p>

            {/* <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Did this code work?</p>
              <button className="bg-green-500 text-white px-2 py-1 rounded mx-2 hover:bg-green-600">Yes</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded mx-2 hover:bg-red-600">No</button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default RightSide;
