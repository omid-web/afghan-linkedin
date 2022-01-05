import axios from 'axios';
const {
  LINKEDIN_BASE_URL,
  LINKEDIN_REDIRECT_URI
} = import.meta.env;

const apiClient = axios.create({
  baseURL: LINKEDIN_BASE_URL?.toString(),
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
      redirectUri: LINKEDIN_REDIRECT_URI?.toString()
    })
  },
}
