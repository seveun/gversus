import { IconProps } from ".";
import React from "react";

const CoinsIcon: React.FC<IconProps> = ({
  width = "18",
  className,
  color = "white",
}) => (
  <svg
    className={className}
    width={width}
    height={width}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.57576 3C8.52267 2.07211 9.81952 1.5 11.25 1.5C14.1495 1.5 16.5 3.8505 16.5 6.75C16.5 8.1805 15.9279 9.47738 15 10.4243M12 11.25C12 14.1495 9.6495 16.5 6.75 16.5C3.8505 16.5 1.5 14.1495 1.5 11.25C1.5 8.3505 3.8505 6 6.75 6C9.6495 6 12 8.3505 12 11.25Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CoinsIcon;
