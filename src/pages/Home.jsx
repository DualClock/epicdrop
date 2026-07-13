import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameCard from '../components/GameCard';
import './Home.css';

const API_BASE = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/Giveaway` : 'http://localhost:5199/api/Giveaway';

const Home = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'steam', 'epic'

  useEffect(() => {
    // Инициализация Telegram WebApp
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.setHeaderColor('#0f172a');
    }
    
    fetchGames();
  }, []);

  const fetchGames = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const endpoint = activeFilter === 'all' 
        ? `${API_BASE}/all`
        : `${API_BASE}/${activeFilter}/all`;
      
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error('Не удалось загрузить данные');
      }
      
      const data = await response.json();
      setGames(data);
    } catch (err) {
      setError(err.message);
      console.error('Ошибка загрузки:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.selectionChanged();
    }
  };

  const handleBack = () => {
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }
    navigate('/');
  };

  return (
    <div className="home">
      {/* Хедер */}
      <header className="home-header">
        <button className="back-btn" onClick={handleBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="header-content">
          <h1 className="header-title">🔥 Раздачи</h1>
          <p className="header-subtitle">Успей забрать, пока не удалили</p>
        </div>
        
        <button className="refresh-btn" onClick={fetchGames} disabled={loading}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={loading ? 'spinning' : ''}>
            <path d="M23 4v6h-6M1 20v-6h6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </header>

      {/* Фильтры */}
      <div className="filters">
        <button 
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          Все
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'steam' ? 'active' : ''}`}
          onClick={() => handleFilterChange('steam')}
        >
          🎮 Steam
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'epic' ? 'active' : ''}`}
          onClick={() => handleFilterChange('epic')}
        >
          🎯 Epic
        </button>
      </div>

      {/* Контент */}
      <div className="home-content">
        {loading ? (
          <div className="skeleton-list">
            {[1, 2, 3].map(i => <div key={i} className="skeleton-card"></div>)}
          </div>
        ) : error ? (
          <div className="error-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" stroke="#ef4444"/>
              <path d="M12 8v4M12 16h.01" stroke="#ef4444" strokeLinecap="round"/>
            </svg>
            <p className="error-title">Не удалось загрузить раздачи</p>
            <p className="error-text">{error}</p>
            <button className="retry-btn" onClick={fetchGames}>
              Попробовать снова
            </button>
          </div>
        ) : games.length === 0 ? (
          <div className="empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="empty-title">Пока нет активных раздач</p>
            <p className="empty-text">Загляни позже — мы постоянно обновляем каталог</p>
          </div>
        ) : (
          <div className="games-grid">
            {games.map((game, index) => (
              <GameCard key={index} game={game} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;