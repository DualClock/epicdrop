import { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import './App.css';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#f8f4ff');
      tg.setBackgroundColor('#f8f4ff');
    }
  }, []);

  return (
    <div className="app">
      {showWelcome ? (
        <WelcomeScreen onContinue={() => setShowWelcome(false)} />
      ) : (
        <main className="main-app">
          <h1>EpicDrop</h1>
          <p>Здесь будет список раздач игр</p>
        </main>
      )}
    </div>
  );
}

export default App;