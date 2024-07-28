const PlusIcon = ({
  width = "14",
  className = "",
  color = "white",
  opacity = "0.2",
}) => (
  <svg
    width={width}
    height={width}
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 1V15M1 8H15"
      stroke={color}
      strokeOpacity={opacity}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PlusIcon;
