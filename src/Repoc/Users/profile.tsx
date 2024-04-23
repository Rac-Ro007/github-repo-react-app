import { useState, useEffect } from "react";
import { ImGithub } from "react-icons/im";
import Modal from 'react-bootstrap/Modal';
import { SiTurborepo } from "react-icons/si";

const Profile = () => {
    // State variables to manage user profile information
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

    // Function to handle form submission for updating user profile
    const handleSubmit = (event:any) => {
        event.preventDefault();
        // Logic to update user profile
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
                            {repos.map((repo:any) => (
                            <div className="col-md-6 mb-2">
                                <div className="card repo-card p-3 mb-2" key={repo.id}>
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex flex-row align-items-center">
                                            <div className="icon"> <SiTurborepo color="black"/> </div>
                                            <div className="ms-2 c-details">
                                                <h6 className="mb-0">Collection</h6> <span>1 days ago</span>
                                            </div>
                                        </div>
                                        <div className="badge badge-secondary"> <span>{repo.language}</span> </div>
                                    </div>
                                    <div className="mt-3">
                                        <h3 className="heading">{repo.name}</h3>
                                        <p>{repo.description}</p>
                                    </div>
                                </div>
                             </div>
                            ))}
                        </div>
                        </div>
                    )}
                    {activeTab === 'Starred' && 
                        <div>Starred content goes here</div>
                    }
                    {activeTab === 'Tags' && 
                        <div>Tags content goes here</div>
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

export default Profile;