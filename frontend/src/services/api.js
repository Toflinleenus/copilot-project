import axios from 'axios';

const API_BASE_URL = 'http://localhost:8085';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Book API
export const bookAPI = {
  getAllBooks: () => api.get('/books'),
  addBook: (book) => api.post('/books', book),
  updateBook: (id, book) => api.put(`/books/${id}`, book),
  deleteBook: (id) => api.delete(`/books/${id}`),
};

// Member API
export const memberAPI = {
  getAllMembers: () => api.get('/members'),
  registerMember: (member) => api.post('/members', member),
  updateMember: (id, member) => api.put(`/members/${id}`, member),
  deleteMember: (id) => api.delete(`/members/${id}`),
};

// Issue API
export const issueAPI = {
  getAllIssues: () => api.get('/issues'),
  issueBook: (bookId, memberId) => api.post('/issue', { bookId, memberId }),
  returnBook: (issueRecordId) => api.put(`/return/${issueRecordId}`),
};

export default api;
