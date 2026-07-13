import './GameCard.css';

const GameCard = ({ game }) => {
  const handleClick = () => {
    // Вибрация при нажатии
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    }
    
    // Открываем ссылку на игру
    if (game.storeUrl) {
      window.open(game.storeUrl, '_blank');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Бессрочно';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = date - now;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return 'Заканчивается сегодня';
    if (diffDays === 1) return '1 день';
    if (diffDays < 7) return `${diffDays} дн.`;
    
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  };

  const getStoreIcon = (store) => {
    if (store?.toLowerCase() === 'steam') return '🎮';
    if (store?.toLowerCase() === 'epic') return '';
    return '🎁';
  };

  const getStoreName = (store) => {
    return store || 'Unknown';
  };

  return (
    <div className="game-card" onClick={handleClick}>
      <div className="card-image-wrapper">
        <img 
          src={game.imageUrl || 'https://via.placeholder.com/400x200/1e293b/64748b?text=EasyDrop'} 
          alt={game.title}
          className="card-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x200/1e293b/64748b?text=EasyDrop';
          }}
        />
        <div className="card-overlay"></div>
        
        {/* Бейдж магазина */}
        <div className={`store-badge ${game.store?.toLowerCase() === 'steam' ? 'steam' : 'epic'}`}>
          <span className="store-icon">{getStoreIcon(game.store)}</span>
          <span className="store-name">{getStoreName(game.store)}</span>
        </div>

        {/* Бейдж "FREE" */}
        <div className="free-badge">FREE</div>
      </div>

      <div className="card-content">
        <h3 className="card-title">{game.title}</h3>
        
        <div className="card-footer">
          <div className="timer-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            <span>{formatDate(game.endDate)}</span>
          </div>
          
          <button className="claim-btn">Забрать</button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;