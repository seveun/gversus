import { IconProps } from ".";

const VolumeMuteIcon: React.FC<IconProps> = ({
  className,
  width = "15",
  color = "white",
}: IconProps) => (
  <svg
    className={className}
    stroke={color}
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
    <line x1="22" x2="16" y1="9" y2="15"></line>
    <line x1="16" x2="22" y1="9" y2="15"></line>
  </svg>
);

export default VolumeMuteIcon;
