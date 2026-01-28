import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Table, Button, Badge } from 'react-bootstrap';

const BookTable = ({ books, onDelete, onEdit }) => {
    return (
        <div className="table-responsive rounded-4 shadow-sm border bg-white">
            <Table hover className="mb-0 align-middle">
                <thead className="bg-light text-secondary small text-uppercase fw-bold">
                    <tr>
                        <th className="py-3 px-3 border-bottom-0">Cover</th>
                        <th className="py-3 px-3 border-bottom-0">Book Title</th>
                        <th className="py-3 px-3 border-bottom-0">Author</th>
                        <th className="py-3 px-3 border-bottom-0">Genre</th>
                        <th className="py-3 px-3 border-bottom-0">Price</th>
                        <th className="py-3 px-3 border-bottom-0">Status</th>
                        <th className="py-3 px-3 border-bottom-0 text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book._id}>
                            <td className="px-3 py-2">
                                {book.image ? (
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="rounded shadow-sm object-fit-cover"
                                        style={{ width: '60px', height: '90px' }}
                                    />
                                ) : (
                                    <div className="bg-light rounded d-flex align-items-center justify-content-center text-muted border" style={{ width: '60px', height: '90px', fontSize: '2rem' }}>
                                        📚
                                    </div>
                                )}
                            </td>
                            <td className="px-3 py-2">
                                <div className="fw-bold text-dark mb-1">{book.title}</div>
                                <div className="small text-muted">{book.publisher}</div>
                            </td>
                            <td className="px-3 py-2 text-secondary fw-medium">{book.author}</td>
                            <td className="px-3 py-2">
                                <Badge bg="light" text="dark" className="border fw-normal px-2 py-1">
                                    {book.genre || 'General'}
                                </Badge>
                            </td>
                            <td className="px-3 py-2 fw-bold text-dark font-monospace">
                                ${book.price ? book.price.toFixed(2) : '0.00'}
                            </td>
                            <td className="px-3 py-2">
                                <Badge bg="success" className="bg-opacity-10 text-success px-2 py-1 rounded-pill fw-semibold border border-success border-opacity-25">
                                    In Stock
                                </Badge>
                            </td>
                            <td className="px-3 py-2 text-end">
                                <div className="d-flex justify-content-end gap-1">
                                    <Link to={`/books/${book._id}`} className="btn btn-sm btn-light text-secondary rounded-circle p-2 hover-bg-gray">
                                        <Eye size={16} />
                                    </Link>
                                    <Button variant="light" size="sm" className="text-primary rounded-circle p-2 hover-bg-blue" onClick={() => onEdit(book)}>
                                        <Edit size={16} />
                                    </Button>
                                    <Button variant="light" size="sm" className="text-danger rounded-circle p-2 hover-bg-red" onClick={() => onDelete(book._id)}>
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default BookTable;
