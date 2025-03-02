import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FiUsers, FiSettings, FiLogOut, FiBarChart2, FiFileText } from "react-icons/fi";
import { MdManageAccounts, MdDashboard } from "react-icons/md";
import "./Sidebar.css";

const SidebarComponent = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`sidebar-container ${collapsed ? "collapsed" : ""}`}>
      <Sidebar collapsed={collapsed} width={collapsed ? "80px" : "250px"}>
        <Menu>
          {/* ✅ Dashboard */}
          <MenuItem icon={<MdDashboard />} component={<Link to="/dashboard" />}>
            Dashboard
          </MenuItem>

          {/* ✅ Consent Management - Now separate */}
          <MenuItem icon={<MdManageAccounts />} component={<Link to="/consents" />}>
            Consent Management
          </MenuItem>

          {/* ✅ User Management - Now separate */}
          <MenuItem icon={<FiUsers />} component={<Link to="/users" />}>
            Users
          </MenuItem>

          {/* ✅ Audit Logs */}
          <MenuItem icon={<FiFileText />} component={<Link to="/audit-logs" />}>
            Audit Logs
          </MenuItem>

          {/* ✅ Reports & Analytics */}
          <MenuItem icon={<FiBarChart2 />} component={<Link to="/reports" />}>
            Reports & Analytics
          </MenuItem>

          {/* ✅ Settings */}
          <MenuItem icon={<FiSettings />} component={<Link to="/settings" />}>
            Settings
          </MenuItem>

          {/* ✅ Logout */}
          <MenuItem icon={<FiLogOut />} component={<Link to="/logout" />}>
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>

      {/* Collapse Button - Inside Sidebar */}
      <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? "→" : "←"}
      </button>
    </div>
  );
};

export default SidebarComponent;
