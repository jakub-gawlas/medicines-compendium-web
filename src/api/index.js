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