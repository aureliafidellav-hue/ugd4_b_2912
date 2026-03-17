import React, { useState } from 'react';
import {
  FaClock,
  FaMousePointer,
  FaCheck,
  FaSyncAlt,
  FaRedo,
  FaSmile,
  FaMeh,
  FaSkull,
} from 'react-icons/fa';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function ScoreBoard({ moves, matchedCount, totalPairs, onReset, difficulty, onDifficultyChange, timer }) {
  const isGameComplete = matchedCount === totalPairs;
  const [btnHovered, setBtnHovered] = useState(false);

  const difficulties = [
    { key: 'easy',   label: 'Easy',   pairs: 4, icon: FaSmile },
    { key: 'medium', label: 'Medium', pairs: 6, icon: FaMeh   },
    { key: 'hard',   label: 'Hard',   pairs: 8, icon: FaSkull },
  ];

  return (
    <div className="text-center mb-6">
      <div className="flex justify-center gap-3 mb-5">
        {difficulties.map(({ key, label, pairs, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onDifficultyChange(key)}
            className={[
              'flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-all duration-200 select-none',
              difficulty === key
                ? 'bg-yellow-400 text-indigo-900 shadow-lg scale-105'
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white hover:scale-105',
            ].join(' ')}
          >
            <Icon />
            {label} ({pairs})
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-4 mb-4">
        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg min-w-[90px]">
          <p className="text-sm text-indigo-200 flex items-center justify-center gap-1">
            <FaClock className="text-indigo-300" /> WAKTU
          </p>
          <p className="text-2xl font-bold text-white">{formatTime(timer)}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg min-w-[90px]">
          <p className="text-sm text-indigo-200 flex items-center justify-center gap-1">
            <FaMousePointer className="text-indigo-300" /> PERCOBAAN
          </p>
          <p className="text-2xl font-bold text-white">{moves}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg min-w-[90px]">
          <p className="text-sm text-indigo-200 flex items-center justify-center gap-1">
            <FaCheck className="text-indigo-300" /> DITEMUKAN
          </p>
          <p className="text-2xl font-bold text-white">{matchedCount}/{totalPairs}</p>
        </div>
      </div>

      {isGameComplete && (
        <div
          className="animate-victory-pop mx-auto mb-4 px-6 py-4 rounded-xl max-w-sm"
          style={{
            background: 'rgba(40, 28, 20, 0.85)',
            border: '1.5px solid rgba(180, 140, 60, 0.6)',
          }}
        >
          <p className="font-bold text-lg" style={{ color: '#c9a84c' }}>
            🎉 Selamat! Selesai dalam waktu {formatTime(timer)} dengan {moves} percobaan!
          </p>
        </div>
      )}

      <button
        onClick={onReset}
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        style={{
          boxShadow: btnHovered
            ? '0 0 10px 3px rgba(250,204,21,0.55), 0 0 22px 6px rgba(250,204,21,0.25)'
            : '0 4px 10px rgba(0,0,0,0.3)',
          transition: 'box-shadow 0.2s ease, transform 0.2s ease',
          transform: btnHovered ? 'scale(1.05)' : 'scale(1)',
        }}
        className="px-6 py-2 bg-yellow-400 text-indigo-900 font-bold rounded-full flex items-center gap-2 mx-auto"
      >
        {isGameComplete ? <FaRedo /> : <FaSyncAlt />}
        {isGameComplete ? 'Main Lagi' : 'Acak Ulang'}
      </button>

    </div>
  );
}

export default ScoreBoard;