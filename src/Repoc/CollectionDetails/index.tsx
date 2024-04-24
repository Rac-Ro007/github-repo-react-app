import { useState, useEffect } from "react";
import { ImGithub } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import { SiTurborepo } from "react-icons/si";
import axios from "axios";
import * as client from './client';
import { FaStar } from "react-icons/fa6";
import { RiGitForkFill } from "react-icons/ri";
import { IoPeopleSharp } from "react-icons/io5";
import { RepocState } from "../../store";
import { useParams } from "react-router";
import { RiExternalLinkFill } from "react-icons/ri";
import { addCollection, deleteCollection, setCollectionsOwned, updateCollection } from "../Users/reducer";

const CollectionDetails = () => {
    // State variables to manage user profile information
    const { collectionId } = useParams();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    // Add more state variables as needed

    // State variable to manage the active tab
    const [activeTab, setActiveTab] = useState('Collections');
    const [showModal, setShowModal] = useState(false);

    const [repo, setRepo] = useState<any>({})
    const [repos, setRepos] = useState<any>([{
        "id": 789172119,
        "node_id": "R_kgDOLwnPlw",
        "name": "Collection 1",
    },
    { 
        "id": 789172119,
        "node_id": "R_kgDOLwnPlw",
        "name": "Collection 2",
    },
    { 
        "id": 789172119,
        "node_id": "R_kgDOLwnPlw",
        "name": "Collection 3",
    },
    { 
        "id": 789172119,
        "node_id": "R_kgDOLwnPlw",
        "name": "Collection 4",
    },
    ])

    const collectionsOwnedList = useSelector((state: RepocState) => 
        state.collectionsReducer.collectionsOwned);
    const collectionsStarredList = useSelector((state: RepocState) => 
        state.collectionsReducer.collectionsStarred);
    const collectionsSavedByList = useSelector((state: RepocState) => 
        state.collectionsReducer.collectionsSavedBy);
    const collection = useSelector((state: RepocState) => 
        state.collectionsReducer.collection);
    const dispatch = useDispatch();
    
    const fetchUserCollections = async(cid?:string) => {
        const collections = await client.fetchCollectionsForCourse(cid)
        console.log("fetched Collections", collections)
        dispatch(setCollectionsOwned(collections))
        // setModuleList(modules)
    }

    // const handleAddCollection = () => {
    //     client.createCollection(userId, collection).then((collection:any) => {
    //     console.log("Added collection from BE post creation", collection)
    //     dispatch(addCollection(collection));
    //     });
    // };

    const handleDeleteCollection = (collectionId: string, userId: string) => {
        client.deleteCollection(collectionId, userId).then((collection:any) => {
        dispatch(deleteCollection(collectionId));
        });
    }

    const handleUpdateCollection = async () => {
        const status = await client.updateCollection(collection);
        dispatch(updateCollection(collection));
    };


    // Function to handle form submission for updating user profile
    const handleSubmit = (event:any) => {
        event.preventDefault();
        // Logic to update user profile
    };

    // useEffect(() => {s
    //     fetchUserCollections();
    // }, [])

    return (
        <div className="container mt-5">
            <div className="row">
                <h3>Collection Details</h3>
                {/* Left column for updating user profile */}
                <div className="col-md-4 p-3">
                    <h2>Collection Name</h2>
                    <div className="pt-3">
                        <h4>Saved By: </h4>
                    </div>
                    <div className="pt-3">
                        <h4>Collaborators: </h4>
                    </div>
                    <div className="pt-3">
                        <h4>Owner: </h4>
                    </div>
                    <div className="pt-3">
                        <h4>Tags</h4>
                        <button className="btn btn-sm rounded-pill">Data Science</button>
                        <button className="btn btn-sm rounded-pill">AI</button>
                        <button className="btn btn-sm rounded-pill">Web Dev</button>
                    </div>
                </div>
                {/* Right column for tabs */}
                <div className="col-md-8 p-3">
                    {/* <h2>Tabs</h2> */}
                    <h4 className="text-divider">Collection </h4>
                    {/* Render content based on active tab */}
                    
                    <div className="container pt-2">
                        <div className="d-flex justify-content-between pb-2">
                            {/* <h3>Your Collections</h3> */}
                            {/* <button className="btn btn-primary" onClick={() => setShowModal(true)}>New Collectiom</button> */}
                        </div>
                    <div className="row">
                        {repos.map((repo:any) => (
                        <div className="col-md-4">
                        <div className="card repo-card p-3 mb-2 bg-dark text-white mb-4" key={repo.id}>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex flex-row align-items-center">
                                    <div className="icon"> <ImGithub color="black"/> </div>
                                    <div className="ms-2 c-details">
                                        <h6 className="mb-0">Github</h6> <span>1 days ago</span>
                                    </div>
                                </div>
                                <div className="badge badge-secondary"> <span>{repo.language}</span> </div>
                            </div>
                            <div className="mt-3">
                                <h4 className="heading">{repo.name}</h4>
                                <p>{repo.description}</p>
                                <div className="d-flex justify-content-between">
                                  {/* <a className="btn btn-secondary" href={repo.html_url} target="_blank">Open Repository</a> */}
                                  <a style={{cursor:"pointer"}} ><RiExternalLinkFill className="text-white ms-2" size={20} /></a>
                                  <div className="ms-auto" style={{ alignSelf: "center", fontSize: "12px" }}>
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
                        ))}
                    </div>
                    </div>

                </div>
            </div>
            {/* Delete Modal */}
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
                    <input className="form-control m-2" value=""
                        placeholder="Enter Module Name"
                        // onChange={(e) => dispatch(setModule({ 
                        // ...module, name: e.target.value }))}
                    />
                    <textarea className="form-control m-2" value=""
                        placeholder="Enter Module Description"
                        // onChange={(e) => dispatch(setModule({ 
                        // ...module, description: e.target.value }))}
                    />
                    </div>
                    <div className="row m-2">
                    <div className="col-6">
                    <button className="btn btn-success w-100">
                        Add Module
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
    );
}

export default CollectionDetails;