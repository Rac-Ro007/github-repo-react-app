import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Collapse from 'react-bootstrap/Collapse';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import * as db from "../../db";
import RepoCards from "./repoCards";
// import * as db from "../Database";
import * as user from '../../userProfile.json'
import localRepos from '../../githubRepos.json'
import App from "../../App";

function Dashboard() {
  // Modal config
  const [show, setShow] = useState(false);
  const [githubState, setGithubState] = useState({
    hasUser: false,
    loading: false,
    user: {
      id: undefined,
      avatar: undefined,
      login: undefined,
      name: undefined,
      html_url: undefined,
      blog: undefined,
      company: undefined,
      location: undefined,
      followers: 0,
      following: 0,
      public_gists: 0,
      public_repos: 0,
    },
    repositories: [] as any,
  })
  const [githubUserName, setGithubUserName] = useState("");
  const [githubUser, setGithubUser] = useState({} as any);
  const [repos, setRepos] = useState([] as any);
  const [repo, setRepo] = useState({} as any);

  //   const fetchAllCourses = async () => {
  //     const courses = await client.fetchAllCourses();
  //     setCourses(courses);
  //   };

  const clearCourse = () => setRepo([]);

  const fetchGithubRepos = async (user: any) => {
    try {
    const profileResponse = await axios.get(`https://api.github.com/users/${user}?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`);
    const reposResponse = await axios.get(`https://api.github.com/users/${user}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`);
    
    const profile = await profileResponse.data;
    const curRepos = await reposResponse.data;

    console.log('Profile', profile);
    console.log('Repos Info', curRepos);
    setGithubUser(profile);
    setGithubState({
      ...githubState, repositories: curRepos
    });

    }
    catch (e: any) {
      console.log(e);
    }
  }

  const fetchRepos = async () => {
    console.log(db.userRepos);
    setRepos(db.userRepos);
    console.log(repos);
  }

  useEffect(() => {
    // fetchGithubRepos(githubUserName);
    // setRepos(localRepos);
    fetchRepos();
    console.log("State", githubState)
  }, []);

  const [deleteModal, setDeleteModal] = useState(false);
  return (
    <div className="p-4">
      <h1>RepoC</h1>
      <hr />
      {/* <h2>Github  ()</h2> */}
      {/* <a className="btn btn-outline-primary" onClick={()=> setShow(!show)}
        aria-controls="example-collapse-text"
        aria-expanded={show}>
        Course Operations
      </a>
      <Collapse in={show}>
        <div className="p-4" id="example-collapse-text">
          <div className="d-flex justify-content-around">
            <input value={course.name} className="form-control m-2 w-100"
              onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
            <input value={course.number} className="form-control m-2 w-100"
                  onChange={(e) => setCourse({ ...course, number: e.target.value }) } />
          </div>

          <div className="d-flex justify-content-around">
            <input value={course.startDate} className="form-control m-2 w-100" type="date"
                  onChange={(e) => setCourse({ ...course, startDate: e.target.value }) }/>
            <input value={course.endDate} className="form-control m-2 w-100" type="date"
                  onChange={(e) => setCourse({ ...course, endDate: e.target.value }) } />
          </div>

          <div className="row m-2">
            <div className="col-6">
            <button className="btn btn-success w-100">
              Add Course
            </button>
            </div>
            <div className="col-6">
            <button className="btn btn-primary w-100" onClick={() => {}}>
              Update Course
            </button>
          </div>
         </div>
        </div>
      </Collapse> */}
      
      <input className="form-control" value={githubUserName} 
      onChange={(e) => setGithubUserName(e.target.value)}
      placeholder="Enter your Github UserName" />

      <button className="btn btn-outline-success w-100 m-2" onClick={() => {
        // console.log(githubUserName);
        setGithubUser(db.userProfile);
        // fetchRepos();
        // console.log(repos);
        fetchGithubRepos(githubUserName)
      }}>
        Fetch User Data
      </button>
      
      <div style={{"width":"500px", "justifyContent":"center"}}>
        <input
          className="form-control google-search"
          value={githubUserName}
          onChange={(e) => setGithubUserName(e.target.value)}
          placeholder="Enter your Github UserName"
        />
      </div>
      <br />
      <div>
        <button className="btn btn-outline-success w-100 m-2" onClick={() => {
          // console.log(githubUserName);
          setGithubUser(user);
          // fetchRepos();
          // console.log(repos);
          fetchGithubRepos(githubUserName)
        }}>
          Fetch User Data
        </button>
      </div>
      <div className="card">
        <div className="row card-body">
            <div className="col-md-3">
                <img src="${githubUser.avatar_url}" alt="" className="img-fluid mb-2" />
                <a href="${githubUser.html_url}" target="_blank" className="btn btn-primary btn-block"> View Profile</a>
            </div>
            <div className="col-md-9">
                <span className="badge bg-primary p-2 m-2"> Public Repos: {githubUser.public_repos}</span>
                <span className="badge bg-secondary p-2 m-2"> Public Gists: {githubUser.public_gists}</span>
                <span className="badge bg-success p-2 m-2"> Followers: {githubUser.followers}</span>
                <span className="badge bg-info p-2 m-2"> Following: {githubUser.following}</span>
                <br/> <br/>
                <ul className="list-group">
                    <li className="list-group-item">Company : {githubUser.company}</li>
                    <li className="list-group-item">Website : {githubUser.blog}</li>
                    <li className="list-group-item">Location : {githubUser.location}</li>
                    <li className="list-group-item">Member Since : {githubUser.created_at}</li>
                </ul>
            </div>
        </div>
      </div>
      <hr />
      {/* <RepoCards us /> */}
      {/* <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {repos.map((course:any) => (
            <div className="col" style={{ width: "300px" }}>
              <div className="card">
                <img
                  src="/images/canvas.jpeg"
                  className="card-img-top"
                  style={{ maxHeight: "150px" }}
                />
                <div className="card-body">
                  <Link
                    className="card-title"
                    to={`/Kanbas/Courses/${course?._id}`}
                    style={{
                      textDecoration: "none",
                      color: "navy",
                      fontWeight: "bold",
                    }}
                  >
                    {course}
                  </Link>
                  <p className="card-text">Full Stack software developer</p>
                  <Link to={`/Kanbas/Courses/${course.id}`} className="btn btn-outline-danger w-100">
                    Open Course
                  </Link>
                  <hr/>
                  <div className="d-flex justify-content-between">
                    <button className="btn w-100 btn-outline-warning m-2" onClick={(event) => {
                        event.preventDefault();
                        setShow(true);
                        setRepo(course);
                      }}>
                      Edit
                    </button>
                    <button className="btn w-100 btn-outline-danger m-2" onClick={(event) => {
                        event.preventDefault();
                        setRepo(course);
                        setDeleteModal(true);
                      }}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          })}
        </div>
        </div> */}
    </div>
  );
}

export default Dashboard;