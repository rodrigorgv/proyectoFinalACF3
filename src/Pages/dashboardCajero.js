import React from 'react'
import CardComponent from '../Components/CardComponent';
import NavbarCajeroComponent from '../Components/NavbarCajeroComponent';

const DashboardCajero = () => {
    return (
    <div>
      <NavbarCajeroComponent />
        <div className="container-fluid">
            <div className="titulo">
                <h1>Cajero #999 | SUPERMK</h1>
                <h3>Bienvenido JUAN PEREZ</h3>
            </div>
        
            <div className="d-flex justify-content-center">
                <CardComponent
                    title="Registrar Venta"
                    iconClass="fas fa-cart-plus"
                    quantity={99999}
                    enlace={"/venta"}
                    tipoTexto={"text-success"}
                    tipoBorde={"border-left-success"}
                />
                               
            </div>      
              
        </div>
    </div>
    );
  }
  
  export default DashboardCajero;