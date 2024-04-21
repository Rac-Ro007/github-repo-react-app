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
    <div className="d-flex justify-content-between p-2">
      <div>
        <Link to="/Dashboard" style={{"textDecoration":"none"}}>
          <div className="d-flex">
            <div>
              <FaGithub className="fs-2 f-2" color="black" />
            </div>
            <div>
              <h4 style={{"color":"black"}}>RepoC</h4>
            </div>
          </div>
        </Link>
      </div>
      <div>
        {links.map((link, index) => (
          <Link className="btn btn-black" to={`/Users/${link.label}`}> <i>{link.label}</i> </Link>
        ))}
      </div>
    </div>
  );
}
export default GithubNavigation;