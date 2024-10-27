import React from 'react'
import { Link } from 'react-router-dom'

const NavbarCajeroComponent = () => {
  return (
    <nav class="navbar bg-primary navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <Link class="navbar-brand" to={"/DashboardCajero"}>SUPERMK</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="d-flex">
          <Link to={"/Login"}>
            <button class="btn btn-outline-danger px-4" >Salir</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavbarCajeroComponent;