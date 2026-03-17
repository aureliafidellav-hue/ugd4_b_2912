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
    shadowStyle = {
      boxShadow: '0 0 10px 3px rgba(74,222,128,0.45), 0 0 22px 6px rgba(34,197,94,0.2)',
      borderRadius: '1rem',
      transition: 'box-shadow 1.5s ease, transform 0.2s ease',
    };
  } else if (!isOpen && isHovered) {
    shadowStyle = {
      boxShadow: '0 0 10px 3px rgba(236,72,153,0.45), 0 0 22px 6px rgba(168,85,247,0.25)',
      borderRadius: '1rem',
      transition: 'box-shadow 0.15s ease, transform 0.2s ease',
    };
  } else {
    shadowStyle = {
      boxShadow: 'none',
      borderRadius: '1rem',
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