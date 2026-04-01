# Library Management System - React Frontend

A complete React frontend for the Library Management System backend.

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Features

### 📚 Book Management
- View all books in the library
- Add new books with title, author, and available copies
- Edit existing book information
- Delete books from the system

### 👥 Member Management
- View all registered members
- Register new members with name and email
- Manage member information

### 📖 Issue & Return
- Issue books to members
- Return books from members
- Automatic tracking of book availability

## Architecture

- **API Integration**: Axios for HTTP requests
- **State Management**: React Hooks (useState, useEffect)
- **UI Components**: Functional React components
- **Styling**: CSS with responsive design

## API Endpoints

The frontend communicates with the backend at `http://localhost:8085`

### Books
- `GET /books` - Get all books
- `POST /books` - Add a new book
- `PUT /books/{id}` - Update a book
- `DELETE /books/{id}` - Delete a book

### Members
- `GET /members` - Get all members
- `POST /members` - Register a member

### Issues
- `POST /issue` - Issue a book to a member
- `PUT /return/{id}` - Return a book

## File Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── BookManagement.js
│   │   ├── BookManagement.css
│   │   ├── MemberManagement.js
│   │   ├── MemberManagement.css
│   │   ├── IssueManagement.js
│   │   └── IssueManagement.css
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Running Both Frontend and Backend

1. Start the Java backend:
```bash
cd librarymanagementsystem
mvn spring-boot:run
```

2. In a new terminal, start the React frontend:
```bash
cd frontend
npm start
```

Both applications will run concurrently:
- Backend: http://localhost:8085
- Frontend: http://localhost:3000

## Troubleshooting

### CORS Errors
Ensure the backend has CORS configuration enabled for `http://localhost:3000`

### Backend Connection Issues
- Verify the backend is running on port 8085
- Check that the API URL in `src/services/api.js` is correct
- Ensure MySQL is running and the database is accessible

### Port Already in Use
If port 3000 is already in use, you can specify a different port:
```bash
PORT=3001 npm start
```
