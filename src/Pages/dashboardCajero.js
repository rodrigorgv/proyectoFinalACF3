import React from 'react'
import CardComponent from '../Components/CardComponent';
import NavbarCajeroComponent from '../Components/NavbarCajeroComponent';
import BarcodeScannerComponent from '../Components/BarcodeScannerComponent';

const DashboardCajero = () => {
    return (
        <div>
            <NavbarCajeroComponent />
            <div className="container-fluid">
                <div className="titulo">
                    <h1>Cajero #999 | SUPERMK</h1>
                </div>
                <div className="d-flex justify-content-center">
                    <CardComponent
                        title="Registrar Venta"
                        iconClass="fas fa-cart-plus"
                        enlace={"/venta"}
                        tipoTexto={"text-success"}
                        tipoBorde={"border-left-success"}
                    />
                    <CardComponent
                        title="Mis ventas"
                        iconClass="fa-solid fa-list-check"
                        enlace={"/ventasCajero"}
                        tipoTexto={"text-warning"}
                        tipoBorde={"border-left-warning"}
                    />

                </div>

            </div>
        </div>
    );
}

export default DashboardCajero;