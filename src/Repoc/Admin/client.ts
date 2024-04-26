import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";

export const getAllUsers = async () => {
    const response = await axios.get(API_BASE + `/repoc/api/users`);
    return response.data;
}

export const deleteUser = async (userId: string) => {
    const response = await axios.delete(API_BASE + `/repoc/api/users/${userId}`);
    return response.data;
} 