import { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';
import './Home.css';

const Home = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // Инициализация Telegram WebApp
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      // Устанавливаем цвет хедера под тему
      window.Telegram.WebApp.setHeaderColor('#0f0c29'); 
    }
    fetchGames();
  }, []);

  const fetchGames = async () => {
    setLoading(true);
    try {
      // Заменяем на твой реальный URL бэкенда
      const res = await fetch('http://localhost:5199/api/Giveaway/all');
      const data = await res.json();
      setGames(data);
    } catch (err) {
      console.error('Ошибка загрузки:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredGames = games.filter(g => {
    if (activeTab === 'all') return true;
    return g.store.toLowerCase() === activeTab;
  });

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>🔥 Горячие раздачи</h1>
        <p>Успей забрать, пока не удалили</p>
      </div>

      <div className="tabs-container">
        {['all', 'steam', 'epic'].map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'all' ? 'Все' : tab === 'steam' ? 'Steam' : 'Epic'}
          </button>
        ))}
      </div>

      <div className="games-list">
        {loading ? (
          <div className="skeleton-loader">
            {[1, 2, 3].map(i => <div key={i} className="skeleton-card"></div>)}
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="empty-state">
            <p>Пока нет раздач 😔</p>
            <button onClick={fetchGames} className="retry-btn">Обновить</button>
          </div>
        ) : (
          filteredGames.map((game, idx) => <GameCard key={idx} game={game} />)
        )}
      </div>
    </div>
  );
};

export default Home;