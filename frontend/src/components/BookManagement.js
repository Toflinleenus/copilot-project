import React, { useState, useEffect } from 'react';
import { FiBook, FiPlus, FiEdit2, FiTrash2, FiAlertCircle, FiCheckCircle, FiLoader } from 'react-icons/fi';
import { bookAPI } from '../services/api';
import './BookManagement.css';

const BookManagement = ({ onBookUpdate }) => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({ title: '', author: '', availableCopies: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await bookAPI.getAllBooks();
      setBooks(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch books');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author || formData.availableCopies === '') {
      setError('All fields are required');
      return;
    }

    try {
      const bookData = {
        title: formData.title,
        author: formData.author,
        availableCopies: parseInt(formData.availableCopies),
      };

      if (editingId) {
        await bookAPI.updateBook(editingId, bookData);
        setSuccess('Book updated successfully');
      } else {
        await bookAPI.addBook(bookData);
        setSuccess('Book added successfully');
      }

      setFormData({ title: '', author: '', availableCopies: '' });
      setEditingId(null);
      setError('');
      fetchBooks();
      onBookUpdate?.();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save book');
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleEdit = (book) => {
    setFormData({
      title: book.title,
      author: book.author,
      availableCopies: book.availableCopies,
    });
    setEditingId(book.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await bookAPI.deleteBook(id);
        setSuccess('Book deleted successfully');
        fetchBooks();
        onBookUpdate?.();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete book');
        setTimeout(() => setError(''), 5000);
      }
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', author: '', availableCopies: '' });
    setEditingId(null);
    setError('');
  };

  return (
    <div className="book-management">
      <h2><FiBook size={28} /> Book Management</h2>

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

      <form onSubmit={handleSubmit} className="book-form">
        <h3>{editingId ? <><FiEdit2 /> Edit Book</> : <><FiPlus /> Add New Book</>}</h3>
        <div className="form-group">
          <label>Book Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., The Great Gatsby"
          />
        </div>
        <div className="form-group">
          <label>Author Name</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            placeholder="e.g., F. Scott Fitzgerald"
          />
        </div>
        <div className="form-group">
          <label>Available Copies</label>
          <input
            type="number"
            name="availableCopies"
            value={formData.availableCopies}
            onChange={handleInputChange}
            placeholder="Enter number of copies"
            min="0"
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            <FiPlus />
            {editingId ? 'Update Book' : 'Add Book'}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="books-list">
        <h3><FiBook /> All Books</h3>
        {loading ? (
          <div className="loading">
            <FiLoader className="loading-spinner" />
            <p>Loading books...</p>
          </div>
        ) : books.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><FiBook /></div>
            <p>No books available. Add your first book!</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Available Copies</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>#{book.id}</td>
                  <td><strong>{book.title}</strong></td>
                  <td>{book.author}</td>
                  <td><strong>{book.availableCopies}</strong></td>
                  <td>
                    <button onClick={() => handleEdit(book)} className="btn btn-edit btn-sm">
                      <FiEdit2 />
                      Edit
                    </button>
                    <button onClick={() => handleDelete(book.id)} className="btn btn-delete btn-sm">
                      <FiTrash2 />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BookManagement;
