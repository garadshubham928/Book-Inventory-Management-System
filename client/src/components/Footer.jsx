import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-top py-5 mt-auto">
            <Container>
                <Row className="g-4 justify-content-between">
                    <Col md={4}>
                        <h5 className="fw-bold text-primary mb-3">BookInventory</h5>
                        <p className="text-muted small">
                            Manage your book collection with ease. Track inventory, sales, and more in one place.
                        </p>
                    </Col>
                    <Col md={4} className="text-md-end">
                        <h6 className="fw-bold mb-3">Connect</h6>
                        <div className="d-flex gap-3 justify-content-md-end">
                            <a href="#" className="text-muted hover-text-primary transition-colors">
                                <Github size={20} />
                            </a>
                            <a href="#" className="text-muted hover-text-primary transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-muted hover-text-primary transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                        <p className="text-muted small mt-3 mb-0">
                            &copy; {new Date().getFullYear()} BookInventory. All rights reserved.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
