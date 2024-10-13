import React, { useState, useEffect } from 'react';
import NavbarAdminComponent from '../Components/NavbarAdminComponent';
import TableComponent from '../Components/TableComponent';
import apiService from '../services/services';
import Swal from 'sweetalert2';

const Articulo = () => {
  const [articulos, setArticulos] = useState([]);
  const [unidadMedida, setUnidadMedida] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataArticulos = await apiService.getArticulos();
        setArticulos(dataArticulos);
        const dataUnidadMedida = await apiService.getUnidadesMedida();
        setUnidadMedida(dataUnidadMedida);       
        const dataCategorias = await apiService.getCategorias();
        setCategorias(dataCategorias); 
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

  const handleModificarArticulo = async (id) => {
    try {          
        const articuloPorId = await apiService.getArticuloId(id);
        const unidades = await apiService.getUnidadesMedida(); // Llamada para obtener las unidades
        const categorias = await apiService.getCategorias(); // Llamada para obtener las categorías
        const areas = await apiService.getAreas(); // Llamada para obtener las áreas

        Swal.fire({
            title: 'Modificar Artículo',
            html: `
                <div style="text-align: left;">
                    <label for="nombre_art">Nombre Artículo:</label>
                    <br/>
                    <input type="text" id="nombre_art" class="swal2-input" value="${articuloPorId.ART_NOMBRE}">
                    <br/>
                    <label for="unidad_medida">Unidad de Medida:</label>
                    <br/>
                    <select id="unidad_medida" class="swal2-select">
                        ${unidades.map(option => 
                            `<option value="${option.id}" ${articuloPorId.ART_IDUNI === option.id ? 'selected' : ''}>
                                ${option.UNI_DESCRIPCION}
                            </option>`).join('')}
                    </select>
                    <br/>
                    <label for="categoria">Categoría:</label>
                    <br/>
                    <select id="categoria" class="swal2-select">
                        ${categorias.map(option => 
                            `<option value="${option.id}" ${articuloPorId.ART_IDCAT === option.id ? 'selected' : ''}>
                                ${option.CAT_DESCRIPCION}
                            </option>`).join('')}
                    </select>
                    <br/>
                    <label for="area">Área:</label>
                    <br/>
                    <select id="area" class="swal2-select">
                        ${areas.map(option => 
                            `<option value="${option.id}" ${articuloPorId.ART_IDARA === option.id ? 'selected' : ''}>
                                ${option.ARA_DESCRIPCION}
                            </option>`).join('')}
                    </select>
                    <br/>
                    <label for="precio_art">Precio Artículo:</label>
                    <br/>
                    <input type="number" id="precio_art" class="swal2-input" value="${articuloPorId.ART_PRECIO}">
                    <br/>
                    <label for="stock_art">Stock Artículo:</label>
                    <br/>
                    <input type="number" id="stock_art" class="swal2-input" value="${articuloPorId.ART_STOCK}">
                    <br/>
                    <label for="codigo_barra">Código de Barra:</label>
                    <br/>
                    <input type="text" id="codigo_barra" class="swal2-input" value="${articuloPorId.ART_CODIGO_DE_BARRA}">
                </div>       
            `,
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Actualizar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const nombre = Swal.getPopup().querySelector('#nombre_art').value.trim();
                const precio = Swal.getPopup().querySelector('#precio_art').value.trim();
                const stock = Swal.getPopup().querySelector('#stock_art').value.trim();
                const codigoBarra = Swal.getPopup().querySelector('#codigo_barra').value.trim();
                const unidadMedida = Swal.getPopup().querySelector('#unidad_medida').value.trim();
                const categoria = Swal.getPopup().querySelector('#categoria').value.trim();
                const area = Swal.getPopup().querySelector('#area').value.trim();
                
                if (!nombre || !precio || !stock || !codigoBarra || !unidadMedida || !categoria || !area) {
                    Swal.showValidationMessage('Por favor, complete todos los campos.');
                    return false;
                }

                return { nombre, precio, stock, codigoBarra, unidadMedida, categoria, area };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { nombre, precio, stock, codigoBarra, unidadMedida, categoria, area } = result.value;
                    await apiService.updateArticulo(id, {
                        ART_NOMBRE: nombre,
                        ART_PRECIO: precio,
                        ART_STOCK: stock,
                        ART_CODIGO_DE_BARRA: codigoBarra,
                        ART_IDUNI: unidadMedida,
                        ART_IDCAT: categoria,
                        ART_IDARA: area,
                    });
                    Swal.fire('Actualización confirmada', '', 'success');
                    const dataArticulos = await apiService.getArticulos();
                    setArticulos(dataArticulos);
                } catch (error) {
                    console.error('Error al actualizar el artículo:', error);
                    Swal.fire('Error', 'No se pudo actualizar el artículo.', 'error');
                }
            }
        });
    } catch (error) {
        console.error('Error al consultar el artículo:', error);
        Swal.fire({
            title: 'Error',
            text: 'No se pudo encontrar el artículo con el ID proporcionado',
            icon: 'error',
            confirmButtonText: 'Ok',
        });
    }
};


  const handleEliminarArticulo = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este artículo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await apiService.deleteArticulo(id);
        const dataArticulos = await apiService.getArticulos();
        setArticulos(dataArticulos);
        console.log('Artículo eliminado');
      }
    });
  };

  const handlePostArticulo = async () => {
    Swal.fire({
      title: 'Crear Artículo',
      html: `
        <div style="text-align: left;">
          <label for="nombre_art">Nombre Artículo:</label>
          <br/>
          <input type="text" id="nombre_art" class="swal2-input" placeholder="Ingrese el nombre">
          <br/>
          <label for="unidad_medida">Unidad de Medida:</label>
          <br/>
          <select id="unidad_medida" class="swal2-select">
            ${unidadMedida.map(option => `<option value="${option.id}">${option.UNI_DESCRIPCION}</option>`).join('')}
          </select>
          <br/>
          <label for="categoria">Categoría:</label>
          <br/>
          <select id="categoria" class="swal2-select">
            ${categorias.map(option => `<option value="${option.id}">${option.CAT_DESCRIPCION}</option>`).join('')}
          </select>
          <br/>
          <label for="area">Área:</label>
          <br/>
          <select id="area" class="swal2-select">
            ${areas.map(option => `<option value="${option.id}">${option.ARA_DESCRIPCION}</option>`).join('')}
          </select>
          <br/>
          <label for="precio_art">Precio Artículo:</label>
          <br/>
          <input type="number" id="precio_art" class="swal2-input" placeholder="Ingrese el precio">
          <br/>
          <label for="stock_art">Stock Artículo:</label>
          <br/>
          <input type="number" id="stock_art" class="swal2-input" placeholder="Ingrese el stock">
          <br/>
          <label for="codigo_barra">Código de Barra:</label>
          <br/>
          <input type="text" id="codigo_barra" class="swal2-input" placeholder="Ingrese el código de barra">
        </div>
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: async () => {
        const nombre = Swal.getPopup().querySelector('#nombre_art').value.trim();
        const precio = Swal.getPopup().querySelector('#precio_art').value.trim();
        const stock = Swal.getPopup().querySelector('#stock_art').value.trim();
        const codigoBarra = Swal.getPopup().querySelector('#codigo_barra').value.trim();
        const unidadMedida = Swal.getPopup().querySelector('#unidad_medida').value.trim();
        const categoria = Swal.getPopup().querySelector('#categoria').value.trim();
        const area = Swal.getPopup().querySelector('#area').value.trim();


        if (!nombre || !precio || !stock || !codigoBarra) {
          Swal.showValidationMessage('Por favor, complete todos los campos.');
          return false;
        }

        try {
          await apiService.postArticulo({
            ART_NOMBRE: nombre,
            ART_PRECIO: precio,
            ART_STOCK: stock,
            ART_CODIGO_DE_BARRA: codigoBarra,
            ART_IDUNI: unidadMedida,
            ART_IDCAT: categoria,
            ART_IDARA: area,            
          });
          Swal.fire('Creación exitosa', 'El nuevo artículo ha sido creado.', 'success');
          const dataArticulos = await apiService.getArticulos();
          setArticulos(dataArticulos);
        } catch (error) {
          console.error('Error al crear el artículo:', error);
          Swal.fire('Error', 'No se pudo crear el nuevo artículo.', 'error');
        }
      }
    });
  };

  const accionesBotones = (row) => (
    <div className="opcionesBTN">
      <button type="button" className="btn btn-outline-primary custom-tooltip" onClick={() => handleModificarArticulo(row.id)}><i className="fa-solid fa-pen"></i></button>
      <button type="button" className="btn btn-outline-danger" onClick={() => handleEliminarArticulo(row.id)}><i className="fa-solid fa-trash"></i></button>
    </div>
  );

  const columnas = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: row => row.ART_NOMBRE,
      sortable: true,
    },
    {
      name: 'Precio',
      selector: row => row.ART_PRECIO,
      sortable: true,
    },
    {
      name: 'Stock',
      selector: row => row.ART_STOCK,
      sortable: true,
    },
    {
      name: 'Código de Barra',
      selector: row => row.ART_CODIGO_DE_BARRA,
      sortable: true,
    },
    {
      name: 'Unidad de Medida',
      selector: row => row.ART_IDUNI,
      sortable: true,
    },
    {
      name: 'Categoría',
      selector: row => row.ART_IDCAT,
      sortable: true,
    },
    {
      name: 'Área',
      selector: row => row.ART_IDARA,
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
        <h1>Artículos</h1>
      </div>
      <div className="alineaDerecha ">
        <div className="alineaDerecha">
          <button type="button" className="btn btn-outline-success" onClick={() => handlePostArticulo()}>
            <i className="fa-solid fa-plus"></i> Crear Artículo
          </button>
        </div>
      </div>
      <TableComponent datostabla={articulos} columnas={columnas} />
    </div>
  );
};

export default Articulo;