import React, { useState } from 'react';
import NavbarCajeroComponent from '../Components/NavbarCajeroComponent';
import TableComponentVenta from '../Components/TableComponentVenta';
import BarcodeScannerComponent from '../Components/BarcodeScannerComponent';
import CardComponent from '../Components/CardComponent';
import Swal from 'sweetalert2';
import apiService from '../services/services';

const Venta = () => {
    const [isShownEscaner, setIsShownEscaner] = useState(false);
    const [isShownTeclado, setIsShownTeclado] = useState(false);
    const [productos, setProductos] = useState([]); // Para almacenar los productos escaneados o ingresados manualmente.
    const [clienteId, setClienteId] = useState(null); // Guardar ID de cliente
    const [totalVenta, setTotalVenta] = useState(0); // Total de la venta

    const handleClickEscaner = () => {
        setIsShownEscaner(current => !current);
        setIsShownTeclado(false);
    };

    const handleClickTeclado = () => {
        setIsShownTeclado(current => !current);
        setIsShownEscaner(false);
    };

    const handleClienteSelection = (id) => {
        setClienteId(id);
    };

    const handleAddProduct = (producto) => {
        setProductos(prevProductos => [...prevProductos, producto]);
        // Calcular nuevo total
        setTotalVenta(prevTotal => prevTotal + producto.total);        
    };

// Función para completar la venta
const handleCompleteVenta = async () => {
    if (!clienteId) {
        Swal.fire('Error', 'Por favor seleccione un cliente antes de completar la venta.', 'error');
        return;
    }

    if (productos.length === 0) {
        Swal.fire('Error', 'No hay productos en la venta.', 'error');
        return;
    }

    try {
        // 1. Registrar la venta en VEN_VENTA
        const ventaData = {
            VEN_IDCLI: clienteId, // ID del cliente
            VEN_IDCAC: 1,
            VEN_FECHA: new Date().toISOString().split('T')[0], // Fecha actual en formato AAAA-MM-DD
            VEN_TOTAL: totalVenta // Total de la venta
        };

        const ventaResponsepost = await apiService.postVenta(ventaData);

        const ventasResponse = await apiService.getVentas(); // Obtener todas las ventas
        console.log('ventasResponseget ', ventasResponse);
        const ventas = ventasResponse;
        console.log('ventas', ventas);

        // Obtener la última venta registrada (la de mayor ID)
        const ultimaVenta = ventas[ventas.length - 1]; // Asume que las ventas están en orden
        const ventaId = ultimaVenta.id; // Obtener el ID de la última venta

        // 2. Registrar cada producto en DVA_DETALLE_VENTA
        for (let producto of productos) {
            const detalleVentaData = {
                DVA_IDVEN: ventaId, // ID de la venta
                DVA_IDART: producto.id, // ID del artículo
                DVA_CANTIDAD: producto.cantidad, // Cantidad del producto
                DVA_PRECIO_UNIDAD: producto.precio, // Precio unitario
                DVA_SUBTOTAL: producto.total // Subtotal (precio * cantidad)
            };

            await apiService.postDetalleVenta(detalleVentaData);
        }

        // 3. Mostrar éxito y resetear la venta
        Swal.fire('Éxito', 'La venta ha sido completada exitosamente.', 'success');
        setProductos([]); // Limpiar productos
        setTotalVenta(0); // Resetear total
        setClienteId(null); // Resetear cliente

    } catch (error) {
        console.error('Error al completar la venta:', error);
        Swal.fire('Error', 'No se pudo completar la venta.', 'error');
    }
};    

    
    // Función para manejar el ingreso manual de productos
    const handleManualInput = async () => {
        try {
            // Supongamos que `apiService.getArticulos` devuelve la lista de artículos existentes
            const articulos = await apiService.getArticulos();

            // Verificamos qué datos devuelve la API
            console.log('Artículos obtenidos:', articulos);

            if (!articulos || articulos.length === 0) {
                throw new Error('No se encontraron productos.');
            }

            const options = articulos.map(articulo => `<option value="${articulo.id}">${articulo.ART_NOMBRE} - Precio: ${articulo.ART_PRECIO}</option>`).join('');

            const { value: formValues } = await Swal.fire({
                title: 'Agregar Producto Manualmente',
                html: `
                    <select id="swal-input1" class="swal2-select">
                        <option value="">Seleccione un producto</option>
                        ${options}
                    </select>
                    <input id="swal-input2" type="number" class="swal2-input" placeholder="Cantidad">
                `,
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('swal-input1').value,
                        document.getElementById('swal-input2').value
                    ];
                }
            });

            if (formValues) {
                const [articuloId, cantidad] = formValues;
                if (!articuloId || !cantidad) {
                    Swal.showValidationMessage('Por favor, seleccione un producto y defina una cantidad.');
                    return;
                }

                // Buscamos el artículo en la lista
                const articuloSeleccionado = articulos.find(art => art.id == parseInt(articuloId));

                if (!articuloSeleccionado) {
                    throw new Error('Producto no encontrado.');
                }

                const nuevoProducto = {
                    nombre: articuloSeleccionado.ART_NOMBRE,
                    cantidad: parseInt(cantidad, 10),
                    precio: parseFloat(articuloSeleccionado.ART_PRECIO),
                    total: parseInt(cantidad, 10) * parseFloat(articuloSeleccionado.ART_PRECIO)
                };
                handleAddProduct(nuevoProducto);
            }
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            Swal.fire('Error', 'No se pudieron obtener los productos.', 'error');
        }
    };


    // Manejo del escaneo de código de barras (placeholder)
    // Manejo del escaneo de código de barras
    const handleScan = async (scannedData) => {
        try {
            // Obtener todos los artículos
            const articulos = await apiService.getArticulos();

            // Buscar el producto cuyo código de barras coincida con el escaneado
            console.log('Código de barras escaneado:', scannedData);
            const producto = articulos.find(articulo => articulo.ART_CODIGO_DE_BARRA == scannedData);
            console.log('Producto encontrado:', producto);

            if (producto) {
                // Abrir un modal para solicitar la cantidad
                const { value: cantidad } = await Swal.fire({
                    title: 'Cantidad de artículos',
                    input: 'number',
                    inputLabel: `Ingrese la cantidad de ${producto.ART_NOMBRE} que desea añadir`,
                    inputPlaceholder: 'Cantidad',
                    inputAttributes: {
                        min: 1,
                        step: 1
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Añadir a la venta',
                    cancelButtonText: 'Cancelar',
                    inputValidator: (value) => {
                        if (!value || value <= 0) {
                            return 'Debe ingresar una cantidad válida';
                        }
                    }
                });

                if (cantidad) {
                    // Si se ingresó una cantidad válida, agregar el producto con la cantidad indicada
                    const nuevoProducto = {
                        nombre: producto.ART_NOMBRE,   // Nombre del producto
                        cantidad: parseInt(cantidad, 10), // Cantidad ingresada
                        precio: producto.ART_PRECIO,   // Precio del producto
                        total: producto.ART_PRECIO * parseInt(cantidad, 10) // Precio * cantidad
                    };

                    // Agregar el producto a la lista de productos
                    handleAddProduct(nuevoProducto);
                }
            } else {
                // Si no se encuentra el producto, mostrar un error
                throw new Error("Producto no encontrado");
            }
        } catch (error) {
            console.error("Error al obtener el producto:", error.message);

            // Mostrar alerta si hay un error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo encontrar el producto escaneado.'
            });
        }
    };



    // En tu render:
    {
        isShownEscaner && (
            <div className='camarita'>
                <BarcodeScannerComponent onScan={handleScan} />
            </div>
        )
    }

    return (
        <div>
            <NavbarCajeroComponent />
            <div className="titulo">
                <h3>Registrando venta</h3>
                <h4>Total Venta: Q{totalVenta}</h4>
            </div>
            <label>Ingrese información del cliente</label>
            <div className="input-group w-25 p-3">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Seleccione</button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#" onClick={() => handleClienteSelection(1)}>C/F</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => handleClienteSelection(2)}>Juan Perez</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => handleClienteSelection(3)}>Maria Lopez</a></li>
                </ul>
                <input type="text" className="form-control" aria-label="Text input with dropdown button" value={clienteId ? `Cliente seleccionado: ${clienteId}` : ''} readOnly />
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
                    <div onClick={handleClickEscaner}>
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
                <button type="button" className="btn btn-outline-success mx-2" onClick={handleCompleteVenta}>Completar Venta</button>
                <button type="button" className="btn btn-outline-danger mx-2">Cancelar Venta</button>
            </div>
        </div>
    );
};

export default Venta;
