import React, { useState } from 'react';
import { FaQuestion } from 'react-icons/fa';

function Card({ card, isFlipped, isMatched, onFlip }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onFlip(card.id);
    }
  };

  const isOpen = isFlipped || isMatched;
  const IconComponent = card.icon;

  let shadowStyle = {};
  if (isMatched) {
    // Matched: glow hijau tipis
    shadowStyle = {
      boxShadow: '0 0 10px 3px rgba(74,222,128,0.45), 0 0 22px 6px rgba(34,197,94,0.2)',
      borderRadius: '1rem',
      // Muncul sangat pelan saat matched
      transition: 'box-shadow 1.5s ease, transform 0.2s ease',
    };
  } else if (!isOpen && isHovered) {
    // Hover: glow pink/ungu tipis, muncul cepat saat kursor menyentuh
    shadowStyle = {
      boxShadow: '0 0 10px 3px rgba(236,72,153,0.45), 0 0 22px 6px rgba(168,85,247,0.25)',
      borderRadius: '1rem',
      // Muncul cepat saat hover
      transition: 'box-shadow 0.15s ease, transform 0.2s ease',
    };
  } else {
    // Idle / tidak hover: tidak ada glow sama sekali
    shadowStyle = {
      boxShadow: 'none',
      borderRadius: '1rem',
      // Hilang cepat saat kursor pergi
      transition: 'box-shadow 0.15s ease, transform 0.2s ease',
    };
  }
 
  return (
  <div
    style={{
      borderRadius: '1rem',
      transition: 'transform 0.2s ease',
      transform: !isOpen && isHovered ? 'scale(1.05)' : 'scale(1)',
    }}
    onMouseEnter={() => !isOpen && setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <div className="card-container">
      <div
        onClick={handleClick}
        className={`card-inner ${isOpen ? 'flipped' : ''}`}
      >
        {/* Sisi DEPAN: glow pink saat hover */}
        <div
          className="card-front"
          style={{
            filter: !isOpen && isHovered
              ? 'drop-shadow(0 0 8px rgba(236,72,153,0.6))'
              : 'drop-shadow(0 0 0px transparent)',
            transition: 'filter 0.15s ease',
          }}
        >
          <FaQuestion className="text-white/70" style={{ fontSize: '1.5rem' }} />
        </div>

        {/* Sisi BELAKANG: glow hijau saat matched */}
        <div
          className="card-back"
          style={{
            filter: isMatched
              ? 'drop-shadow(0 0 8px rgba(74,222,128,0.6))'
              : 'drop-shadow(0 0 0px transparent)',
            transition: isMatched ? 'filter 1.5s ease' : 'filter 0.15s ease',
          }}
        >
          <span className="animate-bounce-once" style={{ fontSize: '2rem' }}>
            <IconComponent style={{ color: card.color }} />
          </span>
        </div>

      </div>
    </div>
  </div>
);
}

export default Card;