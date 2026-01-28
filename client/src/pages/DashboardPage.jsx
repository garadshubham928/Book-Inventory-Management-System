import React, { useState, useEffect } from 'react';
import { Book, ShoppingBag, AlertCircle, TrendingUp } from 'lucide-react';
import { Row, Col, Card, Container, Spinner } from 'react-bootstrap';
import { getBooks } from '../services/api';

const DashboardPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await getBooks();
            setBooks(data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Stats Calculations
    const totalBooks = books.length;
    const totalStock = books.length * 10; // Mock stock logic
    const lowStock = books.length > 5 ? 5 : 0; // Mock
    const totalValue = books.reduce((acc, book) => acc + (book.price || 0), 0);

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <h2 className="fw-bold mb-4 text-primary">Dashboard Overview</h2>

            <Row className="g-4 mb-5">
                <Col md={3}>
                    <Card className="custom-card border-0 h-100 p-3">
                        <div className="d-flex align-items-center gap-3">
                            <div className="p-3 bg-primary bg-opacity-10 rounded-3 text-primary">
                                <Book size={24} />
                            </div>
                            <div>
                                <h6 className="text-muted mb-1 text-uppercase small fw-bold">Total Books</h6>
                                <h3 className="fw-bold mb-0">{totalBooks}</h3>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="custom-card border-0 h-100 p-3">
                        <div className="d-flex align-items-center gap-3">
                            <div className="p-3 bg-warning bg-opacity-10 rounded-3 text-warning">
                                <AlertCircle size={24} />
                            </div>
                            <div>
                                <h6 className="text-muted mb-1 text-uppercase small fw-bold">Low Stock</h6>
                                <h3 className="fw-bold mb-0">{lowStock}</h3>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="custom-card border-0 h-100 p-3">
                        <div className="d-flex align-items-center gap-3">
                            <div className="p-3 bg-success bg-opacity-10 rounded-3 text-success">
                                <ShoppingBag size={24} />
                            </div>
                            <div>
                                <h6 className="text-muted mb-1 text-uppercase small fw-bold">In Stock</h6>
                                <h3 className="fw-bold mb-0">{totalStock}</h3>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="custom-card border-0 h-100 p-3">
                        <div className="d-flex align-items-center gap-3">
                            <div className="p-3 bg-info bg-opacity-10 rounded-3 text-info">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <h6 className="text-muted mb-1 text-uppercase small fw-bold">Total Value</h6>
                                <h3 className="fw-bold mb-0">${totalValue.toFixed(2)}</h3>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Maybe a Recent Activity Section later */}
        </Container>
    );
};

export default DashboardPage;
