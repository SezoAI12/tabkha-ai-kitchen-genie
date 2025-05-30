
import React from 'react';

export const WasfahLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="text-wasfah-bright-teal mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path>
          <line x1="6" y1="17" x2="18" y2="17"></line>
        </svg>
      </div>
      <span className="font-bold text-2xl text-wasfah-deep-teal">
        Wasfah<span className="text-wasfah-bright-teal">AI</span>
      </span>
    </div>
  );
};
