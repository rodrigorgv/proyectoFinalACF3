import React, { useState } from 'react'
import NavbarCajeroComponent from '../Components/NavbarCajeroComponent'
import TableComponentVenta from '../Components/TableComponentVenta';
import BarcodeScannerComponent from '../Components/BarcodeScannerComponent';
import CardComponent from '../Components/CardComponent';

export const Venta = () => {

    const [isShownEscaner, setIsShownEscaner] = useState(false);
    const [isShownTeclado, setIsShownTeclado] = useState(false);

    const handleClickEscaner = event => {
        // 👇️ toggle shown state
        setIsShownEscaner(current => !current);

        // 👇️ or simply set it to true
        // setIsShown(true);
    };

    const handleClickTeclado = event => {
        // 👇️ toggle shown state
        setIsShownTeclado(current => !current);

        // 👇️ or simply set it to true
        // setIsShown(true);
    };

    return (
        <div>
            <NavbarCajeroComponent />
            <div className="titulo">
                <h3>Registrando venta</h3>
            </div>
            <label>Ingrese información del cliente</label>
            <div class="input-group mb-3">
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Seleccione</button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">NIT</a></li>
                    <li><a class="dropdown-item" href="#">DPI</a></li>
                    <li><a class="dropdown-item" href="#">C/F</a></li>
                </ul>
                <input type="text" class="form-control" aria-label="Text input with dropdown button" />
            </div>
            <div onClick={handleClickTeclado}>
                <CardComponent
                    title="Ingresar producto Manualmente"
                    iconClass="fa-solid fa-keyboard"
                    tipoTexto={"text-secondary"}
                    tipoBorde={"border-left-secondary"}
                />
            </div>
            <div onClick={handleClickEscaner}>
                <CardComponent
                    title="Escanear Producto"
                    iconClass="fa-solid fa-barcode"
                    tipoTexto={"text-secondary"}
                    tipoBorde={"border-left-secondary"}
                />
            </div>


            {/* 👇️ show component on click */}
            {isShownEscaner &&

                <div className='camarita '>
                    <BarcodeScannerComponent />
                </div>
            }

            {/* 👇️ show component on click */}
            {isShownTeclado &&

                <div className='camarita '>
                    <BarcodeScannerComponent />
                </div>
            }

            <TableComponentVenta />
            <button type="button" class="btn btn-outline-success">Completar Venta</button>
            <button type="button" class="btn btn-outline-danger">Cancelar Venta</button>
        </div>
    )
}

export default Venta;