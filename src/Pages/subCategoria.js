import React, { useState, useEffect } from 'react';
import NavbarAdminComponent from '../Components/NavbarAdminComponent';
import TableComponent from '../Components/TableComponent';
import apiService from '../services/services';
import Swal from 'sweetalert2';

const subCategoria = () => {
  const [SCA_SUBCATEGORIAS, setSCA_SUBCATEGORIAS] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataSCA_SUBCATEGORIAS = await apiService.getSCA_SUBCATEGORIAS();
        setSCA_SUBCATEGORIAS(dataSCA_SUBCATEGORIAS);
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

  const handleModificarSCA_SUBCATEGORIAS = async (id) => {
    try {
      const SCA_SUBCATEGORIAPorId = await apiService.getSCA_SUBCATEGORIAId(id);
      console.log(SCA_SUBCATEGORIAPorId);

      Swal.fire({
        title: 'Modificar SCA_SUBCATEGORIA',
        html: `
          <div style="text-align: left;">
            <label for="SCA_DESCRIPCION">Descripción:</label>
            <br/>
            <input type="text" id="SCA_DESCRIPCION" class="swal2-input" placeholder="Ingrese la descripción" value="${SCA_SUBCATEGORIAPorId.SCA_DESCRIPCION}">
          </div>
        `,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Actualizar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          const SCA_DESCRIPCION = Swal.getPopup().querySelector('#SCA_DESCRIPCION').value;

          apiService.updateSCA_SUBCATEGORIA(id, {
            SCA_DESCRIPCION: SCA_DESCRIPCION
          });
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire('Actualización confirmada', '', 'success');
          const dataSCA_SUBCATEGORIAS = await apiService.getSCA_SUBCATEGORIAS();
          setSCA_SUBCATEGORIAS(dataSCA_SUBCATEGORIAS);
        }
      });
    } catch (error) {
      console.error('Error al consultar la SCA_SUBCATEGORIA:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo encontrar la SCA_SUBCATEGORIA con el ID proporcionado',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleEliminarSCA_SUBCATEGORIA = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar esta SCA_SUBCATEGORIA?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await apiService.deleteSCA_SUBCATEGORIA(id);
        const dataSCA_SUBCATEGORIAS = await apiService.getSCA_SUBCATEGORIAS();
        setSCA_SUBCATEGORIAS(dataSCA_SUBCATEGORIAS);
        console.log('SCA_SUBCATEGORIA eliminada');
      }
    });
  };

  const handlePostSCA_SUBCATEGORIA = async () => {
    Swal.fire({
      title: 'Crear SCA_SUBCATEGORIA',
      html: `
      <div style="text-align: left;">
        <label for="SCA_DESCRIPCION">Descripción:</label>
        <br/>
        <input type="text" id="SCA_DESCRIPCION" class="swal2-input" placeholder="Ingrese la descripción">
        <br/>
      </div>
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: async () => {
        const SCA_DESCRIPCION = Swal.getPopup().querySelector('#SCA_DESCRIPCION').value;

        try {
          await apiService.postSCA_SUBCATEGORIA({
            SCA_DESCRIPCION: SCA_DESCRIPCION
          });
          Swal.fire('Creación exitosa', 'La nueva SCA_SUBCATEGORIA ha sido creada.', 'success');
          const dataSCA_SUBCATEGORIAS = await apiService.getSCA_SUBCATEGORIAS();
          setSCA_SUBCATEGORIAS(dataSCA_SUBCATEGORIAS);
        } catch (error) {
          console.error('Error al crear la SCA_SUBCATEGORIA:', error);
          Swal.fire('Error', 'No se pudo crear la nueva SCA_SUBCATEGORIA.', 'error');
        }
      }
    });
  };

  const accionesBotones = (row) => (
    <div className="opcionesBTN">
      <button type="button" className="btn btn-outline-primary custom-tooltip" data-toggle="tooltip" data-placement="top" title="Tooltip on top" onClick={() => handleModificarSCA_SUBCATEGORIAS(row.SCA_ID)}><i className="fa-solid fa-pen"></i></button>
      <button type="button" className="btn btn-outline-danger" onClick={() => handleEliminarSCA_SUBCATEGORIA(row.SCA_ID)}><i className="fa-solid fa-trash"></i></button>
    </div>
  );

  const columnas = [
    {
      name: 'ID SCA_SUBCATEGORIA',
      selector: row => row.SCA_ID,
      sortable: true,
    },
    {
      name: 'Descripción',
      selector: row => row.SCA_DESCRIPCION,
      sortable: true,
    },
    {
      name: 'IDCAT',
      selector: row => row.SCA_IDCAT,
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
        <h1>SCA_SUBCATEGORIAS</h1>
      </div>
      <div className="alineaDerecha">
        <button type="button" className="btn btn-outline-success" onClick={() => handlePostSCA_SUBCATEGORIA()}>
          <i className="fa-solid fa-plus"></i> Crear SCA_SUBCATEGORIA
        </button>
      </div>
      <TableComponent datostabla={SCA_SUBCATEGORIAS} columnas={columnas} />
    </div>
  );
};

export default subCategoria;