import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, BookOpen, Clock, Tag } from 'lucide-react';
import { Container, Row, Col, Badge, Button, Card, Spinner } from 'react-bootstrap';
import { getBook } from '../services/api';

const BookDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const data = await getBook(id);
                setBook(data);
            } catch (error) {
                console.error('Failed to fetch book details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-50 py-5">
                <Spinner animation="border" variant="primary" />
                <span className="ms-2 text-muted fade-in">Loading book details...</span>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="text-center py-5">
                <h2 className="mb-3">Book not found</h2>
                <Link to="/" className="btn btn-primary">Return to Library</Link>
            </div>
        );
    }

    return (
        <Container className="py-4">
            <Button
                variant="link"
                onClick={() => navigate(-1)}
                className="text-decoration-none text-muted p-0 mb-4 d-inline-flex align-items-center gap-2 fw-medium hover-underline"
            >
                <ArrowLeft size={20} /> Back to Library
            </Button>

            <Row className="g-4">
                {/* Left Column: Image/Main Info */}
                <Col lg={4}>
                    <Card className="custom-card border-0 mb-4 text-center p-4">
                        <div className="bg-light rounded-3 d-flex align-items-center justify-content-center mx-auto mb-4 overflow-hidden" style={{ width: '200px', height: '280px' }}>
                            {book.image ? (
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="w-100 h-100 object-fit-cover"
                                />
                            ) : (
                                <div className="text-center text-muted opacity-50">
                                    <div className="mb-2" style={{ fontSize: '4rem' }}>📚</div>
                                    <small>Book Cover</small>
                                </div>
                            )}
                        </div>
                        <h2 className="fw-bold mb-1">{book.title}</h2>
                        <p className="text-muted mb-3 fs-5">{book.author}</p>
                        <div className="d-flex justify-content-center gap-2 mb-4">
                            <Badge bg="primary" className="bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold">
                                {book.genre || 'General'}
                            </Badge>
                            <Badge bg="success" className="bg-opacity-10 text-success px-3 py-2 rounded-pill fw-semibold">
                                In Stock
                            </Badge>
                        </div>
                        <h1 className="display-5 fw-bold text-primary mb-0">
                            ${book.price ? book.price.toFixed(2) : '0.00'}
                        </h1>
                    </Card>

                    <Card className="custom-card border-0 p-3">
                        <h6 className="text-uppercase text-muted small fw-bold mb-3 border-bottom pb-2">Key Details</h6>
                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted d-flex align-items-center gap-2"><Tag size={16} /> Publisher</span>
                            <span className="fw-medium text-end">{book.publisher}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted d-flex align-items-center gap-2"><Calendar size={16} /> Published</span>
                            <span className="fw-medium">{new Date(book.publishedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span className="text-muted d-flex align-items-center gap-2"><BookOpen size={16} /> Format</span>
                            <span className="fw-medium">Hardcover</span>
                        </div>
                    </Card>
                </Col>

                {/* Right Column: Description/Stats */}
                <Col lg={8}>
                    <Card className="custom-card border-0 h-100 p-4">
                        <h4 className="fw-bold mb-3">About this Book</h4>
                        <p className="text-secondary leading-relaxed lh-lg mb-5">
                            {book.description}
                        </p>

                        <h5 className="fw-bold mb-3">Inventory Status</h5>
                        <Row className="g-3">
                            <Col sm={4}>
                                <div className="p-3 bg-light rounded-3 border text-center">
                                    <h3 className="fw-bold text-dark mb-0">120</h3>
                                    <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Total Copies</small>
                                </div>
                            </Col>
                            <Col sm={4}>
                                <div className="p-3 bg-light rounded-3 border text-center">
                                    <h3 className="fw-bold text-success mb-0">45</h3>
                                    <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Sold (This Month)</small>
                                </div>
                            </Col>
                            <Col sm={4}>
                                <div className="p-3 bg-light rounded-3 border text-center">
                                    <h3 className="fw-bold text-primary mb-0">4.8</h3>
                                    <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Avg Rating</small>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default BookDetailsPage;
