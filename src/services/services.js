import axios from 'axios';

//const urlSME = 'https://proyectofinalacf3-q4s4--3000--6352fbed.local-corp.webcontainer.io/SME_SUPERMERCADO'
const urlSME = 'http://localhost:3000/SME_SUPERMERCADO'
const urlPAS = 'http://localhost:3000/PAS_PASILLO'
const urlPRO = 'http://localhost:3000/PRO_PROVEEDORES'
const urlUSR = 'http://localhost:3000/USR_USUARIO'
const urlPUE = 'http://localhost:3000/PUE_PUESTO'
const urlCAT = 'http://localhost:3000/CAT_CATEGORIA'
const urlUNI = 'http://localhost:3000/UNI_UNIDADMEDIDA'
const urlARA = 'http://localhost:3000/ARA_AREA'

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

  getProveedoresId: async (id) => {
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
  updateProveedores: async (id, newData) => {
    try {
      const response = await axios.put(`${urlPRO}/${id}`, newData);
      console.log(response);
    } catch (error) {
      console.error('Error al actualizar el Proveedores:', error);
    }
  },

  //ELIMINA 1 Proveedores  
  deleteProveedores: async (id) => {
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
  
}

export default apiService;