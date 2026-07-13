import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import './index.css'; // Глобальные стили

function App() {
  return (
    <Router>
      <Routes>
        {/* По умолчанию открываем Welcome */}
        <Route path="/" element={<Welcome />} />
        {/* После нажатия кнопки переходим сюда */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;