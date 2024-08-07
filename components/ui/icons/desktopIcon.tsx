import { IconProps } from ".";

const DesktopIcon: React.FC<IconProps> = ({
  width = "15",
  className = "",
  opacity = "0.2",
}) => (
  <svg
    width={width}
    height={width}
    className={className}
    viewBox="0 0 22 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 15V19H8V15M4.2 15H17.8C18.9201 15 19.4802 15 19.908 14.782C20.2843 14.5903 20.5903 14.2843 20.782 13.908C21 13.4802 21 12.9201 21 11.8V4.2C21 3.0799 21 2.51984 20.782 2.09202C20.5903 1.71569 20.2843 1.40973 19.908 1.21799C19.4802 1 18.9201 1 17.8 1H4.2C3.07989 1 2.51984 1 2.09202 1.21799C1.71569 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.07989 1 4.2V11.8C1 12.9201 1 13.4802 1.21799 13.908C1.40973 14.2843 1.71569 14.5903 2.09202 14.782C2.51984 15 3.0799 15 4.2 15Z"
      stroke="white"
      strokeOpacity={opacity}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DesktopIcon;
