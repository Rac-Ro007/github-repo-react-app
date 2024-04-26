import { useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { User } from './client';
import * as client from "./client";
import Swal from 'sweetalert2';

export default function Signin() {
    const [credentials, setCredentials] = useState<User>({
        _id: "",
        firstname : "",
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        userType : "",
        email: "",
    });
    const [errorMessage, setErrorMessage] = useState<string>("");

    const navigate = useNavigate();

    const signin = async () => {
        try {
            const user_details = await client.signin(credentials);
            Swal.fire({
                title: "Good job!",
                text: "Collection Added Successfully!!",
                confirmButtonText: "Dive In",
                icon: "success"
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    navigate(`/Search/${user_details._id}`);
                }
              });
            
        } catch (error) {
            setErrorMessage("Check your Username/Password.");
        }
    };

    const signup = async () => {
        navigate("/Users/signup");
    }

    return (
        <div className="ring">
            <i style={{ "color": '#00ff0a' }}></i>
            <i style={{ 'color': '#ff0057' }}></i>
            <i style={{ 'color': '#fffd44' }}></i>
            <div className="login">
                <h2>Login</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <div className="inputBx">
                    <input type="text" placeholder="Username" value={credentials.username} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
                </div>
                <div className="inputBx">
                    <input type="password" placeholder="Password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                </div>
                <div className="inputBx">
                    <input type="submit" onClick={signin} value="Sign in" />
                </div>
                <div className="links">
                    <label style={{ "color": "#39ff14" }}><button className='transparent-button' onClick={signup}>Not a User ? Signup</button></label>
                </div>
            </div>
        </div>
    );
}

