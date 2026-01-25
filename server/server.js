require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Database Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://garadshubham928_db_user:kBoL61fsy7nOr6XD@cluster0.oxxy3rw.mongodb.net/?appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

const bookRoutes = require('./routes/bookRoutes');

// Routes
app.use('/api/books', bookRoutes);

app.get('/', (req, res) => {
    res.send('BookLab API is running...');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
