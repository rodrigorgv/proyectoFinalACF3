import React, { useState, useEffect } from 'react';
import NavbarAdminComponent from '../Components/NavbarAdminComponent';
import TableComponent from '../Components/TableComponent';
import apiService from '../services/services';
import Swal from 'sweetalert2';

const Puesto = () => {
  const [puestos, setPuestos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPuestos = await apiService.getPuestos();
        setPuestos(dataPuestos);
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

  const handleModificarPuesto = async (id) => {
    try {          
      const puestoPorId = await apiService.getPuestoId(id);
      console.log(puestoPorId);
      Swal.fire({
        title: 'Modificar Puesto',
        html: `
          <div style="text-align: left;">
            <label for="descripcion_puesto">Descripción Puesto:</label>
            <br/>
            <input type="text" id="descripcion_puesto" class="swal2-input" placeholder="Ingrese la descripción" value="${puestoPorId.PUE_DESCRIPCION}">
          </div>       
        `,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Actualizar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          const descripcion_puesto = Swal.getPopup().querySelector('#descripcion_puesto').value;

          apiService.updatePuesto(id, {
            PUE_DESCRIPCION: descripcion_puesto
          });
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire('Actualización confirmada', '', 'success');
          const dataPuestos = await apiService.getPuestos();
          setPuestos(dataPuestos);
        }
      });
    } catch (error) {
      console.error('Error al consultar el puesto:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo encontrar el puesto con el ID proporcionado',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleEliminarPuesto = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este Puesto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await apiService.deletePuesto(id);
        const dataPuestos = await apiService.getPuestos();
        setPuestos(dataPuestos);
        console.log('Puesto eliminado');
      }
    });
  };

  const handlePostPuesto = async () => {
    Swal.fire({
      title: 'Crear Puesto',
      html: `
      <div style="text-align: left;">
        <label for="PUE_DESCRIPCION">Descripción Puesto:</label>
        <br/>
        <input type="text" id="PUE_DESCRIPCION" class="swal2-input" placeholder="Ingrese la descripción">
      </div>
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: async () => {
        const pue_descripcion = Swal.getPopup().querySelector('#PUE_DESCRIPCION').value;

        try {
          await apiService.postPuesto({
            PUE_DESCRIPCION: pue_descripcion
          });
          Swal.fire('Creación exitosa', 'El nuevo puesto ha sido creado.', 'success');
          const dataPuestos = await apiService.getPuestos();
          setPuestos(dataPuestos);
        } catch (error) {
          console.error('Error al crear el puesto:', error);
          Swal.fire('Error', 'No se pudo crear el nuevo puesto.', 'error');
        }
      }
    });
  };

  const accionesBotones = (row) => (
    <div className="opcionesBTN">
      <button type="button" className="btn btn-outline-primary custom-tooltip" data-toggle="tooltip" data-placement="top" title="Modificar" onClick={() => handleModificarPuesto(row.id)}><i className="fa-solid fa-pen"></i></button>
      <button type="button" className="btn btn-outline-danger" onClick={() => handleEliminarPuesto(row.id)}><i className="fa-solid fa-trash"></i></button>
    </div>
  );

  const columnas = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Descripción',
      selector: row => row.PUE_DESCRIPCION,
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
        <h1>Puestos</h1>
      </div>
      <div className="alineaDerecha">
        <button type="button" className="btn btn-outline-success" onClick={() => handlePostPuesto()}>
          <i className="fa-solid fa-plus"></i> Crear Puesto
        </button>
      </div>
      <TableComponent datostabla={puestos} columnas={columnas} />
    </div>
  );
};

export default Puesto;