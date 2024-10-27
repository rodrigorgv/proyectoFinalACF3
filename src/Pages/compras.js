import React, { useState, useEffect } from 'react';
import NavbarAdminComponent from '../Components/NavbarAdminComponent';
import TableComponent from '../Components/TableComponent';
import apiService from '../services/services';
import Swal from 'sweetalert2';

const Compras = () => {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.getCompras();
        setCompras(data);
      } catch (error) {
        console.error('Error al obtener los datos de compras:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener la información de las compras.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    };

    fetchData();
  }, []);

  const handleModificar = async (id) => {
    try {
      const compra = await apiService.getCompraId(id);
      const total = compra.COM_CANTIDAD * compra.COM_PRECIO_UNIDAD; // Cálculo del total
      console.log(compra);

      Swal.fire({
        title: 'Modificar Compra',
        html: `
<div style="text-align: left;">
          <label for="idpro">ID Proveedor:</label>
          <br/>
          <input type="number" id="idpro" class="swal2-input" value="${compra.COM_IDPRO}">
          <br/>
          <label for="idart">ID Artículo:</label>
          <br/>
          <input type="number" id="idart" class="swal2-input" value="${compra.COM_IDART}">
          <br/>          
          <label for="descripcion">Descripción:</label>
          <br/>
          <input type="text" id="descripcion" class="swal2-input" value="${compra.COM_DESCRIPCION}">
          <br/>          
          <label for="fecha">Fecha:</label>
          <br/>
          <input type="date" id="fecha" class="swal2-input" value="${new Date(compra.COM_FECHA).toISOString().slice(0, 16)}">
          <br/>          
          <label for="cantidad">Cantidad:</label>
          <br/>
          <input type="number" id="cantidad" class="swal2-input" value="${compra.COM_CANTIDAD}" >
          <br/>          
          <label for="precioUnidad">Precio por Unidad:</label>
          <br/>
          <input type="number" id="precioUnidad" class="swal2-input" value="${compra.COM_PRECIO_UNIDAD}">
          <br/>          
        </div>
        <script>
          function calculateTotal() {
            const cantidad = parseFloat(document.getElementById('cantidad').value) || 0;
            const precioUnidad = parseFloat(document.getElementById('precioUnidad').value) || 0;
            document.getElementById('total').value = cantidad * precioUnidad;
          }
        </script>        
        `,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Actualizar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          const idpro = Swal.getPopup().querySelector('#idpro').value;
          const idart = Swal.getPopup().querySelector('#idart').value;
          const descripcion = Swal.getPopup().querySelector('#descripcion').value;
          const fecha = Swal.getPopup().querySelector('#fecha').value;
          const cantidad = Swal.getPopup().querySelector('#cantidad').value;
          const cantidadFrm = parseFloat(cantidad) || 0;
          const precioUnidad = Swal.getPopup().querySelector('#precioUnidad').value;
          const precioUnidadFrm = parseFloat(precioUnidad) || 0;
          const total = cantidadFrm * precioUnidadFrm;

          apiService.updateCompra(id, {
            COM_IDPRO: idpro,
            COM_IDART: idart,
            COM_DESCRIPCION: descripcion,
            COM_FECHA: fecha,
            COM_CANTIDAD: cantidadFrm,
            COM_PRECIO_UNIDAD: precioUnidadFrm,
            COM_TOTAL: total // Incluir el total en el post
          });
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire('Actualización confirmada', '', 'success');
          const data = await apiService.getCompras();
          setCompras(data);
        }
      });
    } catch (error) {
      console.error('Error al consultar la compra:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo encontrar la compra con el ID proporcionado.',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleEliminar = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar esta compra?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await apiService.deleteCompra(id);
        const data = await apiService.getCompras();
        setCompras(data);
        console.log('Compra eliminada');
      }
    });
  };

  const handleCrear = async () => {
    Swal.fire({
      title: 'Crear Compra',
      html: `
 <div style="text-align: left;">
      <label for="idpro">ID Proveedor:</label>
      <br/>
      <input type="number" id="idpro" class="swal2-input" placeholder="Ingrese el ID del proveedor">
      <br/>
      <label for="idart">ID Artículo:</label>
      <br/>
      <input type="number" id="idart" class="swal2-input" placeholder="Ingrese el ID del artículo">
      <br/>
      <label for="descripcion">Descripción:</label>
      <br/>
      <input type="text" id="descripcion" class="swal2-input" placeholder="Ingrese la descripción">
      <br/>
      <label for="fecha">Fecha:</label>
      <br/>
      <input type="date" id="fecha" class="swal2-input">
      <br/>
      <label for="cantidad">Cantidad:</label>
      <br/>
      <input type="number" id="cantidad" class="swal2-input" placeholder="Ingrese la cantidad" >
      <br/>
      <label for="precioUnidad">Precio por Unidad:</label>
      <br/>
      <input type="number" id="precioUnidad" class="swal2-input" placeholder="Ingrese el precio por unidad">
      <br/>
    </div>
    <script>
      function calculateTotal() {
        const cantidad = parseFloat(document.getElementById('cantidad').value) || 0;
        const precioUnidad = parseFloat(document.getElementById('precioUnidad').value) || 0;
        document.getElementById('total').value = cantidad * precioUnidad;
      }
    </script>
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: async () => {
        const idpro = Swal.getPopup().querySelector('#idpro').value;
        const idart = Swal.getPopup().querySelector('#idart').value;
        const descripcion = Swal.getPopup().querySelector('#descripcion').value;
        const fecha = Swal.getPopup().querySelector('#fecha').value;
        const cantidad = Swal.getPopup().querySelector('#cantidad').value;
        const cantidadFrm = parseFloat(cantidad) || 0;
        const precioUnidad = Swal.getPopup().querySelector('#precioUnidad').value;
        const precioUnidadFrm = parseFloat(precioUnidad) || 0;
        const total = cantidadFrm * precioUnidadFrm;
  
        try {
          await apiService.postCompra({
            COM_IDPRO: idpro,
            COM_IDART: idart,
            COM_DESCRIPCION: descripcion,
            COM_FECHA: fecha,
            COM_CANTIDAD: cantidadFrm,
            COM_PRECIO_UNIDAD: precioUnidadFrm,
            COM_TOTAL: total // Incluir el total en el post
          });
          Swal.fire('Creación exitosa', 'La nueva compra ha sido creada.', 'success');
          const data = await apiService.getCompras();
          setCompras(data);
        } catch (error) {
          console.error('Error al crear la compra:', error);
          Swal.fire('Error', 'No se pudo crear la nueva compra.', 'error');
        }
      }
    });
  };

  const accionesBotones = (row) => (
    <div className="opcionesBTN">
      <button type="button" className="btn btn-outline-primary custom-tooltip" data-toggle="tooltip" data-placement="top" title="Modificar" onClick={() => handleModificar(row.id)}><i className="fa-solid fa-pen"></i></button>
      <button type="button" className="btn btn-outline-danger" onClick={() => handleEliminar(row.id)}><i className="fa-solid fa-trash"></i></button>
    </div>
  );

  const columnas = [
    {
      name: 'ID Compra',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'ID Proveedor',
      selector: row => row.COM_IDPRO,
      sortable: true,
    },
    {
      name: 'ID Artículo',
      selector: row => row.COM_IDART,
      sortable: true,
    },
    {
      name: 'Descripción',
      selector: row => row.COM_DESCRIPCION,
      sortable: true,
    },
    {
      name: 'Fecha',
      selector: row => new Date(row.COM_FECHA).toLocaleDateString(),
      sortable: true,
    },
    {
      name: 'Cantidad',
      selector: row => row.COM_CANTIDAD,
      sortable: true,
    },
    {
      name: 'Precio Unidad',
      selector: row => row.COM_PRECIO_UNIDAD,
      sortable: true,
    },
    {
      name: 'Total',
      selector: row => row.COM_TOTAL,
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: accionesBotones,
      style: {
        width: '200px',
      },
    },
  ];

  return (
    <div>
      <NavbarAdminComponent />
      <div className="titulo">
        <h1>Gestión de Compras</h1>
      </div>
      <div className="alineaDerecha">
        <button type="button" className="btn btn-outline-success" onClick={() => handleCrear()}>
          <i className="fa-solid fa-plus"></i> Crear Compra
        </button>
      </div>
      <TableComponent datostabla={compras} columnas={columnas} />
    </div>
  );
};

export default Compras;