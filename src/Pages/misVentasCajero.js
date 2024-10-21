import React, { useState, useEffect } from 'react';
import NavbarCajeroComponent from '../Components/NavbarCajeroComponent';
import TableComponentVenta from '../Components/TableComponentVenta'; // Reutilizamos el mismo componente de tabla
import apiService from '../services/services'; // Servicio API
import Swal from 'sweetalert2';
import TableComponent from '../Components/TableComponent';

const MisVentasCajero = () => {
    const [loading, setLoading] = useState(true);
    const [Ventas, setVentas] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const dataProveedores = await apiService.getVentas();
          setVentas(dataProveedores);
                // Filtramos las ventas para mostrar solo las del cajero logueado
                const ventasFiltradas = dataProveedores.filter(venta => venta.VEN_IDCAC == 1);
                console.log('ventas filtradas', ventasFiltradas);
                
                setVentas(ventasFiltradas);          
  
        } catch (error) {
          console.error('Error al obtener datos:', error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo obtener la información necesaria.',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      };
  
      fetchData();
    }, []);

    const handleDetalleVenta = async (idVenta) => {
        try {
            // Obtener los detalles de todas las ventas
            const dataDetalleVenta = await apiService.getDetalleVentas();
    
            // Filtrar los detalles de la venta correspondiente
            const detaVentaFiltrado = dataDetalleVenta.filter(detaventa => detaventa.DVA_IDVEN == idVenta);
    
            if (detaVentaFiltrado.length === 0) {
                // Si no hay detalles de venta, mostramos una alerta
                Swal.fire('Sin Detalles', 'No se encontraron detalles para esta venta.', 'info');
                return;
            }
    
            // Construimos el contenido de la alerta con los detalles de la venta
            let detalleHtml = '';
            detaVentaFiltrado.forEach(detalle => {
                detalleHtml += `
                    <div>
                        <strong>Articulo:</strong> ${detalle.DVA_IDART}
                        <strong> Cantidad:</strong> ${detalle.DVA_CANTIDAD}
                        <strong>Precio por Unidad:</strong> Q${detalle.DVA_PRECIO_UNIDAD}
                        <strong>    Subtotal:</strong> Q${detalle.DVA_SUBTOTAL}
                    </div><br/>
                `;
            });
            detalleHtml += '</ul>';
    
            // Mostrar el SweetAlert con los detalles
            Swal.fire({
                title: 'Detalle de Venta',
                html: detalleHtml,
                icon: 'info',
                confirmButtonText: 'Cerrar'
            });
        } catch (error) {
            // Mostrar error si algo falla al obtener los detalles
            console.error('Error al obtener el detalle de la venta:', error);
            Swal.fire('Error', 'No se pudieron obtener los detalles de la venta.', 'error');
        }
    };
    

  //fin metodos sweetalert 
  const accionesBotones = (row) => (
    <div className="opcionesBTN">
      <button type="button" className="btn btn-outline-primary custom-tooltip" onClick={()=>handleDetalleVenta(row.id)} data-toggle="tooltip" data-placement="top" title="ver detalle venta" ><i class="fa-solid fa-info"></i></button>  
    </div>
  );    

  //****ojo ojo--colocar todos los campos de la tabla, seguir estructura que ya se tiene */
  const columnas = [
    {
        name: 'ID',
        selector: row => row.id, // Asegúrate que 'VEN_ID' existe en los datos de ventas
        sortable: true,
    },
    {
        name: 'ID de cliente',
        selector: row => row.VEN_IDCLI, // Verifica que esta propiedad existe en cada venta
        sortable: true,
    },
    {
        name: 'Fecha Venta',
        selector: row => row.VEN_FECHA, // Asegúrate que 'VEN_FECHA' está en el formato correcto
        sortable: true,
    },  
    {
        name: 'Total Venta',
        selector: row => row.VENT_TOTAL, // Asegúrate que 'VENT_TOTAL' existe en los datos de ventas
        sortable: true,
    },       
    {
        name: 'Detalle de venta',
        cell: accionesBotones,
      },   
];


  return (
    <div>
      <NavbarCajeroComponent />
      <div className="titulo">
                <h3>Mis Ventas</h3>
            </div>
      <div class="alineaDerecha ">
        <div className="alineaDerecha">
        </div>
      </div>
      <TableComponent datostabla={Ventas} columnas={columnas} />
    </div>

  );
};

export default MisVentasCajero;
