import { IconProps } from ".";

const FacebookIcon = ({ width = "24" }: IconProps) => (
  <svg width={width} height={width} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10.5" fill="url(#paint0_linear_1420_1008)" />
    <path
      d="M15.9103 15.2112L16.3767 12.2476H13.4589V10.3252C13.4589 9.51428 13.8657 8.7233 15.1726 8.7233H16.5V6.20024C16.5 6.20024 15.2959 6 14.1452 6C11.7411 6 10.1712 7.4197 10.1712 9.98883V12.2476H7.5V15.2112H10.1712V22.3759C10.7075 22.458 11.2562 22.5 11.8151 22.5C12.374 22.5 12.9226 22.458 13.4589 22.3759V15.2112H15.9103Z"
      fill="white"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1420_1008"
        x1="12"
        y1="1.5"
        x2="12"
        y2="22.4377"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#18ACFE" />
        <stop offset="1" stopColor="#0163E0" />
      </linearGradient>
    </defs>
  </svg>
);

export default FacebookIcon;
