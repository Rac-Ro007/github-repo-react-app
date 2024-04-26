import { useState, useEffect } from "react";
import { ImGithub } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { SiTurborepo } from "react-icons/si";
import axios from "axios";
import * as client from "./client";
import { FaStar } from "react-icons/fa6";
import { RiGitForkFill } from "react-icons/ri";
import { IoPeopleSharp } from "react-icons/io5";
import { RepocState } from "../../store";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import {
  deleteCollection,
  updateCollection,
  setCollection,
} from "../Users/reducer";
import { GoLinkExternal } from "react-icons/go";

const CollectionDetails = () => {
  // State variables to manage user profile information
  const { userId, collectionId } = useParams();
  const [gitRepoList, setgitRepos] = useState<any>([]);

  const [activeTab, setActiveTab] = useState("Collections");
  const [shareModal, setShareModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [sharedUser, setSharedUser] = useState("");
  const [userList, setUserList] = useState<any>([]);

  const navigate = useNavigate();

  const collection = useSelector(
    (state: RepocState) => state.collectionsReducer.collection
  );
  const dispatch = useDispatch();


  const fetchUserCollectionByID = async (collectionId?: string) => {
    setgitRepos([]);
    const collection = await client.fetchCollectionsByID(collectionId);
    console.log("fetched Collection: ", collection);
    console.log(collection.githubRepos);
    
    if (collection.githubRepos) {
      // Map each repo to a promise that fetches the repo data
      const repoPromises = collection.githubRepos.map((repo:any) => client.fetchRepoById(repo));
      
      // Wait for all repo data to be fetched
      const repos = await Promise.all(repoPromises);
      
      // Update state with all fetched repositories
      setgitRepos(repos);
    }
    
    dispatch(setCollection(collection));
  };

  const fetchUserList = async () => {
    const users = await client.fetchAllUsers();
    const usersExceptSelf = users.filter((u:any) => u._id !== userId);
    setUserList(usersExceptSelf);
  }
  

  // const handleAddCollection = () => {
  //     client.createCollection(userId, collection).then((collection:any) => {
  //     console.log("Added collection from BE post creation", collection)
  //     dispatch(addCollection(collection));
  //     });
  // };

  useEffect(() => {
    fetchUserCollectionByID(collectionId);
    fetchUserList();
  }, []);

  const clearCollection = () => dispatch(setCollection([]));

  const handleCreate = () => {
    setShowModal(false);
    clearCollection();
    // fetchModules(cid);
  };

  const handleDeleteCollection = () => {
    client.deleteCollection(collection._id, userId).then((collection: any) => {
      dispatch(deleteCollection(collection._id));
      navigate(`/Profile/${userId}`);
    });
  };

  const handleUpdateCollection = async () => {
    const updated_collection = await client.updateCollection(collection);
    dispatch(updateCollection(updated_collection));
    setShowModal(false);
  };

  const handleAddSharedUser = async () => {
    const updated_collection = await client.addSharedUser(collectionId, sharedUser);
    dispatch(setCollection(updated_collection));
    setShareModal(false);
  };

  const handleSaveCollection = async() => {
    console.log("Client collectinId: ", collectionId);
    console.log("Client userId: ", userId);
    const updated_collection = await client.addSavedByUser(collectionId, userId);
    dispatch(setCollection(updated_collection));
  }

  // Function to handle form submission for updating user profile
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Logic to update user profile
  };

  return (
    <div className="container mt-5">
        <div className="d-flex justify-content-between">
            <h3>Collection Details</h3>
            <div className="justify-content-end">
            {collection.owner === userId && collection.collectionType === "Public" && (
                <button className="btn btn-info m-2" onClick={() => setShareModal(true)}>Share Collection</button>
            )}
            {collection.owner === userId && (
                <button className="btn btn-warning m-2" onClick={() => setShowModal(true)}>Edit Collection</button>
            )}
            {collection.owner === userId && (
                <button className="btn btn-outline-danger m-2" onClick={() => setDeleteModal(true)}>Delete Collection</button>
            )}
        </div>
      </div>
      <hr style={{ width: "25%" }} />
      <div className="row pt-1">
        {/* Left column for updating user profile */}
        <div className="col-md-4 p-3">
          <h2>{collection.collectionName}</h2>
          <div className="pt-3">
            <h4>Type: {collection.collectionType}</h4>
          </div>
          <div className="pt-3">
            <h4>Collaborators: {collection.collaborators.length}</h4>
          </div>
          <div className="pt-3">
            <h4>Saved By: {collection.savedBy.length}</h4>
          </div>
          <div className="pt-3">
            <h4>Owner:{collection.ownerName} </h4>
          </div>
          <div className="pt-3">
            <h4>Tags:</h4>
            {collection.collectionTags &&
              collection.collectionTags.map((coll: any) => (
                <button
                  className="badge rounded-pill bg-dark"
                  style={{ marginRight: "3px", marginBottom: "3px" }}
                >
                  {coll}
                </button>
              ))}
          </div>
          <div className="pt-3">
            {collection.owner !== userId && (
                <button className="btn btn-outline-dark m-2"
                onClick={()=>handleSaveCollection()}>Save</button>
            )}
          </div>
        </div>
        {/* Right column for tabs */}
        <div className="col-md-8 p-3">
          {/* <h2>Tabs</h2> */}
          <h5 className="text-divider">GitHub Repositories </h5>
          {/* Render content based on active tab */}

          <div className="container pt-2">
            <div className="d-flex justify-content-between pb-2">
              {/* <h3>Your Collections</h3> */}
              {/* <button className="btn btn-primary" onClick={() => setShowModal(true)}>New Collectiom</button> */}
            </div>
            <div className="row">
              {gitRepoList.length > 0 ? (
                gitRepoList.map((repo: any) => (
                  <div className="col-md-4">
                    <div
                      className="card repo-card p-3 mb-2 bg-dark text-white"
                      key={repo.gitId}
                    >
                      <div className="d-flex justify-content-between">
                        <div className="d-flex flex-row align-items-center">
                          <div className="icon">
                            {" "}
                            <ImGithub color="black" />{" "}
                          </div>
                          <div className="ms-2 c-details">
                            <h6 className="mb-0">Github</h6> <span>Public</span>
                          </div>
                        </div>
                        <div className="badge badge-secondary">
                          {" "}
                          <span>{repo.language}</span>{" "}
                        </div>
                      </div>
                      <div className="mt-3">
                        <h3 className="heading">
                          <a
                            href={repo.htmlURL}
                            style={{ textDecoration: "none", color: "white" }}
                            className="mt-5 heading"
                            target="_blank"
                          >
                            {repo.name} <GoLinkExternal size={15} />
                          </a>
                        </h3>
                        {/* <p>{repo.description}</p> */}
                        <div className="mt-3 mb-2">
                          <div className="progress">
                            {/* <div className="progress-bar" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div> */}
                          </div>
                          <div className="mt-3">
                            {" "}
                            <span className="text1">
                              Topics:{" "}
                              <span className="text2">
                                {repo.topics.join(", ")}
                              </span>
                            </span>{" "}
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          {/* <a className="btn btn-dark" onClick={() => {setActiveRepo(repo); setShowModal(true)}}><MdOutlinePlaylistAdd size={30}/></a> */}
                          <div
                            className="ms-auto"
                            style={{ alignSelf: "center" }}
                          >
                            <span className="float-end">
                              <a style={{ cursor: "pointer" }}>
                                <FaStar
                                  className="color-warning ms-2"
                                  size={20}
                                />{" "}
                                {repo.stargazerCount}
                              </a>
                              <a style={{ cursor: "pointer" }}>
                                <RiGitForkFill
                                  className="text-white ms-2"
                                  size={20}
                                />
                                {repo.forksCount}
                              </a>
                              <a style={{ cursor: "pointer" }}>
                                <IoPeopleSharp
                                  className="text-white ms-2"
                                  size={20}
                                />
                                {repo.watcherCount}
                              </a>
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
                ))
              ) : (
                <div className="container text-center m-4">
                  <ImGithub color="grey" size={50} />
                  <h4 className="pt-4 text-secondary">
                    Add Some Git Repositories ;D ...{" "}
                  </h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {shareModal && (
        <Modal
          show={shareModal}
          onHide={() => {
            setShareModal(false);
          }}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Share Collection</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container align-items-center">
              <div className="p-2">
                
                <select className="form-select m-2"
                    onChange={(e) => setSharedUser(e.target.value)}
                    >
                        {userList && userList.map((user: any) => (
                        <option value={user._id}>{user.username}</option>
                      ))}
                    </select>
              </div>
              <div className="row m-2">
                <div className="col-6">
                  <button className="btn btn-secondary w-100" onClick={() => {setShareModal(false)}}>Cancel</button>
                </div>
                <div className="col-6">
                  <button className="btn btn-outline-dark w-100" onClick={() => {handleAddSharedUser()}}>Add as Collaborator</button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {/* Updation Modal */}
      {showModal && (
        <Modal
          show={showModal}
          onHide={() => {
            setShowModal(false);
          }}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Collection</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container align-items-center">
              <div className="p-2">
                <input
                  className="form-control m-2"
                  value={collection.collectionName}
                  placeholder=""
                  onChange={(e) => dispatch(setCollection({
                  ...collection, collectionName: e.target.value }))}
                />
                <select className="form-select m-2"
                    onChange={(e) => dispatch(setCollection({ 
                        ...collection, collectionType: e.target.value }))}
                    >
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </select>
                <input
                  className="form-control m-2"
                  value={collection.collectionTags}
                  placeholder="tags"
                  onChange={(e) => dispatch(setCollection({
                    ...collection, collectionTags: e.target.value }))}
                />
              </div>
              <div className="row m-2">
                <div className="col-6">
                  <button className="btn btn-secondary w-100" onClick={() => {setShowModal(false)}}>Cancel</button>
                </div>
                <div className="col-6">
                  <button className="btn btn-outline-dark w-100" onClick={() => {handleUpdateCollection()}}>Update Collection</button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {/* Delete Modal */}
      {deleteModal && (
          <Modal 
          show={deleteModal}
          backdrop="static"
          onHide={()=> {setDeleteModal(false);}}
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header closeButton>
            <Modal.Title>Delete Collection?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container align-items-center">
              <h5>Are you sure you want to delete the Collection?</h5>
              <h5 style={{color:"red"}}>{collection._id} | {collection.collectionName}</h5>
              <hr/>
              <div className="d-flex justify-content-around m-2">
                <button className="btn btn-secondary m-2 w-100" onClick={() => setDeleteModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-outline-danger m-2 w-100" onClick={handleDeleteCollection}>
                  Delete 
                </button>
              </div>
            </div>
          </Modal.Body>
          {/* <Modal.Footer>
            <div className="d-flex justify-content-around">
              <button className="btn btn-secondary w-100" onClick={() => setDeleteModal(false)}>
                Cancel
              </button>
              <button className="btn btn-danger w-100" onClick={handleDelete}>
                Delete 
              </button>
            </div>
          </Modal.Footer> */}
        </Modal>
        )}
    </div>
  );
};

export default CollectionDetails;
