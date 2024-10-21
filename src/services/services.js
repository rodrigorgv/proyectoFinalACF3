import axios from 'axios';

//const urlSME = 'https://proyectofinalacf3-q4s4--3000--6352fbed.local-corp.webcontainer.io/SME_SUPERMERCADO'
const urlSME = 'http://localhost:3000/SME_SUPERMERCADO'
const urlPAS = 'http://localhost:3000/PAS_PASILLO'
const urlPRO = 'http://localhost:3000/PRO_PROVEEDORES'
const urlUSR = 'http://localhost:3000/USR_USUARIO'
const urlPUE = 'http://localhost:3000/PUE_PUESTO'
const urlCAT = 'http://localhost:3000/CAT_CATEGORIA'
const urlSCA = 'http://localhost:3000/SCA_SUBCATEGORIA'
const urlUNI = 'http://localhost:3000/UNI_UNIDADMEDIDA'
const urlARA = 'http://localhost:3000/ARA_AREA'
const urlCLI = 'http://localhost:3000/CLI_CLIENTE'
const urlCAC = 'http://localhost:3000/CAC_CAJASCOBRO'
const urlEMP = 'http://localhost:3000/EMP_EMPLEADO'
const urlCOM = 'http://localhost:3000/COM_COMPRA'
const urlART = 'http://localhost:3000/ART_ARTICULO'
const urlVEN = 'http://localhost:3000/VEN_VENTA'
const urlDVA = 'http://localhost:3000/DVA_DETALLE_VENTA'

