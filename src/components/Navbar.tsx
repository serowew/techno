import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

type NavbarProps = {
  onLogout: () => void;
};

const Navbar = ({ onLogout }: NavbarProps) => {
  const navigate  = useNavigate();
  const menuRef   = useRef<HTMLDivElement>(null);

  const handleNavigate = (path: string) => {
    navigate(path);
    closeMenu();
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
    closeMenu();
  };

  const toggleMenu = () => {
    const menu = document.getElementById("menu");
    if (menu) {
      menu.style.display =
        menu.style.display === "flex" ? "none" : "flex";
    }
  };

  const closeMenu = () => {
    const menu = document.getElementById("menu");
    if (menu) menu.style.display = "none";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="pics/logs.png" alt="Logo" />
        <span className="logo-text">TuToFriends</span>
      </div>

      <div className="center">
        <div className="nav-box">
          <div className="nav-item" onClick={() => handleNavigate("/dashboard")}>HOME</div>
          <div className="nav-item" onClick={() => handleNavigate("/services")}>SERVICES</div>
          <div className="nav-item" onClick={() => handleNavigate("/about")}>ABOUT</div>
          <div className="nav-item" onClick={() => handleNavigate("/contact")}>CONTACT</div>
          <div className="nav-item" onClick={() => handleNavigate("/catalog")}>CATALOG</div>
        </div>
      </div>

      <div className="burger-menu-container" ref={menuRef}>
        <div className="burger" onClick={toggleMenu}>☰</div>
        <div className="menu" id="menu">
          <div className="menu-item" onClick={() => handleNavigate("/profile")}>PROFILE</div>
          {/* ✅ Fixed: now navigates to /bookings */}
          <div className="menu-item" onClick={() => handleNavigate("/bookings")}>BOOKINGS</div>
          <div className="menu-item logout" onClick={handleLogout}>LOGOUT</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;