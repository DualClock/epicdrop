import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './WelcomeScreen.css';

// Тематические объекты для орбит
// Каждый объект: эмодзи/текст + цвет фона + размер
const orbitItems = {
  outer: [
    { emoji: '🎮', bg: '#2a475e', label: 'Steam' },
    { emoji: '🎁', bg: '#8f73ff', label: 'Epic' },
    { emoji: '🗝️', bg: '#ffb347', label: 'Key' },
    { emoji: '⭐', bg: '#ff6b9d', label: 'Star' },
    { emoji: '🎯', bg: '#4ecdc4', label: 'Target' },
    { emoji: '🚀', bg: '#ff6b6b', label: 'Rocket' },
  ],
  middle: [
    { emoji: '🏷️', bg: '#1b2838', label: 'Tag' },
    { emoji: '💎', bg: '#6c4dff', label: 'Gem' },
    { emoji: '🔔', bg: '#ff9f43', label: 'Bell' },
    { emoji: '📦', bg: '#10ac84', label: 'Box' },
  ],
  inner: [
    { emoji: '⚡', bg: '#feca57', label: 'Flash' },
    { emoji: '🔥', bg: '#ff6b6b', label: 'Fire' },
  ],
};

// Компонент одного кольца-орбиты
function OrbitRing({ radius, duration, delay, items, direction = 'normal' }) {
  const angleStep = 360 / items.length;

  return (
    <div
      className="orbit-ring"
      style={{
        width: radius,
        height: radius,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationDirection: direction,
      }}
    >
      {items.map((item, index) => {
        const angle = angleStep * index;
        return (
          <div
            key={index}
            className="orbit-item"
            style={{
              transform: `rotate(${angle}deg) translateY(-${radius / 2}px)`,
            }}
          >
            {/* Контейнер объекта — компенсируем вращение орбиты */}
            <div
              className="orbit-item-inner"
              style={{
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                animationDirection: direction === 'normal' ? 'reverse' : 'normal',
              }}
            >
              <div
                className="orbit-item-icon"
                style={{ backgroundColor: item.bg }}
              >
                {item.emoji}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function WelcomeScreen({ onContinue }) {
  const [exiting, setExiting] = useState(false);

  const handleContinue = () => {
    setExiting(true);
    setTimeout(() => onContinue?.(), 500);
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="welcome-screen"
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Фоновые блики */}
          <div className="bg-glow bg-glow-1" />
          <div className="bg-glow bg-glow-2" />
          <div className="bg-glow bg-glow-3" />

          {/* Центральная звезда */}
          <motion.div
            className="center-star"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path
                d="M24 2L28.5 18L44 24L28.5 30L24 46L19.5 30L4 24L19.5 18L24 2Z"
                fill="url(#starGrad)"
              />
              <defs>
                <linearGradient id="starGrad" x1="4" y1="2" x2="44" y2="46">
                  <stop stopColor="#FFB347" />
                  <stop offset="1" stopColor="#FF6B9D" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Орбиты */}
          <div className="orbits-container">
            <OrbitRing
              radius={320}
              duration={25}
              delay={0}
              items={orbitItems.outer}
            />
            <OrbitRing
              radius={230}
              duration={18}
              delay={-5}
              items={orbitItems.middle}
              direction="reverse"
            />
            <OrbitRing
              radius={140}
              duration={12}
              delay={-2}
              items={orbitItems.inner}
            />
          </div>

          {/* Текст */}
          <motion.div
            className="text-block"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          >
            <div className="logo-text">
              <span className="logo-epic">Epic</span>
              <span className="logo-drop">Drop</span>
              <svg className="logo-star" width="16" height="16" viewBox="0 0 16 16">
                <path d="M8 0L9.5 6L16 8L9.5 10L8 16L6.5 10L0 8L6.5 6L8 0Z" fill="#FFB347" />
              </svg>
            </div>
            <h1 className="welcome-title">
              Бесплатные игры<br />
              <span className="gradient-text">в одном месте</span>
            </h1>
            <p className="welcome-subtitle">
              Steam • Epic Games • Уведомления о раздачах
            </p>
          </motion.div>

          {/* Кнопка */}
          <motion.button
            className="continue-btn"
            onClick={handleContinue}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6, ease: 'easeOut' }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Продолжить</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}