import { IconProps } from ".";

const MailIcon: React.FC<IconProps> = ({
  opacity,
  className,
  width = "20",
}) => (
  <svg
    className={className}
    width={width}
    height={width}
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M1.6665 5.8335L8.4706 10.5964C9.02158 10.982 9.29707 11.1749 9.59672 11.2496C9.86142 11.3156 10.1383 11.3156 10.403 11.2496C10.7026 11.1749 10.9781 10.982 11.5291 10.5964L18.3332 5.8335M5.6665 16.6668H14.3332C15.7333 16.6668 16.4334 16.6668 16.9681 16.3943C17.4386 16.1547 17.821 15.7722 18.0607 15.3018C18.3332 14.767 18.3332 14.067 18.3332 12.6668V7.3335C18.3332 5.93336 18.3332 5.2333 18.0607 4.69852C17.821 4.22811 17.4386 3.84566 16.9681 3.60598C16.4334 3.3335 15.7333 3.3335 14.3332 3.3335H5.6665C4.26637 3.3335 3.56631 3.3335 3.03153 3.60598C2.56112 3.84566 2.17867 4.22811 1.93899 4.69852C1.6665 5.2333 1.6665 5.93336 1.6665 7.3335V12.6668C1.6665 14.067 1.6665 14.767 1.93899 15.3018C2.17867 15.7722 2.56112 16.1547 3.03153 16.3943C3.56631 16.6668 4.26637 16.6668 5.6665 16.6668Z"
      stroke="white"
      strokeOpacity={opacity || "0.75"}
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default MailIcon;