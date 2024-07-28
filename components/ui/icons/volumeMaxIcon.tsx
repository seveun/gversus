import { IconProps } from ".";

const VolumeMaxIcon: React.FC<IconProps> = ({
  className,
  width = "15",
  color = "white",
}: IconProps) => (
  <svg
    stroke={color}
    className={className}
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height={width}
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
  </svg>
);

export default VolumeMaxIcon;
