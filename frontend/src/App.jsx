import './App.css';
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "./context/AuthContext.jsx";
import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {user && <NavBar />}
    </>
  );
}

export default App;
