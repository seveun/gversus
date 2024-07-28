const FilterIcon = ({ width = "14", className = "" }) => (
  <svg
    width={width}
    height={width}
    className={className}
    viewBox="0 0 14 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 5H11M1 1H13M5 9H9"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default FilterIcon;
