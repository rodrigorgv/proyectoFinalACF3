import React from 'react'
import NavbarAdminComponent from '../Components/NavbarAdminComponent';
import CardComponent from '../Components/CardComponent';

const DashboardAdmin = () => {
    return (
        <div>
            <NavbarAdminComponent />
            <div className="container-fluid">
                <div className="titulo">
                    <h1>Dashboard SUPERMK</h1>
                    <h3>Bienvenido al panel de administrador</h3>
                </div>

                <div className="row">
                    <span>Gestion de Supermercados y proveedores</span>
                    <CardComponent
                        title="SuperMercados"
                        iconClass="fa-solid fa-store"
                        
                        enlace={"/consultaSuperMercado"}
                        tipoTexto={"text-success"}
                        tipoBorde={"border-left-success"}
                    />

                    <CardComponent
                        title="Proveedores"
                        iconClass="fa-solid fa-warehouse"
                        
                        enlace={"/consultaProveedores"}
                        tipoTexto={"text-danger"}
                        tipoBorde={"border-left-danger"}
                    />

                    <CardComponent
                        title="Compra a proveedores"                    
                        iconClass="fas fa-money-check-alt"
                        
                        enlace={"/consultaCompra"}
                        tipoTexto={"text-warning"}
                        tipoBorde={"border-left-warning"}
                    />

                    <CardComponent
                        title="Kardex"                                            
                        iconClass="fas fa-flag-checkered"
                        
                        enlace={"/kardex"}
                        tipoTexto={"text-primary"}
                        tipoBorde={"border-left-primary"}
                    />
                </div>
                <br></br>
                <div className="row">
                <span>Gestion de Articulos y sus componenetes</span>
                    <CardComponent
                        title="Articulos"

                        iconClass="fa-solid fa-box"
                        
                        enlace={"/consultaArticulo"}
                        tipoTexto={"text-primary"}
                        tipoBorde={"border-left-primary"}
                    />

                    <CardComponent
                        title="Categoria"
                        iconClass="fas fa-window-restore"
                        
                        enlace={"/consultaCategoria"}
                        tipoTexto={"text-warning"}
                        tipoBorde={"border-left-warning"}
                    />

                    <CardComponent
                        title="SubCategoria"
                        iconClass="fas fa-puzzle-piece"
                        
                        enlace={"/consultaSubCategoria"}
                        tipoTexto={"text-success"}
                        tipoBorde={"border-left-success"}
                    />

                    <CardComponent
                        title="Area"
                        iconClass="fas fa-layer-group"
                        
                        enlace={"/consultaArea"}
                        tipoTexto={"text-danger"}
                        tipoBorde={"border-left-danger"}
                    />

                    <CardComponent
                        title="Pasillo"
                        iconClass="fas fa-grip-lines-vertical"
                        
                        enlace={"/consultaPasillo"}
                        tipoTexto={"text-success"}
                        tipoBorde={"border-left-success"}
                    />

                    <CardComponent
                        title="Unidad de medida"
                        iconClass="fas fa-balance-scale"
                        
                        enlace={"/consultaUnidadMedida"}
                        tipoTexto={"text-danger"}
                        tipoBorde={"border-left-danger"}
                    />
                </div>
                <br></br>
                <div className="row">
                <span>Gestion de Personal y Clientes</span>
                    <CardComponent
                        title="Empleado"
                        iconClass="fa-solid fa-person"
                        
                        enlace={"/consultaEmpleado"}
                        tipoTexto={"text-warning"}
                        tipoBorde={"border-left-warning"}
                    />

                    <CardComponent
                        title="Usuario"
                        iconClass="fas fa-users"
                        
                        enlace={"/consultaUsuario"}
                        tipoTexto={"text-info"}
                        tipoBorde={"border-left-info"}
                    />

                    <CardComponent
                        title="Perfil"
                        iconClass="fas fa-user-circle"
                        
                        enlace={"/consultaUsuario"}
                        tipoTexto={"text-primary"}
                        tipoBorde={"border-left-primary"}
                    />

                    <CardComponent
                        title="Puesto"
                        iconClass="fas fa-user-tie"
                        
                        enlace={"/consultaPuesto"}
                        tipoTexto={"text-success"}
                        tipoBorde={"border-left-success"}
                    />

                    <CardComponent
                        title="Caja de cobro"                        
                        iconClass="fas fa-cash-register"
                        
                        enlace={"/consultaCajasCobro"}
                        tipoTexto={"text-danger"}
                        tipoBorde={"border-left-danger"}
                    />

                    <CardComponent
                        title="Cliente"
                        iconClass="fas fa-walking"
                        
                        enlace={"/consultaCliente"}
                        tipoTexto={"text-warning"}
                        tipoBorde={"border-left-warning"}
                    />
                </div>

            </div>
        </div>
    );
}

export default DashboardAdmin;