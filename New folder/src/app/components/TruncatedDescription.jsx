// components/TruncatedDescription.jsx
import React from 'react';
import { stripHtml } from '../util/stripHtml';

const TruncatedDescription = ({ description, maxLength = 100 }) => {
  // Strip HTML tags to get plain text
  const plainText = stripHtml(description);

  // Truncate to maxLength characters
  const truncatedText =
    plainText.length > maxLength
      ? plainText.substring(0, maxLength) + '...'
      : plainText;

  return (
    <div className="text-gray-700 text-sm overflow-hidden">
      {truncatedText}
    </div>
  );
};

export default TruncatedDescription;
