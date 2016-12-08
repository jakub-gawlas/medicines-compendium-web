import axios from 'axios';

import { API_URL } from './config';

export async function getAllMedicines(){
  const response = await axios.get(`${API_URL}/medicines`);

  return response.data;
}

export async function getAllContraindications(){
  const response = await axios.get(`${API_URL}/contraindications`);

  return response.data;
}

export async function updateMedicine({ id, name, medicinesInteractions, contraindicationsInteractions }){
  const data = {
    name,
    interactions: {
      medicines: medicinesInteractions,
      contraindications: contraindicationsInteractions
    }
  };
  const response = await axios.put(`${API_URL}/medicines/${id}`, data);

  return response.data;
}