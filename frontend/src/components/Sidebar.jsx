import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { FiUsers, FiSettings, FiLogOut, FiBarChart2, FiFileText } from "react-icons/fi";
import { MdManageAccounts, MdDashboard } from "react-icons/md";
import { RiFileShield2Line } from "react-icons/ri";
import { TbPencilCog } from "react-icons/tb";
import { FiHeadphones } from "react-icons/fi";

import { logout } from "../services/authService";

import "../styles/Sidebar.css";

const SidebarComponent = ({ isCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className={`sidebar-component ${isCollapsed ? "collapsed" : ""}`}>
      <Sidebar collapsed={isCollapsed}>
        <Menu>
          <MenuItem icon={<MdDashboard />} component={<Link to="/dashboard" />}>Dashboard</MenuItem>
          <MenuItem icon={<MdManageAccounts />} component={<Link to="/consents" />}>Consent Management</MenuItem>
          <MenuItem icon={<FiUsers />} component={<Link to="/users" />}>Users</MenuItem>
          <MenuItem icon={<FiFileText />} component={<Link to="/audit-logs" />}>Audit Logs</MenuItem>
          <MenuItem icon={<FiFileText />} component={<Link to="/customization" />}>Customization</MenuItem>
          <MenuItem icon={<TbPencilCog />} component={<Link to="/modify-banner" />}>Modify Banner</MenuItem>
          <MenuItem icon={<FiBarChart2 />} component={<Link to="/reports" />}>Reports & Analytics</MenuItem>
          <MenuItem icon={<RiFileShield2Line />} component={<Link to="/view-consents" />}>View Consents</MenuItem>
          <MenuItem icon={<FiHeadphones />} component={<Link to="/customer-support" />}>Customer Support</MenuItem>
          <MenuItem icon={<FiSettings />} component={<Link to="/settings" />}>Settings</MenuItem>
          <MenuItem icon={<FiLogOut />} onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Sidebar>

      <button className="sidebar-component-toggle-btn" onClick={toggleSidebar}>
        {isCollapsed ? "☰" : "✖"}
      </button>
    </div>
  );
};

export default SidebarComponent;
