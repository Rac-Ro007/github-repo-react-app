import { useState, useEffect } from "react";
import './index.css';
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import * as client from './Dashboard/client'
// import store from "./store";
import GithubNavigation from './Navigation'
import { Provider } from "react-redux"
import RepoCards from "./Dashboard/repoCards";
import Search from "./Search"
import Users from "./Users";
import Dashboard from "./Dashboard"
import Home from "./Home";
import AboutUs from "./AboutUs";
import Profile from "./Users/profile";
import CollectionDetails from "./CollectionDetails";
import store from "../store";
// import Users from "./Users"

function Repoc() {
  const [_repos, setRepos] = useState<any[]>([]);
  const location = useLocation(); 
  // const COURSES_API = "http://localhost:4000/api/courses";
  const findAllRepos = async () => {
    const response = await client.fetchGithubRepos();
    setRepos(response);
  };
  
  // useEffect(() => {
  //   findAllCourses();
  // }, []);

  const isLandingPage = location.pathname === "/Home" || location.pathname === "/AboutUs" || location.pathname.startsWith("/Users");

  return (
    <Provider store={store}>
    <div>
      {/* <div className="d-none d-md-block"> */}
      {/* </div> */}
      <div style={{ flexGrow: 1 }}>
        <div className="navbar" style={{"position":"fixed"}}>
          <GithubNavigation />
          <hr style={{"margin":"0", "color":"#2EA44F", "height":"2px"}}/>
        </div>
        
        <div className= {isLandingPage ? "landing-page" : "" } 
        style={{"justifyContent":"center", "display":"flex", paddingTop:"50px"}}>
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Repositories" element={<RepoCards />} />
            <Route path="/Search/:userId" element={<Search />} />
            <Route path="/Users/*" element={<Users />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/Profile/:userId" element={<Profile />} />
            <Route path="/:userId/CollectionDetails/:collectionId" element={<CollectionDetails />} />
            {/* <Route path="/Courses/:cid/*" element={<Courses courses={_courses} />} /> */}
          </Routes>
        </div>
      </div>
    </div>
    </Provider>
  );
}
export default Repoc;