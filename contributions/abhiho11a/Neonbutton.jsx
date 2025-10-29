'use client';
import { useState } from 'react';

export default function NeonButton() {
  const [clicked, setClicked] = useState(false);
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setClicked(true);
    setCount(count + 1);
    setTimeout(() => setClicked(false), 200);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        px-8 py-3 font-extrabold text-white uppercase tracking-widest
        rounded-lg bg-black
        shadow-[0_0_10px_rgb(0,255,255)]
        transition-all duration-200
        ${clicked
          ? 'shadow-[0_0_25px_rgb(0,255,255)] scale-110'
          : 'hover:shadow-[0_0_15px_rgb(0,255,255)] hover:scale-105'}
      `}
    >
      {clicked ? '⚡ Zap!' : 'Neon Click'}{' '}
      {count > 0 && (
        <span
          className={`
            ml-2 text-cyan-400 font-extrabold
            ${clicked ? 'animate-pulse text-[1.1em] shadow-[0_0_10px_rgb(0,255,255)]' : ''}
          `}
        >
          ({count})
        </span>
      )}
    </button>
  );
}
