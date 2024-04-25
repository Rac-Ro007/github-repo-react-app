import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Collapse from 'react-bootstrap/Collapse';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import * as db from "../../db";
import { ImGithub } from "react-icons/im";
// import * as user from '../../userProfile.json'
// import localRepos from '../../githubRepos.json'

function Search() {
  // Modal config
  const [show, setShow] = useState(false);
  const [githubUserName, setGithubUserName] = useState("");
  const [githubUser, setGithubUser] = useState({} as any);
  const [repos, setRepos] = useState([] as any);
  const [repo, setRepo] = useState({} as any);
  const [language, setLanguage] = useState("");
  const [tag, setTag] = useState("");
  const [repository, setRepository] = useState("");

  const clearCourse = () => setRepo([]);

  const fetchRepos = async () => {
    console.log(db.userRepos);
    setRepos(db.userRepos);
    console.log(repos);
  }

  useEffect(() => {
    fetchRepos();
  }, []);

  const [deleteModal, setDeleteModal] = useState(false);
  return (
    <div className="p-4" style={{ marginTop: "20px" }}>
      {/* Search Section */}
      <div className="mb-4 pb-3" style={{ position: "sticky", top: "52px", zIndex: "100", backgroundColor: "#ffffff" }}>
        <div className="row align-items-center" style={{"height":"100px"}}>
          <div className="col-md-3 mb-3">
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-pencil-fill"></i></span>
              <input
                className="form-control"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="Language"
              />
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-tag-fill"></i></span>
              <input
                className="form-control"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Tag"
              />
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-folder2-open-fill"></i></span>
              <input
                className="form-control"
                value={repository}
                onChange={(e) => setRepository(e.target.value)}
                placeholder="Repository"
              />
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <button
              className="btn btn-outline-success w-100"
              onClick={() => {
                // Make a function call here based on the inputs
              }}
            >
              <i className="bi bi-search"></i> Search
            </button>
          </div>
        </div>
      </div>


      {/* Popular tags section */}
      <div className="mb-5 pb-3">
        <h3 className="text-divider">Popular Tags</h3>
        <div>
          <button type="button" className="btn btn-primary rounded-pill fs-7 m-1">
            JavaScript
          </button>
          <button type="button" className="btn btn-secondary rounded-pill fs-7 m-1">
            React
          </button>
          <button type="button" className="btn btn-success rounded-pill fs-7 m-1">
            Node.js
          </button>
          <button type="button" className="btn btn-danger rounded-pill fs-7 m-1">
            Python
          </button>
          <button type="button" className="btn btn-warning rounded-pill fs-7 m-1">
            Java
          </button>
        </div>
      </div>

      <div className="mb-5 pb-3">
        <h2 className="text-divider">Searched Repositories</h2>
        <div className="container p-4">
          {/* Display searched repositories in cards */}
          <div className="row">
            {repos.map((repo: any) => (
              <div className="col-md-4">
                <div className="card repo-card p-3 mb-2 bg-dark text-white" key={repo.id}>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                      <div className="icon"> <ImGithub color="black" /> </div>
                      <div className="ms-2 c-details">
                        <h6 className="mb-0">Github</h6> <span>1 days ago</span>
                      </div>
                    </div>
                    <div className="badge badge-secondary"> <span>{repo.language}</span> </div>
                  </div>
                  <div className="mt-5">
                    <h3 className="heading">{repo.name}</h3>
                    <p>{repo.description}</p>
                    <div className="mt-5 p-2">
                      <div className="progress">
                        {/* <div className="progress-bar" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div> */}
                      </div>
                      <div className="mt-3"> <span className="text1">32 Applied <span className="text2">of 50 capacity</span></span> </div>
                    </div>
                    <a className="btn btn-secondary" href={repo.html_url} target="_blank">Open Repository</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  );
}

export default Search;