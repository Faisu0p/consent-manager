import Header from "./Header";
import SidebarComponent from "./Sidebar";
import { Outlet } from "react-router-dom";
import "../styles/Layout.css"; // Import CSS for styling

const Layout = () => {
  return (
    <div className="layout-container">
      {/* Fixed Header */}
      <Header />

      {/* Sidebar + Main Content */}
      <div className="main-section">
        <SidebarComponent />
        <main className="main-content">
          <Outlet /> {/* Renders Dashboard, Users, etc. */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
