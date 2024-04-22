import { Link, Route, Routes, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaRegUserCircle,
  FaGit,
  FaGithub,
} from "react-icons/fa";
import { FaN } from "react-icons/fa6";
import Signin from "../Users/signin";
import Signup from "../Users/singup";
import { NONAME } from "dns";

function GithubNavigation() {
  const links = [
    { label: "SignIn", icon: <FaRegUserCircle className="fs-2" /> },
    { label: "SignUp", icon: <FaTachometerAlt className="fs-2" /> },
  ];
  const { pathname } = useLocation();
  return (
    <div className="d-flex">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to="/Home" className="navbar-brand">
            <div className="d-flex m-2">
              <div>
                <FaGithub className="fs-2 f-2" color="#2EA44F" />
              </div>
              <div>
                <h4 style={{ "color": "#2EA44F", "marginLeft": "10px" }}>RepoC</h4>
              </div>
            </div>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to='/AboutUs' className="nav-link" >About Us</Link>
              </li>
              <li className="nav-item">
                <Link to='/Users/Signup' className="nav-link">Sign Up</Link>
              </li>
              <li className="nav-item">
                <Link to='/Users/Signin' className="nav-link">Sign In</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>


  );
}
export default GithubNavigation;