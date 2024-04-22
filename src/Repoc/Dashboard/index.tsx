import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Collapse from 'react-bootstrap/Collapse';
import Modal from 'react-bootstrap/Modal';
// import * as client from "../Courses/client";
// import {courses} from "../Database";
// import db from "../Database";
// import * as db from "../Database";
import * as user from '../../userProfile.json'
import localRepos from '../../githubRepos.json'
import App from "../../App";

function Dashboard() {
  // Modal config
  const [show, setShow] = useState(false);
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
      const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`);
      const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`);

      const profile = await profileResponse.json();
      const curRepos = await reposResponse.json();

      console.log('Profile', profile);
      console.log('Repos Info', curRepos);
      // setGithubUser(profile);
    }
    catch (e: any) {
      console.log(e);
    }
  }

  const fetchRepos = async () => {
    await setRepos(localRepos);
    console.log(repos)
  }

  useEffect(() => {

  }, []);

  const [deleteModal, setDeleteModal] = useState(false);
  return (
    <div className="d-flex p-4 row" style={{ "flexGrow": "1" }}>
      
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
        <div className="row">
          <div className="col-md-3">
            <img src="${githubUser.avatar_url}" alt="" className="img-fluid mb-2" />
            <a href="${githubUser.html_url}" target="_blank" className="btn btn-primary btn-block"> View Profile</a>
          </div>
          <div className="col-md-9">
            <span className="badge bg-primary p-2 m-2"> Public Repos: {githubUser.public_repos}</span>
            <span className="badge bg-secondary p-2 m-2"> Public Gists: {githubUser.public_gists}</span>
            <span className="badge bg-success p-2 m-2"> Followers: {githubUser.followers}</span>
            <span className="badge bg-info p-2 m-2"> Following: {githubUser.following}</span>
            <br /> <br />
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
      <div className="row">
        <div className="row row2-cols-1 row-cols-md-5 g-4">
          {repos && repos.map((repo: any) => {
            <div className="card card-body mb-2">
              <h1>ABHCD</h1>
              <div className="row">
                <div className="col-sm-6">
                  <a href="${repo.html_url}" target="_blank">{repo.name}</a>
                  <p className="pt-2">{repo.description}</p>
                </div>
                <div className="col-sm-6">
                  <span className="badge bg-primary"> Starts: {repo.stargazers_count}</span>
                  <span className="badge bg-info"> Watchers: {repo.watchers_count}</span>
                  <span className="badge bg-light"> Forks: {repo.forms_count}</span>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
      {deleteModal && (
        <Modal
          show={deleteModal}
          backdrop="static"
          onHide={() => { setDeleteModal(false); }}
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header closeButton>
            <Modal.Title>Delete Module?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container align-items-center">
              <h5>Are you sure you want to delete the Module?</h5>
              <h5 style={{ color: "red" }}>{repo.id} | {repo.name}</h5>
              <hr />
              <div className="d-flex justify-content-around m-2">
                <button className="btn btn-secondary m-2 w-100" onClick={() => setDeleteModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-outline-danger m-2 w-100">
                  Delete
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default Dashboard;