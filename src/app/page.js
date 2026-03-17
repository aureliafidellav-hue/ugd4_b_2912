'use client';
import React, { useState, useEffect, useRef } from 'react';
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';
import { GiCardJoker } from 'react-icons/gi';
import {
  FaAppleAlt,
  FaLemon,
  FaHeart,
  FaStar,
  FaBolt,
  FaLeaf,
  FaGem,
  FaFire,
  FaIceCream,
  FaMoon,
  FaSnowflake,
  FaMusic,
} from 'react-icons/fa';

const ALL_ICONS = [
  { icon: FaAppleAlt,  color: '#ef4444' },
  { icon: FaLemon,     color: '#eab308' },
  { icon: FaHeart,     color: '#ec4899' },
  { icon: FaStar,      color: '#f97316' },
  { icon: FaBolt,      color: '#a855f7' },
  { icon: FaLeaf,      color: '#eab308' },
  { icon: FaGem,       color: '#818cf8' },
  { icon: FaFire,      color: '#f97316' },
  { icon: FaIceCream,  color: '#f472b6' },
  { icon: FaMoon,      color: '#fbbf24' },
  { icon: FaSnowflake, color: '#67e8f9' },
  { icon: FaMusic,     color: '#c084fc' },
];

const DIFFICULTY_PAIRS = {
  easy:   4,
  medium: 6,
  hard:   8,
};

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const createCards = (difficulty) => {
  const pairs = DIFFICULTY_PAIRS[difficulty];
  const shuffledPool = shuffleArray(ALL_ICONS).slice(0, pairs);
  const paired = shuffledPool.flatMap((item, index) => [
    { id: index * 2,     icon: item.icon, color: item.color, pairId: index },
    { id: index * 2 + 1, icon: item.icon, color: item.color, pairId: index },
  ]);
  return shuffleArray(paired);
};

export default function Home() {
  const [difficulty, setDifficulty]       = useState('easy');
  const [cards, setCards]                 = useState([]);
  const [flippedCards, setFlippedCards]   = useState([]);
  const [matchedCards, setMatchedCards]   = useState([]);
  const [moves, setMoves]                 = useState(0);
  const [timer, setTimer]                 = useState(0);
  const [timerRunning, setTimerRunning]   = useState(false);
  const timerRef                          = useRef(null);

  useEffect(() => {
    setCards(createCards(difficulty));
  }, []);

  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => setTimer(prev => prev + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerRunning]);

  const totalPairs = DIFFICULTY_PAIRS[difficulty];
  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setTimerRunning(false);
    }
  }, [matchedCards, cards]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;
      const firstCard  = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      setMoves(prev => prev + 1);

      if (firstCard.pairId === secondCard.pairId) {
        setMatchedCards(prev => [...prev, firstId, secondId]);
        setFlippedCards([]);
      } else {
        const t = setTimeout(() => {
          setFlippedCards([]);
        }, 600);
        return () => clearTimeout(t);
      }
    }
  }, [flippedCards, cards]);

  const handleCardFlip = (id) => {
    if (!timerRunning && matchedCards.length === 0 && flippedCards.length === 0 && moves === 0) {
      setTimerRunning(true);
    }
    if (flippedCards.length < 2 && !flippedCards.includes(id)) {
      setFlippedCards(prev => [...prev, id]);
    }
  };

  const resetGame = () => {
    setCards(createCards(difficulty));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTimer(0);
    setTimerRunning(false);
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    setCards(createCards(newDifficulty));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTimer(0);
    setTimerRunning(true);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        background: 'radial-gradient(ellipse at 20% 70%, #2d0a6e 0%, #0d0b2e 60%, #0a0820 100%)',
      }}
    >
      <h1 className="text-4xl font-bold mb-6 text-white drop-shadow-lg flex items-center gap-3 animate-float">
        <GiCardJoker className="text-yellow-300 text-4xl" />
        <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
          Memory Card
        </span>
      </h1>

      <ScoreBoard
        moves={moves}
        matchedCount={matchedCards.length / 2}
        totalPairs={totalPairs}
        onReset={resetGame}
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
        timer={timer}
      />
      
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-2xl">
        <GameBoard
          cards={cards}
          flippedCards={flippedCards}
          matchedCards={matchedCards}
          onFlip={handleCardFlip}
          difficulty={difficulty}
        />
      </div>
    </div>
  );
}