import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Card, Button, Badge } from 'react-bootstrap';

const BookCard = ({ book, onDelete, onEdit }) => {
    return (
        <Card className="custom-card h-100 border-0 overflow-hidden">
            <div className="card-img-top bg-light d-flex align-items-center justify-content-center overflow-hidden" style={{ height: '180px' }}>
                {book.image ? (
                    <img
                        src={book.image}
                        alt={book.title}
                        className="w-100 h-100 object-fit-cover"
                    />
                ) : (
                    <div className="text-center text-muted opacity-50">
                        <div className="mb-2" style={{ fontSize: '3rem' }}>📚</div>
                        <small>No Cover Image</small>
                    </div>
                )}
            </div>
            <Card.Body className="d-flex flex-column p-3">
                <div className="mb-2">
                    <Badge bg="primary" className="bg-opacity-10 text-primary fw-semibold px-2 py-1 rounded-1 mb-2 d-inline-block">
                        {book.genre || 'General'}
                    </Badge>
                    <Card.Title className="fw-bold fs-6 mb-0 text-truncate" title={book.title}>
                        {book.title}
                    </Card.Title>
                    <Card.Subtitle className="text-muted small mt-1">
                        By {book.author}
                    </Card.Subtitle>
                </div>

                <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-dark fs-5">
                        ${book.price ? book.price.toFixed(2) : '0.00'}
                    </span>
                    <div className="d-flex gap-1">
                        <Link to={`/books/${book._id}`} className="btn btn-sm btn-light border text-secondary" title="View">
                            <Eye size={16} />
                        </Link>
                        <Button variant="light" size="sm" className="border text-primary" onClick={() => onEdit(book)} title="Edit">
                            <Edit size={16} />
                        </Button>
                        <Button variant="light" size="sm" className="border text-danger" onClick={() => onDelete(book._id)} title="Delete">
                            <Trash2 size={16} />
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default BookCard;
