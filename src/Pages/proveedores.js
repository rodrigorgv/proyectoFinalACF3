//este es el codigo

import React, { useState, useEffect } from 'react';
import NavbarAdminComponent from '../Components/NavbarAdminComponent';
import TableComponent from '../Components/TableComponent';
import apiService from '../services/services';
import Swal from 'sweetalert2';


const Proveedor = () => {
  const [Proveedor, setProveedor] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataProveedores = await apiService.getProveedores();
        setProveedor(dataProveedores);

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

  const handleModificarProveedor = async (id) => {
    try {          
      const proveedorPorId = await apiService.getProveedorId(id);
      console.log(proveedorPorId);
      //***ojo ojo---aca deben de añadir todos los nuevos campos que les corresponden, deben de añadir 1 label y un input por campo.  */
      Swal.fire({
        title: 'Modificar Proveedor',
        html: `
          <div style="text-align: left;">
            <label for="nombre_pro">Nombre Proveedor:</label>
            <br/>
            <input type="Text" id="nombre_pro" class="swal2-input" placeholder="Ingrese el nombre" value="${proveedorPorId.PRO_NOMBRE}">
            <br/>
            <label for="correo_pro">Correo Proveedor:</label>
            <br/>
            <input type="Text" id="correo_pro" class="swal2-input" placeholder="Ingrese el correo" value="${proveedorPorId.PRO_CORREO}">            
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
          const nombre_pro    = Swal.getPopup().querySelector('#nombre_pro').value;
          const correo_pro = Swal.getPopup().querySelector('#correo_pro').value;

          if (!nombre_pro || !correo_pro) {
            Swal.showValidationMessage('Por favor, complete todos los campos.');
            return false; // Evitar que se cierre el modal si hay campos vacíos
          }        

          if (nombre_pro === proveedorPorId.PRO_NOMBRE && correo_pro === proveedorPorId.PRO_CORREO) {
            Swal.showValidationMessage('Los campos son iguales. no se hará la modificación');
            return false; // Evitar que se cierre el modal si hay campos vacíos
          }          

          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Expresión regular para validar correos
          if (!emailPattern.test(correo_pro)) {
            Swal.showValidationMessage('Por favor, ingrese un correo electrónico válido.');
            return false;
          }          

          // Llamar a la función para actualizar el super
          apiService.updateProveedor(id, {
            PRO_NOMBRE: nombre_pro,           
            PRO_CORREO: correo_pro
          });
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire('Actualización confirmada', '', 'success');
          const dataProveedores = await apiService.getProveedores();
          setProveedor(dataProveedores);
        }
      });
    } catch (error) {
      console.error('Error al consultar el proveedor:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo encontrar el proveedor con el ID proporcionado',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleEliminarProveedor = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este Proveedor?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await apiService.deleteProveedor(id);
        const dataProveedores = await apiService.getProveedores();
        setProveedor(dataProveedores);
        console.log('proveedor eliminado');
      }
    });
  };

  const handlePostProveedor = async () => {
    //***ojo ojo---aca deben de añadir todos los nuevos campos que les corresponden, deben de añadir 1 label y un input por campo.  */
    Swal.fire({
      title: 'Crear Proveedor',
      html: `
      <div style="text-align: left;">
      <label for="PRO_NOMBREr">Nombre Proveedor:</label>
      <br/>
      <input type="text" id="PRO_NOMBRE" class="swal2-input" placeholder="Ingrese el nombre">
      <br/>
      <input type="email" id="PRO_CORREO" class="swal2-input" placeholder="Ingrese el correo">
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
        // Obtener los valores de los inputs
        //***ojo ojo---aca deben de añadir todos los nuevos campos que les corresponden, deben de añadir con # el nombre que pusieron en el ID de los input  */
        const pro_nombre = Swal.getPopup().querySelector('#PRO_NOMBRE').value;
        const pro_correo = Swal.getPopup().querySelector('#PRO_CORREO').value;
        //const camposValidos = validaCampos(codigo_exp, codigo_ppl, codigo_tdc, valor);
        // Crear el nuevo descuento

        if (!pro_nombre || !pro_correo) {
          Swal.showValidationMessage('Por favor, complete todos los campos.');
          return false; // Evitar que se cierre el modal si hay campos vacíos
        }        

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Expresión regular para validar correos
        if (!emailPattern.test(pro_correo)) {
          Swal.showValidationMessage('Por favor, ingrese un correo electrónico válido.');
          return false;
        }        

          try {
            await apiService.postProveedor({
              PRO_NOMBRE: pro_nombre,
              PRO_CORREO: pro_correo
            });
            Swal.fire('Creación exitosa', 'El nuevo proveedor ha sido creado.', 'success');
            const dataProveedores = await apiService.getProveedores();
            setProveedor(dataProveedores);
          } catch (error) {
            console.error('Error al crear el proveedor:', error);
            Swal.fire('Error', 'No se pudo crear el nuevo proveedor.', 'error');
          }
        
      }
    });
  };

  //fin metodos sweetalert 
  const accionesBotones = (row) => (
    <div className="opcionesBTN">
      <button type="button" className="btn btn-outline-primary custom-tooltip" data-toggle="tooltip" data-placement="top" title="Tooltip on top" onClick={() => handleModificarProveedor(row.id)}><i className="fa-solid fa-pen"></i></button>
      <button type="button" className="btn btn-outline-danger" onClick={() => handleEliminarProveedor(row.id)}><i className="fa-solid fa-trash"></i></button>
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
      name: 'Nombre Proveedor',
      selector: row => row.PRO_NOMBRE,
      sortable: true,
    },
    {
      name: 'Correo Proveedor',
      selector: row => row.PRO_CORREO,
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
        <h1>Proveedores</h1>
      </div>
      <div class="alineaDerecha ">
        <div className="alineaDerecha">
          <button type="button" className="btn btn-outline-success " onClick={() => handlePostProveedor()}>
            <i className="fa-solid fa-plus"></i> Crear Proveedor
          </button>
        </div>
      </div>
      <TableComponent datostabla={Proveedor} columnas={columnas} />
    </div>

  );
};

export default Proveedor;