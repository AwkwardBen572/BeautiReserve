import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const NavBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  
  let role = "";
  if (user && user.role) role = user.role;

  const [activePage, setActivePage] = useState("");

  const setNavigation = (page) => {
    navigate("/" + page, { replace: true });
    setActivePage(page);
    setIsOpen(false);
  };


  const openMenu = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className={`navbar_holder font_1 ${isOpen ? "open" : ""}`}>
      <div onClick={openMenu} className="navbar_icon_holder">
        <i className="fa fa-bars navbar_icon"></i>
        {isOpen && <span className="navbar_label">Menu</span>}
      </div>

      <div onClick={() => setNavigation("dashboard")} className={`navbar_icon_holder ${activePage === "dashboard" ? "active" : ""}`}>
        <i className="fas fa-house-user navbar_icon"></i>
        {isOpen && <span className="navbar_label">Dashboard</span>}
      </div>

      <div onClick={() => setNavigation("beauty_technicians")} className={`navbar_icon_holder ${activePage === "beauty_technicians" ? "active" : ""}`}>
        <i className="fas fa-gem navbar_icon"></i>
        {isOpen && <span className="navbar_label">Beauty Technicians</span>}
      </div>

      <div onClick={() => setNavigation("bookings")} className={`navbar_icon_holder ${activePage === "bookings" ? "active" : ""}`}>
        <i className="fas fa-book navbar_icon"></i>
        {isOpen && <span className="navbar_label">Bookings</span>}
      </div>

      <div onClick={() => setNavigation("calendar")} className={`navbar_icon_holder ${activePage === "calendar" ? "active" : ""}`}>
        <i className="fas fa-calendar-alt navbar_icon"></i>
        {isOpen && <span className="navbar_label">Calendar</span>}
      </div>

      <div onClick={() => setNavigation("profile")} className={`navbar_icon_holder ${activePage === "profile" ? "active" : ""}`}>
        <i className="fas fa-address-card navbar_icon"></i>
        {isOpen && <span className="navbar_label">Profile</span>}
      </div>

      {role === "technician" && (
      <div onClick={() => setNavigation("clients")} className={`navbar_icon_holder ${activePage === "clients" ? "active" : ""}`}>
        <i className="fas fa-address-book navbar_icon"></i>
        {isOpen && <span className="navbar_label">Clients</span>}
      </div>
     )}

      {role === "technician" && (
      <div onClick={() => setNavigation("business_details")} className={`navbar_icon_holder ${activePage === "business_details" ? "active" : ""}`}>
        <i className="fas fa-file-alt navbar_icon"></i>
        {isOpen && <span className="navbar_label">Business Info</span>}
      </div>
      )}

      {role === "technician" && (
      <div onClick={() => setNavigation("business_stats")} className={`navbar_icon_holder ${activePage === "business_stats" ? "active" : ""}`}>
        <i className="fas fa-chart-pie navbar_icon"></i>
        {isOpen && <span className="navbar_label">Business Statistics</span>}
      </div>
      )}

      {role === "technician" ? (
      <div onClick={() => setNavigation("business_reviews")} className={`navbar_icon_holder ${activePage === "business_reviews" ? "active" : ""}`}>
        <i className="fas fa-star navbar_icon"></i>
        {isOpen && <span className="navbar_label">Business Reviews</span>}
      </div>
      ) : (
        <div onClick={() => setNavigation("my_reviews")} className={`navbar_icon_holder ${activePage === "my_reviews" ? "active" : ""}`}>
        <i className="fas fa-star navbar_icon"></i>
        {isOpen && <span className="navbar_label">My Reviews</span>}
      </div>
      )}

    </div>
  );
};

export default NavBar;