import { Outlet, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

const PrivateRouteAdmin = () => {
  const user = Cookies.get('user');
  let userData = {};

  if (user) {
    try {
      userData = JSON.parse(user);
    } catch (error) {
      console.error('Error al parsear la cookie del usuario:', error);
    }
  }

  console.log('User data:', userData);
  userData.perfil = 1;
  if (userData.perfil === 1) {
    return <Outlet />;
  }

  return <Navigate to="/Login" />;
};

export default PrivateRouteAdmin;