import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameCard from '../components/GameCard';
import './Home.css';

const API_BASE = 'https://epicdropapitma-production.up.railway.app/api';

const Home = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'free', 'steam', 'epic'
  const [user, setUser] = useState(null);
  const [showWishlist, setShowWishlist] = useState(false);

  useEffect(() => {
    // Инициализация Telegram WebApp
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      
      // Получаем данные пользователя из Telegram
      const tgUser = window.Telegram.WebApp.initDataUnsafe?.user;
      if (tgUser) {
        registerUser(tgUser);
      }
    }
    
    fetchGames();
  }, []);

  // Регистрация/вход пользователя
  const registerUser = async (tgUser) => {
    try {
      const response = await fetch(`${API_BASE}/User/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          TelegramId: tgUser.id,
          Username: tgUser.username,
          FirstName: tgUser.first_name
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser({ id: data.userId, ...tgUser });
        fetchWishlist(tgUser.id);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  // Получение игр по категориям
  const fetchGames = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/Giveaway/categories`);
      const data = await response.json();
      
      let gamesToDisplay = [];
      
      switch (activeTab) {
        case 'free':
          gamesToDisplay = data.freeGames || [];
          break;
        case 'steam':
          gamesToDisplay = (data.allGames || []).filter(g => g.Store === 'Steam');
          break;
        case 'epic':
          gamesToDisplay = (data.allGames || []).filter(g => g.Store === 'Epic Games');
          break;
        default:
          gamesToDisplay = data.allGames || [];
      }
      
      setGames(gamesToDisplay);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  // Получение вишлиста
  const fetchWishlist = async (telegramId) => {
    try {
      const response = await fetch(`${API_BASE}/User/${telegramId}/wishlist`);
      if (response.ok) {
        const data = await response.json();
        setWishlist(data);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  // Добавление в вишлист
  const addToWishlist = async (game) => {
    if (!user) {
      alert('Сначала войдите в приложение');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/User/${user.id}/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          GameTitle: game.title,
          Store: game.store,
          GameUrl: game.storeUrl,
          NotifyOnFree: true
        })
      });

      if (response.ok) {
        fetchWishlist(user.id);
        if (window.Telegram?.WebApp?.HapticFeedback) {
          window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
        }
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  // Удаление из вишлиста
  const removeFromWishlist = async (gameTitle) => {
    if (!user) return;

    try {
      const response = await fetch(`${API_BASE}/User/${user.id}/wishlist/${encodeURIComponent(gameTitle)}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchWishlist(user.id);
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.selectionChanged();
    }
  };

  return (
    <div className="home">
      {/* Header */}
      <header className="home-header">
        <div className="header-content">
          <h1 className="header-title">
            {showWishlist ? '❤️ Мой вишлист' : ' EasyDrop'}
          </h1>
          <p className="header-subtitle">
            {showWishlist ? `${wishlist.length} игр в списке` : 'Лови раздачи и скидки'}
          </p>
        </div>
        
        <button 
          className="wishlist-btn"
          onClick={() => {
            setShowWishlist(!showWishlist);
            if (!showWishlist && user) fetchWishlist(user.id);
          }}
        >
          ❤️
          {wishlist.length > 0 && <span className="wishlist-count">{wishlist.length}</span>}
        </button>
      </header>

      {/* Tabs */}
      {!showWishlist && (
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => handleTabChange('all')}
          >
            🎮 Все
          </button>
          <button 
            className={`tab-btn ${activeTab === 'free' ? 'active' : ''}`}
            onClick={() => handleTabChange('free')}
          >
            🎁 Раздачи
          </button>
          <button 
            className={`tab-btn ${activeTab === 'steam' ? 'active' : ''}`}
            onClick={() => handleTabChange('steam')}
          >
            🎮 Steam
          </button>
          <button 
            className={`tab-btn ${activeTab === 'epic' ? 'active' : ''}`}
            onClick={() => handleTabChange('epic')}
          >
            🎯 Epic
          </button>
        </div>
      )}

      {/* Content */}
      <div className="home-content">
        {loading ? (
          <div className="skeleton-list">
            {[1, 2, 3].map(i => <div key={i} className="skeleton-card"></div>)}
          </div>
        ) : showWishlist ? (
          wishlist.length === 0 ? (
            <div className="empty-state">
              <p className="empty-title">Вишлист пуст</p>
              <p className="empty-text">Добавляй игры, чтобы получать уведомления о раздачах!</p>
              <button className="cta-btn" onClick={() => setShowWishlist(false)}>
                Перейти к играм
              </button>
            </div>
          ) : (
            <div className="games-grid">
              {wishlist.map((item, index) => (
                <GameCard 
                  key={index} 
                  game={{
                    title: item.gameTitle,
                    store: item.store,
                    storeUrl: item.gameUrl,
                    endDate: null
                  }}
                  isInWishlist={true}
                  onRemove={removeFromWishlist}
                />
              ))}
            </div>
          )
        ) : games.length === 0 ? (
          <div className="empty-state">
            <p className="empty-title">Пока нет игр</p>
            <p className="empty-text">Загляни позже — мы постоянно обновляем каталог</p>
          </div>
        ) : (
          <div className="games-grid">
            {games.map((game, index) => (
              <GameCard 
                key={index} 
                game={game}
                onAddToWishlist={addToWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;