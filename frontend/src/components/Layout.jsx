import Header from "./Header";
import SidebarComponent from "./SidebarComponent";
import { Outlet } from "react-router-dom";
import "./Layout.css"; // Import CSS for styling

const Layout = () => {
  return (
    <div className="layout-container">
      {/* Header at the top */}
      <Header />

      {/* Sidebar below the header, aligned left & content on right */}
      <div className="main-section">
        <SidebarComponent />
        <main className="main-content">
          <Outlet /> {/* Renders the current page (Dashboard, etc.) */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
