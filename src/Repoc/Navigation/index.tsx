import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import {
  FaTachometerAlt,
  FaRegUserCircle,
  FaGithub,
} from "react-icons/fa";
import { useState } from "react";

interface NavbarDropdownProps {
  isOpen: boolean;
  isProfilePage: boolean;
  isCollectionDetailsPage: boolean;
  isSearchPage: boolean;
  isAdminPage: boolean;
}


function NavbarDropdown({ isOpen, isProfilePage, isCollectionDetailsPage, isSearchPage, isAdminPage }: NavbarDropdownProps) {
  return (
    <div className={`collapse navbar-collapse justify-content-end ${isOpen ? 'show' : ''}`} id="navbarNav">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to='/AboutUs' className="nav-link" >About Us</Link>
        </li>
        {isProfilePage || isCollectionDetailsPage || isSearchPage || isAdminPage ? (
          <>
            <li className="nav-item">
              <Link to='/Users/Signin' className="nav-link" >Sign Out</Link>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to='/Users/Signup' className="nav-link">Sign Up</Link>
            </li>
            <li className="nav-item">
              <Link to='/Users/Signin' className="nav-link">Sign In</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}


function GithubNavigation() {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    { label: "SignIn", icon: <FaRegUserCircle className="fs-2" /> },
    { label: "SignUp", icon: <FaTachometerAlt className="fs-2" /> },
  ];
  const { pathname } = useLocation();
  const location = useLocation();
  const { userId } = useParams();
  console.log(userId)
  // Function to determine if the pathname matches the specified formats
  const isProfilePage = /^\/Profile\//.test(location.pathname);
  const isCollectionDetailsPage = /\/CollectionDetails\//.test(location.pathname);
  const isSearchPage = /^\/Search\//.test(location.pathname);
  const isAdminPage = /^\/Admin/.test(location.pathname);

  const isLandingPage = pathname === "/Home" || location.pathname === "/AboutUs" || location.pathname.startsWith("/Users");

  return (
    <div className="d-flex">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to="/Home" className="navbar-brand">
            <div className="d-flex align-items-center">
              <FaGithub className="fs-2 f-2" color="#2EA44F" />
              <h4 className="ms-2 mb-0" style={{ color: "#2EA44F" }}>RepoC</h4>
            </div>
          </Link>

          <button className="navbar-toggler justify-content-end" type="button" onClick={toggleDropdown} aria-controls="navbarNav" aria-expanded={isOpen ? "true" : "false"} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <NavbarDropdown isOpen={isOpen} isProfilePage={isProfilePage} isCollectionDetailsPage={isCollectionDetailsPage} isSearchPage={isSearchPage} isAdminPage={isAdminPage} />

        </div>
      </nav>
    </div>
  );
}
export default GithubNavigation;


