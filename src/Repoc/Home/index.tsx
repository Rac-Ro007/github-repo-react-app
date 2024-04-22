import { Button, Col, Container, Row } from "react-bootstrap";
import { FaBan, FaCloudDownloadAlt, FaGithub, FaGithubAlt, FaHeadphones, FaMusic } from "react-icons/fa";
import './temp.css';

export default function Home() {
    return (
        <div style={{ "paddingTop": "250px" }}>
            <section className="hero-section text-center">
                <Container>
                    <Row>
                        <Col>
                            <h1 className="display-4 text-white mb-4">Welcome to RepoC <FaGithub /></h1>
                            <p className="lead text-white mb-4">Unify the World's Code: Merge Millions of Git Repositories into One Comprehensive Collection</p>
                            <Button variant="" style={{ "borderColor": "#2EA44F", "borderRadius": "50px", "color":"white" }} className="custom-button" size="lg" >Start Your Collection</Button>
                        </Col>
                    </Row>
                </Container>
            </section>


            {/* Features Section */}
            <section className="features-section py-5">
                <Container>
                    <Row className="justify-content-center align-items-center">
                        <Col md={6} lg={6} className="mb-4" >
                            <div className="feature-item text-center" style={{ color: "#f0f0f0" }}>
                                {/* Add neon effect class to feature icons */}
                                <h3 className="mt-3 mb-2">Unified Code Repository</h3>
                                <p>Access millions of Git repositories all in one place.</p>
                            </div>
                        </Col>
                        <Col md={6} lg={6} className="mb-4">
                            <div className="feature-item text-center" style={{ color: "white" }}>
                                <h3 className="mt-3 mb-2">Comprehensive Collection</h3>
                                <p>Explore a vast library of code from diverse sources.</p>
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center align-items-center">
                        <Col md={6} lg={6} className="mb-4">
                            <div className="feature-item text-center" style={{ color: "white" }}>
                                <h3 className="mt-3 mb-2">Share Collections</h3>
                                <p>Share tailored repo collections with your team.</p>
                            </div>
                        </Col>
                        <Col md={6} lg={6} className="mb-4">
                            <div className="feature-item text-center" style={{ color: "white" }}>
                                <h3 className="mt-3 mb-2">Ad-Free Experience</h3>
                                <p>Enjoy browsing through code without distractions.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
}