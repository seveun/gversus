import { IconProps } from ".";

const AnnoucementIcon: React.FC<IconProps> = ({
  className,
  width = 14,
  color = "white",
}) => (
  <svg
    width={width}
    height={width}
    viewBox="0 0 14 12"
    fill="none"
    className={className}
  >
    <g id="announcement-03">
      <g id="Icon">
        <path
          d="M12.8346 5.54167C12.8346 7.63575 11.9205 9.33333 10.793 9.33333C9.66539 9.33333 8.7513 7.63575 8.7513 5.54167C8.7513 3.44759 9.66539 1.75 10.793 1.75C11.9205 1.75 12.8346 3.44759 12.8346 5.54167Z"
          fill={color}
        />
        <path
          d="M10.793 9.33333C11.9205 9.33333 12.8346 7.63575 12.8346 5.54167C12.8346 3.44759 11.9205 1.75 10.793 1.75M10.793 9.33333C9.66539 9.33333 8.7513 7.63575 8.7513 5.54167C8.7513 3.44759 9.66539 1.75 10.793 1.75M10.793 9.33333L3.1767 7.94856C2.63567 7.85019 2.36515 7.801 2.14641 7.69355C1.70141 7.47497 1.37001 7.07788 1.23455 6.60096C1.16797 6.36653 1.16797 6.09157 1.16797 5.54167C1.16797 4.99176 1.16797 4.71681 1.23455 4.48237C1.37001 4.00545 1.70141 3.60837 2.14641 3.38978C2.36515 3.28233 2.63567 3.23315 3.1767 3.13478L10.793 1.75M2.91797 8.16667L3.14772 11.3832C3.16954 11.6886 3.18045 11.8414 3.2469 11.9571C3.3054 12.059 3.39332 12.1409 3.49914 12.192C3.61932 12.25 3.77244 12.25 4.07868 12.25H5.11842C5.4685 12.25 5.64354 12.25 5.7731 12.1802C5.88694 12.1188 5.97717 12.0214 6.0296 11.9032C6.08928 11.7687 6.07585 11.5941 6.049 11.2451L5.83464 8.45833"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  </svg>
);

export default AnnoucementIcon;