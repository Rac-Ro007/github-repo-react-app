import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";

export const getAllUsers = async () => {
    const response = await axios.get(API_BASE + `/repoc/api/users`);
    console.log(response.data);
    return response.data;
}

export const deleteUser = async (userId: string) => {
    const response = await axios.delete(API_BASE + `/repoc/api/users/${userId}`);
    return response.data;
} 

export const fetchUserDetails = async (userId?: string) => {
    const response = await axios.get(API_BASE + `/repoc/api/users/${userId}`);
    return response.data;
}

export const getAllCollections = async () =>  {
    const response = await axios.get(API_BASE + `/repoc/api/collections`);
    return response.data;
}

export const deleteCollection = async (collectionId: string) => {
    const response = await axios.delete(API_BASE + `/repoc/api/collections/${collectionId}`);
    return response.data;
} 