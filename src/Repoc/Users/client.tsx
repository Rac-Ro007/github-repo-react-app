import axios from "axios";
export interface User {
    _id: string; firstname:string; username: string; password: string; 
    firstName: string, lastName: string, userType: string, email: string;
};

export const signin = async (credentials: User) => { 
    const response = await axios.post(`https://cs5610-project.onrender.com/repoc/api/users/login`, credentials);
    return response.data;
};

export const signup = async (user: any) => {
    const response = await axios.post(`https://cs5610-project.onrender.com/repoc/api/users/signup`, user);
    return response.data;
};