import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "../styles/Layout.css"; // Import CSS for styling

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(true); // State for sidebar

  return (
    <div className="layout-container">
      <Header />
      <div className="main-section">
        {/* Pass collapsed state and toggle function to Sidebar */}
        <Sidebar isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />

        {/* Apply collapsed class dynamically */}
        <main className={`main-content ${isCollapsed ? "collapsed" : ""}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
