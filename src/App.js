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
import Cliente from './Pages/cliente';
import DashboardCajero from './Pages/dashboardCajero';
import Venta from './Pages/venta';
import CajasCobro from './Pages/cajasCobro';
import PrivateRouteAdmin from './utils/PrivateRouteAdmin';
import PrivateRouteCajero from './utils/PrivateRouteCajero';
import Empleado from './Pages/empleado';
import Subcategoria from './Pages/subCategoria';
import Compras from './Pages/compras';
import Articulo from './Pages/articulo';
import MisVentasCajero from './Pages/misVentasCajero';
import KardexPage from './Pages/kardex';
import Perfil from './Pages/perfil';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route element={<PrivateRouteAdmin/>}>
              <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
              <Route path="/consultaSuperMercado" element={<SuperMercado />} />
              <Route path="/consultaPasillo" element={<Pasillo />} />
              <Route path="/consultaProveedores" element={<Proveedores />} />
              <Route path="/consultaUsuario" element={<Usuario />} />
              <Route path="/consultaPuesto" element={<Puesto />} />
              <Route path="/consultaCategoria" element={<Categoria />} />
              <Route path="/consultaSubCategoria" element={<Subcategoria />} />
              <Route path="/consultaUnidadMedida" element={<UnidadMedida />} />
              <Route path="/consultaArea" element={<Area />} />
              <Route path="/consultaCliente" element={<Cliente />} />
              <Route path="/venta" element={<Venta />} />
              <Route path="/consultaCajasCobro" element={<CajasCobro />} />
              <Route path="/consultaEmpleado" element={<Empleado />} />
              <Route path="/consultaCompra" element={<Compras />} />
              <Route path="/consultaArticulo" element={<Articulo />} />
              <Route path="/kardex" element={<KardexPage />} />
              <Route path='/perfil' element={<Perfil />} />
            </Route>
            <Route element={<PrivateRouteCajero/>}>
              <Route path="/dashboardCajero" element={<DashboardCajero />} />
              <Route path="/ventasCajero" element={<MisVentasCajero />} />
            </Route>
        </Routes>    
      </Router>
    </div>
  );
}

export default App;
