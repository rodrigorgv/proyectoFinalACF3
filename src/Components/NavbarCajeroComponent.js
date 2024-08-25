import React from 'react'
import { Link } from 'react-router-dom'

const NavbarCajeroComponent = () => {
    return (
      <nav class="navbar bg-primary navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <Link class="navbar-brand" to={"/DashboardAdmin"}>SUPERMK</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  test <i class="fa-solid fa-person"></i>
                </a>
                <ul class="dropdown-menu">
                  <li><Link class="dropdown-item" to={"/"}><i class="fa-solid fa-magnifying-glass"></i> test</Link></li>                 
                </ul>
              </li>              
            </ul>
            <div class="d-flex">
              <Link to={"/Login"}>
                <button class="btn btn-outline-danger px-4" >Salir</button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  
  export default NavbarCajeroComponent;