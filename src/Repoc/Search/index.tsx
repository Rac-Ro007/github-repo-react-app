import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Collapse from 'react-bootstrap/Collapse';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import * as db from "../../db";
import { FaStar } from "react-icons/fa6";
import { SiTurborepo } from "react-icons/si";
import { RiGitForkFill } from "react-icons/ri";
import { ImGithub } from "react-icons/im";
import { IoPeopleSharp } from "react-icons/io5";
import * as client from "./client";
// import * as user from '../../userProfile.json'
// import localRepos from '../../githubRepos.json'

function Search() {
    // Modal config
  const [show, setShow] = useState(false);
  const [githubUserName, setGithubUserName] = useState("");
  const [githubUser, setGithubUser] = useState({} as any);
  const [searchDataList, setSearchDataList] = useState([]);
  const [collectionsList, setCollectionsList ] = useState([] as any);
  const [repo, setRepo] = useState({} as any);
  const [language, setLanguage] = useState("");
  const [tag, setTag] = useState("");
  const [repository, setRepository] = useState("");


  const fetchCollections = async () => {
    const collections = await client.getAllCollections();
    console.log("fetched collection", collections)
    setCollectionsList(collections)
    // console.log(collectionList);
  }

  const searchData = async(query?:string) => {
    const collections = await client.searchGithubRepos(query)
    console.log("fetched searched data", collections)
    setSearchDataList(collections)
  }

  const handleSearch = () => {
    const query = `${language ? 'language:' + language : ''} ${tag ? ' tag:' + tag : ''}${repository ? ' repository:' + repository : ''}`;
    console.log(query);
    searchData(query.trim());
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <div className="p-4 w-100 text-center">
      <h2 className="pt-2">Search what you are Looking For</h2>
      {/* Search Section */}
      <div className="mb-4 p-4 pb-3">
        <div className="row">
          <div className="col-md-4 mb-3">
            <input 
              className="form-control" 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              placeholder="Language" 
            />
          </div>
          <div className="col-md-4 mb-3">
            <input 
              className="form-control" 
              value={tag} 
              onChange={(e) => setTag(e.target.value)}
              placeholder="Tag" 
            />
          </div>
          <div className="col-md-4 mb-3">
            <input 
              className="form-control" 
              value={repository} 
              onChange={(e) => setRepository(e.target.value)}
              placeholder="Repository" 
            />
          </div>
        </div>
        <button 
          className="btn btn-outline-success w-100" 
          onClick={() => {
            // Make a function call here based on the inputs
            handleSearch();
          }}
        >
          Search
        </button>
      </div>
      {/* Popular tags section */}
      <div className="mb-5 pb-3">
        <h3 className="text-divider">Popular Tags</h3>
        <div>
        <button type="button" className="btn btn-primary rounded-pill fs-7 m-1">JavaScript</button>
        <button type="button" className="btn btn-secondary rounded-pill fs-7 m-1">React</button>
        <button type="button" className="btn btn-success rounded-pill fs-7 m-1">Node.js</button>
        <button type="button" className="btn btn-danger rounded-pill fs-7 m-1">Python</button>
        <button type="button" className="btn btn-warning rounded-pill fs-7 m-1">Java</button>
          {/* Render your popular tags badges here */}
          {/* Example:
              <span className="badge bg-primary mx-1">Tag1</span>
              <span className="badge bg-secondary mx-1">Tag2</span>
          */}
        </div>
      </div>

     {/* Searched Data Section */}
    <div className="mb-5 pb-3">
        <h2 className="text-divider">Searched Repositories</h2>
        <div className="container p-4">
            {/* Display searched repositories in cards */}
            <div className="row">
            {searchDataList.length > 0 ? (searchDataList.map((repo: any) => (
                <div className="col-md-4">
                    <div className="card repo-card p-3 mb-2 bg-dark text-white" key={repo.id}>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                                <div className="icon"> <ImGithub color="black"/> </div>
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
                            <div className="d-flex justify-content-between">
                              <a className="btn btn-secondary" href={repo.html_url} target="_blank">Open Repository</a>
                              <div className="ms-auto" style={{ alignSelf: "center" }}>
                                <span className="float-end">
                                  <a style={{cursor:"pointer"}} ><FaStar className="color-warning ms-2" size={20} /> 67,222</a>
                                  <a style={{cursor:"pointer"}} ><RiGitForkFill className="text-white ms-2" size={20} />200</a>
                                  <a style={{cursor:"pointer"}} ><IoPeopleSharp className="text-white ms-2" size={20} />59,890</a>
                                </span>
                              </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="card bg-dark text-white mb-3" key={repo.id}>
                        <div className="card-header"><h3>{repo.name}</h3></div>
                        <div className="card-body">
                            <p className="card-text">{repo.description}</p>
                            <span className="badge badge-warning">{repo.language}</span>
                            <span className="badge badge-primary">{repo.language}</span>
                            <a className="btn btn-warning" href={repo.html_url} target="_blank">Open Repository</a>
                        </div>
                    </div> */}
                </div>
            ))) : (
              <div className="container text-center m-4">
                    <ImGithub color="grey" size={50}/>
                    <h4 className="pt-4 text-secondary">Search for Something ;D ... </h4>
                </div>
            )}
            </div>
        </div>
    </div>
    
    {/* Collection Section */}
    <div className="mb-5 pb-3">
        <h2 className="text-divider">Trending Collections</h2>
        <div className="container p-4">
            {/* Display searched repositories in cards */}
            <div className="row">
              {collectionsList.length > 0 ? (collectionsList.map((repo:any) => (
              <div className="col-md-3 mb-2">
                  <div className="card repo-card p-3 mb-2" key={repo.id}>
                      <div className="d-flex justify-content-between">
                          <div className="d-flex flex-row align-items-center">
                              <div className="icon"> <SiTurborepo color="black"/> </div>
                              <div className="ms-2 c-details">
                                  <h6 className="mb-0">Collection</h6> <span>{repo.collectionType}</span>
                              </div>
                          </div>
                          <div className="badge badge-secondary"> <span>{repo.language}</span> </div>
                      </div>
                      <div className="mt-3">
                          <h4 className="heading">{repo.collectionName}</h4>
                          <p>Tags: {repo.collectionTags}</p>
                      </div>
                  </div>
              </div>
              ))): 
              (
                  <div className="container text-center m-4">
                      <SiTurborepo color="grey" size={50}/>
                      <h5 className="text-secondary pt-4">You dont have any collection</h5>
                  </div>
              )
          } 
          </div>
        </div>
    </div>

    </div>
  );
}

export default Search;