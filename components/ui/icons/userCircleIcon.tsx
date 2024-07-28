import { IconProps } from ".";

const UserCircleIcon = ({ width = "400" }: IconProps) => {
  return (
    <>
      <svg
        width={width}
        height={width}
        viewBox="0 0 400 216"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_5055_29031"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="32"
          y="-120"
          width="336"
          height="336"
        >
          <rect
            width="336"
            height="336"
            transform="translate(32 -120)"
            fill="url(#paint0_radial_5055_29031)"
          />
        </mask>
        <g mask="url(#mask0_5055_29031)">
          <circle
            cx="200"
            cy="48"
            r="47.5"
            stroke="#EAECF0"
            strokeOpacity="0.1"
          />
          <circle
            cx="200"
            cy="48"
            r="47.5"
            stroke="#EAECF0"
            strokeOpacity="0.1"
          />
          <circle
            cx="200"
            cy="48"
            r="71.5"
            stroke="#EAECF0"
            strokeOpacity="0.1"
          />
          <circle
            cx="200"
            cy="48"
            r="95.5"
            stroke="#EAECF0"
            strokeOpacity="0.1"
          />
          <circle
            cx="200"
            cy="48"
            r="119.5"
            stroke="#EAECF0"
            strokeOpacity="0.1"
          />
          <circle
            cx="200"
            cy="48"
            r="143.5"
            stroke="#EAECF0"
            strokeOpacity="0.1"
          />
          <circle
            cx="200"
            cy="48"
            r="167.5"
            stroke="#EAECF0"
            strokeOpacity="0.1"
          />
        </g>
        <rect
          x="176"
          y="24"
          width="48"
          height="48"
          rx="24"
          fill="white"
          fillOpacity="0.05"
        />
        <rect
          x="172"
          y="20"
          width="56"
          height="56"
          rx="28"
          stroke="white"
          strokeOpacity="0.02"
          strokeWidth="8"
        />
        <path
          d="M207 57V51M204 54H210M200 51H196C194.136 51 193.204 51 192.469 51.3045C191.489 51.7105 190.71 52.4892 190.304 53.4693C190 54.2044 190 55.1362 190 57M203.5 39.2908C204.966 39.8841 206 41.3213 206 43C206 44.6787 204.966 46.1159 203.5 46.7092M201.5 43C201.5 45.2091 199.709 47 197.5 47C195.291 47 193.5 45.2091 193.5 43C193.5 40.7909 195.291 39 197.5 39C199.709 39 201.5 40.7909 201.5 43Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <radialGradient
            id="paint0_radial_5055_29031"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(168 168) rotate(90) scale(168 168)"
          >
            <stop />
            <stop offset="1" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </>
  );
};

export default UserCircleIcon;
