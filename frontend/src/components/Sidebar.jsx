import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { FiUsers, FiSettings, FiLogOut, FiBarChart2, FiFileText } from "react-icons/fi";
import { MdManageAccounts, MdDashboard } from "react-icons/md";
import { logout } from "../services/authService";

import "../styles/Sidebar.css";

const SidebarComponent = ({ isCollapsed, toggleSidebar }) => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/"); // Redirect to login page after logout
  };


  return (
    <div className={`sidebar-container ${isCollapsed ? "collapsed" : ""}`}>
      <Sidebar collapsed={isCollapsed} width={isCollapsed ? "80px" : "250px"}>
        <Menu>
          <MenuItem icon={<MdDashboard />} component={<Link to="/dashboard" />}>Dashboard</MenuItem>
          <MenuItem icon={<MdManageAccounts />} component={<Link to="/consents" />}>Consent Management</MenuItem>
          <MenuItem icon={<FiUsers />} component={<Link to="/users" />}>Users</MenuItem>
          <MenuItem icon={<FiFileText />} component={<Link to="/audit-logs" />}>Audit Logs</MenuItem>
          <MenuItem icon={<FiFileText />} component={<Link to="/customization" />}>Customization</MenuItem>
          <MenuItem icon={<FiBarChart2 />} component={<Link to="/reports" />}>Reports & Analytics</MenuItem>
          <MenuItem icon={<FiSettings />} component={<Link to="/settings" />}>Settings</MenuItem>
          <MenuItem icon={<FiLogOut />} onClick={handleLogout}>Logout</MenuItem>

        </Menu>
      </Sidebar>

      <button className="collapse-btn" onClick={toggleSidebar}>
        {isCollapsed ? "→" : "←"}
      </button>
    </div>
  );
};

export default SidebarComponent;
