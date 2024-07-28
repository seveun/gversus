import { IconProps } from ".";

const WalletAffiliateIcon: React.FC<IconProps> = ({
  width = "18",
  className = "",
}) => (
  <svg
    className={className}
    width={width}
    height={width}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.375 10.5H12.3825M2.25 3.75V14.25C2.25 15.0784 2.92157 15.75 3.75 15.75H14.25C15.0784 15.75 15.75 15.0784 15.75 14.25V6.75C15.75 5.92157 15.0784 5.25 14.25 5.25L3.75 5.25C2.92157 5.25 2.25 4.57843 2.25 3.75ZM2.25 3.75C2.25 2.92157 2.92157 2.25 3.75 2.25H12.75M12.75 10.5C12.75 10.7071 12.5821 10.875 12.375 10.875C12.1679 10.875 12 10.7071 12 10.5C12 10.2929 12.1679 10.125 12.375 10.125C12.5821 10.125 12.75 10.2929 12.75 10.5Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default WalletAffiliateIcon;
