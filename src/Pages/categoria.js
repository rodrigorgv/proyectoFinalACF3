import React, { useState, useEffect } from 'react';
import NavbarAdminComponent from '../Components/NavbarAdminComponent';
import TableComponent from '../Components/TableComponent';
import apiService from '../services/services';
import Swal from 'sweetalert2';

const Categoria = () => {
    const [Categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataCategorias = await apiService.getCategorias();
                setCategorias(dataCategorias);
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

    const handleModificarCategoria = async (id) => {
        try {
            const CategoriaPorId = await apiService.getCategoriaId(id);
            console.log(CategoriaPorId);
            Swal.fire({
                title: 'Modificar Categoria',
                html: `
                    <div style="text-align: left;">
                      <label for="cat_descripcion">Descripción:</label>
                      <br/>
                      <input type="text" id="cat_descripcion" class="swal2-input" placeholder="Ingrese la descripción" value="${CategoriaPorId.CAT_DESCRIPCION}">            
                    </div>       
                `,
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Actualizar',
                cancelButtonText: 'Cancelar',
                preConfirm: () => {
                    const cat_descripcion = Swal.getPopup().querySelector('#cat_descripcion').value;

                    if (!cat_descripcion) {
                        Swal.showValidationMessage('Por favor, complete todos los campos.');
                        return false; // Evitar que se cierre el modal si hay campos vacíos
                      }          
                      
                      if (cat_descripcion === CategoriaPorId.CAT_DESCRIPCION ) {
                        Swal.showValidationMessage('Los campos son iguales. no se hará la modificación');
                        return false; // Evitar que se cierre el modal si hay campos vacíos
                      }                      

                    apiService.updateCategoria(id, {
                        CAT_DESCRIPCION: cat_descripcion
                    });
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire('Actualización confirmada', '', 'success');
                    const dataCategorias = await apiService.getCategorias();
                    setCategorias(dataCategorias);
                }
            });
        } catch (error) {
            console.error('Error al consultar el Categoria:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo encontrar el Categoria con el ID proporcionado',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok',
            });
        }
    };

    const handleEliminarCategoria = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres eliminar esta Categoria?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await apiService.deleteCategoria(id);
                const dataCategorias = await apiService.getCategorias();
                setCategorias(dataCategorias);
                console.log('Categoria eliminado');
            }
        });
    };

    const handlePostCategoria = async () => {
        Swal.fire({
            title: 'Crear Categoria',
            html: `
      <div style="text-align: left;">
        <label for="cat_descripcion">Descripción:</label>
        <br/>
        <input type="text" id="cat_descripcion" class="swal2-input" placeholder="Ingrese la descripción">
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
                const cat_descripcion = Swal.getPopup().querySelector('#cat_descripcion').value;

                if (!cat_descripcion) {
                    Swal.showValidationMessage('Por favor, complete todos los campos.');
                    return false; // Evitar que se cierre el modal si hay campos vacíos
                  }

      // Validación de que la categoría no exista ya
      const categoriaExiste = Categorias.some(categoria => categoria.CAT_DESCRIPCION.toLowerCase() === cat_descripcion.toLowerCase());
      if (categoriaExiste) {
        Swal.showValidationMessage('La categoría ya existe.');
        return false; // Evitar que se cierre el modal si la categoría ya existe
      }                  

                try {
                    await apiService.postCategoria({
                        CAT_DESCRIPCION: cat_descripcion
                    });
                    Swal.fire('Creación exitosa', 'La nueva Categoria ha sido creado.', 'success');
                    const dataCategorias = await apiService.getCategorias();
                    setCategorias(dataCategorias);
                } catch (error) {
                    console.error('Error al crear la Categoria:', error);
                    Swal.fire('Error', 'No se pudo crear la nueva Categoria.', 'error');
                }
            }
        });
    };

    const accionesBotones = (row) => (
        <div className= "opcionesBTN" >
            <button type="button" className = "btn btn-outline-primary custom-tooltip" data-toggle="tooltip" data-placement="top" title = "Tooltip on top" onClick = {() => handleModificarCategoria(row.id)}> <i className="fa-solid fa-pen" > </i></button >
            <button type="button" className = "btn btn-outline-danger" onClick = {() => handleEliminarCategoria(row.id)}> <i className="fa-solid fa-trash" > </i></button >
        </div >
  );

const columnas = [
    {
        name: 'ID Categoria',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Descripción',
        selector: row => row.CAT_DESCRIPCION,
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
        < div className="titulo" >
            <h1>Categorias </h1>
        </div>
        < div class="alineaDerecha " >
            <div className="alineaDerecha" >
                <button type="button" className="btn btn-outline-success " onClick={() => handlePostCategoria()}>
                    <i className="fa-solid fa-plus" > </i> Crear Categoria
                </button>
            </div>
        </div>
        < TableComponent datostabla={Categorias} columnas={columnas} />
    </div>
);
};

export default Categoria;