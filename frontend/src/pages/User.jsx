import React from "react";
import "../styles/User.css";
import UserManagement from "../components/UserManagement";
import AccessLogsTable from "../components/AccessLogsTable";

const User = () => {
  return (
    <div className="user-container">
      <div className="user-section">
        <h2>User Management</h2>
        <UserManagement />
      </div>
      
      <div className="access-logs-table">
        <h2>Access Logs</h2>
        <AccessLogsTable />
      </div>
    </div>
  );
};

export default User;
