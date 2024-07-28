import { IconProps } from ".";

const usersIcon: React.FC<IconProps> = ({ width = "16", className = "" }) => (
  <svg
    width={width}
    height={width}
    className={className}
    viewBox="0 0 16 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 1.60082C12.1113 2.15308 12.875 3.29985 12.875 4.625C12.875 5.95015 12.1113 7.09692 11 7.64918M12.5 11.5748C13.6336 12.0878 14.6544 12.9237 15.5 14M0.5 14C1.95987 12.1419 3.94188 11 6.125 11C8.30812 11 10.2901 12.1419 11.75 14M9.5 4.625C9.5 6.48896 7.98896 8 6.125 8C4.26104 8 2.75 6.48896 2.75 4.625C2.75 2.76104 4.26104 1.25 6.125 1.25C7.98896 1.25 9.5 2.76104 9.5 4.625Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default usersIcon;
