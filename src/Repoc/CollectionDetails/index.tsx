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
import { addCollection, deleteCollection, setCollectionsOwned, 
    updateCollection, setCollection, setCollectionsSavedBy, setCollectionsStarred } from "../Users/reducer";

const CollectionDetails = () => {
    // State variables to manage user profile information
    const { collectionId } = useParams();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    // Add more state variables as needed

    const [activeTab, setActiveTab] = useState('Collections');
    const [showModal, setShowModal] = useState(false);

    const collectionsOwnedList = useSelector((state: RepocState) => 
        state.collectionsReducer.collectionsOwned);
    const collectionsStarredList = useSelector((state: RepocState) => 
        state.collectionsReducer.collectionsStarred);
    const collectionsSavedByList = useSelector((state: RepocState) => 
        state.collectionsReducer.collectionsSavedBy);
    const collection = useSelector((state: RepocState) => 
        state.collectionsReducer.collection);
    const dispatch = useDispatch();
    
    // const fetchUserCollectionByIDfetchUserCollections = async(uid?:string) => {
    //     const collections = await client.fetchCollectionsForUser(uid)
    //     console.log("fetched Collections", collections)
    //     dispatch(setCollectionsOwned(collections.collectionsOwned))
    //     dispatch(setCollectionsStarred(collections.collectionsStarred))
    //     dispatch(setCollectionsSavedBy(collections.collectionsSavedBy))
    //     console.log(collections.collectionsOwned[0])
    //     dispatch(setCollection(collections.collectionsOwned[0]));
    // }

    const fetchUserCollectionByID = async(collectionId?:string) => {
        const collection = await client.fetchCollectionsByID(collectionId)
        console.log("fetched Collections", collection);
        dispatch(setCollection(collection));
    }

    // const handleAddCollection = () => {
    //     client.createCollection(userId, collection).then((collection:any) => {
    //     console.log("Added collection from BE post creation", collection)
    //     dispatch(addCollection(collection));
    //     });
    // };

    useEffect(() => {
        fetchUserCollectionByID(collectionId);
    }, [])

    const clearCollection = () => dispatch(setCollection([]))

    const handleCreate = () => {
        setShowModal(false);
        clearCollection();
        // fetchModules(cid);
      };

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

    return (
        <div className="container mt-5">
            <h3>Collection Details</h3>
            <hr style={{width:"25%"}} />
            <div className="row pt-1">
                {/* Left column for updating user profile */}
                <div className="col-md-4 p-3">
                    <h2>{collection.collectionName}</h2>
                    <div className="pt-3">
                        <h4>Type: {collection.collectionType}</h4>
                    </div>
                    <div className="pt-3">
                        <h4>Collaborators: </h4>
                    </div>
                    <div className="pt-3">
                        <h4>Owner:{collection.owner} </h4>
                    </div>
                    <div className="pt-3">
                        <h4>Tags</h4>
                        {collection.collectionTags && collection.collectionTags.map((coll:any) => (
                            <button className="badge rounded-pill bg-dark" style={{marginRight:"3px", marginBottom:"3px"}}>{coll}</button>
                        ))}
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
                        {collectionsOwnedList && collectionsOwnedList.map((repo:any) => (
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