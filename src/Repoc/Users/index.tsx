import { Navigate, Route, Routes } from "react-router-dom";
import Signin from "./signin";
import Signup from "./singup";
import Profile from "./profile";

export default function Users() {
    return (
        <div className="container-fluid">
            <Routes>
                <Route path="/" element={<Navigate to="/Users/Signin" />} />
                <Route path="/Signin" element={<Signin />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Profile" element={<Profile />} />
            </Routes>
        </div>
    );
}