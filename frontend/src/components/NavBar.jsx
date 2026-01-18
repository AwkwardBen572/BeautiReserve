import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";


const NavBar = () => {

  const navigate = useNavigate();

  const setNavigation = (page) => {
    navigate("/"+page, { replace: true });
  };

  return (
    <div className="navbar_holder">
      <div onClick={() => setNavigation("dashboard")}><i className='fas fa-house-user navbar_icon'></i></div>
      <div onClick={() => setNavigation("bookings")}><i className='fas fa-book navbar_icon'></i></div>
      <div onClick={() => setNavigation("calendar")}><i className='fas fa-calendar-alt navbar_icon'></i></div>
      <div onClick={() => setNavigation("profile")}><i className='fas fa-address-card navbar_icon'></i></div>
    </div>
  );
};

export default NavBar;