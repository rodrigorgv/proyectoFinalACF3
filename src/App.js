import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SuperMercado from './Pages/superMercado';
import './App.css';
import Login from './Pages/Login' 

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/consultaSuperMercado" element={<SuperMercado />} />
        </Routes>    
      </Router>
    </div>
  );
}

export default App;
