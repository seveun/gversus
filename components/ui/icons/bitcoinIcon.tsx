import React from "react";

const BitCoinIcon = ({
  width = "20",
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 15 16" fill="none" width={width} height={width} {...props}>
    <path
      d="M5.83301 5.00016H8.66634C9.49477 5.00016 10.1663 5.67174 10.1663 6.50016C10.1663 7.32859 9.49477 8.00016 8.66634 8.00016H5.83301H8.99967C9.8281 8.00016 10.4997 8.67174 10.4997 9.50016C10.4997 10.3286 9.8281 11.0002 8.99967 11.0002H5.83301M5.83301 5.00016H4.83301M5.83301 5.00016V11.0002M5.83301 11.0002H4.83301M6.16634 4.00016V5.00016M6.16634 11.0002V12.0002M8.16634 4.00016V5.00016M8.16634 11.0002V12.0002M14.1663 8.00016C14.1663 11.6821 11.1816 14.6668 7.49967 14.6668C3.81778 14.6668 0.833008 11.6821 0.833008 8.00016C0.833008 4.31826 3.81778 1.3335 7.49967 1.3335C11.1816 1.3335 14.1663 4.31826 14.1663 8.00016Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default BitCoinIcon;
