import React from 'react';

export const GoogleMapsIcon = ({ className }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 48 48" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Red top-left section (diagonal) */}
      <path 
        d="M24 4C17.4 4 12 9.4 12 16c0 .5 0 1 .1 1.5L24 4z" 
        fill="#EA4335" 
      />
      
      {/* Blue top-right section (diagonal) */}
      <path 
        d="M24 4l11.9 13.5c.1-.5.1-1 .1-1.5 0-6.6-5.4-12-12-12z" 
        fill="#4285F4" 
      />
      
      {/* Yellow bottom-left section (diagonal) */}
      <path 
        d="M12.1 17.5c-.1.5-.1 1-.1 1.5 0 1.3.2 2.5.6 3.7L24 44V22.5L12.1 17.5z" 
        fill="#FBBC04" 
      />
      
      {/* Green bottom-right section (diagonal, largest) */}
      <path 
        d="M35.9 17.5L24 22.5V44l11.4-21.3c.4-1.2.6-2.4.6-3.7 0-.5 0-1-.1-1.5z" 
        fill="#34A853" 
      />
      
      {/* White center circle */}
      <circle 
        cx="24" 
        cy="16" 
        r="6.5" 
        fill="#FFFFFF" 
      />
    </svg>
  );
};