import React, { useState, useEffect } from 'react';
import NavbarAdminComponent from '../Components/NavbarAdminComponent';
import TableComponent from '../Components/TableComponent';
import apiService from '../services/services';
import Swal from 'sweetalert2';

const Pasillo = () => {
  const [pasillos, setPasillos] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPasillos = await apiService.getPasillos();
        setPasillos(dataPasillos);

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

  const renderSelectOptions = (selectedId) => {
    return areas.map((option) => (
      `<option value="${option.id}" ${String(option.id) === String(selectedId) ? 'selected' : ''}>${option.ARA_DESCRIPCION}</option>`
    )).join('');
  };
  
  const handleModificarPasillo = async (id) => {
    try {
      const pasilloPorId = await apiService.getPasilloId(id);
  
      Swal.fire({
        title: 'Modificar Pasillo',
        html: `
          <div style="text-align: left;">
            <label for="pas_idara">Area:</label>
            <br/>
            <select id="pas_area" class="swal2-select">
              ${renderSelectOptions(pasilloPorId.PAS_IDARA)}
            </select>
            <br/>
            <label for="pas_descripcion">Descripción:</label>
            <br/>
            <input type="text" id="pas_descripcion" class="swal2-input" placeholder="Ingrese la descripción" value="${pasilloPorId.PAS_DESCRIPCION}">
          </div>
        `,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Actualizar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          const pas_idara = Swal.getPopup().querySelector('#pas_area').value;
          const pas_descripcion = Swal.getPopup().querySelector('#pas_descripcion').value;
          if (!pas_descripcion) {
            Swal.showValidationMessage('Por favor, complete todos los campos.');
            return false; // Evitar que se cierre el modal si hay campos vacíos
          }

        // Validación de duplicados (área + descripción)
        const pasilloExiste = pasillos.some(
          pasillo => 
            pasillo.PAS_DESCRIPCION.toLowerCase() === pas_descripcion.toLowerCase() && 
            pasillo.PAS_IDARA === parseInt(pas_idara)
        );
                  
        if (pasilloExiste) {
          Swal.showValidationMessage('El pasillo ya existe en esta área.');
          return false; // Evitar que se cierre el modal si ya existe el pasillo en el área
        }

          apiService.updatePasillo(id, {
            PAS_IDARA: pas_idara,
            PAS_DESCRIPCION: pas_descripcion,
          });
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire('Actualización confirmada', '', 'success');
          const dataPasillos = await apiService.getPasillos();
          setPasillos(dataPasillos);
        }
      });
    } catch (error) {
      console.error('Error al consultar el pasillo:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo encontrar el pasillo con el ID proporcionado',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
    }
  };
  

  const handleEliminarPasillo = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este pasillo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await apiService.deletePasillo(id);
        const dataPasillos = await apiService.getPasillos();
        setPasillos(dataPasillos);
        console.log('Pasillo eliminado');
      }
    });
  };

  const handlePostPasillo = async () => {
    Swal.fire({
      title: 'Crear Pasillo',
      html: `
        <div style="text-align: left;">
          <label for="pas_idara">Área:</label>
          <br/>        
          <select id="pas_area" class="swal2-select">
          ${areas.map(option => `<option value="${option.id}" ${option.id === pasillos.PAS_IDARA ? 'selected' : ''}>${option.ARA_DESCRIPCION}</option>`).join('')}
          </select>        
          <br/>
          <label for="pas_descripcion">Descripción:</label>
          <br/>
          <input type="text" id="pas_descripcion" class="swal2-input" placeholder="Ingrese la descripción">
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
        const pas_idara = Swal.getPopup().querySelector('#pas_area').value;
        const pas_descripcion = Swal.getPopup().querySelector('#pas_descripcion').value;
  
        // Validación de campos vacíos
        if (!pas_descripcion || !pas_idara) {
          Swal.showValidationMessage('Por favor, complete todos los campos.');
          return false; // Evitar que se cierre el modal si hay campos vacíos
        }
  
        // Validación de duplicados (área + descripción)
        const pasilloExiste = pasillos.some(
          pasillo => 
            pasillo.PAS_DESCRIPCION.toLowerCase() === pas_descripcion.toLowerCase() && 
            pasillo.PAS_IDARA === parseInt(pas_idara)
        );
        
        if (pasilloExiste) {
          Swal.showValidationMessage('El pasillo ya existe en esta área.');
          return false; // Evitar que se cierre el modal si ya existe el pasillo en el área
        }
  
        try {
          // Si pasa las validaciones, crear el nuevo pasillo
          await apiService.postPasillo({
            PAS_IDARA: pas_idara,
            PAS_DESCRIPCION: pas_descripcion
          });
          Swal.fire('Creación exitosa', 'El nuevo pasillo ha sido creado.', 'success');
          const dataPasillos = await apiService.getPasillos();
          setPasillos(dataPasillos); // Actualizar el estado con los pasillos más recientes
        } catch (error) {
          console.error('Error al crear el pasillo:', error);
          Swal.fire('Error', 'No se pudo crear el nuevo pasillo.', 'error');
        }
      }
    });
  };
  

  const accionesBotones = (row) => (
    <div className="opcionesBTN">
      <button type="button" className="btn btn-outline-primary custom-tooltip" data-toggle="tooltip" data-placement="top" title="Tooltip on top" onClick={() => handleModificarPasillo(row.id)}><i className="fa-solid fa-pen"></i></button>
      <button type="button" className="btn btn-outline-danger" onClick={() => handleEliminarPasillo(row.id)}><i className="fa-solid fa-trash"></i></button>
    </div>
  );

  const areaDescripcion = (idArea) => {
    const desc = areas.find(e => e.id === idArea)
    return desc ? desc.ARA_DESCRIPCION : 'Desconocido';
  }



  const columnas = [
    {
      name: 'ID Pasillo',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Area',
      selector: row => areaDescripcion(row.PAS_IDARA),
      sortable: true,
    },
    {
      name: 'Descripción',
      selector: row => row.PAS_DESCRIPCION,
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
        <h1>Pasillos</h1>
      </div>
      <div class="alineaDerecha ">
        <div className="alineaDerecha">
          <button type="button" className="btn btn-outline-success " onClick={() => handlePostPasillo()}>
            <i className="fa-solid fa-plus"></i> Crear Pasillo
          </button>
        </div>
      </div>
      <TableComponent datostabla={pasillos} columnas={columnas} />
    </div>
  );
};

export default Pasillo;