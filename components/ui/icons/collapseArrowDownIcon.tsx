import { IconProps } from ".";

const CollapseArrowDownIcon: React.FC<IconProps> = ({ width = "20" }) => (
  <svg
    width={width}
    height={width}
    viewBox="0 0 10 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.62188 5.80051L0.283867 1.46247C0.0746484 1.25325 0.0746484 0.914057 0.283867 0.704861L0.789827 0.198901C0.998689 -0.00996047 1.33719 -0.0103624 1.54655 0.198008L5.0007 3.63598L8.45483 0.198008C8.66418 -0.0103624 9.00268 -0.00996047 9.21154 0.198901L9.7175 0.704861C9.92672 0.91408 9.92672 1.25328 9.7175 1.46247L5.37951 5.80051C5.17029 6.00971 4.8311 6.00971 4.62188 5.80051Z"
      fill="white"
    />
  </svg>
);

export default CollapseArrowDownIcon;
