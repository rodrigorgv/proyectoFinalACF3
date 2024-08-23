import React, { useState, useEffect } from 'react';
import NavbarAdminComponent from '../Components/NavbarAdminComponent';
import TableComponent from '../Components/TableComponent';
import apiService from '../services/services';
import Swal from 'sweetalert2';


const SuperMercado = () => {
  const [SuperMercado, setSuperMercado] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataSuperMercados = await apiService.getSuperMercados();
        setSuperMercado(dataSuperMercados);

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

  const handleModificarSuperMercado = async (id) => {
    try {      
      console.log(`el ID es ${id}`);
      const superMercadoPorId = await apiService.getSuperMercadoId(id);
      console.log(superMercadoPorId);
      Swal.fire({
        title: 'Modificar SuperMercado',
        html: `
          <div style="text-align: left;">
            <label for="SME_NOMBRE">Nombre SuperMercado:</label>
            <br/>
            <input type="Text" id="nombre_sme" class="swal2-input" placeholder="Ingrese el nombre" value="${superMercadoPorId.SME_NOMBRE}">
            <br/>
            <label for="SME_DIRECCION">Direccion SuperMercado:</label>
            <br/>
            <input type="Text" id="direccion_sme" class="swal2-input" placeholder="Ingrese la direccion" value="${superMercadoPorId.SME_DIRECCION}">            
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
          const nombre_sme    = Swal.getPopup().querySelector('#nombre_sme').value;
          const direccion_sme = Swal.getPopup().querySelector('#direccion_sme').value;

          // Llamar a la función para actualizar el super
          apiService.updateSuperMercado(id, {
            SME_NOMBRE: nombre_sme,           
            SME_DIRECCION: direccion_sme
          });
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire('Actualización confirmada', '', 'success');
          const dataSuperMercados = await apiService.getSuperMercados();
          setSuperMercado(dataSuperMercados);
        }
      });
    } catch (error) {
      console.error('Error al consultar el supermercado:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo encontrar el superMercado con el ID proporcionado',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleEliminarSuperMercado = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este SuperMercado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await apiService.deleteSuperMercado(id);
        const dataSuperMercados = await apiService.getSuperMercados();
        setSuperMercado(dataSuperMercados);
        console.log('superMercado eliminado');
      }
    });
  };

  const handlePostSuperMercado = async () => {
    Swal.fire({
      title: 'Crear SuperMercado',
      html: `
      <div style="text-align: left;">
      <label for="SME_NOMBREr">Nombre SuperMercado:</label>
      <br/>
      <input type="text" id="SME_NOMBRE" class="swal2-input" placeholder="Ingrese el nombre">
      <br/>
      <input type="text" id="SME_DIRECCION" class="swal2-input" placeholder="Ingrese la direccion">
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
        const sme_nombre = Swal.getPopup().querySelector('#SME_NOMBRE').value;
        const sme_direccion = Swal.getPopup().querySelector('#SME_DIRECCION').value;
        //const camposValidos = validaCampos(codigo_exp, codigo_ppl, codigo_tdc, valor);
        // Crear el nuevo descuento

          try {
            await apiService.postSuperMercado({
              SME_NOMBRE: sme_nombre,
              SME_DIRECCION: sme_direccion
            });
            Swal.fire('Creación exitosa', 'El nuevo supermercado ha sido creado.', 'success');
            const dataSuperMercados = await apiService.getSuperMercados();
            setSuperMercado(dataSuperMercados);
          } catch (error) {
            console.error('Error al crear el supermercado:', error);
            Swal.fire('Error', 'No se pudo crear el nuevo supermercado.', 'error');
          }
        
      }
    });
  };

/*
  const validaCampos = (codigo_exp, codigo_ppl, codigo_tdc, valor) => {
    if (codigo_exp === '' || codigo_ppl === '' || codigo_tdc === '' || valor === '') {
      console.log("error")
      Swal.fire({
        title: 'Error',
        text: 'Todos los campos son obligatorios',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
      return false;
    }
    return true;
  }

*/

  //fin metodos sweetalert 
  const accionesBotones = (row) => (
    <div className="opcionesBTN">
      <button type="button" className="btn btn-outline-primary custom-tooltip" data-toggle="tooltip" data-placement="top" title="Tooltip on top" onClick={() => handleModificarSuperMercado(row.id)}><i className="fa-solid fa-pen"></i></button>
      <button type="button" className="btn btn-outline-danger" onClick={() => handleEliminarSuperMercado(row.id)}><i className="fa-solid fa-trash"></i></button>
    </div>
  );

  const columnas = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Nombre SuperMercado',
      selector: row => row.SME_NOMBRE,
      sortable: true,
    },
    {
      name: 'Direccion',
      selector: row => row.SME_DIRECCION,
      sortable: true,
    },  
    {
      name: 'Acciones',
      cell: accionesBotones,
      style: {
        width: '200px', // Ajusta el tamaño de la columna "Acciones" según sea necesario
      },
    },
  ];

  return (
    <div>
      <NavbarAdminComponent />
      <div className="titulo">
        <h1>SuperMercados</h1>
      </div>
      <div class="alineaDerecha ">
        <div className="alineaDerecha">
          <button type="button" className="btn btn-outline-success " onClick={() => handlePostSuperMercado()}>
            <i className="fa-solid fa-plus"></i> Crear SuperMercado
          </button>
        </div>
      </div>
      <TableComponent datostabla={SuperMercado} columnas={columnas} />
    </div>

  );
};

export default SuperMercado;