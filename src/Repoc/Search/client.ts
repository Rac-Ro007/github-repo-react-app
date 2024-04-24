import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const COLLECTIONS_API = `${API_BASE}/repoc/api/collections`;

export const searchGithubRepos = async (query?: string) => {
    const response = await axios.post(API_BASE + `/repoc/api/search`, {query: query});
    return response.data;
}

export const getAllCollections = async (query?: string) => {
    const response = await axios.post(COLLECTIONS_API + ``);
    return response.data;
}
  