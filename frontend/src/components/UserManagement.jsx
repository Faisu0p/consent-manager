import React from 'react';
import '../styles/UserManagement.css';

const UserManagement = () => {
  const users = [
    { id: 1, name: 'Michael Holz', dateCreated: '04/10/2013', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Paula Wilson', dateCreated: '05/08/2014', role: 'Publisher', status: 'Active' },
    { id: 3, name: 'Antonio Moreno', dateCreated: '11/05/2015', role: 'Publisher', status: 'Suspended' },
    { id: 4, name: 'Mary Saveley', dateCreated: '06/09/2016', role: 'Reviewer', status: 'Active' },
    { id: 5, name: 'Martin Sommer', dateCreated: '12/08/2017', role: 'Moderator', status: 'Inactive' }
  ];

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active': return 'user-management-status-active';
      case 'Suspended': return 'user-management-status-suspended';
      case 'Inactive': return 'user-management-status-inactive';
      default: return '';
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
              <th>Date Created</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td className="user-management-user-cell">
                  <div className="user-management-avatar">{getInitials(user.name)}</div>
                  <span className="user-management-user-name">{user.name}</span>
                </td>
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
                  <button className="user-management-action-btn user-management-delete-btn" title="Delete">
                    <i className="user-management-icon-delete"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
