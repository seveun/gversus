import { IconProps } from ".";

const EditIcon = ({ className, width = "12", color = "black" }: IconProps) => (
  <svg
    className={className}
    width={width}
    height={width}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.9997 8.33326L11.6664 4.99993M2.08301 17.9166L4.90331 17.6032C5.24789 17.5649 5.42018 17.5458 5.58121 17.4937C5.72408 17.4474 5.86005 17.3821 5.98541 17.2994C6.12672 17.2062 6.2493 17.0836 6.49445 16.8385L17.4997 5.83326C18.4202 4.91279 18.4202 3.4204 17.4997 2.49993C16.5792 1.57945 15.0868 1.57945 14.1664 2.49992L3.16112 13.5052C2.91596 13.7503 2.79339 13.8729 2.70021 14.0142C2.61753 14.1396 2.55219 14.2755 2.50594 14.4184C2.4538 14.5794 2.43466 14.7517 2.39637 15.0963L2.08301 17.9166Z"
      stroke={color}
      strokeOpacity="0.75"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default EditIcon;
