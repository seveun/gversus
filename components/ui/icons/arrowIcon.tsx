import { IconProps } from ".";

const ArrowIcon: React.FC<IconProps> = ({
  opacity,
  className,
  width = "20",
  color = "#17181A",
}) => (
  <svg
    className={className}
    width={width}
    height={width}
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M3.3335 10H16.6668M16.6668 10L11.6668 5M16.6668 10L11.6668 15"
      stroke={color}
      strokeOpacity={opacity || 0.75}
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowIcon;
