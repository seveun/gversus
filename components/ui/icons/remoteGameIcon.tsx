import { IconProps } from ".";

const RemoteGameIcon: React.FC<IconProps> = ({
  width = "15",
  className = "",
  opacity = "0.2",
}) => (
  <svg
    width={width}
    height={width}
    className={className}
    viewBox="0 0 22 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.00014 7H9.00014M7.00014 5V9M14.0001 8H14.0101M17.0001 6H17.0101M9.44909 1H12.5512C15.1761 1 16.4885 1 17.5187 1.49743C18.4257 1.9354 19.1793 2.63709 19.6808 3.51059C20.2503 4.5027 20.3438 5.81181 20.5309 8.43002L20.7769 11.8745C20.8975 13.5634 19.5599 15 17.8667 15C17.0008 15 16.1796 14.6154 15.6253 13.9502L15.2501 13.5C14.907 13.0882 14.7354 12.8823 14.54 12.7159C14.1305 12.3672 13.6346 12.1349 13.1045 12.0436C12.8516 12 12.5836 12 12.0476 12H9.9527C9.41667 12 9.14865 12 8.89577 12.0436C8.36563 12.1349 7.86981 12.3672 7.46024 12.7159C7.26487 12.8823 7.09329 13.0882 6.75013 13.5L6.37497 13.9502C5.82064 14.6154 4.99949 15 4.13359 15C2.44037 15 1.10275 13.5634 1.22339 11.8745L1.46942 8.43002C1.65644 5.81181 1.74994 4.5027 2.31951 3.51059C2.82098 2.63709 3.57458 1.9354 4.48159 1.49743C5.51176 1 6.8242 1 9.44909 1Z"
      stroke="white"
      strokeOpacity={opacity}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default RemoteGameIcon;
