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
                    <h3>Bienvenido al panel de administrador JUAN PEREZ</h3>
                </div>

                <div className="row">
                    <span>Gestion de Supermercados y proveedores</span>
                    <CardComponent
                        title="SuperMercados"
                        iconClass="fa-solid fa-store"
                        quantity={99999}
                        enlace={"/consultaSuperMercado"}
                        tipoTexto={"text-success"}
                        tipoBorde={"border-left-success"}
                    />

                    <CardComponent
                        title="Proveedores"
                        iconClass="fa-solid fa-warehouse"
                        quantity={99999}
                        enlace={"/consultaProveedores"}
                        tipoTexto={"text-danger"}
                        tipoBorde={"border-left-danger"}
                    />

                    <CardComponent
                        title="Compra a proveedores"                    
                        iconClass="fas fa-money-check-alt"
                        quantity={99999}
                        enlace={"/consultaCompra"}
                        tipoTexto={"text-warning"}
                        tipoBorde={"border-left-warning"}
                    />

                    <CardComponent
                        title="Kardex"                                            
                        iconClass="fas fa-flag-checkered"
                        quantity={99999}
                        enlace={"/consultaProveedores"}
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
                        quantity={99999}
                        enlace={"/consultaArticulo"}
                        tipoTexto={"text-primary"}
                        tipoBorde={"border-left-primary"}
                    />

                    <CardComponent
                        title="Categoria"
                        iconClass="fas fa-window-restore"
                        quantity={99999}
                        enlace={"/consultaCategoria"}
                        tipoTexto={"text-warning"}
                        tipoBorde={"border-left-warning"}
                    />

                    <CardComponent
                        title="SubCategoria"
                        iconClass="fas fa-puzzle-piece"
                        quantity={99999}
                        enlace={"/consultaSubCategoria"}
                        tipoTexto={"text-success"}
                        tipoBorde={"border-left-success"}
                    />

                    <CardComponent
                        title="Area"
                        iconClass="fas fa-layer-group"
                        quantity={99999}
                        enlace={"/consultaArea"}
                        tipoTexto={"text-danger"}
                        tipoBorde={"border-left-danger"}
                    />

                    <CardComponent
                        title="Pasillo"
                        iconClass="fas fa-grip-lines-vertical"
                        quantity={99999}
                        enlace={"/consultaPasillo"}
                        tipoTexto={"text-success"}
                        tipoBorde={"border-left-success"}
                    />

                    <CardComponent
                        title="Unidad de medida"
                        iconClass="fas fa-balance-scale"
                        quantity={99999}
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
                        quantity={99999}
                        enlace={"/consultaEmpleado"}
                        tipoTexto={"text-warning"}
                        tipoBorde={"border-left-warning"}
                    />

                    <CardComponent
                        title="Usuario"
                        iconClass="fas fa-users"
                        quantity={99999}
                        enlace={"/consultaUsuario"}
                        tipoTexto={"text-info"}
                        tipoBorde={"border-left-info"}
                    />

                    <CardComponent
                        title="Perfil"
                        iconClass="fas fa-user-circle"
                        quantity={99999}
                        enlace={"/consultaUsuario"}
                        tipoTexto={"text-primary"}
                        tipoBorde={"border-left-primary"}
                    />

                    <CardComponent
                        title="Puesto"
                        iconClass="fas fa-user-tie"
                        quantity={99999}
                        enlace={"/consultaPuesto"}
                        tipoTexto={"text-success"}
                        tipoBorde={"border-left-success"}
                    />

                    <CardComponent
                        title="Caja de cobro"                        
                        iconClass="fas fa-cash-register"
                        quantity={99999}
                        enlace={"/consultaCajasCobro"}
                        tipoTexto={"text-danger"}
                        tipoBorde={"border-left-danger"}
                    />

                    <CardComponent
                        title="Cliente"
                        iconClass="fas fa-walking"
                        quantity={99999}
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