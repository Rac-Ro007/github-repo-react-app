import { useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import * as client from "./client";
import Swal from 'sweetalert2';

export default function Signup() {
    const [error, setError] = useState("");
    const [user, setUser] = useState({ firstname: "", email: "", username: "", password: "", userType: "user" }); // Set default userType to "user"
    const navigate = useNavigate();

    const signup = async () => {
        try {
            // Make sure user object is sent as the payload for signup
            const user_details = await client.signup(user);
            Swal.fire({
                title: "Good job!",
                text: "You have Signed Up Successfully!!",
                confirmButtonText: "Dive In",
                icon: "success"
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    navigate(`/Search/${user_details._id}`);
                }
              });
        } catch (err : any) {
            // Handle error response from the server
            setError(err.message); // Assuming err.message contains the error message from the server
        }
    };

    return (
        <div className="ring">
            <i style={{ "color": '#00ff0a' }}></i>
            <i style={{ 'color': '#ff0057' }}></i>
            <i style={{ 'color': '#fffd44' }}></i>
            <div className="login">
                <h2>Sign Up</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if present */}
                
                <div className="inputBx">
                    <input type="text" placeholder="FirstName" value={user.firstname} onChange={(e) => setUser({ ...user, firstname: e.target.value })} />
                </div>

                <div className="inputBx">
                    <input type="text" placeholder="Username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                </div>
                <div className="inputBx">
                    <input type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                </div>
                
                <div className="inputBx">
                    <input type="text" placeholder="Email Id" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </div>
                <div className="inputBx">
                    <select value={user.userType} className='form-select' onChange={(e) => setUser({ ...user, userType: e.target.value })}>
                        <option value="user">User</option>
                        <option value="creator">Creator</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="inputBx">
                    <input type="submit" onClick={signup} value="Sign Up" />
                </div>
                <div className="links">
                    <label><input type='checkbox' style={{ "marginRight": "20px" }}></input></label>
                    <label style={{ "color": "#39ff14" }}>Remember Me</label>
                </div>
            </div>
        </div>
    );
}
