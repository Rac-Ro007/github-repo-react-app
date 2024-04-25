import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { FaStar } from "react-icons/fa6";
import { RepocState } from "../../store";
import { GoLinkExternal } from "react-icons/go";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { SiTurborepo } from "react-icons/si";
import { RiGitForkFill } from "react-icons/ri";
import { ImGithub } from "react-icons/im";
import { IoPeopleSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./client";
import { useParams } from "react-router";
import { setSearchGithubData } from "./reducer";
import { setCollectionsOwned } from "../Users/reducer";
// import * as user from '../../userProfile.json'
// import localRepos from '../../githubRepos.json'

function Search() {
  // Modal config
  const { userId } = useParams();
  const [show, setShow] = useState(false);
  const [githubUserName, setGithubUserName] = useState("");
  const [githubUser, setGithubUser] = useState({} as any);
  const [searchDataList, setSearchDataList] = useState([]);
  const [collectionsList, setCollectionsList ] = useState([] as any);
  const [repo, setRepo] = useState({} as any);
  const dispatch = useDispatch();
  const [language, setLanguage] = useState("");
  const [tag, setTag] = useState("");
  const [repository, setRepository] = useState("");
  const [showModal, setShowModal] = useState(false);

  const searchGithubData = useSelector((state: RepocState) => 
        state.searchGithubReducer.searchGithubData);

  console.log(searchGithubData);

  // const fetchCollections = async () => {
  //   const collections = await client.getAllCollections();
  //   console.log("fetched collection", collections)
  //   setCollectionsList(collections)
  //   // console.log(collectionList);
  // }
  const fetchUserCollections = async(uid?:string) => {
    const collections = await client.fetchCollectionsForUser(uid)
    console.log("fetched Collections", collections)
    dispatch(setCollectionsOwned(collections.collectionsOwned));
    // setModuleList(modules)
  }

  const handleAddToCollection = () => {

  }

  const searchData = async(query?:string) => {
    const collections = await client.searchGithubRepos(query)
    console.log("fetched searched data", collections)
    // setSearchDataList(collections.gitRepos);
    dispatch(setSearchGithubData(collections.gitRepos));
    setCollectionsList(collections.collections);
  }

  const handleSearch = () => {
    const query = `${language ? 'language:' + language : ''} ${tag ? ' tag:' + tag : ''}${repository ? ' repository:' + repository : ''}`;
    console.log(query);
    searchData(query.trim());
  };

  useEffect(() => {
    if (userId) {
      fetchUserCollections(userId);
    }
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

     {/* Searched Data Section */}
    <div className="mb-5 pb-3">
        <h2 className="text-divider">Searched Repositories</h2>
        <div className="container p-4">
            {/* Display searched repositories in cards */}
            <div className="row">
            {searchGithubData.length > 0 ? (searchGithubData.map((repo: any) => (
                <div className="col-md-4">
                    <div className="card repo-card p-3 mb-2 bg-dark text-white" key={repo.gitId}>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                                <div className="icon"> <ImGithub color="black"/> </div>
                                <div className="ms-2 c-details">
                                    <h6 className="mb-0">Github</h6> <span>Public</span>
                                </div>
                            </div>
                            <div className="badge badge-secondary"> <span>{repo.language}</span> </div>
                        </div>
                        <div className="mt-3">
                            <h3 className="heading"><a href={repo.htmlURL} style={{textDecoration:"none", color:"white"}} className="mt-5 heading" target="_blank">{repo.name} <GoLinkExternal size={15}/></a></h3>
                            {/* <p>{repo.description}</p> */}
                            <div className="mt-3 mb-2">
                                <div className="progress">
                                    {/* <div className="progress-bar" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div> */}
                                </div>
                                <div className="mt-3"> <span className="text1">Topics:  <span className="text2">{repo.topics.join(', ')}</span></span> </div>
                            </div>
                            <div className="d-flex justify-content-between">
                              <a className="btn btn-dark" href={repo.htmlURL} target="_blank"><MdOutlinePlaylistAdd size={30}/></a>
                              <div className="ms-auto" style={{ alignSelf: "center" }}>
                                <span className="float-end">
                                  <a style={{cursor:"pointer"}} ><FaStar className="color-warning ms-2" size={20} /> {repo.stargazerCount}</a>
                                  <a style={{cursor:"pointer"}} ><RiGitForkFill className="text-white ms-2" size={20} />{repo.forksCount}</a>
                                  <a style={{cursor:"pointer"}} ><IoPeopleSharp className="text-white ms-2" size={20} />{repo.watcherCount}</a>
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
                          <p>Tags: {repo.collectionTags.join(', ')}</p>
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
        {/* Insertion Modal */}
        {showModal && (
        <Modal 
            show={showModal}
            onHide={()=> {setShowModal(false);}}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title>Add / Update Collection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container align-items-center">
                <div className="p-2">
                <select className="form-select m-2"
                // onChange={(e) => ()}
                >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                </select>
                </div>
                <div className="row m-2">
                <div className="col-6">
                <button className="btn btn-success w-100" onClick={handleAddToCollection}>
                    Add Collection
                </button>
                </div>
                <div className="col-6">
                <button className="btn btn-primary w-100">
                    Update
                </button>
                </div>
                </div>
            </div>
            </Modal.Body>
        </Modal>
            )}
    </div>

    </div>

  );
}

export default Search;