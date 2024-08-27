import React, { useState, useEffect } from 'react';
import NavbarAdminComponent from '../Components/NavbarAdminComponent';
import TableComponent from '../Components/TableComponent';
import apiService from '../services/services';
import Swal from 'sweetalert2';

const CajasCobro = () => {
  const [cajasCobro, setCajasCobro] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCajasCobro = await apiService.getCajasCobro();
        setCajasCobro(dataCajasCobro);
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

  const handleModificarCajasCobro = async (id) => {
    try {          
      const cajaCobroPorId = await apiService.getCajasCobroId(id);
      console.log(cajaCobroPorId);

      Swal.fire({
        title: 'Modificar Caja de Cobro',
        html: `
          <div style="text-align: left;">
            <label for="cac_idsme">ID SME:</label>
            <br/>
            <input type="number" id="cac_idsme" class="swal2-input" placeholder="Ingrese el ID SME" value="${cajaCobroPorId.CAC_IDSME}">
            <br/>
            <label for="cac_idemp">ID EMP:</label>
            <br/>
            <input type="number" id="cac_idemp" class="swal2-input" placeholder="Ingrese el ID EMP" value="${cajaCobroPorId.CAC_IDEMP}">
            <br/>
            <label for="cac_no_caja">Número de Caja:</label>
            <br/>
            <input type="text" id="cac_no_caja" class="swal2-input" placeholder="Ingrese el número de caja" value="${cajaCobroPorId.CAC_NO_CAJA}">
          </div>       
        `,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Actualizar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          const cac_idsme = Swal.getPopup().querySelector('#cac_idsme').value;
          const cac_idemp = Swal.getPopup().querySelector('#cac_idemp').value;
          const cac_no_caja = Swal.getPopup().querySelector('#cac_no_caja').value;

          apiService.updateCajasCobro(id, {
            CAC_IDSME: cac_idsme,
            CAC_IDEMP: cac_idemp,
            CAC_NO_CAJA: cac_no_caja
          });
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire('Actualización confirmada', '', 'success');
          const dataCajasCobro = await apiService.getCajasCobro();
          setCajasCobro(dataCajasCobro);
        }
      });
    } catch (error) {
      console.error('Error al consultar la caja de cobro:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo encontrar la caja de cobro con el ID proporcionado',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleEliminarCajasCobro = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar esta caja de cobro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await apiService.deleteCajasCobro(id);
        const dataCajasCobro = await apiService.getCajasCobro();
        setCajasCobro(dataCajasCobro);
        console.log('Caja de cobro eliminada');
      }
    });
  };

  const handlePostCajasCobro = async () => {
    Swal.fire({
      title: 'Crear Caja de Cobro',
      html: `
      <div style="text-align: left;">
        <label for="cac_idsme">ID SME:</label>
        <br/>
        <input type="number" id="cac_idsme" class="swal2-input" placeholder="Ingrese el ID SME">
        <br/>
        <label for="cac_idemp">ID EMP:</label>
        <br/>
        <input type="number" id="cac_idemp" class="swal2-input" placeholder="Ingrese el ID EMP">
        <br/>
        <label for="cac_no_caja">Número de Caja:</label>
        <br/>
        <input type="text" id="cac_no_caja" class="swal2-input" placeholder="Ingrese el número de caja">
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
        const cac_idsme = Swal.getPopup().querySelector('#cac_idsme').value;
        const cac_idemp = Swal.getPopup().querySelector('#cac_idemp').value;
        const cac_no_caja = Swal.getPopup().querySelector('#cac_no_caja').value;

        try {
          await apiService.postCajasCobro({
            CAC_IDSME: cac_idsme,
            CAC_IDEMP: cac_idemp,
            CAC_NO_CAJA: cac_no_caja
          });
          Swal.fire('Creación exitosa', 'La nueva caja de cobro ha sido creada.', 'success');
          const dataCajasCobro = await apiService.getCajasCobro();
          setCajasCobro(dataCajasCobro);
        } catch (error) {
          console.error('Error al crear la caja de cobro:', error);
          Swal.fire('Error', 'No se pudo crear la nueva caja de cobro.', 'error');
        }
      }
    });
  };

  const accionesBotones = (row) => (
    <div className="opcionesBTN">
      <button type="button" className="btn btn-outline-primary custom-tooltip" data-toggle="tooltip" data-placement="top" title="Tooltip on top" onClick={() => handleModificarCajasCobro(row.id)}><i className="fa-solid fa-pen"></i></button>
      <button type="button" className="btn btn-outline-danger" onClick={() => handleEliminarCajasCobro(row.id)}><i className="fa-solid fa-trash"></i></button>
    </div>
  );

  const columnas = [
    {
      name: 'ID Caja',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'ID SME',
      selector: row => row.CAC_IDSME,
      sortable: true,
    },
    {
      name: 'ID EMP',
      selector: row => row.CAC_IDEMP,
      sortable: true,
    },
    {
      name: 'Número de Caja',
      selector: row => row.CAC_NO_CAJA,
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
        <h1>Cajas de Cobro</h1>
      </div>
      <div class="alineaDerecha ">
        <div className="alineaDerecha">
          <button type="button" className="btn btn-outline-success " onClick={() => handlePostCajasCobro()}>
            <i className="fa-solid fa-plus"></i> Crear Caja de Cobro
          </button>
        </div>
      </div>
      <TableComponent datostabla={cajasCobro} columnas={columnas} />
    </div>
  );
};

export default CajasCobro;