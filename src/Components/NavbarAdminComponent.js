import React from 'react'
import { Link } from 'react-router-dom'

const NavbarAdminComponent = () => {
    return (
      <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div class="cajita">
          <Link class="navbar-brand" to={"/DashboardAdmin"}>SUPERMK</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
            <div class="d-flex ">
              <Link to={"/Login"}>
                <button class="btn btn-outline-danger px-4" >Salir</button>
              </Link>

          </div>
        </div>
      </nav>
    );
  }
  
  export default NavbarAdminComponent;