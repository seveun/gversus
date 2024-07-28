const WheelCursorIcon = ({ width = "24", className = "" }) => (
  <svg
    width={width}
    height={width}
    className={className}
    viewBox="0 0 141 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Vector" filter="url(#filter0_d_6057_34856)">
      <path
        d="M116.644 0.822413L2.86774 18.4877C0.343565 18.8784 0.343565 22.5424 2.86774 22.9331L116.644 40.6089C124.814 42.2033 133.329 38.8561 137.791 31.7815C139.812 28.5822 140.975 24.7809 140.975 20.7157C140.975 16.6504 139.802 12.8492 137.791 9.64978C133.329 2.57521 124.917 -0.329336 116.644 0.822413ZM129.998 20.9902C129.998 27.1144 125.065 32.0878 118.99 32.0878C112.915 32.0878 107.982 27.1144 107.982 20.9902C107.982 14.8659 112.915 9.89264 118.99 9.89264C125.065 9.89264 129.998 14.8659 129.998 20.9902Z"
        fill="url(#paint0_linear_6057_34856)"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_6057_34856"
        x="-19.0254"
        y="-19.4229"
        width="180"
        height="80.4229"
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
        <feOffset />
        <feGaussianBlur stdDeviation="10" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_6057_34856"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_6057_34856"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear_6057_34856"
        x1="0.974608"
        y1="20.7887"
        x2="140.975"
        y2="20.7887"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF5E35" />
        <stop offset="1" stopColor="#FF4A1C" />
      </linearGradient>
    </defs>
  </svg>
);

export default WheelCursorIcon;
