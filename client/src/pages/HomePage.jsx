import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, LayoutGrid, List as ListIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Row, Col, Button, Form, InputGroup, Container, Alert, Card, Pagination } from 'react-bootstrap';
import { getBooks, createBook, updateBook, deleteBook } from '../services/api';
import BookCard from '../components/BookCard';
import BookTable from '../components/BookTable';
import BookForm from '../components/BookForm';

const HomePage = () => {
    const [books, setBooks] = useState([]);
    // View mode removed, defaulting to list view
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [loading, setLoading] = useState(true);

    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('search') || '';

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const data = await getBooks();
            setBooks(data);
        } catch (error) {
            console.error('Failed to fetch books:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (bookData) => {
        try {
            if (editingBook) {
                await updateBook(editingBook._id, bookData);
                toast.success('Book updated successfully');
            } else {
                await createBook(bookData);
                toast.success('Book added successfully');
            }
            setIsModalOpen(false);
            setEditingBook(null);
            fetchBooks();
        } catch (error) {
            console.error('Failed to save book:', error);
            toast.error('Error saving book');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await deleteBook(id);
                toast.success('Book deleted');
                fetchBooks();
            } catch (error) {
                console.error('Failed to delete book:', error);
                toast.error('Failed to delete book');
            }
        }
    };

    const handleEdit = (book) => {
        setEditingBook(book);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingBook(null);
        setIsModalOpen(true);
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Container fluid className="px-4 pb-4">
            {/* Hero / Banner Area */}
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-between p-4 my-3 bg-white rounded-4 shadow-sm border">
                <div>
                    <h2 className="fw-bold mb-1 text-primary">Book Inventory</h2>
                    <p className="text-muted mb-0 small">Manage your entire catalog from here.</p>
                </div>
                <div className="mt-3 mt-md-0">
                    <Button variant="primary" className="fw-bold d-flex align-items-center gap-2 shadow-sm" onClick={handleAddNew}>
                        <Plus size={18} />
                        Add New Book
                    </Button>
                </div>
            </div>

            <Row className="g-4">
                {/* Main Content Area */}
                <Col lg={12}>
                    <Card className="custom-card border-0 shadow-sm rounded-4">
                        <Card.Header className="bg-transparent border-0 p-3 d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <h5 className="fw-bold mb-0 text-secondary">Book List</h5>

                            <div className="d-flex gap-3 flex-grow-1 justify-content-end" style={{ maxWidth: '600px' }}>
                                {/* Search moved to Navbar */}
                            </div>
                        </Card.Header>
                        <Card.Body className="p-3 pt-0">
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status"></div>
                                </div>
                            ) : filteredBooks.length === 0 ? (
                                <div className="text-center py-5 text-muted">No books found.</div>
                            ) : (
                                <>
                                    <BookTable
                                        books={currentBooks}
                                        onDelete={handleDelete}
                                        onEdit={handleEdit}
                                    />

                                    {totalPages > 1 && (
                                        <div className="d-flex justify-content-center mt-4">
                                            <Pagination>
                                                <Pagination.Prev
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                />
                                                {[...Array(totalPages)].map((_, idx) => (
                                                    <Pagination.Item
                                                        key={idx + 1}
                                                        active={idx + 1 === currentPage}
                                                        onClick={() => handlePageChange(idx + 1)}
                                                    >
                                                        {idx + 1}
                                                    </Pagination.Item>
                                                ))}
                                                <Pagination.Next
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    disabled={currentPage === totalPages}
                                                />
                                            </Pagination>
                                        </div>
                                    )}
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row >

            <BookForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                book={editingBook}
            />
        </Container >
    );
};

export default HomePage;
