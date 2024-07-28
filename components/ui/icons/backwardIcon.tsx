import { IconProps } from ".";

const BackwardIcon: React.FC<IconProps> = ({
  className,
  width = "14",
}: IconProps) => (
  <svg
    width={width}
    height={width}
    viewBox="0 0 20 20"
    fill="none"
    className={className}
  >
    <g id="flip-backward">
      <path
        id="Icon"
        d="M2.5 7.50008H13.75C15.8211 7.50008 17.5 9.17901 17.5 11.2501C17.5 13.3211 15.8211 15.0001 13.75 15.0001H10M2.5 7.50008L5.83333 4.16675M2.5 7.50008L5.83333 10.8334"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export default BackwardIcon;
