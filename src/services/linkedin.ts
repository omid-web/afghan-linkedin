import axios from 'axios';

const apiClient = axios.create({
  baseURL: "https://afghan-linkedin-api.herokuapp.com",
  // baseURL: "http://localhost:7220/",
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': "application/json"
  }
});

export default {
  getLinkedinInfo(code: String) {
    return apiClient.post('/linkedin-sso-response', {
      code: code,
      redirectUri: 'http://localhost:3000/profile',
      // redirectUri: 'https://fir-ts-todo.web.app/profile',
    })
  },
}
