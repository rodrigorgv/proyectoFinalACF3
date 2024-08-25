import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SuperMercado from './Pages/superMercado';
import './App.css';
import Login from './Pages/Login' 
import DashboardAdmin from './Pages/dashboardAdmin';
import Pasillo from './Pages/pasillo';
import Proveedores from './Pages/proveedores';
import Usuario from './Pages/usuario';
import Puesto from './Pages/puesto';
import Categoria from './Pages/categoria';
import UnidadMedida from './Pages/unidadMedida';
import Area from './Pages/area';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/consultaSuperMercado" element={<SuperMercado />} />
            <Route path="/consultaPasillo" element={<Pasillo />} />
            <Route path="/consultaProveedores" element={<Proveedores />} />
            <Route path="/consultaUsuario" element={<Usuario />} />
            <Route path="/consultaPuesto" element={<Puesto />} />
            <Route path="/consultaCategoria" element={<Categoria />} />
            <Route path="/consultaUnidadMedida" element={<UnidadMedida />} />
            <Route path="/consultaArea" element={<Area />} />
            <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
        </Routes>    
      </Router>
    </div>
  );
}

export default App;
