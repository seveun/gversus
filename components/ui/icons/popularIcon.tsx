import { IconProps } from ".";

const PopularIcon: React.FC<IconProps> = ({ className, width = 30 }) => (
  <svg
    className={className}
    width={width}
    height={width}
    viewBox="0 0 14 11"
    fill="none"
  >
    <g id="fire-fill">
      <path
        id="Icon"
        d="M6.93339 1.84501C6.78568 4.06847 5.38214 5.30257 4.61047 5.98109C4.5099 6.06952 4.42006 6.14851 4.34513 6.21903L4.34504 6.21912C3.77946 6.75112 3.38674 7.44076 3.21782 8.19864C3.04889 8.95651 3.11154 9.74765 3.39765 10.4695C3.68376 11.1913 4.18012 11.8106 4.82239 12.2469C5.46464 12.6833 6.22317 12.9166 6.99963 12.9167L6.93339 1.84501ZM6.93339 1.84501C8.24446 2.80634 9.12396 3.72497 9.44195 4.67895C9.793 5.73208 9.50089 6.99996 7.81274 8.68811L6.95919 9.54167H8.1663H8.17174C8.47513 9.54167 8.91429 9.54169 9.47411 9.32895C9.87447 9.17682 10.3185 8.92351 10.821 8.51189C10.855 8.68923 10.8746 8.86553 10.8746 9.04167C10.8746 10.0694 10.4664 11.055 9.73967 11.7817C9.01297 12.5084 8.02737 12.9167 6.99967 12.9167L6.93339 1.84501Z"
        fill="white"
        stroke="white"
      />
    </g>
  </svg>
);

export default PopularIcon;