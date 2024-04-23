import { useState, useEffect } from "react";
import { ImGithub } from "react-icons/im";
import { SiTurborepo } from "react-icons/si";

const Profile = () => {
    // State variables to manage user profile information
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    // Add more state variables as needed

    // State variable to manage the active tab
    const [activeTab, setActiveTab] = useState('Collections');

    const [repo, setRepo] = useState<any>({})

    // Function to handle form submission for updating user profile
    const handleSubmit = (event:any) => {
        event.preventDefault();
        // Logic to update user profile
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Left column for updating user profile */}
                <div className="col-md-6">
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
                <div className="col-md-6">
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
                    {activeTab === 'Collections' && 
                        <div className="card repo-card p-3 mb-2" key={repo.id}>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex flex-row align-items-center">
                                    <div className="icon"> <SiTurborepo color="black"/> </div>
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
                    }
                    {activeTab === 'Starred' && 
                        <div>Starred content goes here</div>
                    }
                    {activeTab === 'Tags' && 
                        <div>Tags content goes here</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Profile;