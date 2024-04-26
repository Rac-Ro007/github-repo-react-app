import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";
const COLLECTIONS_API = `${API_BASE}/repoc/api/collections`;

export const fetchCollectionsForUser = async (userId?: string) => {
    const response = await axios.post(COLLECTIONS_API + `/`, {userId: userId});
    return response.data;
}

export const fetchUserDetails = async (userId?: string) => {
    const response = await axios.post(API_BASE + `/repoc/api/users/${userId}`);
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

export const updateUserDetails = async (userId:any) => {
    const response = await axios.put(API_BASE + `/repoc/api/users/${userId}`,);
    return response.data;
};

export interface User {
    _id: string; firstname:string; username: string; password: string; 
    firstName: string, lastName: string, userType: string, email: string;
};

export const signin = async (credentials: User) => { 
    const response = await axios.post(`${API_BASE}/repoc/api/users/login`, credentials);
    return response.data;
};

export const signup = async (user: any) => {
    const response = await axios.post(`${API_BASE}/repoc/api/users/signup`, user);
    return response.data;
};
  