const apiService = {

  ////////////////////////// SUPERMERCADO //////////////////////////
  //TRAE TODOS LOS SUPERMERCADOS    
  getSuperMercados: async () => {
    try {
      const response = await axios.get(urlSME);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  },

  //TRAE 1 SUPERMERCADO POR ID

  getSuperMercadoId: async (id) => {
    try {
      const response = await axios.get(`${urlSME}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al consultar el superMercado por ID:', error);
      throw error;
    }
  },

  //CREA 1 SUPERMERCADO  
  postSuperMercado: async (nuevoSupermercado) => {
    try {
      const response = await axios.post(urlSME, nuevoSupermercado);
      console.log('Nuevo supermercado creado:', response.data);
    } catch (error) {
      console.error('Error al crear el supermercado:', error);
      throw error;
    }
  },

  //ACTUALIZA 1 SUPERMERCADO
  updateSuperMercado: async (id, newData) => {
    try {
      const response = await axios.put(`${urlSME}/${id}`, newData);
      console.log(response);
    } catch (error) {
      console.error('Error al actualizar el superMercado:', error);
    }
  },

  //ELIMINA 1 SUPERMERCADO  
  deleteSuperMercado: async (id) => {
    const response = await axios.delete(`${urlSME}/${id}`);
    console.log(response);
  },


  ////////////////////////// PASILLO //////////////////////////
  //TRAE TODOS LOS PasilloS    
  getPasillos: async () => {
    try {
      const response = await axios.get(urlPAS);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  },

  //TRAE 1 Pasillo POR ID

  getPasilloId: async (id) => {
    try {
      const response = await axios.get(`${urlPAS}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al consultar el Pasillo por ID:', error);
      throw error;
    }
  },

  //CREA 1 Pasillo  
  postPasillo: async (nuevoPasillo) => {
    try {
      const response = await axios.post(urlPAS, nuevoPasillo);
      console.log('Nuevo Pasillo creado:', response.data);
    } catch (error) {
      console.error('Error al crear el Pasillo:', error);
      throw error;
    }
  },

  //ACTUALIZA 1 Pasillo
  updatePasillo: async (id, newData) => {
    try {
      const response = await axios.put(`${urlPAS}/${id}`, newData);
      console.log(response);
    } catch (error) {
      console.error('Error al actualizar el Pasillo:', error);
    }
  },

  //ELIMINA 1 Pasillo  
  deletePasillo: async (id) => {
    const response = await axios.delete(`${urlPAS}/${id}`);
    console.log(response);
  },

////////////////////////// PROVEEDORES  //////////////////////////
  //TRAE TODOS LOS proveedores    
  getProveedores: async () => {
    try {
      const response = await axios.get(urlPRO);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  },

  //TRAE 1 Proveedores POR ID

  getProveedorId: async (id) => {
    try {
      const response = await axios.get(`${urlPRO}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al consultar el Proveedores por ID:', error);
      throw error;
    }
  },

  //CREA 1 Proveedores  
  postProveedor: async (nuevoProveedores) => {
    try {
      const response = await axios.post(urlPRO, nuevoProveedores);
      console.log('Nuevo Proveedores creado:', response.data);
    } catch (error) {
      console.error('Error al crear el Proveedores:', error);
      throw error;
    }
  },

  //ACTUALIZA 1 Proveedores
  updateProveedor: async (id, newData) => {
    try {
      const response = await axios.put(`${urlPRO}/${id}`, newData);
      console.log(response);
    } catch (error) {
      console.error('Error al actualizar el Proveedores:', error);
    }
  },

  //ELIMINA 1 Proveedores  
  deleteProveedor: async (id) => {
    const response = await axios.delete(`${urlPRO}/${id}`);
    console.log(response);
  },  

    ////////////////////////// USUARIO //////////////////////////
  //TRAE TODOS LOS UsuarioS    
  getUsuarios: async () => {
    try {
      const response = await axios.get(urlUSR);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  },

  //TRAE 1 Usuario POR ID

  getUsuarioId: async (id) => {
    try {
      const response = await axios.get(`${urlUSR}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al consultar el Usuario por ID:', error);
      throw error;
    }
  },

  //CREA 1 Usuario  
  postUsuario: async (nuevoUsuario) => {
    try {
      const response = await axios.post(urlUSR, nuevoUsuario);
      console.log('Nuevo Usuario creado:', response.data);
    } catch (error) {
      console.error('Error al crear el Usuario:', error);
      throw error;
    }
  },

  //ACTUALIZA 1 Usuario
  updateUsuario: async (id, newData) => {
    try {
      const response = await axios.put(`${urlUSR}/${id}`, newData);
      console.log(response);
    } catch (error) {
      console.error('Error al actualizar el Usuario:', error);
    }
  },

  //ELIMINA 1 Usuario  
  deleteUsuario: async (id) => {
    const response = await axios.delete(`${urlUSR}/${id}`);
    console.log(response);
  },

////////////////////////// PUESTO //////////////////////////
  //TRAE TODOS LOS PuestoS    
  getPuestos: async () => {
    try {
      const response = await axios.get(urlPUE);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  },

  //TRAE 1 Puesto POR ID

  getPuestoId: async (id) => {
    try {
      const response = await axios.get(`${urlPUE}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al consultar el Puesto por ID:', error);
      throw error;
    }
  },

  //CREA 1 Puesto  
  postPuesto: async (nuevoPuesto) => {
    try {
      const response = await axios.post(urlPUE, nuevoPuesto);
      console.log('Nuevo Puesto creado:', response.data);
    } catch (error) {
      console.error('Error al crear el Puesto:', error);
      throw error;
    }
  },

  //ACTUALIZA 1 Puesto
  updatePuesto: async (id, newData) => {
    try {
      const response = await axios.put(`${urlPUE}/${id}`, newData);
      console.log(response);
    } catch (error) {
      console.error('Error al actualizar el Puesto:', error);
    }
  },

  //ELIMINA 1 Puesto  
  deletePuesto: async (id) => {
    const response = await axios.delete(`${urlPUE}/${id}`);
    console.log(response);
  },  

////////////////////////// CATEGORIA //////////////////////////
  //TRAE TODOS LOS CategoriaS    
  getCategorias: async () => {
    try {
      const response = await axios.get(urlCAT);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  },

  //TRAE 1 Categoria POR ID

  getCategoriaId: async (id) => {
    try {
      const response = await axios.get(`${urlCAT}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al consultar el Categoria por ID:', error);
      throw error;
    }
  },

  //CREA 1 Categoria  
  postCategoria: async (nuevoCategoria) => {
    try {
      const response = await axios.post(urlCAT, nuevoCategoria);
      console.log('Nuevo Categoria creado:', response.data);
    } catch (error) {
      console.error('Error al crear el Categoria:', error);
      throw error;
    }
  },

  //ACTUALIZA 1 Categoria
  updateCategoria: async (id, newData) => {
    try {
      const response = await axios.put(`${urlCAT}/${id}`, newData);
      console.log(response);
    } catch (error) {
      console.error('Error al actualizar el Categoria:', error);
    }
  },

  //ELIMINA 1 Categoria  
  deleteCategoria: async (id) => {
    const response = await axios.delete(`${urlCAT}/${id}`);
    console.log(response);
  },    

  ////////////////////////// SUBCATEGORIA //////////////////////////
  //TRAE TODOS LOS CategoriaS    
  getSubCategorias: async () => {
    try {
      const response = await axios.get(urlSCA);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  },

  //TRAE 1 SubCategoria POR ID

  getSubCategoriaId: async (id) => {
    try {
      const response = await axios.get(`${urlSCA}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al consultar el SubSubCategoria por ID:', error);
      throw error;
    }
  },

  //CREA 1 SubCategoria  
  postSubCategoria: async (nuevoSubCategoria) => {
    try {
      const response = await axios.post(urlSCA, nuevoSubCategoria);
      console.log('Nuevo SubCategoria creado:', response.data);
    } catch (error) {
      console.error('Error al crear el SubCategoria:', error);
      throw error;
    }
  },

  //ACTUALIZA 1 SubCategoria
  updateSubCategoria: async (id, newData) => {
    try {
      const response = await axios.put(`${urlSCA}/${id}`, newData);
      console.log(response);
    } catch (error) {
      console.error('Error al actualizar el SubCategoria:', error);
    }
  },

  //ELIMINA 1 SubCategoria  
  deleteSubCategoria: async (id) => {
    const response = await axios.delete(`${urlSCA}/${id}`);
    console.log(response);
  },  
////////////////////////// UNIDADMEDIDA //////////////////////////
  //TRAE TODOS LOS UnidadMedidaS    
  getUnidadesMedida: async () => {
    try {
      const response = await axios.get(urlUNI);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  },

  //TRAE 1 UnidadMedida POR ID

  getUnidadMedidaId: async (id) => {
    try {
      const response = await axios.get(`${urlUNI}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al consultar el UnidadMedida por ID:', error);
      throw error;
    }
  },

  //CREA 1 UnidadMedida  
  postUnidadMedida: async (nuevoUnidadMedida) => {
    try {
      const response = await axios.post(urlUNI, nuevoUnidadMedida);
      console.log('Nuevo UnidadMedida creado:', response.data);
    } catch (error) {
      console.error('Error al crear el UnidadMedida:', error);
      throw error;
    }
  },

  //ACTUALIZA 1 UnidadMedida
  updateUnidadMedida: async (id, newData) => {
    try {
      const response = await axios.put(`${urlUNI}/${id}`, newData);
      console.log(response);
    } catch (error) {
      console.error('Error al actualizar el UnidadMedida:', error);
    }
  },

  //ELIMINA 1 UnidadMedida  
  deleteUnidadMedida: async (id) => {
    const response = await axios.delete(`${urlUNI}/${id}`);
    console.log(response);
  },    

////////////////////////// AREA //////////////////////////
  //TRAE TODOS LOS AreaS    
  getAreas: async () => {
    try {
      const response = await axios.get(urlARA);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  },

  //TRAE 1 Area POR ID

  getAreaId: async (id) => {
    try {
      const response = await axios.get(`${urlARA}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al consultar el Area por ID:', error);
      throw error;
    }
  },

  //CREA 1 Area  
  postArea: async (nuevoArea) => {
    try {
      const response = await axios.post(urlARA, nuevoArea);
      console.log('Nuevo Area creado:', response.data);
    } catch (error) {
      console.error('Error al crear el Area:', error);
      throw error;
    }
  },

  //ACTUALIZA 1 Area
  updateArea: async (id, newData) => {
    try {
      const response = await axios.put(`${urlARA}/${id}`, newData);
      console.log(response);
    } catch (error) {
      console.error('Error al actualizar el Area:', error);
    }
  },

  //ELIMINA 1 Area  
  deleteArea: async (id) => {
    const response = await axios.delete(`${urlARA}/${id}`);
    console.log(response);
  },    
////////////////////////// CLIENTE //////////////////////////
  //TRAE TODOS LOS ClienteS    
  getClientes: async () => {
    try {
      const response = await axios.get(urlCLI);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  },

  //TRAE 1 Cliente POR ID

  getClienteId: async (id) => {
    try {
      const response = await axios.get(`${urlCLI}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al consultar el Cliente por ID:', error);
      throw error;
    }
  },

  //CREA 1 Cliente  
  postCliente: async (nuevoCliente) => {
    try {
      const response = await axios.post(urlCLI, nuevoCliente);
      console.log('Nuevo Cliente creado:', response.data);
    } catch (error) {
      console.error('Error al crear el Cliente:', error);
      throw error;
    }
  },

  //ACTUALIZA 1 Cliente
  updateCliente: async (id, newData) => {
    try {
      const response = await axios.put(`${urlCLI}/${id}`, newData);
      console.log(response);
    } catch (error) {
      console.error('Error al actualizar el Cliente:', error);
    }
  },

  //ELIMINA 1 Cliente  
  deleteCliente: async (id) => {
    const response = await axios.delete(`${urlCLI}/${id}`);
    console.log(response);
  },      

////////////////////////// CAJAS COBRO //////////////////////////
  //TRAE TODOS LOS CajasCobroS    
  getCajasCobro: async () => {
    try {
      const response = await axios.get(urlCAC);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  },

  //TRAE 1 CajasCobro POR ID

  getCajasCobroId: async (id) => {
    try {
      const response = await axios.get(`${urlCAC}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al consultar el CajasCobro por ID:', error);
      throw error;
    }
  },

  //CREA 1 CajasCobro  
  postCajasCobro: async (nuevoCajasCobro) => {
    try {
      const response = await axios.post(urlCAC, nuevoCajasCobro);
      console.log('Nuevo CajasCobro creado:', response.data);
    } catch (error) {
      console.error('Error al crear el CajasCobro:', error);
      throw error;
    }
  },

  //ACTUALIZA 1 CajasCobro
  updateCajasCobro: async (id, newData) => {
    try {
      const response = await axios.put(`${urlCAC}/${id}`, newData);
      console.log(response);
    } catch (error) {
      console.error('Error al actualizar el CajasCobro:', error);
    }
  },

  //ELIMINA 1 CajasCobro  
  deleteCajasCobro: async (id) => {
    const response = await axios.delete(`${urlCAC}/${id}`);
    console.log(response);
  },  

////////////////////////// EMPLEADO  //////////////////////////
  //TRAE TODOS LOS EmpleadoS    
  getEmpleados: async () => {
    try {
      const response = await axios.get(urlEMP);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  },

  //TRAE 1 Empleado POR ID

  getEmpleadoId: async (id) => {
    try {
      const response = await axios.get(`${urlEMP}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al consultar el Empleado por ID:', error);
      throw error;
    }
  },

  //CREA 1 Empleado  
  postEmpleado: async (nuevoEmpleado) => {
    try {
      const response = await axios.post(urlEMP, nuevoEmpleado);
      console.log('Nuevo Empleado creado:', response.data);
    } catch (error) {
      console.error('Error al crear el Empleado:', error);
      throw error;
    }
  },

  //ACTUALIZA 1 Empleado
  updateEmpleado: async (id, newData) => {
    try {
      const response = await axios.put(`${urlEMP}/${id}`, newData);
      console.log(response);
    } catch (error) {
      console.error('Error al actualizar el Empleado:', error);
    }
  },

  //ELIMINA 1 Empleado  
  deleteEmpleado: async (id) => {
    const response = await axios.delete(`${urlEMP}/${id}`);
    console.log(response);
  },   
////////////////////////// COMPRA //////////////////////////
  //TRAE TODAS LAS COMPRAS    
  getCompras: async () => {
    try {
      const response = await axios.get(urlCOM);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  },

  //TRAE 1 COMPRA POR ID

  getCompraId: async (id) => {
    try {
      const response = await axios.get(`${urlCOM}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al consultar la compra por ID:', error);
      throw error;
    }
  },

  //CREA 1 COMPRA  
  postCompra: async (nuevoCompra) => {
    try {
      const response = await axios.post(urlCOM, nuevoCompra);
      console.log('Nueva compra creada:', response.data);
    } catch (error) {
      console.error('Error al crear la compra:', error);
      throw error;
    }
  },

  //ACTUALIZA 1 COMPRA
  updateCompra: async (id, newData) => {
    try {
      const response = await axios.put(`${urlCOM}/${id}`, newData);
      console.log(response);
    } catch (error) {
      console.error('Error al actualizar la compra:', error);
    }
  },

  //ELIMINA 1 COMPRA  
  deleteCompra: async (id) => {
    const response = await axios.delete(`${urlCOM}/${id}`);
    console.log(response);
  },   
  ////////////////////////// ARTICULO //////////////////////////
  //TRAE TODOS LOS ARTICULOS    
  getArticulos: async () => {
    try {
      const response = await axios.get(urlART);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  },

  //TRAE 1 ARTICULO POR ID

  getArticuloId: async (id) => {
    try {
      const response = await axios.get(`${urlART}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al consultar el articulo por ID:', error);
      throw error;
    }
  },

  //CREA 1 ARTICULO  
  postArticulo: async (nuevoArticulo) => {
    try {
      const response = await axios.post(urlART, nuevoArticulo);
      console.log('Nuevo articulo creado:', response.data);
    } catch (error) {
      console.error('Error al crear el articulo:', error);
      throw error;
    }
  },

  //ACTUALIZA 1 ARTICULO
  updateArticulo: async (id, newData) => {
    try {
      const response = await axios.put(`${urlART}/${id}`, newData);
      console.log(response);
    } catch (error) {
      console.error('Error al actualizar el articulo:', error);
    }
  },

  //ELIMINA 1 ARTICULO  
  deleteArticulo: async (id) => {
    const response = await axios.delete(`${urlART}/${id}`);
    console.log(response);
  },
////////////////////////// VENTA  //////////////////////////
  //TRAE TODOS LOS VentaS    
  getVentas: async () => {
    try {
      const response = await axios.get(urlVEN);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  },

  //TRAE 1 Venta POR ID

  getVentaId: async (id) => {
    try {
      const response = await axios.get(`${urlVEN}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al consultar el Venta por ID:', error);
      throw error;
    }
  },

  //CREA 1 Venta  
  postVenta: async (nuevoVenta) => {
    try {
      const response = await axios.post(urlVEN, nuevoVenta);
      console.log('Nuevo Venta creado:', response.data);
    } catch (error) {
      console.error('Error al crear el Venta:', error);
      throw error;
    }
  },

  //ACTUALIZA 1 Venta
  updateVenta: async (id, newData) => {
    try {
      const response = await axios.put(`${urlVEN}/${id}`, newData);
      console.log(response);
    } catch (error) {
      console.error('Error al actualizar el Venta:', error);
    }
  },

  //ELIMINA 1 Venta  
  deleteVenta: async (id) => {
    const response = await axios.delete(`${urlVEN}/${id}`);
    console.log(response);
  },     
////////////////////////// DetalleVenta  //////////////////////////
  //TRAE TODOS LOS DetalleVentaS    
  getDetalleVentas: async () => {
    try {
      const response = await axios.get(urlDVA);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  },

  //TRAE 1 DetalleVenta POR ID

  getDetalleVentaId: async (id) => {
    try {
      const response = await axios.get(`${urlDVA}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al consultar el DetalleVenta por ID:', error);
      throw error;
    }
  },

  //CREA 1 DetalleVenta  
  postDetalleVenta: async (nuevoDetalleVenta) => {
    try {
      const response = await axios.post(urlDVA, nuevoDetalleVenta);
      console.log('Nuevo DetalleVenta creado:', response.data);
    } catch (error) {
      console.error('Error al crear el DetalleVenta:', error);
      throw error;
    }
  },

  //ACTUALIZA 1 DetalleVenta
  updateDetalleVenta: async (id, newData) => {
    try {
      const response = await axios.put(`${urlDVA}/${id}`, newData);
      console.log(response);
    } catch (error) {
      console.error('Error al actualizar el DetalleVenta:', error);
    }
  },

  //ELIMINA 1 DetalleVenta  
  deleteDetalleVenta: async (id) => {
    const response = await axios.delete(`${urlDVA}/${id}`);
    console.log(response);
  },       
  
}

export default apiService;