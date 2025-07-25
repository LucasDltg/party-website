import React from 'react'

const AnimatedLogo = ({ size = 45, className = '' }) => {
  return (
    <div
      className={`animated-logo ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <style>
          {`            
            .animated-logo {
              transition: transform 0.3s ease;
            }
            
            .animated-logo:hover {
              transform: scale(1.1);
            }
            
            .richGradient stop:nth-child(1) { 
              stop-color: #1e3a8a; 
              animation: pulse-primary 3s ease-in-out infinite;
            }
            
            .richGradient stop:nth-child(6) { 
              stop-color: #ea437a;
              animation: pulse-secondary 3s ease-in-out infinite;
            }
            
            .donut-base {
              animation: rotate-gradient 8s linear infinite;
              transform-origin: center;
            }
            
            .inner-shadow {
              animation: rotate-inner 12s linear infinite;
              transform-origin: center;
            }
            
            .darkening-overlay {
              animation: breathe 6s ease-in-out infinite;
            }
            
            @keyframes rotate-inner {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            @keyframes rotate-gradient {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            @keyframes pulse-primary {
              0%, 100% { stop-opacity: 1; }
              50% { stop-opacity: 0.8; }
            }
            
            @keyframes pulse-secondary {
              0%, 100% { stop-opacity: 1; }
              50% { stop-opacity: 0.9; }
            }
            
            @keyframes pulse-shadow {
              0% { opacity: 0.8; }
              100% { opacity: 0.4; }
            }
            
            @keyframes breathe {
              0%, 100% { opacity: 0.6; }
              50% { opacity: 0.3; }
            }
            
            .animated-logo:hover .donut-base {
              animation-duration: 2s;
            }
            
            .animated-logo:hover .inner-shadow {
              animation-duration: 3s;
            }
            
            /* Smooth entrance animation */
            .animated-logo {
              animation: logo-entrance 1s ease-out;
            }
            
            @keyframes logo-entrance {
              0% {
                opacity: 0;
                transform: scale(0.8) rotate(-10deg);
              }
              50% {
                opacity: 0.7;
                transform: scale(1.05) rotate(5deg);
              }
              100% {
                opacity: 1;
                transform: scale(1) rotate(0deg);
              }
            }
          `}
        </style>

        <defs>
          <linearGradient
            id="richGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
            className="richGradient"
          >
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="25%" stopColor="#2d3485" />
            <stop offset="45%" stopColor="#4c2e7f" />
            <stop offset="60%" stopColor="#6b2878" />
            <stop offset="80%" stopColor="#b9326e" />
            <stop offset="100%" stopColor="#ea437a" />
          </linearGradient>

          <radialGradient id="darkenGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="30%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="60%" stopColor="rgba(0,0,0,0)" />
            <stop offset="80%" stopColor="rgba(0,0,0,0.2)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
          </radialGradient>

          <linearGradient
            id="shadowGradient"
            x1="20%"
            y1="20%"
            x2="80%"
            y2="80%"
          >
            <stop offset="0%" stopColor="#0f1d42" />
            <stop offset="25%" stopColor="#1f2a5d" />
            <stop offset="45%" stopColor="#332f78" />
            <stop offset="60%" stopColor="#5f3458" />
            <stop offset="80%" stopColor="#7a2250" />
            <stop offset="100%" stopColor="#a50d57" />
          </linearGradient>
        </defs>

        {/* Donut base with rotation animation */}
        <path
          className="donut-base"
          d="M100,20
             A80,80 0 1,1 99.9,20
             M100,60
             A40,40 0 1,0 100.1,60"
          fill="url(#richGradient)"
          fillRule="evenodd"
        />

        {/* Darkening overlay with breathing effect */}
        <path
          className="darkening-overlay"
          d="M100,20
             A80,80 0 1,1 99.9,20
             M100,60
             A40,40 0 1,0 100.1,60"
          fill="url(#darkenGradient)"
          fillRule="evenodd"
        />

        {/* Inner shadow with pulsing effect */}
        <path
          className="inner-shadow"
          d="M100,60
             A40,40 0 1,0 100.1,60
             M100,75
             A25,25 0 1,1 99.9,75"
          fill="url(#shadowGradient)"
          fillRule="evenodd"
        />
      </svg>
    </div>
  )
}

export default AnimatedLogo
