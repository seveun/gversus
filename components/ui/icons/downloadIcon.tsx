import { IconProps } from ".";
import React from "react";

const DownloadIcon: React.FC<IconProps> = ({
  width = "13",
  className,
  color = "white",
}) => (
  <svg
    width={width}
    height={width}
    className={className}
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.75 14.75H15.25M8.5 1.25V11.75M8.5 11.75L13.75 6.5M8.5 11.75L3.25 6.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DownloadIcon;
