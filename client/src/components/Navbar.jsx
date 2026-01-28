import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BookOpen, User, Search } from 'lucide-react';
import { Navbar as BNavbar, Container, Nav, Form, InputGroup } from 'react-bootstrap';

const Navbar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get('search') || '';

    const handleSearch = (e) => {
        const value = e.target.value;
        if (value) {
            setSearchParams({ search: value });
        } else {
            setSearchParams({});
        }
    };

    return (
        <BNavbar expand="lg" className="custom-navbar py-3" sticky="top">
            <Container>
                <BNavbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 text-white fw-bold">
                    <BookOpen size={24} className="text-primary" />
                    <span className="fs-4">BookInventory</span>
                </BNavbar.Brand>

                <BNavbar.Toggle aria-controls="basic-navbar-nav" className="border-0 bg-secondary opacity-75" />

                <BNavbar.Collapse id="basic-navbar-nav">
                    <div className="mx-auto my-3 my-lg-0 w-100" style={{ maxWidth: '400px' }}>
                        <InputGroup>
                            <InputGroup.Text className="bg-white border-end-0">
                                <Search size={18} className="text-muted" />
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Search books..."
                                className="border-start-0"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </InputGroup>
                    </div>

                    <Nav className="ms-auto align-items-center gap-3">
                        <Nav.Link as={Link} to="/dashboard" className="fw-medium text-white opacity-75 hover-opacity-100">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/" className="fw-bold text-white opacity-100">Inventory</Nav.Link>
                    </Nav>
                </BNavbar.Collapse>
            </Container>
        </BNavbar>
    );
};

export default Navbar;
