import authHeader from './auth-header';
import axios from 'axios';


const API_URL = 'http://localhost:8080/api/v1/';

const getPublicContent = () => {
  return axios.get(API_URL + "all");
}

 const getAll = () => {
    return axios.get(API_URL + 'users', { headers: authHeader() });
  };

  const create = (data) => {
    return axios.post(API_URL + 'users', data, { headers: authHeader() });
  };
  
  const get = (id) => {
    return axios.get(API_URL + `users/${id}`, { headers: authHeader() });
  };
  
  const update = (data,id) => {
    return axios.post(API_URL + `users/${id}`, data, { headers: authHeader() });
  };
  
  // const update = (data, id) => {
  //   return httpClient.put(`/customers/${id}`, data);
  // };
  
  const remove = (id) => {
    return axios.delete(API_URL + `users/${id}`, { headers: authHeader() });
  };
  export default { getAll, create, get, update, remove, getPublicContent};
