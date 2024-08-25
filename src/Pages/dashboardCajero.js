import React from 'react'
import NavbarAdminComponent from '../Components/NavbarAdminComponent';
import CardComponent from '../Components/CardComponent';

const DashboardAdmin = () => {
    return (
    <div>
      <NavbarAdminComponent />
        <div className="container-fluid">
            <div className="titulo">
                <h1>Cajero Dashboard SUPERMK</h1>
                <h3>Bienvenido JUAN PEREZ</h3>
            </div>
        
            <div className="row">
                <CardComponent
                    title="SuperMercados"
                    iconClass="fa-solid fa-store"
                    quantity={99999}
                    enlace={"/consultaSuperMercado"}
                    tipoTexto={"text-success"}
                    tipoBorde={"border-left-success"}
                />

                <CardComponent
                    title="Personal"
                    iconClass="fa-solid fa-person"
                    quantity={99999}
                    enlace={"/consultaSuperMercado"}
                    tipoTexto={"text-warning"}
                    tipoBorde={"border-left-warning"}
                />          

                <CardComponent
                    title="Proveedores"
                    
                    iconClass="fa-solid fa-warehouse"
                    quantity={99999}
                    enlace={"/consultaSuperMercado"}
                    tipoTexto={"text-danger"}
                    tipoBorde={"border-left-danger"}
                />           


                <CardComponent
                    title="Articulos"
                    
                    iconClass="fa-solid fa-box"
                    quantity={99999}
                    enlace={"/consultaSuperMercado"}
                    tipoTexto={"text-primary"}
                    tipoBorde={"border-left-primary"}
                />                                    
            </div>      
              
        </div>
    </div>
    );
  }
  
  export default DashboardAdmin;