import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser, createUser } from '../services/userServices';
import AddUserForm from './AddUserForm';
import '../styles/UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch users on component mount
  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      const formattedUsers = data.map(user => ({
        id: user.id,
        name: user.username,
        email: user.email,
        dateCreated: new Date(user.created_at).toLocaleDateString(),
        role: user.role_name || user.role, // Fallback for different API response formats
        status: user.status,
      }));
      setUsers(formattedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // For Avatar initials
  // const getInitials = (name) => {
  //   return name.split(' ').map(n => n[0]).join('');
  // };

  const getInitials = (name = "") => {
    if (!name) return "?"; // Fallback for missing names
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
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

  // Add new user
  const handleAddUser = async (newUser) => {
    try {
      await createUser(newUser);
  
      setSuccessMessage("User added successfully!");
  
      // Fetch the updated user list
      await fetchUsers();
  
      setTimeout(() => {
        setShowAddUserForm(false);
        setSuccessMessage("Adding user...");
      }, 2000);
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user. Please try again.");
    }
  };
  

  // Delete user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      await deleteUser(userId);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId)); // Use functional update
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
          <button 
            className="user-management-btn user-management-btn-add" 
            onClick={() => setShowAddUserForm(true)}
          >
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
      
      {showAddUserForm && (
        <AddUserForm 
          onClose={() => setShowAddUserForm(false)} 
          onSubmit={handleAddUser} 
          successMessage={successMessage} 
        />
      )}
    </div>
  );
};

export default UserManagement;
