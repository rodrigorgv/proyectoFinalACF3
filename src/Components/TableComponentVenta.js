import React from 'react';

const TableComponentVenta = ({ productos }) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Nombre del Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {productos.map((producto, index) => (
                    <tr key={index}>
                        <td>{producto.nombre}</td>
                        <td>{producto.cantidad}</td>
                        <td>{producto.precio.toFixed(2)}</td>
                        <td>{producto.total.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableComponentVenta;
