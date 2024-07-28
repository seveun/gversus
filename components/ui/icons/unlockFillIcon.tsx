import { IconProps } from ".";

const unlockFillIcon: React.FC<IconProps> = ({
  opacity,
  className,
  width = "12",
}) => (
  <svg
    width={width}
    height={width}
    className={className}
    opacity={opacity}
    viewBox="0 0 14 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.5 4.5V6H12C13.0938 6 14 6.90625 14 8V14C14 15.125 13.0938 16 12 16H2C0.875 16 0 15.125 0 14V8C0 6.90625 0.875 6 2 6H2.5V4.5C2.5 2.03125 4.5 0 7 0C8.78125 0 10.3438 1.0625 11.0625 2.59375C11.2812 3.09375 11.0625 3.6875 10.5625 3.90625C10.0938 4.15625 9.46875 3.9375 9.25 3.4375C8.84375 2.59375 7.96875 2 7 2C5.59375 2 4.5 3.125 4.5 4.5Z"
      fill="white"
    />
  </svg>
);

export default unlockFillIcon;
