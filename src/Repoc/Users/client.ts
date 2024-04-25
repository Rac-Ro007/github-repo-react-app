import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";
const COLLECTIONS_API = `${API_BASE}/repoc/api/collections`;
const MODULES_API = `${API_BASE}/api/modules`;

export const fetchCollectionsForUser = async (userId?: string) => {
    const response = await axios.post(COLLECTIONS_API + `/`, {userId: userId});
    return response.data;
}

export const createCollection = async (userId:any, collection:any) => {
    const response = await axios.post(
      `${COLLECTIONS_API}/${userId}`,
      collection
    );
    return response.data;
};

export const deleteCollection = async (collectionId:any, userId: any) => {
    const response = await axios.delete(`${COLLECTIONS_API}/${collectionId}/savedBy/${userId}`);
    return response.data;
};

export const updateCollection = async (collection:any) => {
    const response = await axios.put(`${COLLECTIONS_API}/${collection._id}`, collection);
    return response.data;
};
  
  