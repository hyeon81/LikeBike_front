import React from 'react';

type IconProps = {
  color?: string;
  size?: number;
};

const PhotoIcon: React.FC<IconProps> = ({ color = '#FF7272', size = 60 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.5 52.5H47.5C50.2614 52.5 52.5 50.2614 52.5 47.5V12.5C52.5 9.73858 50.2614 7.5 47.5 7.5H12.5C9.73858 7.5 7.5 9.73858 7.5 12.5V47.5C7.5 50.2614 9.73858 52.5 12.5 52.5ZM12.5 52.5L40 25L52.5 37.5M25 21.25C25 23.3211 23.3211 25 21.25 25C19.1789 25 17.5 23.3211 17.5 21.25C17.5 19.1789 19.1789 17.5 21.25 17.5C23.3211 17.5 25 19.1789 25 21.25Z"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PhotoIcon;
