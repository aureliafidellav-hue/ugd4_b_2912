import React from 'react';

function DifficultySelector({ difficulty, setDifficulty }) {

  return (

    <div className="flex gap-3 mb-4">

      <button
        onClick={() => setDifficulty(4)}
        className={`px-4 py-1 rounded-full ${difficulty === 4 ? 'bg-yellow-400 text-black' : 'bg-white/20 text-white'}`}
      >
        Easy
      </button>

      <button
        onClick={() => setDifficulty(6)}
        className={`px-4 py-1 rounded-full ${difficulty === 6 ? 'bg-yellow-400 text-black' : 'bg-white/20 text-white'}`}
      >
        Medium
      </button>

      <button
        onClick={() => setDifficulty(8)}
        className={`px-4 py-1 rounded-full ${difficulty === 8 ? 'bg-yellow-400 text-black' : 'bg-white/20 text-white'}`}
      >
        Hard
      </button>

    </div>

  );
}

export default DifficultySelector;