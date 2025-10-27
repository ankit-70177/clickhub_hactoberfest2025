'use client';

import { useState } from 'react';

export default function FlareButton({ 
  text = '✨ Flare Button', 
  onClick, 
  disabled = false, 
  variant = 'primary' 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [showFlare, setShowFlare] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      setShowFlare(true);
      if (onClick) {
        onClick();
      }
      setTimeout(() => {
        setShowFlare(false);
      }, 1500);
    }
  };

  // Variant configurations
  const variants = {
    primary: {
      gradient: 'from-indigo-500 via-purple-500 to-purple-600',
      hoverGradient: 'hover:from-indigo-600 hover:via-purple-600 hover:to-purple-700',
      flareColors: ['#667eea', '#764ba2', '#a855f7', '#c084fc', '#e9d5ff']
    },
    secondary: {
      gradient: 'from-pink-400 via-pink-500 to-red-500',
      hoverGradient: 'hover:from-pink-500 hover:via-pink-600 hover:to-red-600',
      flareColors: ['#f093fb', '#f5576c', '#ff6b9d', '#fda4af', '#fbcfe8']
    },
    gradient: {
      gradient: 'from-pink-400 via-yellow-300 to-yellow-400',
      hoverGradient: 'hover:from-pink-500 hover:via-yellow-400 hover:to-yellow-500',
      flareColors: ['#fa709a', '#fee140', '#fbbf24', '#fde047', '#fef3c7']
    }
  };

  const currentVariant = variants[variant];

  // Generate flare particles (shooting stars effect)
  const flareParticles = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30) - 15;
    const distance = 80 + Math.random() * 120;
    const size = Math.random() * 8 + 4;
    
    return {
      id: i,
      angle,
      distance,
      size,
      color: currentVariant.flareColors[i % currentVariant.flareColors.length],
      delay: Math.random() * 0.1,
      duration: 0.8 + Math.random() * 0.4
    };
  });

  // Generate sparkles around button
  const sparkles = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 45);
    return {
      id: i,
      angle,
      color: currentVariant.flareColors[i % currentVariant.flareColors.length],
      delay: i * 0.05
    };
  });

  return (
    <div className="relative inline-block">
      <button
        onClick={handleClick}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsActive(false);
        }}
        onMouseDown={() => !disabled && setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        disabled={disabled}
        className={`
          relative px-12 py-4 font-semibold text-white uppercase tracking-wider
          rounded-full border-none cursor-pointer overflow-visible
          transition-all duration-400 ease-out
          focus:outline-none focus:ring-4 focus:ring-purple-300
          bg-gradient-to-r ${currentVariant.gradient} ${currentVariant.hoverGradient}
          ${isHovered && !disabled ? '-translate-y-1' : 'translate-y-0'}
          ${isActive && !disabled ? 'scale-95' : isHovered && !disabled ? 'scale-105' : 'scale-100'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
        }}
        aria-label={text}
        tabIndex={0}
      >
        {/* Button Content */}
        <span className="relative z-10 flex items-center justify-center gap-3">
          <span 
            className={`
              inline-block transition-transform duration-300
              ${isHovered && !disabled ? '-translate-x-1' : 'translate-x-0'}
            `}
          >
            {text}
          </span>
          <span 
            className={`
              inline-flex items-center justify-center transition-all duration-300
              ${isHovered && !disabled ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
            `}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>

        {/* Ripple Effect */}
        {isActive && !disabled && (
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-white/50 pointer-events-none animate-ripple"
          />
        )}
      </button>

      {/* FLARE EFFECT - Shooting Particles */}
      {showFlare && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {flareParticles.map(particle => (
            <div
              key={particle.id}
              className="absolute animate-flare-shoot"
              style={{
                left: '0',
                top: '0',
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                borderRadius: '50%',
                filter: `blur(${particle.size * 0.3}px)`,
                '--flare-angle': `${particle.angle}deg`,
                '--flare-distance': `${particle.distance}px`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            />
          ))}
        </div>
      )}

      {/* FLARE EFFECT - Expanding Ring */}
      {showFlare && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="animate-flare-ring" 
            style={{
              border: `4px solid ${currentVariant.flareColors[0]}`,
              borderRadius: '50%',
              opacity: 0,
              filter: 'blur(2px)'
            }}
          />
        </div>
      )}

      {/* FLARE EFFECT - Sparkles */}
      {showFlare && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {sparkles.map(sparkle => (
            <div
              key={sparkle.id}
              className="absolute animate-sparkle"
              style={{
                left: '0',
                top: '0',
                width: '4px',
                height: '16px',
                backgroundColor: sparkle.color,
                borderRadius: '50%',
                filter: 'blur(1px)',
                '--sparkle-angle': `${sparkle.angle}deg`,
                animationDelay: `${sparkle.delay}s`
              }}
            />
          ))}
        </div>
      )}

      {/* FLARE EFFECT - Center Burst */}
      {showFlare && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div 
            className="animate-burst"
            style={{
              width: '30px',
              height: '30px',
              background: `radial-gradient(circle, ${currentVariant.flareColors[0]}, ${currentVariant.flareColors[2]}, transparent)`,
              borderRadius: '50%',
              filter: 'blur(6px)'
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 0.5;
          }
          100% {
            width: 200px;
            height: 200px;
            opacity: 0;
          }
        }

        @keyframes flare-shoot {
          0% {
            transform: rotate(var(--flare-angle)) translateX(0) scale(1);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(var(--flare-angle)) translateX(var(--flare-distance)) scale(0.3);
            opacity: 0;
          }
        }

        @keyframes flare-ring {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            width: 300px;
            height: 300px;
            opacity: 0;
          }
        }

        @keyframes sparkle {
          0% {
            transform: rotate(var(--sparkle-angle)) translateX(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: rotate(var(--sparkle-angle)) translateX(60px) scale(1.5);
            opacity: 0.8;
          }
          100% {
            transform: rotate(var(--sparkle-angle)) translateX(100px) scale(0);
            opacity: 0;
          }
        }

        @keyframes burst {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(4);
            opacity: 0.8;
          }
          100% {
            transform: scale(6);
            opacity: 0;
          }
        }

        .animate-ripple {
          animation: ripple 0.6s ease-out forwards;
        }

        .animate-flare-shoot {
          animation: flare-shoot 1s ease-out forwards;
        }

        .animate-flare-ring {
          animation: flare-ring 1s ease-out forwards;
        }

        .animate-sparkle {
          animation: sparkle 0.8s ease-out forwards;
        }

        .animate-burst {
          animation: burst 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}