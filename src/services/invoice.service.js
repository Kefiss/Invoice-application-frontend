import authHeader from './auth-header';
import axios from 'axios';


const API_URL = 'http://localhost:8080/api/v1/';
const getAll = () => {
  return axios.get(API_URL + 'invoices', { headers: authHeader() });
};

const create = (data) => {
  return axios.post(API_URL + 'invoices', data, { headers: authHeader() });
};

const get = (id) => {
  return axios.get(API_URL + `invoices/${id}`, { headers: authHeader() });
};


const update = (data) => {
  return axios.post(API_URL + 'invoices', data, { headers: authHeader() });
};

const remove = (id) => {
  return axios.delete(API_URL + `invoices/${id}`, { headers: authHeader() });
};
export default { getAll, create, get, update, remove };