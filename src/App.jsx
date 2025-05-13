import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/Layout/PrivateRoute';
import Navbar from './components/Layout/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ActiveSession from './components/Dashboard/ActiveSession';
import History from './components/Dashboard/History';
import Summary from './components/dashboard/Summary';

// Configuración del tema de Material-UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', // Azul primario
    },
    secondary: {
      main: '#f50057', // Rosa secundario
    },
    background: {
      default: '#f5f5f5', // Color de fondo general
      paper: '#ffffff', // Color de fondo para componentes tipo Paper
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#2c3e50',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Normaliza los estilos base */}
      <CssBaseline />
      
      {/* Configura el enrutamiento */}
      <Router>
        {/* Provee el contexto de autenticación */}
        <AuthProvider>
          {/* Barra de navegación común a todas las páginas */}
          <Navbar />
          
          {/* Contenedor principal de rutas */}
          <Routes>
            {/* Ruta pública para login */}
            <Route path="/login" element={<Login />} />
            
            {/* Ruta pública para registro */}
            <Route path="/register" element={<Register />} />
            
            {/* Rutas privadas (requieren autenticación) */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <ActiveSession />
                </PrivateRoute>
              }
            />
            
            <Route
              path="/history"
              element={
                <PrivateRoute>
                  <History />
                </PrivateRoute>
              }
            />
            
            <Route
              path="/summary"
              element={
                <PrivateRoute>
                  <Summary />
                </PrivateRoute>
              }
            />
            
            {/* Redirección para rutas no encontradas */}
            <Route
              path="*"
              element={
                <PrivateRoute>
                  <ActiveSession />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;