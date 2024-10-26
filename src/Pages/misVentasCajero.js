import React, { useState, useEffect } from 'react';
import NavbarCajeroComponent from '../Components/NavbarCajeroComponent';
import apiService from '../services/services'; // Servicio API
import Swal from 'sweetalert2';
import TableComponent from '../Components/TableComponent';

const MisVentasCajero = () => {

    const [Ventas, setVentas] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const dataProveedores = await apiService.getVentas();
          setVentas(dataProveedores);
  
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
