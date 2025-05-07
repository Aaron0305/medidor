import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Simulación de servicio de autenticación
const auth = {
  onAuthStateChanged: (callback) => {
    // Simular estado de autenticación
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    callback(user);
    return () => {}; // Función de limpieza
  },
  login: async (email, password) => {
    // Simular login
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = { uid: '123', email };
        localStorage.setItem('user', JSON.stringify(user));
        resolve();
      }, 500);
    });
  },
  register: async (email, password, studentData) => {
    // Simular registro
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = { uid: '456', email, ...studentData };
        localStorage.setItem('user', JSON.stringify(user));
        resolve();
      }, 500);
    });
  },
  logout: async () => {
    // Simular logout
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem('user');
        resolve();
      }, 500);
    });
  }
};

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function login(email, password) {
    try {
      await auth.login(email, password);
      navigate('/');
    } catch (error) {
      throw error;
    }
  }

  async function register(email, password, studentData) {
    try {
      await auth.register(email, password, studentData);
      navigate('/');
    } catch (error) {
      throw error;
    }
  }

  async function logout() {
    try {
      await auth.logout();
      navigate('/login');
    } catch (error) {
      throw error;
    }
  }

  const value = {
    currentUser,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}