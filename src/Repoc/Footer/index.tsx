import { Button, Col, Container, Row } from "react-bootstrap";
import './index.css';
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <div>
            <footer className="footer-section bg-black text-center py-2 fixed-bottom" style={{"opacity":"0.6"}}>
                <Container>
                    <Row>
                        <Col>
                            <p className="mb-0 text-white" style={{"opacity":"1.0"}}>&copy; 2024 RepoC. All rights reserved.</p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
}