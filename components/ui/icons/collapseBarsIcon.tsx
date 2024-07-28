import { IconProps } from ".";

const CollapseBarsIcon: React.FC<IconProps> = ({
  width = "20",
  className = "",
}) => (
  <svg
    width={width}
    height={width}
    className={className}
    viewBox="0 0 20 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 7H19M1 1H19M1 13H19"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CollapseBarsIcon;
