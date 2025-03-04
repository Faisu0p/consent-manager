import React from "react";
import "../styles/User.css";
import UserManagement from "../components/UserManagement";
import AccessLogsTable from "../components/AccessLogsTable";

const User = () => {
  return (
    <div className="user-container">
      <UserManagement />
      <AccessLogsTable />
    </div>
  );
};

export default User;
