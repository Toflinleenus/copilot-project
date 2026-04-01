import React, { useState, useEffect } from 'react';
import { FiRotateCw, FiAlertCircle, FiCheckCircle, FiLoader, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { bookAPI, memberAPI, issueAPI } from '../services/api';
import './IssueManagement.css';

const IssueManagement = ({ bookUpdate, memberUpdate }) => {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [issues, setIssues] = useState([]);
  const [formData, setFormData] = useState({ bookId: '', memberId: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchData();
  }, [bookUpdate, memberUpdate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [booksRes, membersRes, issuesRes] = await Promise.all([
        bookAPI.getAllBooks(),
        memberAPI.getAllMembers(),
        issueAPI.getAllIssues(),
      ]);
      setBooks(booksRes.data);
      setMembers(membersRes.data);
      setIssues(issuesRes.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIssueBook = async (e) => {
    e.preventDefault();
    if (!formData.bookId || !formData.memberId) {
      setError('Please select both book and member');
      return;
    }

    try {
      await issueAPI.issueBook(parseInt(formData.bookId), parseInt(formData.memberId));
      setSuccess('Book issued successfully');
      setFormData({ bookId: '', memberId: '' });
      setError('');
      fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data || 'Failed to issue book';
      setError(typeof errorMsg === 'object' ? JSON.stringify(errorMsg) : errorMsg);
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleReturnBook = async (issueRecordId) => {
    try {
      await issueAPI.returnBook(issueRecordId);
      setSuccess('Book returned successfully');
      setError('');
      fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data || 'Failed to return book';
      setError(typeof errorMsg === 'object' ? JSON.stringify(errorMsg) : errorMsg);
      setTimeout(() => setError(''), 5000);
    }
  };

  const availableBooks = books.filter((book) => book.availableCopies > 0);
  const issuedBooks = issues.filter((issue) => issue.status === 'ISSUED');
  const returnedBooks = issues.filter((issue) => issue.status === 'RETURNED');

  return (
    <div className="issue-management">
      <h2><FiRotateCw size={28} /> Book Issue & Return</h2>

      {error && (
        <div className="alert alert-error">
          <FiAlertCircle size={18} />
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success">
          <FiCheckCircle size={18} />
          {success}
        </div>
      )}

      <form onSubmit={handleIssueBook} className="issue-form">
        <h3><FiArrowRight /> Issue a Book</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Select Book</label>
            <select name="bookId" value={formData.bookId} onChange={handleInputChange}>
              <option value="">Choose a book...</option>
              {availableBooks.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title} by {book.author} ({book.availableCopies} available)
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Select Member</label>
            <select name="memberId" value={formData.memberId} onChange={handleInputChange}>
              <option value="">Choose a member...</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name} ({member.email})
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          <FiArrowRight />
          Issue Book
        </button>
      </form>

      <div className="issues-container">
        <div className="issued-books">
          <h3><FiArrowRight /> Issued Books ({issuedBooks.length})</h3>
          {loading ? (
            <div className="loading">
              <FiLoader className="loading-spinner" />
              <p>Loading...</p>
            </div>
          ) : issuedBooks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon"><FiRotateCw /></div>
              <p>No books currently issued</p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Book Title</th>
                  <th>Author</th>
                  <th>Member Name</th>
                  <th>Member Email</th>
                  <th>Issue Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {issuedBooks.map((issue) => (
                  <tr key={issue.id}>
                    <td><strong>{issue.book.title}</strong></td>
                    <td>{issue.book.author}</td>
                    <td>{issue.member.name}</td>
                    <td>{issue.member.email}</td>
                    <td>{issue.issueDate}</td>
                    <td><span className="status-badge issued">{issue.status}</span></td>
                    <td>
                      <button
                        onClick={() => handleReturnBook(issue.id)}
                        className="btn btn-return"
                      >
                        <FiArrowLeft />
                        Return
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="returned-books">
          <h3><FiArrowLeft /> Returned Books ({returnedBooks.length})</h3>
          {loading ? (
            <div className="loading">
              <FiLoader className="loading-spinner" />
              <p>Loading...</p>
            </div>
          ) : returnedBooks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon"><FiRotateCw /></div>
              <p>No books have been returned yet</p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Book Title</th>
                  <th>Author</th>
                  <th>Member Name</th>
                  <th>Issue Date</th>
                  <th>Return Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {returnedBooks.map((issue) => (
                  <tr key={issue.id}>
                    <td><strong>{issue.book.title}</strong></td>
                    <td>{issue.book.author}</td>
                    <td>{issue.member.name}</td>
                    <td>{issue.issueDate}</td>
                    <td>{issue.returnDate}</td>
                    <td><span className="status-badge returned">{issue.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueManagement;
