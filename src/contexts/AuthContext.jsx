import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Simulación de servicio de autenticación
const auth = {
  onAuthStateChanged: (callback) => {
    // Obtener usuario del localStorage
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    callback(user);
    
    // Implementar un observador para cambios en el localStorage
    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        const updatedUser = e.newValue ? JSON.parse(e.newValue) : null;
        callback(updatedUser);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  },
  
  login: async (email, password) => {
    // Simular verificación de credenciales
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Aquí se podría implementar validación real
        if (email && password) {
          const user = { 
            uid: `user_${Math.random().toString(36).substring(2, 9)}`, 
            email,
            displayName: email.split('@')[0],
            role: 'student'
          };
          localStorage.setItem('user', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Credenciales inválidas'));
        }
      }, 500);
    });
  },
  
  register: async (email, password, studentData) => {
    // Simular registro de usuario
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && studentData) {
          const user = { 
            uid: `user_${Math.random().toString(36).substring(2, 9)}`, 
            email,
            ...studentData,
            role: 'student'
          };
          localStorage.setItem('user', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Datos de registro incompletos'));
        }
      }, 500);
    });
  },
  
  logout: async () => {
    // Simular logout
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem('user');
        resolve();
      }, 300);
    });
  }
};

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Efecto para verificar el estado de autenticación al cargar
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });
    
    // Limpieza al desmontar
    return unsubscribe;
  }, []);

  // Función de login
  const login = async (email, password) => {
    setError(null);
    try {
      await auth.login(email, password);
      navigate('/');
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Función de registro
  const register = async (email, password, studentData) => {
    setError(null);
    try {
      await auth.register(email, password, studentData);
      navigate('/');
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Función de logout
  const logout = async () => {
    setError(null);
    try {
      await auth.logout();
      navigate('/login');
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Valores expuestos por el contexto
  const value = {
    currentUser,
    loading,
    error,
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