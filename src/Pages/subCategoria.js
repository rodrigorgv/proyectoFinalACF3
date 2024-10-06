import React, { useState, useEffect } from 'react';
import NavbarAdminComponent from '../Components/NavbarAdminComponent';
import TableComponent from '../Components/TableComponent';
import apiService from '../services/services';
import Swal from 'sweetalert2';

const Subcategoria = () => {
  const [subcategorias, setSubcategorias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.getSubCategorias();
        setSubcategorias(data);
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

  const handleModificarSubCategoria = async (id) => {
    try {
        console.log('el id es', id);
        const subcategoria = await apiService.getSubCategoriaId(id);
        console.log(subcategoria);

        Swal.fire({
            title: 'Modificar Subcategoría',
            html: `
                <div style="text-align: left;">
                    <label for="categoria">Categoría:</label>
                    <br/>
                    <input type="text" id="categoria" class="swal2-input" placeholder="Ingrese la Categoria" value="${subcategoria.SCA_IDCAT}">
                    <br/>
                    <label for="descripcion">Descripción:</label>
                    <br/>
                    <input type="text" id="descripcion" class="swal2-input" placeholder="Ingrese la descripción" value="${subcategoria.SCA_DESCRIPCION}">
                </div>
            `,
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Actualizar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const categoria = Swal.getPopup().querySelector('#categoria').value;
                const descripcion = Swal.getPopup().querySelector('#descripcion').value;

                // Validación de campos
                if (!categoria || !descripcion) {
                    Swal.showValidationMessage('Por favor, complete todos los campos.');
                    return false; // Evitar que se cierre el modal si hay campos vacíos
                }

                if (descripcion === subcategoria.SCA_DESCRIPCION) {
                    Swal.showValidationMessage('Los campos son iguales. No se realizará la modificación.');
                    return false; // Evitar que se cierre el modal si los valores son iguales
                }

                // Retornar el objeto a actualizar
                return { SCA_IDCAT: categoria, SCA_DESCRIPCION: descripcion };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Si result.value es válido, llamamos a la API para actualizar
                const { SCA_IDCAT, SCA_DESCRIPCION } = result.value;
                await apiService.updateSubCategoria(id, { SCA_IDCAT, SCA_DESCRIPCION });

                Swal.fire('Actualización confirmada', '', 'success');
                const data = await apiService.getSubCategorias();
                setSubcategorias(data);
            }
        });
    } catch (error) {
        console.error('Error al consultar la subcategoría:', error);
        Swal.fire({
            title: 'Error',
            text: 'No se pudo encontrar la subcategoría con el ID proporcionado',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
        });
    }
};

  const handleEliminar = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar esta subcategoría?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await apiService.deleteSubCategoria(id);
        const data = await apiService.getSubCategorias();
        setSubcategorias(data);
        console.log('Subcategoría eliminada');
      }
    });
  };

  const handleCrearSubCategoria = async () => {
    Swal.fire({
        title: 'Crear Subcategoría',
        html: `
            <div style="text-align: left;">
                <label for="categoria">ID Categoria:</label>
                <br/>
                <input type="text" id="categoria" class="swal2-input" placeholder="Ingrese el ID de la categoría">
                <br/>            
                <label for="descripcion">Descripción:</label>
                <br/>
                <input type="text" id="descripcion" class="swal2-input" placeholder="Ingrese la descripción">
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
            const idCategoria = Swal.getPopup().querySelector('#categoria').value;
            const descripcion = Swal.getPopup().querySelector('#descripcion').value;

            // Validación de campos vacíos
            if (!idCategoria || !descripcion) {
                Swal.showValidationMessage('Por favor, complete todos los campos.');
                return false; // Evitar que se cierre el modal si hay campos vacíos
            }

            // Validación de que la subcategoría no exista ya
            const subcategoriaExiste = subcategorias.some(subcat => subcat.SCA_DESCRIPCION.toLowerCase() === descripcion.toLowerCase());
            if (subcategoriaExiste) {
                Swal.showValidationMessage('La subcategoría ya existe.');
                return false; // Evitar que se cierre el modal si la subcategoría ya existe
            }

            try {
                await apiService.postSubCategoria({ 
                    SCA_IDCAT: idCategoria, // Enviar ID de categoría
                    SCA_DESCRIPCION: descripcion 
                });
                Swal.fire('Creación exitosa', 'La nueva subcategoría ha sido creada.', 'success');
                const data = await apiService.getSubCategorias();
                setSubcategorias(data);
            } catch (error) {
                console.error('Error al crear la subcategoría:', error);
                Swal.fire('Error', 'No se pudo crear la nueva subcategoría.', 'error');
            }
        }
    });
};



  const accionesBotones = (row) => (
    <div className="opcionesBTN">
      <button type="button" className="btn btn-outline-primary custom-tooltip" data-toggle="tooltip" data-placement="top" title="Modificar" onClick={() => handleModificarSubCategoria(row.id)}><i className="fa-solid fa-pen"></i></button>
      <button type="button" className="btn btn-outline-danger" onClick={() => handleEliminar(row.id)}><i className="fa-solid fa-trash"></i></button>
    </div>
  );

  const columnas = [
    {
      name: 'ID Subcategoría',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'IDCAT',
      selector: row => row.SCA_IDCAT,
      sortable: true,
    },
    {
      name: 'Descripción',
      selector: row => row.SCA_DESCRIPCION,
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
        <h1>Subcategorías</h1>
      </div>
      <div className="alineaDerecha">
        <button type="button" className="btn btn-outline-success" onClick={() => handleCrearSubCategoria()}>
          <i className="fa-solid fa-plus"></i> Crear Subcategoría
        </button>
      </div>
      <TableComponent datostabla={subcategorias} columnas={columnas} />
    </div>
  );
};

export default Subcategoria;