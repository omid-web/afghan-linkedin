import axios from 'axios';
const {
  NEWS_API_KEY,
} = import.meta.env;

const apiClient = axios.create({
  baseURL: "https://newsapi.org/v2",
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': "application/json"
  }
});

export default {
  getTopNews() {
    // returns top business new of canada
    return apiClient.get(`/top-headlines?country=ca&category=business&apiKey=${NEWS_API_KEY?.toString()}`)
  },
}
