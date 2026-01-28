import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // Fallback for dev
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
