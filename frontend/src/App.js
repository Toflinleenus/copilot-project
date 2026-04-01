import React, { useState, useEffect } from 'react';
import { FiBook, FiUsers, FiRotateCw, FiCheckCircle, FiFilter } from 'react-icons/fi';
import BookManagement from './components/BookManagement';
import MemberManagement from './components/MemberManagement';
import IssueManagement from './components/IssueManagement';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('books');
  const [bookUpdate, setBookUpdate] = useState(0);
  const [memberUpdate, setMemberUpdate] = useState(0);

  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <div className="header-title-section">
            <h1>
              <FiBook size={36} />
              Library Management System
            </h1>
            <div className="header-subtitle">
              <p>Your complete solution for seamless library operations</p>
              <div className="subtitle-features">
                <span className="feature-badge">
                  <FiBook size={14} />
                  Manage Books
                </span>
                <span className="feature-separator">•</span>
                <span className="feature-badge">
                  <FiUsers size={14} />
                  Track Members
                </span>
                <span className="feature-separator">•</span>
                <span className="feature-badge">
                  <FiRotateCw size={14} />
                  Issue & Return
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className="nav-tabs">
        <button
          className={`nav-btn ${activeTab === 'books' ? 'active' : ''}`}
          onClick={() => setActiveTab('books')}
        >
          <FiBook size={18} />
          Books
        </button>
        <button
          className={`nav-btn ${activeTab === 'members' ? 'active' : ''}`}
          onClick={() => setActiveTab('members')}
        >
          <FiUsers size={18} />
          Members
        </button>
        <button
          className={`nav-btn ${activeTab === 'issues' ? 'active' : ''}`}
          onClick={() => setActiveTab('issues')}
        >
          <FiRotateCw size={18} />
          Issue & Return
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'books' && <BookManagement onBookUpdate={() => setBookUpdate(bookUpdate + 1)} />}
        {activeTab === 'members' && <MemberManagement onMemberUpdate={() => setMemberUpdate(memberUpdate + 1)} />}
        {activeTab === 'issues' && <IssueManagement bookUpdate={bookUpdate} memberUpdate={memberUpdate} />}
      </main>

      <footer className="footer">
        <p>&copy; 2024 Library Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
