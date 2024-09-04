import React, { useState } from 'react';
import NavbarCajeroComponent from '../Components/NavbarCajeroComponent';
import TableComponentVenta from '../Components/TableComponentVenta';
import BarcodeScannerComponent from '../Components/BarcodeScannerComponent';
import CardComponent from '../Components/CardComponent';
import Swal from 'sweetalert2';

const Venta = () => {
    const [isShownEscaner, setIsShownEscaner] = useState(false);
    const [isShownTeclado, setIsShownTeclado] = useState(false);
    const [productos, setProductos] = useState([]); // Para almacenar los productos escaneados o ingresados manualmente.

    const handleClickEscaner = () => {
        setIsShownEscaner(current => !current);
        setIsShownTeclado(false);
    };

    const handleClickTeclado = () => {
        setIsShownTeclado(current => !current);
        setIsShownEscaner(false);
    };

    const handleAddProduct = (producto) => {
        setProductos(prevProductos => [...prevProductos, producto]);
    };

    // Función para manejar el ingreso manual de productos
    const handleManualInput = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Agregar Producto Manualmente',
            html: `
                <input id="swal-input1" class="swal2-input" placeholder="Nombre del Producto">
                <input id="swal-input2" type="number" class="swal2-input" placeholder="Cantidad">
                <input id="swal-input3" type="number" class="swal2-input" placeholder="Precio">
            `,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value,
                    document.getElementById('swal-input3').value
                ];
            }
        });

        if (formValues) {
            const [nombre, cantidad, precio] = formValues;
            const nuevoProducto = {
                nombre,
                cantidad: parseInt(cantidad, 10),
                precio: parseFloat(precio),
                total: parseInt(cantidad, 10) * parseFloat(precio)
            };
            handleAddProduct(nuevoProducto);
        }
    };

    // Manejo del escaneo de código de barras (placeholder)
    const handleScan = (scannedData) => {
        const producto = {
            nombre: 'Producto Escaneado', // Asigna el nombre del producto basado en el código escaneado
            cantidad: 1,
            precio: 10.00, // Precio por defecto, podría cambiarse si se obtiene de una base de datos
            total: 10.00
        };
        handleAddProduct(producto);
    };

    return (
        <div>
            <NavbarCajeroComponent />
            <div className="titulo">
                <h3>Registrando venta</h3>
            </div>
            <label>Ingrese información del cliente</label>
            <div className="input-group w-25 p-3">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Seleccione</button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">NIT</a></li>
                    <li><a className="dropdown-item" href="#">DPI</a></li>
                    <li><a className="dropdown-item" href="#">C/F</a></li>
                </ul>
                <input type="text" className="form-control" aria-label="Text input with dropdown button" />
            </div>
            
            <div>
                <div >
                    <div onClick={handleClickTeclado}>
                        <CardComponent
                            title="Ingresar producto Manualmente"
                            iconClass="fa-solid fa-keyboard"
                            tipoTexto={"text-secondary"}
                            tipoBorde={"border-left-secondary"}
                        />
                    </div>
                    <div  onClick={handleClickEscaner}>
                        <CardComponent
                            title="Escanear Producto"
                            iconClass="fa-solid fa-barcode"
                            tipoTexto={"text-secondary"}
                            tipoBorde={"border-left-secondary"}
                        />
                    </div>
                </div>
            </div>

            {isShownEscaner && (
                <div className='camarita'>
                    <BarcodeScannerComponent onScan={handleScan} />
                </div>
            )}

            {isShownTeclado && (
                <div className='camarita'>
                    <button className="btn btn-primary" onClick={handleManualInput}>Agregar Producto Manualmente</button>
                </div>
            )}

            <TableComponentVenta productos={productos} />

            <div className="d-flex justify-content-center w-100">
                <button type="button" className="btn btn-outline-success mx-2">Completar Venta</button>
                <button type="button" className="btn btn-outline-danger mx-2">Cancelar Venta</button>
            </div>
        </div>
    );
};

export default Venta;
