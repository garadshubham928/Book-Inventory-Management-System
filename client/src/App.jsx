import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import BookDetailsPage from './pages/BookDetailsPage';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-vh-100 d-flex flex-column">
          <Toaster position="top-right" toastOptions={{
            className: '',
            style: {
              background: 'var(--bs-body-bg)',
              color: 'var(--bs-body-color)',
              border: '1px solid var(--bs-border-color)'
            }
          }} />
          <Navbar />

          <Container className="py-4 flex-grow-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/books/:id" element={<BookDetailsPage />} />
            </Routes>
          </Container>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
