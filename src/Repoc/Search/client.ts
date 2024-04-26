import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";
const COLLECTIONS_API = `${API_BASE}/repoc/api/collections`;

export const searchGithubRepos = async (query?: string) => {
    const response = await axios.post(API_BASE + `/repoc/api/search`, {query: query});
    return response.data;
}

export const fetchCollectionsForUser = async (userId?: string) => {
    const response = await axios.post(COLLECTIONS_API + `/`, {userId: userId});
    return response.data;
}

export const fetchPublicCollections = async (type?: string) => {
    const response = await axios.get(COLLECTIONS_API + `/type/${type}`);
    return response.data;
}

export const getCollectionsForUser = async (id: any) => {
    const response = await axios.post(API_BASE + `/repoc/api/collections`, {userId: id});
    return response.data;
}

export const addRepoToCollection = async (collectionId:any, githubRepo:any) => {
    const response = await axios.post(
      `${COLLECTIONS_API}/${collectionId}/github-repos`,
      githubRepo
    );
    return response.data;
};

// export const getAllCollections = async (query?: string) => {
//     const response = await axios.post(COLLECTIONS_API + ``);
//     return response.data;
// }
  