import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/test/';
class TestService {
  
  getUserBoard() {
    return axios.get(API_URL + `user`, { headers: authHeader() });
  }
  getManagerBoard() {
    return axios.get(API_URL + `mod`, { headers: authHeader() });
  }
  getAdminBoard() {
    return axios.get(API_URL + `admin`, { headers: authHeader() });
  }
}
export default new TestService();