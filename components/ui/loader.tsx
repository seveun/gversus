import { motion } from "framer-motion";

const Loader = ({ width = "20", color = "#A0FFAD" }) => {
  return (
    <motion.svg
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "center" }}
      width={width}
      height={width}
      viewBox="0 0 21 20"
      fill="none"
    >
      <g id="loading-circle-progress">
        <path
          id="Background"
          d="M19.25 10C19.25 11.1491 19.0237 12.2869 18.5839 13.3485C18.1442 14.4101 17.4997 15.3747 16.6872 16.1872C15.8747 16.9997 14.9101 17.6442 13.8485 18.0839C12.7869 18.5237 11.6491 18.75 10.5 18.75C9.35093 18.75 8.21312 18.5237 7.15152 18.0839C6.08992 17.6442 5.12533 16.9997 4.31281 16.1872C3.5003 15.3747 2.85578 14.4101 2.41605 13.3485C1.97632 12.2869 1.75 11.1491 1.75 10C1.75 8.85093 1.97633 7.71312 2.41606 6.65152C2.85578 5.58992 3.50031 4.62533 4.31282 3.81281C5.12533 3.0003 6.08992 2.35578 7.15152 1.91605C8.21312 1.47632 9.35094 1.25 10.5 1.25C11.6491 1.25 12.7869 1.47633 13.8485 1.91606C14.9101 2.35579 15.8747 3.00031 16.6872 3.81282C17.4997 4.62533 18.1442 5.58993 18.5839 6.65152C19.0237 7.71312 19.25 8.85094 19.25 10L19.25 10Z"
          stroke="#17181A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Line"
          d="M10.5 1.25C11.6491 1.25 12.7869 1.47633 13.8485 1.91605C14.9101 2.35578 15.8747 3.0003 16.6872 3.81282C17.4997 4.62533 18.1442 5.58992 18.5839 6.65152C19.0237 7.71312 19.25 8.85094 19.25 10"
          stroke={`url(#paint0_linear_4096_522-${color})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <linearGradient
          id={`paint0_linear_4096_522-${color}`}
          x1="10.5"
          y1="1.25"
          x2="10.5"
          y2="18.75"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};

export default Loader;
