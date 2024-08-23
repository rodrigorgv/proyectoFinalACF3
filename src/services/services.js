import axios from 'axios';

const urlSME = 'https://proyectofinalacf3-q4s4--3000--6352fbed.local-corp.webcontainer.io/SME_SUPERMERCADO'

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
}

export default apiService;