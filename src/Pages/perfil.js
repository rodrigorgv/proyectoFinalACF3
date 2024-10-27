import React, { useState, useEffect } from 'react';
import NavbarAdminComponent from '../Components/NavbarAdminComponent';
import TableComponent from '../Components/TableComponent';
import apiService from '../services/services';
import Swal from 'sweetalert2';

const Perfil = () => {
  const [perfiles, setPerfiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPerfiles = await apiService.getPerfiles();
        setPerfiles(dataPerfiles);
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

  const handleModificarPerfil = async (id) => {
    try {          
      const perfilPorId = await apiService.getPerfilId(id);
      Swal.fire({
        title: 'Modificar Perfil',
        html: `
          <div style="text-align: left;">
            <label for="descripcion_perfil">Descripción Perfil:</label>
            <br/>
            <input type="text" id="descripcion_perfil" class="swal2-input" placeholder="Ingrese la descripción" value="${perfilPorId.PEF_DESCRIPCION}">
          </div>       
        `,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Actualizar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          const descripcion_perfil = Swal.getPopup().querySelector('#descripcion_perfil').value;

          if (!descripcion_perfil) {
            Swal.showValidationMessage('Por favor, complete todos los campos.');
            return false;
          }

          if (descripcion_perfil === perfilPorId.PEF_DESCRIPCION) {
            Swal.showValidationMessage('Los campos son iguales. No se hará la modificación.');
            return false;
          }

          const perfilExiste = perfiles.some(
            perfil => perfil.PEF_DESCRIPCION.toLowerCase() === descripcion_perfil.toLowerCase()
          );

          if (perfilExiste) {
            Swal.showValidationMessage('El perfil ya existe.');
            return false;
          }

          apiService.updatePerfil(id, { PEF_DESCRIPCION: descripcion_perfil });
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire('Actualización confirmada', '', 'success');
          const dataPerfiles = await apiService.getPerfiles();
          setPerfiles(dataPerfiles);
        }
      });
    } catch (error) {
      console.error('Error al consultar el perfil:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo encontrar el perfil con el ID proporcionado',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleEliminarPerfil = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este Perfil?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await apiService.deletePerfil(id);
        const dataPerfiles = await apiService.getPerfiles();
        setPerfiles(dataPerfiles);
      }
    });
  };

  const handlePostPerfil = async () => {
    Swal.fire({
      title: 'Crear Perfil',
      html: `
      <div style="text-align: left;">
        <label for="PEF_DESCRIPCION">Descripción Perfil:</label>
        <br/>
        <input type="text" id="PEF_DESCRIPCION" class="swal2-input" placeholder="Ingrese la descripción">
      </div>
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: async () => {
        const pef_descripcion = Swal.getPopup().querySelector('#PEF_DESCRIPCION').value;

        if (!pef_descripcion) {
          Swal.showValidationMessage('Por favor, complete todos los campos.');
          return false;
        }

        const perfilExiste = perfiles.some(
          perfil => perfil.PEF_DESCRIPCION.toLowerCase() === pef_descripcion.toLowerCase()
        );

        if (perfilExiste) {
          Swal.showValidationMessage('El perfil ya existe.');
          return false;
        }

        try {
          await apiService.postPerfil({ PEF_DESCRIPCION: pef_descripcion });
          Swal.fire('Creación exitosa', 'El nuevo perfil ha sido creado.', 'success');
          const dataPerfiles = await apiService.getPerfiles();
          setPerfiles(dataPerfiles);
        } catch (error) {
          console.error('Error al crear el perfil:', error);
          Swal.fire('Error', 'No se pudo crear el nuevo perfil.', 'error');
        }
      }
    });
  };

  const accionesBotones = (row) => (
    <div className="opcionesBTN">
      <button type="button" className="btn btn-outline-primary custom-tooltip" data-toggle="tooltip" data-placement="top" title="Modificar" onClick={() => handleModificarPerfil(row.id)}><i className="fa-solid fa-pen"></i></button>
      <button type="button" className="btn btn-outline-danger" onClick={() => handleEliminarPerfil(row.id)}><i className="fa-solid fa-trash"></i></button>
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
      selector: row => row.PEF_DESCRIPCION,
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
        <h1>Perfiles</h1>
      </div>
      <div className="alineaDerecha">
        <button type="button" className="btn btn-outline-success" onClick={() => handlePostPerfil()}>
          <i className="fa-solid fa-plus"></i> Crear Perfil
        </button>
      </div>
      <TableComponent datostabla={perfiles} columnas={columnas} />
    </div>
  );
};

export default Perfil;
