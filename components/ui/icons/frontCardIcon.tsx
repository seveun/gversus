const FrontCardIcon = ({ className = "", fill = "#1E2022" }) => (
  <svg
    viewBox="12 6 130 190"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g filter="url(#filter0_d_1663_76092)">
      <g clipPath="url(#clip0_1663_76092)">
        <rect x="12" y="12" width="130" height="180" rx="8" fill="#17181A" />
        <g clipPath="url(#clip1_1663_76092)">
          <rect x="18" y="18" width="118" height="168" rx="4" fill={fill} />
          <g filter="url(#filter1_f_1663_76092)">
            <rect
              x="18"
              y="62"
              width="118"
              height="80"
              fill="url(#pattern0_1663_76092)"
              fillOpacity="0.3"
            />
          </g>
          <rect
            x="18"
            y="62"
            width="118"
            height="80"
            fill="url(#pattern1_1663_76092)"
          />
        </g>
        <rect
          x="18.5"
          y="18.5"
          width="117"
          height="167"
          rx="3.5"
          stroke="url(#paint0_linear_1663_76092)"
        />
        <g
          style={{
            mixBlendMode: "soft-light",
          }}
          clipPath="url(#clip2_1663_76092)"
        >
          <g
            style={{
              mixBlendMode: "soft-light",
            }}
          >
            <path
              d="M79.4514 12H120.801L58.1502 192H16.8008L79.4514 12Z"
              fill="url(#paint1_linear_1663_76092)"
            />
          </g>
          <g
            style={{
              mixBlendMode: "soft-light",
            }}
          >
            <path
              d="M130.706 12H146.801L84.896 192H68.8008L130.706 12Z"
              fill="url(#paint2_linear_1663_76092)"
            />
          </g>
        </g>
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_1663_76092"
        x="-4"
        y="-8"
        width="170"
        height="220"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="4" />
        <feGaussianBlur stdDeviation="10" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1663_76092"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1663_76092"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_f_1663_76092"
        x="8"
        y="42"
        width="158"
        height="120"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="10"
          result="effect1_foregroundBlur_1663_76092"
        />
      </filter>
      <linearGradient
        id="paint0_linear_1663_76092"
        x1="28.3008"
        y1="18"
        x2="140.801"
        y2="186"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0" />
        <stop offset="0.494792" stopColor="white" stopOpacity="0.1" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1663_76092"
        x1="16.8008"
        y1="12"
        x2="117.62"
        y2="193.649"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0.25" />
        <stop offset="1" stopColor="white" stopOpacity="0.1" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_1663_76092"
        x1="11.5593"
        y1="10.4571"
        x2="143.457"
        y2="194.398"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0.25" />
        <stop offset="1" stopColor="white" stopOpacity="0.1" />
      </linearGradient>
      <clipPath id="clip0_1663_76092">
        <rect x="12" y="12" width="130" height="180" rx="8" fill="white" />
      </clipPath>
      <clipPath id="clip1_1663_76092">
        <rect x="18" y="18" width="118" height="168" rx="4" fill="white" />
      </clipPath>
      <clipPath id="clip2_1663_76092">
        <rect
          width="130"
          height="180"
          fill="white"
          transform="translate(16.8008 12)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default FrontCardIcon;
