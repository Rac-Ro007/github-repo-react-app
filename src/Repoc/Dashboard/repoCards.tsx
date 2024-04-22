import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Collapse from 'react-bootstrap/Collapse';
import Modal from 'react-bootstrap/Modal';
// import * as client from "../Courses/client";
// import {courses} from "../Database";
// import db from "../Database";
import axios from 'axios';
import * as db from "../../db";
import * as client from './client'
// import * as user from '../../userProfile.json'
// import localRepos from '../../githubRepos.json'

function RepoCards() {

    // Modal config
  const [show, setShow] = useState(false);
  const findAllRepos = async () => {
    const response = await client.fetchGithubRepos();
    setUserRepos(response);
  };

  const [userRepos, setUserRepos] = useState([] as any);

  const fetchRepos = async () => {
    console.log(db.userRepos);
    setUserRepos(db.userRepos);
    console.log(userRepos);
  }

//   setRepos(userRepos)

  console.log(userRepos);

  useEffect(() => {
    findAllRepos();
  }, []);

  return (
    <div className="p-4">
      <hr />
      <div className="row">
        <div className="row row2-cols-1 row-cols-md-5 g-4">
          <h2>Hey there</h2>
          {userRepos.length}
          {/* {userRepos} */}
          {userRepos && (userRepos?.map((repo:any) => (
            <div className="card mb-2">
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
          )))}
        </div>
      </div>
    </div>
  );
}

export default RepoCards;