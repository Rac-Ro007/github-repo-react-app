import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";
console.log(API_BASE);
const GITHUB_API = `${API_BASE}/repoc/api`;

export const fetchGithubProfile = async () => {
    const response = await axios.get(GITHUB_API + `/getGithubProfile`);
    return response.data;
}

export const fetchGithubRepos = async () => {
    const response = await axios.get(GITHUB_API + `/getGithubRepos`);
    return response.data;
}