import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

const BookForm = ({ book, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        publishedDate: '',
        publisher: '',
        description: '',
        price: '',
        genre: '',
        image: ''
    });

    useEffect(() => {
        if (book) {
            setFormData({
                ...book,
                publishedDate: book.publishedDate ? book.publishedDate.split('T')[0] : '',
                price: book.price || ''
            });
        } else {
            setFormData({
                title: '',
                author: '',
                publishedDate: '',
                publisher: '',
                description: '',
                price: '',
                genre: '',
                image: ''
            });
        }
    }, [book, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const dataToSubmit = new FormData();
        dataToSubmit.append('title', formData.title);
        dataToSubmit.append('author', formData.author);
        dataToSubmit.append('publishedDate', new Date(formData.publishedDate).toISOString());
        dataToSubmit.append('publisher', formData.publisher);
        dataToSubmit.append('description', formData.description);
        dataToSubmit.append('price', formData.price ? parseFloat(formData.price) : 0);
        dataToSubmit.append('genre', formData.genre);

        if (formData.image instanceof File) {
            dataToSubmit.append('image', formData.image);
        } else if (typeof formData.image === 'string' && formData.image) {
        }

        onSave(dataToSubmit);
    };

    return (
        <Modal show={isOpen} onHide={onClose} size="lg" centered backdrop="static" className="fade-in">
            <Modal.Header closeButton className="border-bottom-0">
                <Modal.Title>{book ? 'Edit Book' : 'Add New Book'}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body className="py-0">
                    <Row className="g-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Title <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    required
                                    placeholder="Book Title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Author <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="author"
                                    required
                                    placeholder="Author Name"
                                    value={formData.author}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Publisher <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="publisher"
                                    required
                                    placeholder="Publisher Name"
                                    value={formData.publisher}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Published Date <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="date"
                                    name="publishedDate"
                                    required
                                    value={formData.publishedDate}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Price ($)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    min="0" step="0.01"
                                    placeholder="0.00"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Genre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="genre"
                                    placeholder="Fiction, Sci-Fi..."
                                    value={formData.genre}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group>
                                <Form.Label>Book Cover Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                {typeof formData.image === 'string' && formData.image && (
                                    <div className="mt-2 text-muted small">
                                        Current Image: <a href={formData.image} target="_blank" rel="noopener noreferrer">View</a>
                                    </div>
                                )}
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.Label>Description <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    name="description"
                                    required
                                    placeholder="Book summary..."
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className="border-top-0">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="primary" type="submit" className="d-flex align-items-center gap-2">
                        <Save size={18} /> Save Book
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default BookForm;
