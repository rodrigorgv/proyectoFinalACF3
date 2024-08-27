//este es el codigo

import React, { useState, useEffect } from 'react';
import NavbarAdminComponent from '../Components/NavbarAdminComponent';
import TableComponent from '../Components/TableComponent';
import apiService from '../services/services';
import Swal from 'sweetalert2';


const Cliente = () => {
  const [Cliente, setCliente] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataClientes = await apiService.getClientes();
        setCliente(dataClientes);

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



  //metodos para sweetalert

  const handleModificarCliente = async (id) => {
    try {          
      const clientePorId = await apiService.getClienteId(id);
      console.log(clientePorId);
      //***ojo ojo---aca deben de añadir todos los nuevos campos que les corresponden, deben de añadir 1 label y un input por campo.  */
      Swal.fire({
        title: 'Modificar Cliente',
        html: `
          <div style="text-align: left;">
            <label for="nomble_cli">Nombre Cliente:</label>
            <br/>
            <input type="Text" id="nombre_cli" class="swal2-input" placeholder="Ingrese el nombre" value="${clientePorId.CLI_NOMBRE}">
            <br/>
            <label for="correo_cli">Correo  Cliente:</label>
            <br/>
            <input type="Text" id="correo_cli" class="swal2-input" placeholder="Ingrese el correo" value="${clientePorId.CLI_CORREO}">            
            <br/>
            <label for="nit_cli">Nit  Cliente:</label>
            <br/>
            <input type="number" id="nit_cli" class="swal2-input" placeholder="Ingrese el nit" value="${clientePorId.CLI_NIT}">            
          </div>       
        `,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Actualizar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          // Obtener los valores de los inputs
          //***ojo ojo---aca deben de añadir todos los nuevos campos que les corresponden, deben de añadir con # el nombre que pusieron en el ID de los input  */
          const nombre_cli    = Swal.getPopup().querySelector('#nombre_cli').value;
          const correo_cli = Swal.getPopup().querySelector('#correo_cli').value;
          const nit_cli = Swal.getPopup().querySelector('#nit_cli').value;

          // Llamar a la función para actualizar el super
          apiService.updateCliente(id, {
            CLI_NOMBRE: nombre_cli,           
            CLI_CORREO: correo_cli,
            CLI_NIT: nit_cli
          });
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire('Actualización confirmada', '', 'success');
          const dataClientes = await apiService.getClientes();
          setCliente(dataClientes);
        }
      });
    } catch (error) {
      console.error('Error al consultar el cliente:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo encontrar el cliente con el ID proporcionado',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleEliminarCliente = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este Cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await apiService.deleteCliente(id);
        const dataClientes = await apiService.getClientes();
        setCliente(dataClientes);
        console.log('cliente eliminado');
      }
    });
  };

  const handlePostCliente = async () => {
    //***ojo ojo---aca deben de añadir todos los nuevos campos que les corresponden, deben de añadir 1 label y un input por campo.  */
    Swal.fire({
      title: 'Crear Cliente',
      html: `
      <div style="text-align: left;">
      <label for="CLI_NOMBRE">Nombre Cliente:</label>
      <br/>
      <input type="text" id="CLI_NOMBRE" class="swal2-input" placeholder="Ingrese el nombre">
      <br/>
      <label for="CLI_CORREO">correo Cliente:</label>
      <br/>
      <input type="text" id="CLI_CORREO" class="swal2-input" placeholder="Ingrese el correo">
      <br/>      
      <br/>
      <label for="CLI_NIT">Nit Cliente:</label>
      <br/>
      <input type="number" id="CLI_NIT" class="swal2-input" placeholder="Ingrese el nit">
    </div>
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: async () => {
        // Obtener los valores de los inputs
        //***ojo ojo---aca deben de añadir todos los nuevos campos que les corresponden, deben de añadir con # el nombre que pusieron en el ID de los input  */
        const cli_nombre = Swal.getPopup().querySelector('#CLI_NOMBRE').value;
        const cli_correo = Swal.getPopup().querySelector('#CLI_CORREO').value;
        const cli_nit = Swal.getPopup().querySelector('#CLI_NIT').value;
        //const camposValidos = validaCampos(codigo_exp, codigo_ppl, codigo_tdc, valor);
        // Crear el nuevo descuento

          try {
            await apiService.postCliente({
              CLI_NOMBRE: cli_nombre,
              CLI_CORREO: cli_correo,
              CLI_NIT: cli_nit
            });
            Swal.fire('Creación exitosa', 'El nuevo cliente ha sido creado.', 'success');
            const dataClientes = await apiService.getClientes();
            setCliente(dataClientes);
          } catch (error) {
            console.error('Error al crear el cliente:', error);
            Swal.fire('Error', 'No se pudo crear el nuevo cliente.', 'error');
          }
        
      }
    });
  };

  //fin metodos sweetalert 
  const accionesBotones = (row) => (
    <div className="opcionesBTN">
      <button type="button" className="btn btn-outline-primary custom-tooltip" data-toggle="tooltip" data-placement="top" title="Tooltip on top" onClick={() => handleModificarCliente(row.id)}><i className="fa-solid fa-pen"></i></button>
      <button type="button" className="btn btn-outline-danger" onClick={() => handleEliminarCliente(row.id)}><i className="fa-solid fa-trash"></i></button>
    </div>
  );

  //****ojo ojo--colocar todos los campos de la tabla, seguir estructura que ya se tiene */
  const columnas = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Nombre Cliente',
      selector: row => row.CLI_NOMBRE,
      sortable: true,
    },
    {
      name: 'Correo Cliente',
      selector: row => row.CLI_CORREO,
      sortable: true,
    },  
    {
      name: 'Nit Cliente',
      selector: row => row.CLI_NIT,
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
        <h1>Clientes</h1>
      </div>
      <div class="alineaDerecha ">
        <div className="alineaDerecha">
          <button type="button" className="btn btn-outline-success " onClick={() => handlePostCliente()}>
            <i className="fa-solid fa-plus"></i> Crear Cliente
          </button>
        </div>
      </div>
      <TableComponent datostabla={Cliente} columnas={columnas} />
    </div>

  );
};

export default Cliente;