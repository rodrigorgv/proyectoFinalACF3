import React, { useState, useEffect } from 'react';
import NavbarAdminComponent from '../Components/NavbarAdminComponent';
import TableComponent from '../Components/TableComponent';
import apiService from '../services/services';
import Swal from 'sweetalert2';

const Area = () => {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataAreas = await apiService.getAreas();
        setAreas(dataAreas);
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

  const handleModificarArea = async (id) => {
    try {
      const areaPorId = await apiService.getAreaId(id);
      console.log(areaPorId);
      Swal.fire({
        title: 'Modificar Área',
        html: `
          <div style="text-align: left;">
            <label for="descripcion_area">Descripción Área:</label>
            <br/>
            <input type="text" id="descripcion_area" class="swal2-input" placeholder="Ingrese la descripción" value="${areaPorId.ARA_DESCRIPCION}">
          </div>       
        `,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Actualizar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          const descripcion_area = Swal.getPopup().querySelector('#descripcion_area').value;

          apiService.updateArea(id, {
            ARA_DESCRIPCION: descripcion_area
          });
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire('Actualización confirmada', '', 'success');
          const dataAreas = await apiService.getAreas();
          setAreas(dataAreas);
        }
      });
    } catch (error) {
      console.error('Error al consultar el área:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo encontrar el área con el ID proporcionado',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleEliminarArea = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar esta Área?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await apiService.deleteArea(id);
        const dataAreas = await apiService.getAreas();
        setAreas(dataAreas);
        console.log('Área eliminada');
      }
    });
  };

  const handlePostArea = async () => {
    Swal.fire({
      title: 'Crear Área',
      html: `
      <div style="text-align: left;">
        <label for="ARA_DESCRIPCION">Descripción Área:</label>
        <br/>
        <input type="text" id="ARA_DESCRIPCION" class="swal2-input" placeholder="Ingrese la descripción">
      </div>
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: async () => {
        const ara_descripcion = Swal.getPopup().querySelector('#ARA_DESCRIPCION').value;

        try {
          await apiService.postArea({
            ARA_DESCRIPCION: ara_descripcion
          });
          Swal.fire('Creación exitosa', 'La nueva área ha sido creada.', 'success');
          const dataAreas = await apiService.getAreas();
          setAreas(dataAreas);
        } catch (error) {
          console.error('Error al crear el área:', error);
          Swal.fire('Error', 'No se pudo crear la nueva área.', 'error');
        }
      }
    });
  };

  const accionesBotones = (row) => (
    <div className="opcionesBTN">
      <button type="button" className="btn btn-outline-primary custom-tooltip" data-toggle="tooltip" data-placement="top" title="Modificar" onClick={() => handleModificarArea(row.id)}><i className="fa-solid fa-pen"></i></button>
      <button type="button" className="btn btn-outline-danger" onClick={() => handleEliminarArea(row.id)}><i className="fa-solid fa-trash"></i></button>
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
      selector: row => row.ARA_DESCRIPCION,
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
        <h1>Áreas</h1>
      </div>
      <div className="alineaDerecha">
        <button type="button" className="btn btn-outline-success" onClick={() => handlePostArea()}>
          <i className="fa-solid fa-plus"></i> Crear Área
        </button>
      </div>
      <TableComponent datostabla={areas} columnas={columnas} />
    </div>
  );
};

export default Area;