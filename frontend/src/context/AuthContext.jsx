import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [upcomingBooking, setUpcomingBookings] = useState(null);
  const [bookings, setBookings] = useState(null);
  const [bookingSummary, setBookingSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/auth/me", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchUpcomingBooking = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/bookings/user/${user.id}/latest`,
          { credentials: "include" }
        );

        if (res.ok) {
          const upcomingBooking = await res.json();
          if(upcomingBooking) setUpcomingBookings(upcomingBooking);
        }
      } catch (err) {
      }
    };

    fetchUpcomingBooking();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const fetchUserBookingsSummary = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/booking_summary/summary/${user.id}`,
          { credentials: "include" }
        );

        if (res.ok) {
          const bookingSummary = await res.json();
          if(bookingSummary) setBookingSummary(bookingSummary);
        }
      } catch (err) {
      }
    };

    fetchUserBookingsSummary();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/bookings/user/${user.id}`,
          { credentials: "include" }
        );

        if (res.ok) {
          const bookings = await res.json();
          if(bookings) setBookings(bookings);
        }
      } catch (err) {
      }
    };

    fetchBookings();
  }, [user]);

  const login = async (email, password) => {
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      navigate("/dashboard");
    } else {
      return "invalid_credentials";
    }
  };

  const logout = async () => {
    await fetch("http://localhost:8080/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, upcomingBooking, bookingSummary, bookings }}>
      {children}
    </AuthContext.Provider>
  );
};