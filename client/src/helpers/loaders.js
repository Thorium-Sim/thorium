import React from "react";
export function Audio(props) {
  return (
    <svg
      height={props.height}
      width={props.width}
      fill={props.color}
      viewBox="0 0 55 80"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="matrix(1 0 0 -1 0 80)">
        <rect width="10" height="20" rx="3">
          <animate
            attributeName="height"
            begin="0s"
            dur="4.3s"
            values="20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="15" width="10" height="80" rx="3">
          <animate
            attributeName="height"
            begin="0s"
            dur="2s"
            values="80;55;33;5;75;23;73;33;12;14;60;80"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="30" width="10" height="50" rx="3">
          <animate
            attributeName="height"
            begin="0s"
            dur="1.4s"
            values="50;34;78;23;56;23;34;76;80;54;21;50"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="45" width="10" height="30" rx="3">
          <animate
            attributeName="height"
            begin="0s"
            dur="2s"
            values="30;45;13;80;56;72;45;76;34;23;67;30"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </rect>
      </g>
    </svg>
  );
}

export function BallTrangle(svg) {
  return (
    <svg
      height={svg.height}
      width={svg.width}
      stroke={svg.color}
      viewBox="0 0 57 57"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="2">
          <circle cx="5" cy="50" r="5">
            <animate
              attributeName="cy"
              begin="0s"
              dur="2.2s"
              values="50;5;50;50"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cx"
              begin="0s"
              dur="2.2s"
              values="5;27;49;5"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="27" cy="5" r="5">
            <animate
              attributeName="cy"
              begin="0s"
              dur="2.2s"
              from="5"
              to="5"
              values="5;50;50;5"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cx"
              begin="0s"
              dur="2.2s"
              from="27"
              to="27"
              values="27;49;5;27"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="49" cy="50" r="5">
            <animate
              attributeName="cy"
              begin="0s"
              dur="2.2s"
              values="50;50;5;50"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cx"
              from="49"
              to="49"
              begin="0s"
              dur="2.2s"
              values="49;5;27;49"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
  );
}

