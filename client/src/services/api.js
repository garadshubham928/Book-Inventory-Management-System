import apiClient from './apiClient';

export const getBooks = async () => {
    const response = await apiClient.get('/books');
    return response.data;
};

export const getBook = async (id) => {
    const response = await apiClient.get(`/books/${id}`);
    return response.data;
};

export const createBook = async (bookData) => {
    // Axios automatically handles Content-Type for FormData vs JSON
    const response = await apiClient.post('/books', bookData);
    return response.data;
};

export const updateBook = async (id, bookData) => {
    const response = await apiClient.put(`/books/${id}`, bookData);
    return response.data;
};

export const deleteBook = async (id) => {
    const response = await apiClient.delete(`/books/${id}`);
    return response.data;
};

