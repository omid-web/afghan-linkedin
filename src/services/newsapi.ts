import axios from 'axios';
const {
  NEWS_API_KEY,
} = import.meta.env;

const apiClient = axios.create({
  baseURL: "https://bing-news-search1.p.rapidapi.com",
  params: {textFormat: 'Raw', safeSearch: 'Off'},
  headers: {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': `${NEWS_API_KEY?.toString()}`
  }
});

export default {
  getTopNews() {
    return apiClient.get(`/news/trendingtopics`)
  },
}
