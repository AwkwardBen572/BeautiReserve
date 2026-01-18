// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // On app load, check if cookie exists
    useEffect(() => {
        fetch("http://localhost:8080/api/auth/me", { credentials: "include" })
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(() => setUser(null));
    }, []);

    const login = async (email, password) => {
        const res = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            const data = await res.json();
            setUser(data);
        } else {
            throw new Error("Login failed");
        }
    };

    const logout = async () => {
        await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};