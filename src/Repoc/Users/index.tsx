import { Navigate, Route, Routes } from "react-router-dom";
import Signin from "./signin";
import Signup from "./singup";
import Profile from "./profile";
import AboutUs from "../AboutUs";

export default function Users() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate to="/Users/Signin" />} />
                <Route path="/Signin" element={<Signin />} />
                <Route path="/Signup" element={<Signup />} />
            </Routes>
        </div>
    );
}