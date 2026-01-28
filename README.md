# Book Inventory Management System

A full-stack (MERN) application designed to manage a book inventory with ease. This system allows users to track stock, view detailed book information, and manage inventory through an intuitive dashboard.

## 🚀 Features

- **Dashboard Overview**: Metrics for Total Books, Low Stock, In Stock, and Total Value.
- **Inventory Management**: Add, Edit, Delete, and View book details.
- **Search System**: Real-time search functionality for books.
- **Responsive Design**: Modern, responsive UI built with React and Bootstrap.
- **Image Upload**: Support for uploading book cover images.

## 🛠️ Tech Stack

### Frontend
- **React** (Vite)
- **Bootstrap 5** (Styling)
- **Axios** (API Requests)
- **React Router** (Navigation)

### Backend
- **Node.js** & **Express**
- **MongoDB** (Database)
- **Mongoose** (ODM)
- **Multer** (File Uploads)

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas)

---

## ⚙️ Installation & Setup

Follow these steps to set up the project locally.

### 1. Clone the Repository
```bash
git clone <repository_url>
cd BookLab
```

### 2. Backend Setup
Navigate to the server directory and install dependencies.

```bash
cd server
npm install
```

**Start the Server**
```bash
npm start
# or for development with nodemon:
npm run dev
```
The server will run on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal, navigate to the client directory, and install dependencies.

```bash
cd client
npm install
```

**Configure Environment Variables**
Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

**Start the Client**
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

---


## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request.

## 📄 License

This project is licensed under the MIT License.
