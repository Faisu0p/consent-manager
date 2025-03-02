import { Search, Bell, User, Rocket } from "lucide-react";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header-component">
      {/* Logo Section */}
      <div className="header-component-logo">
        <Rocket size={32} className="header-component-logo-icon" />
        <span className="header-component-app-name">Consent Manager</span>
      </div>

      {/* Search Section */}
      <div className="header-component-search">
        <Search size={20} className="search-icon" />
      </div>

      {/* Icons Section */}
      <div className="header-component-icons">
        <Bell size={24} className="icon" />
        <User size={24} className="icon" />
      </div>
    </header>
  );
};

export default Header;
