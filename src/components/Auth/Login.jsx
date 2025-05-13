import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Box,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
  ThemeProvider,
  createTheme,
  Grow,
  Zoom,
  Fade
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  KeyboardArrowRight
} from '@mui/icons-material';

// Paleta de colores personalizada
const theme = createTheme({
  palette: {
    primary: {
      main: '#0853be',      // Azul principal solicitado
      light: '#3675d6',     // Versión más clara
      dark: '#063d8f',      // Versión más oscura
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0853be',      // Usando el mismo color como secundario para consistencia
      light: '#3675d6',     // Versión más clara
      contrastText: '#ffffff',
    },
    background: {
      default: '#e6f0ff',   // Fondo claro con tono azulado suave
      paper: '#ffffff',     // Fondo de tarjetas o formularios
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none', // Mantiene el texto en botones sin forzar mayúsculas
    },
  },
  shape: {
    borderRadius: 8, // Bordes ligeramente redondeados
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
});

// Componente de campo de entrada animado
const AnimatedTextField = ({ label, type, value, onChange, icon, endAdornment, ...props }) => {
  return (
    <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={700}>
      <TextField
        label={label}
        type={type}
        fullWidth
        variant="outlined"
        value={value}
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {icon}
            </InputAdornment>
          ),
          endAdornment: endAdornment,
          sx: {
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.main,
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
                borderWidth: 2,
              },
            },
            transition: 'all 0.3s ease-in-out',
          }
        }}
        sx={{
          '& label.Mui-focused': {
            color: theme.palette.primary.main,
          },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
            },
          },
          mb: 2,
        }}
        {...props}
      />
    </Grow>
  );
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      setSuccess(true);
      
      // Esperar un segundo antes de redirigir para mostrar el mensaje de éxito
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container 
        maxWidth="sm" 
        sx={{ 
          mt: 8, 
          mb: 8,
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Zoom in={true} style={{ transitionDelay: '100ms' }}>
          <Paper 
            elevation={6} 
            sx={{ 
              borderRadius: 3,
              overflow: 'hidden',
              width: '100%',
              background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.paper} 80%, rgba(0, 251, 250, 0.1) 100%)`,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '5px',
                background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
              }
            }}
          >
            <Box sx={{ 
              p: 4, 
              bgcolor: theme.palette.primary.main, 
              color: 'white',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-15px',
                right: '-15px',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${theme.palette.secondary.light} 0%, transparent 70%)`,
                opacity: 0.3,
              },
            }}>
              <Fade in={true} timeout={1000}>
                <Typography 
                  variant="h4" 
                  component="h1" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 600,
                    letterSpacing: '1px',
                    textShadow: '0px 2px 4px rgba(0,0,0,0.2)'
                  }}
                >
                  Bienvenido
                </Typography>
              </Fade>
              <Fade in={true} timeout={1500}>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Inicia sesión para continuar
                </Typography>
              </Fade>
            </Box>

            <Box 
              component="form" 
              onSubmit={handleSubmit} 
              sx={{ 
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}
            >
              {error && (
                <Grow in={!!error} timeout={500}>
                  <Alert 
                    severity="error" 
                    variant="filled"
                    sx={{
                      borderRadius: 2,
                      bgcolor: '#f44336',
                      mb: 2,
                      '& .MuiAlert-message': {
                        fontWeight: 500
                      }
                    }}
                  >
                    {error}
                  </Alert>
                </Grow>
              )}

              {success && (
                <Grow in={success} timeout={500}>
                  <Alert 
                    severity="success" 
                    variant="filled"
                    sx={{
                      borderRadius: 2,
                      bgcolor: theme.palette.secondary.main,
                      color: theme.palette.common.white,
                      mb: 2,
                      '& .MuiAlert-message': {
                        fontWeight: 500
                      }
                    }}
                  >
                    Iniciando sesión correctamente...
                  </Alert>
                </Grow>
              )}

              <AnimatedTextField
                label="Correo electrónico"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                icon={<Email sx={{ color: theme.palette.primary.main }} />}
              />

              <AnimatedTextField
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                icon={<Lock sx={{ color: theme.palette.primary.main }} />}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                      edge="end"
                      sx={{
                        color: showPassword ? theme.palette.secondary.main : 'inherit',
                        transition: 'color 0.3s ease'
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />

              <Fade in={true} style={{ transitionDelay: '500ms' }}>
                <Box sx={{ textAlign: 'right', mt: -1, mb: 1 }}>
                  <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: theme.palette.primary.main,
                        '&:hover': {
                          color: theme.palette.secondary.main,
                          textDecoration: 'underline'
                        },
                        transition: 'color 0.3s ease'
                      }}
                    >
                      ¿Olvidaste tu contraseña?
                    </Typography>
                  </Link>
                </Box>
              </Fade>

              <Zoom in={true} style={{ transitionDelay: '600ms' }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disableElevation
                  disabled={loading || success}
                  endIcon={<KeyboardArrowRight />}
                  sx={{
                    py: 1.5,
                    fontSize: '1rem',
                    borderRadius: 2,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                    color: '#fff',
                    fontWeight: 500,
                    mt: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    }
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: '#fff' }} />
                  ) : (
                    'Iniciar Sesión'
                  )}
                </Button>
              </Zoom>

              <Fade in={true} style={{ transitionDelay: '900ms' }}>
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <Typography variant="body1">
                    ¿No tienes cuenta?{' '}
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                      <Typography 
                        component="span" 
                        fontWeight="bold" 
                        sx={{ 
                          color: theme.palette.secondary.main,
                          position: 'relative',
                          '&:hover': {
                            '&::after': {
                              width: '100%',
                            }
                          },
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: '-2px',
                            left: 0,
                            width: '0%',
                            height: '2px',
                            backgroundColor: theme.palette.secondary.main,
                            transition: 'width 0.3s ease'
                          }
                        }}
                      >
                        Regístrate
                      </Typography>
                    </Link>
                  </Typography>
                </Box>
              </Fade>
            </Box>
          </Paper>
        </Zoom>
      </Container>
    </ThemeProvider>
  );
}