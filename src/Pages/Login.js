import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import apiService from '../services/services';
import Swal from 'sweetalert2';

function Login() {

  const eliminaCookie = () => {
    Cookies.remove('user');
  }

  
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [Empleados, setEmpleados] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = document.getElementById('InputEmail').value;
    const password = document.getElementById('InputPassword').value;
    const dataUsuarios = await apiService.getUsuarios();
    setUser(dataUsuarios);
    console.log({dataUsuarios});
    const dataEmpleados = await apiService.getEmpleados();
    setEmpleados(dataEmpleados);

    const user = dataUsuarios.find(u => u.USR_CORREO === email && u.USR_CONTRASENA === password);
    console.log({user});

    const empleado = dataEmpleados.find(e => e.EMP_IDUSR == user.id );
    console.log({user});
    if (user) {
      // Grabar la cookie
      Cookies.set('user', JSON.stringify({
        email: user.USR_CORREO,
        perfil: user.USR_IDPEF,
        idusuario: user.id,
        empleado: empleado.id,
      }), { expires: 1 }); // La cookie expirará en 1 día
      console.log('este es el json ',JSON.stringify({
        email: user.USR_CORREO,
        perfil: user.USR_IDPEF,
        idusuario: user.id,
        empleado: empleado.id,
      }));
      if (user.USR_IDPEF === 1) {
        console.log('entra a admin perfil 1');
        navigate("/dashboardAdmin");
      }
      if (user.USR_IDPEF === 2) {
        console.log('entra a cajero perfil 2');
        navigate("/dashboardCajero");
      }

    } else {
      console.log({email,password})
      Swal.fire('Error', 'Las Credenciales no son correctas', 'error');
      console.error('Usuario no autenticado');
    }


  }

  eliminaCookie();

  return (
    <div className="container">
      {/* <!-- Section: Design Block --> */}
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                <form className="card-body p-5 text-center" onSubmit={handleSubmit}>
                  <h3 className="mb-5">Sign in</h3>

                  <div className="form-outline mb-4">
                    <input type="email" id="InputEmail" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="typeEmailX-2">
                      Email
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="InputPassword" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="typePasswordX-2">
                      Password
                    </label>
                  </div>

                  {/* <!-- Checkbox --> */}
                  <div className="form-check d-flex justify-content-start mb-4">
                    <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                    <label className="form-check-label" htmlFor="form1Example3">
                      Remember password
                    </label>
                  </div>
                  {/* <Link style={{ textDecoration: "none" }} to={"/dashboardAdmin"}> */}
                  
                  <button className="btn btn-primary btn-lg btn-block" >
                    Login
                  </button>
                  

                  <hr className="my-4" />

                  <button className="btn btn-lg btn-block btn-primary" style={{ backgroundColor: '#dd4b39' }} type="submit">
                    <i className="fab fa-google me-2"></i> Sign in with google
                  </button>
                  <button className="btn btn-lg btn-block btn-primary mb-2" style={{ backgroundColor: '#3b5998' }} type="submit">
                    <i className="fab fa-facebook-f me-2"></i> Sign in with facebook
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Login;
