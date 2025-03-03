import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../services/userServices';
import '../styles/UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
  
        const formattedUsers = data.map(user => ({
          id: user.id,
          name: user.username,
          email: user.email,
          dateCreated: new Date(user.created_at).toLocaleDateString(),
          role: user.role_name,
          status: user.status
        }));
  
        setUsers(formattedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchUsers();
  }, []);
  

  // For Avatar initials
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  // For Status badge
  const getStatusClass = (status) => {
    switch (status) {
      case 'Active': return 'user-management-status-active';
      case 'Suspended': return 'user-management-status-suspended';
      case 'Inactive': return 'user-management-status-inactive';
      default: return '';
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
  
    try {
      await deleteUser(userId); // Call the delete API
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert("Failed to delete user. Please try again.");
    }
  };
  

  return (
    <div className="user-management-container">
      <div className="user-management-header">
        <h1>User Management</h1>
        <div className="user-management-header-buttons">
          <button className="user-management-btn user-management-btn-export">
            <i className="user-management-icon-export"></i> Export to Excel
          </button>
          <button className="user-management-btn user-management-btn-add">
            <i className="user-management-icon-add"></i> Add New User
          </button>
        </div>
      </div>
      
      <div className="user-management-table-container">
        <table className="user-management-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date Created</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td className="user-management-user-cell">
                    <div className="user-management-avatar">{getInitials(user.name)}</div>
                    <span className="user-management-user-name">{user.name}</span>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.dateCreated}</td>
                  <td>{user.role}</td>
                  <td>
                    <span className={`user-management-status-badge ${getStatusClass(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="user-management-action-cell">
                    <button className="user-management-action-btn user-management-edit-btn" title="Edit">
                      <i className="user-management-icon-edit"></i>
                    </button>
                    <button 
                      className="user-management-action-btn user-management-delete-btn" 
                      title="Delete" 
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <i className="user-management-icon-delete"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
