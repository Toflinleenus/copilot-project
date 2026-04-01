# Library Management System - Full Stack

A complete end-to-end library management application with Spring Boot backend and React frontend.

## 📋 Project Structure

```
librarymanagementsystem/          # Backend (Spring Boot)
├── src/
│   ├── main/java/...            # Java source code
│   ├── test/java/...            # Unit tests
│   └── resources/                # Application properties
├── pom.xml                        # Maven configuration
└── mvnw                           # Maven wrapper

frontend/                         # Frontend (React)
├── src/
│   ├── components/              # React components
│   ├── services/                # API integration
│   ├── App.js                   # Main app component
│   └── index.js                 # React entry point
└── package.json                 # NPM dependencies

setup.bat                         # One-click setup script (Windows)
```

## 🚀 Quick Start

### Option 1: Automated Setup (Windows)
Simply double-click `setup.bat` to start both backend and frontend automatically.

### Option 2: Manual Setup

#### Prerequisites
- Java 11+ (for backend)
- Node.js 14+ (for frontend)
- MySQL Server running
- Maven (or use mvn wrapper included)

#### Step 1: Start Backend
```bash
cd librarymanagementsystem
mvn spring-boot:run
```
Backend runs on: `http://localhost:8085`

#### Step 2: Start Frontend (in a new terminal)
```bash
cd frontend
npm install
npm start
```
Frontend runs on: `http://localhost:3000`

## 🎨 Features

### Book Management
- ✅ Add new books
- ✅ View all books
- ✅ Edit book details
- ✅ Delete books
- ✅ Track available copies

### Member Management
- ✅ Register new members
- ✅ View all members
- ✅ Email validation

### Issue & Return
- ✅ Issue books to members
- ✅ Return books
- ✅ Automatic availability tracking

## 🔧 Technical Stack

### Backend
- **Framework**: Spring Boot 3.x
- **Database**: MySQL
- **Build Tool**: Maven
- **Java**: 11+

### Frontend
- **Library**: React 18
- **HTTP Client**: Axios
- **Styling**: CSS3
- **Package Manager**: npm

## 📱 UI Components

1. **BookManagement** - Complete CRUD operations for books
2. **MemberManagement** - Register and view members
3. **IssueManagement** - Issue and return books

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/books` | Get all books |
| POST | `/books` | Add new book |
| PUT | `/books/{id}` | Update book |
| DELETE | `/books/{id}` | Delete book |
| GET | `/members` | Get all members |
| POST | `/members` | Register member |
| POST | `/issue` | Issue book |
| PUT | `/return/{id}` | Return book |

## 🛠️ Configuration

### Backend Configuration
- Port: 8085
- Database: lms (auto-created)
- File: `librarymanagementsystem/src/main/resources/application.properties`

### Frontend Configuration
- Port: 3000
- API URL: http://localhost:8085
- File: `frontend/src/services/api.js`

## 📝 Database

The MySQL database is automatically created on first run with:
- `books` table
- `members` table
- `issue_records` table

## 🧪 Testing

Backend includes unit tests:
```bash
cd librarymanagementsystem
mvn test
```

## 🐛 Troubleshooting

### CORS Error
- Ensure backend CORS config includes `http://localhost:3000`
- Backend has `CorsConfig.java` pre-configured

### Backend Connection Failed
- Check MySQL is running
- Verify port 8085 is available
- Check credentials in `application.properties`

### Port Already in Use
```bash
# Run frontend on different port
PORT=3001 npm start
```

### Module Not Found
```bash
# Reinstall dependencies
cd frontend
rm -rf node_modules
npm install
```

## 📚 Project Guide

1. **Start the backend first** - It initializes the database
2. **Then start the frontend** - React app will connect to backend
3. **Create sample data** - Add books and members through UI
4. **Test issue/return** - Verify book availability tracking

## 📄 License

This project is for educational purposes.

---

**Need help?** Check the README.md files in each directory (backend and frontend) for detailed information.
