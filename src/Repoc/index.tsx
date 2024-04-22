import { useState, useEffect } from "react";
import axios from "axios";
import './index.css';
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import * as client from './Dashboard/client'
// import store from "./store";
import GithubNavigation from './Navigation'
import { Provider } from "react-redux"
import RepoCards from "./Dashboard/repoCards";
import Search from "./Search"
import * as db from "../db";
import Users from "./Users";
import App from "../App";
import Dashboard from "./Dashboard"
import Footer from "./Footer";
import Home from "./Home";
import AboutUs from "./AboutUs";
// import Users from "./Users"

function Repoc() {
  const [_repos, setRepos] = useState<any[]>([]);
  // const COURSES_API = "http://localhost:4000/api/courses";
  const findAllRepos = async () => {
    const response = await client.fetchGithubRepos();
    setRepos(response);
  };
  
  // useEffect(() => {
  //   findAllCourses();
  // }, []);

  const [course, setCourse] = useState({
    _id: "1234", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
  });
  // const addNewCourse = () => {
  //   setCourses([..._courses, { ...course, _id: new Date().getTime().toString() }]);
  // };
  // const deleteCourse = (courseId: any) => {
  //   setCourses(_courses.filter((course) => course._id !== courseId));
  // };
  // const updateCourse = () => {
  //   setCourses(
  //     _courses.map((c) => {
  //       if (c._id === course._id) {
  //         return course;
  //       } else {
  //         return c;
  //       }
  //     })
  //   );
  // };

  return (
    // <Provider store={store}>
    <div>
      {/* <div className="d-none d-md-block"> */}
      {/* </div> */}
      <div style={{ flexGrow: 1 }}>
        <GithubNavigation />
        <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Repositories" element={<RepoCards />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Users/*" element="Users" />
          {/* <Route path="/Courses/:cid/*" element={<Courses courses={_courses} />} /> */}
        </Routes>
        <div className="navbar" style={{"position":"fixed"}}>
          <GithubNavigation />
          <hr style={{"margin":"0", "color":"#2EA44F", "height":"2px"}}/>
        </div>
        
        <div style={{"justifyContent":"center", "display":"flex"}}>
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="/Users/*" element={<Users />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            {/* <Route path="/Courses/:cid/*" element={<Courses courses={_courses} />} /> */}
          </Routes>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
    // </Provider>
  );
}
export default Repoc;