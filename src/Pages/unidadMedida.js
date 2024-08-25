import React, { useState, useEffect } from 'react';
import NavbarAdminComponent from '../Components/NavbarAdminComponent';
import TableComponent from '../Components/TableComponent';
import apiService from '../services/services';
import Swal from 'sweetalert2';

const UnidadMedida = () => {
  const [UnidadesMedida, setUnidadesMedida] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataUnidadesMedida = await apiService.getUnidadesMedida();
        setUnidadesMedida(dataUnidadesMedida);

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

  const handleModificarUnidadMedida = async (id) => {
    try {          
      const UnidadMedidaPorId = await apiService.getUnidadMedidaId(id);
      console.log(UnidadMedidaPorId);

      Swal.fire({
        title: 'Modificar Unidad de Medida',
        html: `
          <div style="text-align: left;">
            <label for="uni_descripcion">Descripción:</label>
            <br/>
            <input type="text" id="uni_descripcion" class="swal2-input" placeholder="Ingrese la descripción" value="${UnidadMedidaPorId.UNI_DESCRIPCION}">            
          </div>       
        `,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Actualizar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          const uni_descripcion = Swal.getPopup().querySelector('#uni_descripcion').value;

          apiService.updateUnidadMedida(id, {
            UNI_DESCRIPCION: uni_descripcion
          });
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire('Actualización confirmada', '', 'success');
          const dataUnidadesMedida = await apiService.getUnidadesMedida();
          setUnidadesMedida(dataUnidadesMedida);
        }
      });
    } catch (error) {
      console.error('Error al consultar la Unidad de Medida:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo encontrar la Unidad de Medida con el ID proporcionado',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleEliminarUnidadMedida = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar esta Unidad de Medida?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await apiService.deleteUnidadMedida(id);
        const dataUnidadesMedida = await apiService.getUnidadesMedida();
        setUnidadesMedida(dataUnidadesMedida);
        console.log('Unidad de Medida eliminada');
      }
    });
  };

  const handlePostUnidadMedida = async () => {
    Swal.fire({
      title: 'Crear Unidad de Medida',
      html: `
      <div style="text-align: left;">
        <label for="uni_descripcion">Descripción:</label>
        <br/>
        <input type="text" id="uni_descripcion" class="swal2-input" placeholder="Ingrese la descripción">
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
        const uni_descripcion = Swal.getPopup().querySelector('#uni_descripcion').value;

        try {
          await apiService.postUnidadMedida({
            UNI_DESCRIPCION: uni_descripcion
          });
          Swal.fire('Creación exitosa', 'La nueva Unidad de Medida ha sido creada.', 'success');
          const dataUnidadesMedida = await apiService.getUnidadesMedida();
          setUnidadesMedida(dataUnidadesMedida);
        } catch (error) {
          console.error('Error al crear la Unidad de Medida:', error);
          Swal.fire('Error', 'No se pudo crear la nueva Unidad de Medida.', 'error');
        }
      }
    });
  };

  const accionesBotones = (row) => (
    <div className="opcionesBTN">
      <button type="button" className="btn btn-outline-primary custom-tooltip" data-toggle="tooltip" data-placement="top" title="Tooltip on top" onClick={() => handleModificarUnidadMedida(row.id)}><i className="fa-solid fa-pen"></i></button>
      <button type="button" className="btn btn-outline-danger" onClick={() => handleEliminarUnidadMedida(row.id)}><i className="fa-solid fa-trash"></i></button>
    </div>
  );

  const columnas = [
    {
      name: 'ID Unidad de Medida',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Descripción',
      selector: row => row.UNI_DESCRIPCION,
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
        <h1>Unidades de Medida</h1>
      </div>
      <div className="alineaDerecha">
        <button type="button" className="btn btn-outline-success" onClick={() => handlePostUnidadMedida()}>
          <i className="fa-solid fa-plus"></i> Crear Unidad de Medida
        </button>
      </div>
      <TableComponent datostabla={UnidadesMedida} columnas={columnas} />
    </div>
  );
};

export default UnidadMedida;