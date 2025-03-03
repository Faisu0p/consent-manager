import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FiUsers, FiSettings, FiLogOut, FiBarChart2, FiFileText } from "react-icons/fi";
import { MdManageAccounts, MdDashboard } from "react-icons/md";
import "../styles/Sidebar.css";

const SidebarComponent = ({ isCollapsed, toggleSidebar }) => {
  return (
    <div className={`sidebar-container ${isCollapsed ? "collapsed" : ""}`}>
      <Sidebar collapsed={isCollapsed} width={isCollapsed ? "80px" : "250px"}>
        <Menu>
          <MenuItem icon={<MdDashboard />} component={<Link to="/dashboard" />}>Dashboard</MenuItem>
          <MenuItem icon={<MdManageAccounts />} component={<Link to="/consents" />}>Consent Management</MenuItem>
          <MenuItem icon={<FiUsers />} component={<Link to="/users" />}>Users</MenuItem>
          <MenuItem icon={<FiFileText />} component={<Link to="/audit-logs" />}>Audit Logs</MenuItem>
          <MenuItem icon={<FiBarChart2 />} component={<Link to="/reports" />}>Reports & Analytics</MenuItem>
          <MenuItem icon={<FiSettings />} component={<Link to="/settings" />}>Settings</MenuItem>
          <MenuItem icon={<FiLogOut />} component={<Link to="/logout" />}>Logout</MenuItem>
        </Menu>
      </Sidebar>

      {/* Collapse Button */}
      <button className="collapse-btn" onClick={toggleSidebar}>
        {isCollapsed ? "→" : "←"}
      </button>
    </div>
  );
};

export default SidebarComponent;
