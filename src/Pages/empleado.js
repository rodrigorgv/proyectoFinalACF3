//este es el codigo

import React, { useState, useEffect } from 'react';
import NavbarAdminComponent from '../Components/NavbarAdminComponent';
import TableComponent from '../Components/TableComponent';
import apiService from '../services/services';
import Swal from 'sweetalert2';


const Empleado = () => {
  const [Empleado, setEmpleado] = useState([]);
  const [puestos, setPuestos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataEmpleados = await apiService.getEmpleados();
        setEmpleado(dataEmpleados);

        const dataPuestos = await apiService.getPuestos();
        setPuestos(dataPuestos);        

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



  //metodos para sweetalert

  const handleModificarEmpleado = async (id) => {
    try {          
      const empleadoPorId = await apiService.getEmpleadoId(id);
      console.log(empleadoPorId);
      //***ojo ojo---aca deben de añadir todos los nuevos campos que les corresponden, deben de añadir 1 label y un input por campo.  */
      Swal.fire({
        title: 'Modificar Empleado',
        html: `
          <div style="text-align: left;">
			<label for="emp_idpue">PUESTO:</label>
            <br/>
            <input type="number" id="emp_idpue" class="swal2-input" placeholder="Seleccione el puesto" value="${empleadoPorId.EMP_IDPUE}">
            <br/>
            <label for="emp_idusr">ID USR:</label>
            <br/>
            <input type="number" id="emp_idusr" class="swal2-input" placeholder="Ingrese el ID USR" value="${empleadoPorId.EMP_IDUSR}">
            <br/>
            <label for="nombre_emp">Nombre Empleado:</label>
            <br/>
            <input type="Text" id="nombre_emp" class="swal2-input" placeholder="Ingrese el nombre" value="${empleadoPorId.EMP_NOMBRE}">            
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
          const emp_idpue = Swal.getPopup().querySelector('#emp_idpue').value;
          const emp_idusr = Swal.getPopup().querySelector('#emp_idusr').value;
		  const nombre_emp    = Swal.getPopup().querySelector('#nombre_emp').value;
      if (!emp_idpue || !emp_idusr || !nombre_emp) {
        Swal.showValidationMessage('Por favor, complete todos los campos.');
        return false; // Evitar que se cierre el modal si hay campos vacíos
      }
          // Llamar a la función para actualizar el super
          apiService.updateEmpleado(id, {
            EMP_IDPUE: emp_idpue,
            EMP_IDUSR: emp_idusr,
			EMP_NOMBRE: nombre_emp           
          });
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire('Actualización confirmada', '', 'success');
          const dataEmpleados = await apiService.getEmpleados();
          setEmpleado(dataEmpleados);
        }
      });
    } catch (error) {
      console.error('Error al consultar el empleado:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo encontrar el empleado con el ID proporcionado',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleEliminarEmpleado = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este Empleado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await apiService.deleteEmpleado(id);
        const dataEmpleados = await apiService.getEmpleados();
        setEmpleado(dataEmpleados);
        console.log('Empleado eliminado');
      }
    });
  };

  const handlePostEmpleado = async () => {
    //***ojo ojo---aca deben de añadir todos los nuevos campos que les corresponden, deben de añadir 1 label y un input por campo.  */
    Swal.fire({
      title: 'Crear Empleado',
      html: `
      <div style="text-align: left;">
	  <label for="EMP_IDPUE">Puesto:</label>
      <br/>
      <select id="EMP_IDPUE" class="swal2-select">
      ${puestos.map(option => `<option value="${option.id}" ${option.id === Empleado.EMP_IDPUE ? 'selected' : ''}>${option.PUE_DESCRIPCION}</option>`).join('')}
      </select>               
      <br/>
      <label for="EMP_IDUSR">Usuario:</label>
      <br/>
      <select id="EMP_IDUSR" class="swal2-select">
      ${usuarios.map(option => `<option value="${option.id}" ${option.id === Empleado.EMP_IDUSR ? 'selected' : ''}>${option.USR_CORREO}</option>`).join('')}
      </select>           
      <br/>
      <label for="EMP_NOMBRE">Nombre Empleado:</label>
      <br/>
      <input type="text" id="EMP_NOMBRE" class="swal2-input" placeholder="Ingrese el nombre">
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
        const emp_idpue = Swal.getPopup().querySelector('#EMP_IDPUE').value;
        const emp_idusr = Swal.getPopup().querySelector('#EMP_IDUSR').value;
		const emp_nombre = Swal.getPopup().querySelector('#EMP_NOMBRE').value;
        //const camposValidos = validaCampos(codigo_exp, codigo_ppl, codigo_tdc, valor);
        // Crear el nuevo descuento
        if (!emp_idpue || !emp_idusr || !emp_nombre) {
          Swal.showValidationMessage('Por favor, complete todos los campos.');
          return false; // Evitar que se cierre el modal si hay campos vacíos
        }
          try {
            await apiService.postEmpleado({
              EMP_IDPUE: emp_idpue,
			  EMP_IDUSR: emp_idusr,
			  EMP_NOMBRE: emp_nombre
            });
            Swal.fire('Creación exitosa', 'El nuevo empleado ha sido creado.', 'success');
            const dataEmpleados = await apiService.getEmpleados();
            setEmpleado(dataEmpleados);
          } catch (error) {
            console.error('Error al crear el empleado:', error);
            Swal.fire('Error', 'No se pudo crear el nuevo empleado.', 'error');
          }
        
      }
    });
  };

  //fin metodos sweetalert 
  const accionesBotones = (row) => (
    <div className="opcionesBTN">
      <button type="button" className="btn btn-outline-primary custom-tooltip" data-toggle="tooltip" data-placement="top" title="Tooltip on top" onClick={() => handleModificarEmpleado(row.id)}><i className="fa-solid fa-pen"></i></button>
      <button type="button" className="btn btn-outline-danger" onClick={() => handleEliminarEmpleado(row.id)}><i className="fa-solid fa-trash"></i></button>
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
      name: 'ID PUE',
      selector: row => row.EMP_IDPUE,
      sortable: true,
    },
    {
      name: 'ID USR',
      selector: row => row.EMP_IDUSR,
      sortable: true,
    },
    {
      name: 'Nombre Empleado',
      selector: row => row.EMP_NOMBRE,
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
        <h1>Empleados</h1>
      </div>
      <div class="alineaDerecha ">
        <div className="alineaDerecha">
          <button type="button" className="btn btn-outline-success " onClick={() => handlePostEmpleado()}>
            <i className="fa-solid fa-plus"></i> Crear Empleado
          </button>
        </div>
      </div>
      <TableComponent datostabla={Empleado} columnas={columnas} />
    </div>

  );
};

export default Empleado;