import authHeader from './auth-header';
import axios from 'axios';


const API_URL = 'http://localhost:8080/api/v1/';
const getAll = () => {
  return axios.get(API_URL + 'roles', { headers: authHeader() });
};
const create = (data) => {
    return axios.post(API_URL + 'roles', data, { headers: authHeader() });
  };
  
  const get = (id) => {
    return axios.get(API_URL + `roles/${id}`, { headers: authHeader() });
  };
  
  
  const update = (data) => {
    return axios.post(API_URL + 'roles', data, { headers: authHeader() });
  };
export default { getAll, create, get, update };