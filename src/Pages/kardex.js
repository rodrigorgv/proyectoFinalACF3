import React, { useState, useEffect } from 'react';
import NavbarCajeroComponent from '../Components/NavbarAdminComponent';
import apiService from '../services/services';
import Swal from 'sweetalert2';

const KardexPage = () => {
    const [kardexData, setKardexData] = useState([]);
    
    useEffect(() => {
        const fetchKardexData = async () => {
            try {
                const data = await apiService.getKardex(); // Llama al endpoint para obtener el Kardex
                setKardexData(data);
            } catch (error) {
                console.error('Error al obtener datos del Kardex:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo obtener la información del Kardex.',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                });
            }
        };

        fetchKardexData();
    }, []);
    
    return (
        <div>
            <NavbarCajeroComponent />
            <div className="container-fluid">
                <div className="titulo mt-4">
                    <h1>Kardex de Inventario</h1>
                </div>
                <div className="table-responsive mt-4">
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID Movimiento</th>
                                <th>Producto</th>
                                <th>Fecha</th>
                                <th>Tipo</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {kardexData.length > 0 ? (
                                kardexData.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.producto}</td>
                                        <td>{new Date(item.fecha).toLocaleDateString()}</td>
                                        <td>{item.tipoMovimiento}</td>
                                        <td>{item.cantidad}</td>
                                        <td>${item.precioUnitario.toFixed(2)}</td>
                                        <td>${(item.cantidad * item.precioUnitario).toFixed(2)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        No hay movimientos en el Kardex
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default KardexPage;
