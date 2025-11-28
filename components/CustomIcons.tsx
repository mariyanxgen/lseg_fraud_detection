import React from 'react';

interface IconProps {
  size?: number | string;
  className?: string;
  strokeWidth?: number; // Lucide icons accept this, so we should too (even if unused)
}

export const AzureIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M12.9 2.1L4.8 16.2L12.9 21.9L21 16.2L12.9 2.1Z" 
      fill="currentColor" 
      fillOpacity="0.2"
    />
    <path 
      d="M5.5 16.5L12 5L13.5 8L9.5 15L5.5 16.5Z" 
      fill="currentColor" 
    />
    <path 
      d="M11.5 21L8 16L15 6L18 16L11.5 21Z" 
      fill="currentColor" 
      fillOpacity="0.8"
    />
  </svg>
);

export const DatabricksIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M2.5 19.5L12 23L13.5 11.5L4 8L2.5 19.5Z" 
      fill="currentColor" 
      fillOpacity="0.8"
    />
    <path 
      d="M5 6L14.5 9.5L21.5 5.5L12 2L5 6Z" 
      fill="currentColor" 
      fillOpacity="0.6"
    />
    <path 
      d="M16 11L14.5 22.5L22 17L23.5 5.5L16 11Z" 
      fill="currentColor" 
    />
  </svg>
);
