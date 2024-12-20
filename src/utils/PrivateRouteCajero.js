import { Outlet, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

const PrivateRouteCajero = () => {
  const user = Cookies.get('user');
  let userData = {};

  if (user) {
    try {
      userData = JSON.parse(user);
      console.log('data en private', user);
    } catch (error) {
      console.error('Error al parsear la cookie del usuario:', error);
    }
  }

  console.log('User data:', userData);
  //userData.perfil = 2;
  if (userData.perfil == 2) {
    return <Outlet />;
  }

  return <Navigate to="/Login" />;
};

export default PrivateRouteCajero;