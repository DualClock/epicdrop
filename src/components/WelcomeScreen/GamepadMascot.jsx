import React from 'react';

const GamepadMascot = ({ className = '' }) => {
  return (
    <svg
      className={`gamepad-mascot ${className}`}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a475e" />
          <stop offset="50%" stopColor="#1b2838" />
          <stop offset="100%" stopColor="#0e141b" />
        </linearGradient>
        <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#66c0f4" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1a9fff" stopOpacity="0.1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse cx="100" cy="100" rx="95" ry="95" fill="url(#glowGradient)" />

      <path
        d="M30 80 C30 50, 50 30, 80 30 L120 30 C150 30, 170 50, 170 80 L170 120 C170 150, 150 170, 120 170 L80 170 C50 170, 30 150, 30 120 Z"
        fill="url(#bodyGradient)"
        stroke="#66c0f4"
        strokeWidth="2"
        filter="url(#glow)"
      />

      <circle cx="60" cy="90" r="14" fill="#1b2838" stroke="#66c0f4" strokeWidth="1.5" />
      <circle cx="60" cy="90" r="8" fill="#0e141b" />

      <circle cx="140" cy="110" r="14" fill="#1b2838" stroke="#66c0f4" strokeWidth="1.5" />
      <circle cx="140" cy="110" r="8" fill="#0e141b" />

      <g fill="#1b2838" stroke="#66c0f4" strokeWidth="1">
        <rect x="52" y="78" width="16" height="8" rx="2" />
        <rect x="56" y="74" width="8" height="16" rx="2" />
      </g>

      <g>
        <circle cx="140" cy="85" r="5" fill="#ff6b6b" opacity="0.9" />
        <circle cx="152" cy="97" r="5" fill="#4ecdc4" opacity="0.9" />
        <circle cx="128" cy="97" r="5" fill="#ffe66d" opacity="0.9" />
        <circle cx="140" cy="109" r="5" fill="#a8e6cf" opacity="0.9" />
      </g>

      <rect x="85" y="135" width="12" height="4" rx="2" fill="#3d5a80" />
      <rect x="103" y="135" width="12" height="4" rx="2" fill="#3d5a80" />

      <g className="eyes">
        <ellipse cx="75" cy="55" rx="10" ry="12" fill="white" />
        <circle cx="78" cy="55" r="5" fill="#0e141b" />
        <circle cx="79" cy="53" r="2" fill="white" />

        <ellipse cx="125" cy="55" rx="10" ry="12" fill="white" />
        <circle cx="122" cy="55" r="5" fill="#0e141b" />
        <circle cx="121" cy="53" r="2" fill="white" />
      </g>

      <path
        d="M85 72 Q100 82 115 72"
        fill="none"
        stroke="#66c0f4"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <line x1="40" y1="100" x2="20" y2="100" stroke="#66c0f4" strokeWidth="1.5" opacity="0.4" />
      <line x1="160" y1="100" x2="180" y2="100" stroke="#66c0f4" strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
};

export default GamepadMascot;