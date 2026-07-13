import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    // Тактильная отдача
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
    }
    
    // Разворачиваем Telegram Mini App
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
    
    navigate('/home');
  };

  return (
    <div className="welcome">
      {/* Центральная часть с логотипом */}
      <div className="hero-content">
        <div className="logo-container">
          <div className="logo">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="white"/>
            </svg>
          </div>
        </div>
        <h1 className="brand__name">EasyDrop</h1>
      </div>

      {/* Нижняя панель */}
      <div className="sheet">
        <p className="tagline">
          Твой помощник в поиске бесплатных игр и эксклюзивных раздач
        </p>
        
        <ul className="features">
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" fill="rgba(59, 130, 246, 0.15)" stroke="none"/>
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Бесплатные игры из Steam и Epic Games</span>
          </li>
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" fill="rgba(59, 130, 246, 0.15)" stroke="none"/>
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Скидки до 100% на популярные игры</span>
          </li>
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" fill="rgba(59, 130, 246, 0.15)" stroke="none"/>
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Мгновенные уведомления о новых раздачах</span>
          </li>
        </ul>

        <button className="cta" onClick={handleStart}>
          Начать охоту за играми
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <p className="fineprint">Вход через Telegram • Бесплатно</p>
      </div>
    </div>
  );
};

export default Welcome;