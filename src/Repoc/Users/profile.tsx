import { useState, useEffect } from "react";
import { ImGithub } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import { SiTurborepo } from "react-icons/si";
import axios from "axios";
import * as client from './client';
import { RepocState } from "../../store";
import { useParams } from "react-router";
import { addCollection, deleteCollection, setCollectionsOwned, setCollectionsSavedBy, setCollectionsStarred, 
         updateCollection, setCollection } from "./reducer";

const Profile = () => {
    // State variables to manage user profile information
    const { userId } = useParams();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    // Add more state variables as needed

    // State variable to manage the active tab
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
    
    const fetchUserCollections = async(uid?:string) => {
        const collections = await client.fetchCollectionsForUser(uid)
        console.log("fetched Collections", collections)
        dispatch(setCollectionsOwned(collections.collectionsOwned))
        dispatch(setCollectionsStarred(collections.collectionsStarred))
        dispatch(setCollectionsSavedBy(collections.collectionsSavedBy))
        // setModuleList(modules)
    }

    const handleAddCollection = () => {
        client.createCollection(userId, collection).then((collection:any) => {
        console.log("Added collection from BE post creation", collection)
        dispatch(addCollection(collection));
        });
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

    useEffect(() => {
        fetchUserCollections(userId);
    }, [])

    const clearCollection = () => dispatch(setCollection([]))

    const handleCreate = () => {
        handleAddCollection();
        setShowModal(false);
        clearCollection();
        // fetchModules(cid);
      };

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Left column for updating user profile */}
                <div className="col-md-6 p-3">
                    <h2>Update Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">User Name</label>
                            <input type="text" className="form-control" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {/* Add more input fields for other profile information */}
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
                {/* Right column for tabs */}
                <div className="col-md-6 p-3">
                    {/* <h2>Tabs</h2> */}
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <button className={`nav-link ${activeTab === 'Collections' ? 'active' : ''}`} onClick={() => setActiveTab('Collections')}>Collections</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${activeTab === 'Starred' ? 'active' : ''}`} onClick={() => setActiveTab('Starred')}>Starred</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${activeTab === 'Tags' ? 'active' : ''}`} onClick={() => setActiveTab('Tags')}>Tags</button>
                        </li>
                    </ul>
                    {/* Render content based on active tab */}
                    {activeTab === 'Collections' && (
                        <div className="container pt-2">
                            <div className="d-flex justify-content-between pb-2">
                                <h3>Your Collections</h3>
                                <button className="btn btn-primary" onClick={() => setShowModal(true)}>New Collectiom</button>
                            </div>
                            <div className="row">
                                {collectionsOwnedList.length > 0 ? (collectionsOwnedList.map((repo:any) => (
                                <div className="col-md-6 mb-2">
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
                                        <ImGithub color="black" size={20}/>
                                        <h5>You dont have any collection</h5>
                                    </div>
                                )
                            } 
                            </div>
                        </div>
                    )}
                    {activeTab === 'Starred' && 
                    <div className="container pt-2">
                        <div className="d-flex justify-content-between pb-2">
                            <h3>Your Collections</h3>
                            <button className="btn btn-primary" onClick={() => setShowModal(true)}>New Collectiom</button>
                        </div>
                        <div className="row">
                            {collectionsStarredList?.length > 0 ? (collectionsStarredList.map((repo:any) => (
                            <div className="col-md-6 mb-2">
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
                                <div className="container text-center mt-5">
                                    <ImGithub color="grey" size={40}/>
                                    <h5>You dont have any collection</h5>
                                </div>
                            )
                        } 
                        </div>
                    </div>
                    }
                    {activeTab === 'Tags' && 
                        <div className="container pt-2">
                        <div className="d-flex justify-content-between pb-2">
                            <h3>Your Collections</h3>
                            <button className="btn btn-primary" onClick={() => setShowModal(true)}>New Collectiom</button>
                        </div>
                        <div className="row">
                            {collectionsSavedByList?.length > 0 ? (collectionsSavedByList.map((repo:any) => (
                            <div className="col-md-6 mb-2">
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
                                <div className="container text-center mt-5">
                                    <ImGithub color="grey" size={40}/>
                                    <h5>You dont have any collection</h5>
                                </div>
                            )
                        } 
                        </div>
                    </div>
                    }
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
                    <input className="form-control m-2" value={collection.collectionName}
                        placeholder="Enter Collection Name"
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
                    <input className="form-control m-2" value={collection.collectionTags}
                        placeholder="Enter Collection Tags"
                        onChange={(e) => dispatch(setCollection({ 
                            ...collection, collectionTags: [e.target.value] }))}
                    />
                    </div>
                    <div className="row m-2">
                    <div className="col-6">
                    <button className="btn btn-success w-100" onClick={handleCreate}>
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
    );
}

export default Profile;