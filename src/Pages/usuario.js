import React, { useState, useEffect } from 'react';
import NavbarAdminComponent from '../Components/NavbarAdminComponent';
import TableComponent from '../Components/TableComponent';
import apiService from '../services/services';
import Swal from 'sweetalert2';

const Usuario = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataUsuarios = await apiService.getUsuarios();
        setUsuarios(dataUsuarios);

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

  const handleModificarUsuario = async (id) => {
    try {          
      const usuarioPorId = await apiService.getUsuarioId(id);
      console.log(usuarioPorId);

      Swal.fire({
        title: 'Modificar Usuario',
        html: `
          <div style="text-align: left;">
            <label for="usr_idpef">ID PEF:</label>
            <br/>
            <input type="number" id="usr_idpef" class="swal2-input" placeholder="Ingrese el ID PEF" value="${usuarioPorId.USR_IDPEF}">
            <br/>
            <label for="usr_nombre">Nombre:</label>
            <br/>
            <input type="text" id="usr_nombre" class="swal2-input" placeholder="Ingrese el nombre" value="${usuarioPorId.USR_NOMBRE}">
            <br/>
            <label for="usr_correo">Correo:</label>
            <br/>
            <input type="email" id="usr_correo" class="swal2-input" placeholder="Ingrese el correo" value="${usuarioPorId.USR_CORREO}">            
          </div>       
        `,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Actualizar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          const usr_idpef = Swal.getPopup().querySelector('#usr_idpef').value;
          const usr_nombre = Swal.getPopup().querySelector('#usr_nombre').value;
          const usr_correo = Swal.getPopup().querySelector('#usr_correo').value;

          apiService.updateUsuario(id, {
            USR_IDPEF: usr_idpef,
            USR_NOMBRE: usr_nombre,
            USR_CORREO: usr_correo
          });
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire('Actualización confirmada', '', 'success');
          const dataUsuarios = await apiService.getUsuarios();
          setUsuarios(dataUsuarios);
        }
      });
    } catch (error) {
      console.error('Error al consultar el usuario:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo encontrar el usuario con el ID proporcionado',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleEliminarUsuario = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await apiService.deleteUsuario(id);
        const dataUsuarios = await apiService.getUsuarios();
        setUsuarios(dataUsuarios);
        console.log('Usuario eliminado');
      }
    });
  };

  const handlePostUsuario = async () => {
    Swal.fire({
      title: 'Crear Usuario',
      html: `
      <div style="text-align: left;">
        <label for="usr_idpef">ID PEF:</label>
        <br/>
        <input type="number" id="usr_idpef" class="swal2-input" placeholder="Ingrese el ID PEF">
        <br/>
        <label for="usr_nombre">Nombre:</label>
        <br/>
        <input type="text" id="usr_nombre" class="swal2-input" placeholder="Ingrese el nombre">
        <br/>
        <label for="usr_correo">Correo:</label>
        <br/>
        <input type="email" id="usr_correo" class="swal2-input" placeholder="Ingrese el correo">
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
        const usr_idpef = Swal.getPopup().querySelector('#usr_idpef').value;
        const usr_nombre = Swal.getPopup().querySelector('#usr_nombre').value;
        const usr_correo = Swal.getPopup().querySelector('#usr_correo').value;

        try {
          await apiService.postUsuario({
            USR_IDPEF: usr_idpef,
            USR_NOMBRE: usr_nombre,
            USR_CORREO: usr_correo
          });
          Swal.fire('Creación exitosa', 'El nuevo usuario ha sido creado.', 'success');
          const dataUsuarios = await apiService.getUsuarios();
          setUsuarios(dataUsuarios);
        } catch (error) {
          console.error('Error al crear el usuario:', error);
          Swal.fire('Error', 'No se pudo crear el nuevo usuario.', 'error');
        }
      }
    });
  };

  const accionesBotones = (row) => (
    <div className="opcionesBTN">
      <button type="button" className="btn btn-outline-primary custom-tooltip" data-toggle="tooltip" data-placement="top" title="Tooltip on top" onClick={() => handleModificarUsuario(row.id)}><i className="fa-solid fa-pen"></i></button>
      <button type="button" className="btn btn-outline-danger" onClick={() => handleEliminarUsuario(row.id)}><i className="fa-solid fa-trash"></i></button>
    </div>
  );

  const columnas = [
    {
      name: 'ID Usuario',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'ID PEF',
      selector: row => row.USR_IDPEF,
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: row => row.USR_NOMBRE,
      sortable: true,
    },
    {
      name: 'Correo',
      selector: row => row.USR_CORREO,
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
        <h1>Usuarios</h1>
      </div>
      <div class="alineaDerecha ">
        <div className="alineaDerecha">
          <button type="button" className="btn btn-outline-success " onClick={() => handlePostUsuario()}>
            <i className="fa-solid fa-plus"></i> Crear Usuario
          </button>
        </div>
      </div>
      <TableComponent datostabla={usuarios} columnas={columnas} />
    </div>
  );
};

export default Usuario;