export function Bars(svg) {
  return (
    <svg
      width={svg.height}
      height={svg.width}
      fill={svg.color}
      viewBox="0 0 135 140"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="10" width="15" height="120" rx="6">
        <animate
          attributeName="height"
          begin="0.5s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          begin="0.5s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="30" y="10" width="15" height="120" rx="6">
        <animate
          attributeName="height"
          begin="0.25s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          begin="0.25s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="60" width="15" height="140" rx="6">
        <animate
          attributeName="height"
          begin="0s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          begin="0s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="90" y="10" width="15" height="120" rx="6">
        <animate
          attributeName="height"
          begin="0.25s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          begin="0.25s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="120" y="10" width="15" height="120" rx="6">
        <animate
          attributeName="height"
          begin="0.5s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          begin="0.5s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
}

export function Circles(svg) {
  return (
    <svg
      width={svg.width}
      height={svg.height}
      viewBox="0 0 135 135"
      xmlns="http://www.w3.org/2000/svg"
      fill={svg.color}
    >
      <path d="M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 67 67"
          to="-360 67 67"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </path>
      <path d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 67 67"
          to="360 67 67"
          dur="8s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}

export function Grid(svg) {
  return (
    <svg
      width={svg.width}
      height={svg.height}
      viewBox="0 0 105 105"
      fill={svg.color}
    >
      <circle cx="12.5" cy="12.5" r="12.5">
        <animate
          attributeName="fillOpacity"
          begin="0s"
          dur="1s"
          values="1;.2;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="12.5" cy="52.5" r="12.5">
        <animate
          attributeName="fill-opacity"
          begin="100ms"
          dur="1s"
          values="1;.2;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="52.5" cy="12.5" r="12.5">
        <animate
          attributeName="fill-opacity"
          begin="300ms"
          dur="1s"
          values="1;.2;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="52.5" cy="52.5" r="12.5">
        <animate
          attributeName="fill-opacity"
          begin="600ms"
          dur="1s"
          values="1;.2;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="92.5" cy="12.5" r="12.5">
        <animate
          attributeName="fill-opacity"
          begin="800ms"
          dur="1s"
          values="1;.2;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="92.5" cy="52.5" r="12.5">
        <animate
          attributeName="fill-opacity"
          begin="400ms"
          dur="1s"
          values="1;.2;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="12.5" cy="92.5" r="12.5">
        <animate
          attributeName="fill-opacity"
          begin="700ms"
          dur="1s"
          values="1;.2;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="52.5" cy="92.5" r="12.5">
        <animate
          attributeName="fill-opacity"
          begin="500ms"
          dur="1s"
          values="1;.2;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="92.5" cy="92.5" r="12.5">
        <animate
          attributeName="fill-opacity"
          begin="200ms"
          dur="1s"
          values="1;.2;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

export function Oval(svg) {
  return (
    <svg
      width={svg.width}
      height={svg.height}
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      stroke={svg.color}
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="2">
          <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  );
}

export function Puff(svg) {
  return (
    <svg
      width={svg.width}
      height={svg.height}
      viewBox="0 0 44 44"
      xmlns="http://www.w3.org/2000/svg"
      stroke={svg.color}
    >
      <g fill="none" fillRule="evenodd" strokeWidth="2">
        <circle cx="22" cy="22" r="1">
          <animate
            attributeName="r"
            begin="0s"
            dur="1.8s"
            values="1; 20"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.165, 0.84, 0.44, 1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="strokeOpacity"
            begin="0s"
            dur="1.8s"
            values="1; 0"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.3, 0.61, 0.355, 1"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="22" cy="22" r="1">
          <animate
            attributeName="r"
            begin="-0.9s"
            dur="1.8s"
            values="1; 20"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.165, 0.84, 0.44, 1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="strokeOpacity"
            begin="-0.9s"
            dur="1.8s"
            values="1; 0"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.3, 0.61, 0.355, 1"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
}

export function Rings(svg) {
  return (
    <svg
      width={svg.width}
      height={svg.height}
      viewBox="0 0 45 45"
      xmlns="http://www.w3.org/2000/svg"
      stroke={svg.color}
    >
      <g
        fill="none"
        fillRule="evenodd"
        transform="translate(1 1)"
        strokeWidth="2"
      >
        <circle cx="22" cy="22" r="6" strokeOpacity="0">
          <animate
            attributeName="r"
            begin="1.5s"
            dur="3s"
            values="6;22"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            begin="1.5s"
            dur="3s"
            values="1;0"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-width"
            begin="1.5s"
            dur="3s"
            values="2;0"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="22" cy="22" r="6" strokeOpacity="0">
          <animate
            attributeName="r"
            begin="3s"
            dur="3s"
            values="6;22"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="strokeOpacity"
            begin="3s"
            dur="3s"
            values="1;0"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="strokeWidth"
            begin="3s"
            dur="3s"
            values="2;0"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="22" cy="22" r="8">
          <animate
            attributeName="r"
            begin="0s"
            dur="1.5s"
            values="6;1;2;3;4;5;6"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
}

export function TailSpin(svg) {
  return (
    <svg
      width={svg.width}
      height={svg.height}
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
          <stop stopColor={svg.color} stopOpacity="0" offset="0%" />
          <stop stopColor={svg.color} stopOpacity=".631" offset="63.146%" />
          <stop stopColor={svg.color} offset="100%" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)">
          <path
            d="M36 18c0-9.94-8.06-18-18-18"
            id="Oval-2"
            stroke="url(#a)"
            strokeWidth="2"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </path>
          <circle fill="#fff" cx="36" cy="18" r="1">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
  );
}

export function ThreeDots(svg) {
  return (
    <svg
      width={svg.width}
      height={svg.height}
      viewBox="0 0 120 30"
      xmlns="http://www.w3.org/2000/svg"
      fill={svg.color}
    >
      <circle cx="15" cy="15" r="15">
        <animate
          attributeName="r"
          from="15"
          to="15"
          begin="0s"
          dur="0.8s"
          values="15;9;15"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fillOpacity"
          from="1"
          to="1"
          begin="0s"
          dur="0.8s"
          values="1;.5;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="60"
        cy="15"
        r="9"
        attributeName="fillOpacity"
        from="1"
        to="0.3"
      >
        <animate
          attributeName="r"
          from="9"
          to="9"
          begin="0s"
          dur="0.8s"
          values="9;15;9"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fillOpacity"
          from="0.5"
          to="0.5"
          begin="0s"
          dur="0.8s"
          values=".5;1;.5"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="105" cy="15" r="15">
        <animate
          attributeName="r"
          from="15"
          to="15"
          begin="0s"
          dur="0.8s"
          values="15;9;15"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fillOpacity"
          from="1"
          to="1"
          begin="0s"
          dur="0.8s"
          values="1;.5;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
