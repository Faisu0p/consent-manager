import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FiUsers, FiSettings, FiLogOut, FiBarChart2, FiFileText } from "react-icons/fi";
import { MdManageAccounts, MdDashboard } from "react-icons/md";
import "./Sidebar.css"; // Separate CSS file for styling

const SidebarComponent = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="sidebar-container">
      <Sidebar collapsed={collapsed}>
        <Menu>
          {/* ✅ Working: Dashboard */}
          <MenuItem icon={<MdDashboard />} component={<Link to="/dashboard" />}>
            Dashboard
          </MenuItem>

          {/* ✅ Working: Consent Management */}
          <SubMenu title="Consent Management" icon={<MdManageAccounts />}>
            <MenuItem component={<Link to="/consents" />}>Consent List</MenuItem>
          </SubMenu>

          {/* ✅ Working: User Management */}
          <SubMenu title="User Management" icon={<FiUsers />}>
            <MenuItem component={<Link to="/users" />}>Users</MenuItem>
          </SubMenu>

          {/* 🚫 Non-Functional: Other Menu Items */}
          <MenuItem icon={<FiFileText />}>Audit Logs</MenuItem>
          <MenuItem icon={<FiBarChart2 />}>Reports & Analytics</MenuItem>
          <SubMenu title="Settings" icon={<FiSettings />}>
            <MenuItem>General</MenuItem>
            <MenuItem>Security</MenuItem>
            <MenuItem>API & Integrations</MenuItem>
          </SubMenu>
          <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
        </Menu>
      </Sidebar>

      {/* Collapse Button */}
      <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? "Expand" : "Collapse"}
      </button>
    </div>
  );
};

export default SidebarComponent;
