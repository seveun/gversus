const GoldCardIcon = ({ className = "" }) => {
  return (
    <svg className={className} viewBox="12 6 130 190" fill="none">
      <g filter="url(#filter0_d_1663_76099)">
        <g clipPath="url(#clip0_1663_76099)">
          <rect x="12" y="12" width="130" height="180" rx="8" fill="#FFC800" />
          <g clipPath="url(#clip1_1663_76099)">
            <rect
              x="18.5"
              y="18.5"
              width="117"
              height="167"
              rx="3.5"
              fill="url(#paint0_linear_1663_76099)"
            />
            <g filter="url(#filter1_f_1663_76099)">
              <rect
                x="22.1992"
                y="70"
                width="118"
                height="80"
                fill="url(#pattern0_1663_76099)"
                fillOpacity="0.3"
              />
            </g>
            <rect
              x="22.1992"
              y="70"
              width="118"
              height="80"
              fill="url(#pattern1_1663_76099)"
            />
          </g>
          <g
            style={{
              mixBlendMode: "soft-light",
            }}
            clipPath="url(#clip2_1663_76099)"
          >
            <g
              style={{
                mixBlendMode: "soft-light",
              }}
            >
              <path
                d="M78.8498 20H120.199L57.5486 200H16.1992L78.8498 20Z"
                fill="url(#paint1_linear_1663_76099)"
              />
            </g>
            <g
              style={{
                mixBlendMode: "soft-light",
              }}
            >
              <path
                d="M130.104 20H146.199L84.2945 200H68.1992L130.104 20Z"
                fill="url(#paint2_linear_1663_76099)"
              />
            </g>
          </g>
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_1663_76099"
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
            result="effect1_dropShadow_1663_76099"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1663_76099"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_f_1663_76099"
          x="2.19922"
          y="50"
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
            result="effect1_foregroundBlur_1663_76099"
          />
        </filter>
        <pattern
          id="pattern0_1663_76099"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use transform="matrix(0.000220549 0 0 0.000325309 0.058903 0)" />
        </pattern>
        <pattern
          id="pattern1_1663_76099"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use transform="matrix(0.000220549 0 0 0.000325309 0.058903 0)" />
        </pattern>
        <linearGradient
          id="paint0_linear_1663_76099"
          x1="81.1992"
          y1="26"
          x2="81.1992"
          y2="194"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFC700" />
          <stop offset="0.276042" stopColor="#FFDC60" />
          <stop offset="0.520833" stopColor="#FFE99A" />
          <stop offset="0.760417" stopColor="#FFDC61" />
          <stop offset="1" stopColor="#FFC700" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1663_76099"
          x1="16.1992"
          y1="20"
          x2="117.018"
          y2="201.649"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.25" />
          <stop offset="1" stopColor="white" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_1663_76099"
          x1="10.9577"
          y1="18.4571"
          x2="142.855"
          y2="202.398"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.25" />
          <stop offset="1" stopColor="white" stopOpacity="0.1" />
        </linearGradient>
        <clipPath id="clip0_1663_76099">
          <rect x="18.5" y="13" width="117" height="180" rx="8" fill="white" />
        </clipPath>
        <clipPath id="clip1_1663_76099">
          <rect
            x="22.1992"
            y="26"
            width="118"
            height="168"
            rx="4"
            fill="white"
          />
        </clipPath>
        <clipPath id="clip2_1663_76099">
          <rect
            width="130"
            height="180"
            fill="white"
            transform="translate(16.1992 20)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default GoldCardIcon;
