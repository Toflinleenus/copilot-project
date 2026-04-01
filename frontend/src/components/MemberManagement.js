import React, { useState, useEffect } from 'react';
import { FiUsers, FiPlus, FiEdit2, FiTrash2, FiAlertCircle, FiCheckCircle, FiLoader, FiMail } from 'react-icons/fi';
import { memberAPI } from '../services/api';
import './MemberManagement.css';

const MemberManagement = ({ onMemberUpdate }) => {
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await memberAPI.getAllMembers();
      setMembers(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch members');
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
    if (!formData.name || !formData.email) {
      setError('All fields are required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      if (editingId) {
        await memberAPI.updateMember(editingId, formData);
        setSuccess('Member updated successfully');
      } else {
        await memberAPI.registerMember(formData);
        setSuccess('Member registered successfully');
      }
      setFormData({ name: '', email: '' });
      setEditingId(null);
      setError('');
      fetchMembers();
      onMemberUpdate?.();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save member');
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleEdit = (member) => {
    setFormData({
      name: member.name,
      email: member.email,
    });
    setEditingId(member.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await memberAPI.deleteMember(id);
        setSuccess('Member deleted successfully');
        fetchMembers();
        onMemberUpdate?.();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete member');
        setTimeout(() => setError(''), 5000);
      }
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', email: '' });
    setEditingId(null);
    setError('');
  };

  return (
    <div className="member-management">
      <h2><FiUsers size={28} /> Member Management</h2>

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

      <form onSubmit={handleSubmit} className="member-form">
        <h3>{editingId ? <><FiEdit2 /> Edit Member</> : <><FiPlus /> Register New Member</>}</h3>
        <div className="form-group">
          <label>Member Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., John Doe"
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="e.g., john@example.com"
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            <FiPlus />
            {editingId ? 'Update Member' : 'Register Member'}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="members-list">
        <h3><FiUsers /> All Members</h3>
        {loading ? (
          <div className="loading">
            <FiLoader className="loading-spinner" />
            <p>Loading members...</p>
          </div>
        ) : members.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><FiUsers /></div>
            <p>No members registered. Add your first member!</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>#{member.id}</td>
                  <td><strong>{member.name}</strong></td>
                  <td><FiMail size={14} style={{display: 'inline', marginRight: '6px'}} />{member.email}</td>
                  <td>
                    <button onClick={() => handleEdit(member)} className="btn btn-edit btn-sm">
                      <FiEdit2 />
                      Edit
                    </button>
                    <button onClick={() => handleDelete(member.id)} className="btn btn-delete btn-sm">
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

export default MemberManagement;
