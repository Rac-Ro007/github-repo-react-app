import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import './index.css';

export default function AboutUs() {
    return (
        <div className="container-fluid" style={{ marginTop: "150px" }}>
            <div className="container">
                <h2 className="text-center mb-4" style={{"color":"white"}}>Meet the Team Behind RepoC</h2>
                <div className="row justify-content-center">
                    <div className="col-md-4">

                        <div className="profile-card-1" style={{ height: "400px" }}>
                            <div className="profile-img" style={{ marginTop: "120px" }}>
                                <img src="/RajivShah.jpg" className="img img-responsive" alt="Profile Image" />
                            </div>
                            <div className="profile-content" style={{ marginTop: "140px" }}>
                                <div style={{ "color": "white" }} className="profile-name">Rajiv Shah</div>
                                <div className="profile-icons">
                                    <a href="https://www.linkedin.com/in/rajiv-shah17/" target="_blank"><i style={{ "fontSize": "25px", "color": "blue", "marginRight": "15px" }}><FaLinkedin /></i></a>
                                    <a href="https://github.com/RajivShah1798" target="_blank"><i style={{ "fontSize": "25px", "color": "green" }}><FaGithub /></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="profile-card-1" style={{ height: "400px" }}>
                            <div className="profile-img" style={{ marginTop: "120px" }}>
                                <img src="https://avatars.githubusercontent.com/u/40379806?v=4" className="img img-responsive" alt="Profile Image" />
                            </div>
                            <div className="profile-content" style={{ marginTop: "140px" }}>
                                <div style={{ "color": "white" }} className="profile-name">Ronak Vadhaiya</div>
                                <div className="profile-icons">
                                    <a href="https://www.linkedin.com/in/ronakvadhaiya/" target="_blank"><i style={{ "fontSize": "25px", "color": "blue", "marginRight": "15px" }}><FaLinkedin /></i></a>
                                    <a href="https://github.com/Rac-Ro007" target="_blank"><i style={{ "fontSize": "25px", "color": "green" }}><FaGithub /></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="profile-card-1" style={{ height: "400px" }}>
                            <div className="profile-img" style={{ marginTop: "120px" }}>
                                <img src="/coat-pic.png" className="img img-responsive" alt="Profile Image" />
                            </div>
                            <div className="profile-content" style={{ marginTop: "140px" }}>
                                <div style={{ "color": "white" }} className="profile-name">Sameer Ahire</div>
                                <div className="profile-icons">
                                    <a href="https://www.linkedin.com/in/sameer-ahire-31512b174/" target="_blank"><i style={{ "fontSize": "25px", "color": "blue", "marginRight": "15px" }}><FaLinkedin /></i></a>
                                    <a href="https://github.com/sameer6399" target="_blank"><i style={{ "fontSize": "25px", "color": "green" }}><FaGithub /></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}