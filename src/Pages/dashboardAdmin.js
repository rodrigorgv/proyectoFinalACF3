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
                        enlace={"/consultaProveedores"}
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

                    <CardComponent
                        title="Pasillo"                        
                        iconClass="fas fa-grip-lines-vertical"
                        quantity={99999}
                        enlace={"/consultaPasillo"}
                        tipoTexto={"text-danger"}
                        tipoBorde={"border-left-danger"}
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
                        title="Puesto"                      
                        iconClass="fas fa-user-tie"
                        quantity={99999}
                        enlace={"/consultaPuesto"}
                        tipoTexto={"text-success"}
                        tipoBorde={"border-left-success"}
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
                        title="Unidad de medida"                                  
                        iconClass="fas fa-balance-scale"
                        quantity={99999}
                        enlace={"/consultaUnidadMedida"}
                        tipoTexto={"text-primary"}
                        tipoBorde={"border-left-primary"}
                    />
    
                    <CardComponent
                        title="Area"                                  
                        iconClass="fas fa-layer-group"
                        quantity={99999}
                        enlace={"/consultaArea"}
                        tipoTexto={"text-danger"}
                        tipoBorde={"border-left-danger"}
                    />
                </div>

            </div>
        </div>
    );
}

export default DashboardAdmin;