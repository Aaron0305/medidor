import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Fade,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../../contexts/AuthContext';
import { styled } from '@mui/material/styles';

// Importamos la imagen directamente para asegurarnos que se cargue correctamente
import tesjoLogo from '../image/tesjo.png';

// Estilo personalizado para el AppBar con transición - paleta institucional mejorada
const TransparentAppBar = styled(AppBar)(({ theme }) => ({
  background: `radial-gradient(circle at center,
    #00f5ef 0%,
    #00aebe 25%,
    #00768f 50%,
    #004c66 75%,
    #002e45 100%)`,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
  transition: 'all 0.5s ease',
  borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
}));

// Botón personalizado con efecto hover - mejorado para mayor visibilidad
const NavButton = styled(Button)(({ theme }) => ({
  color: '#ffffff',
  fontWeight: 500,
  fontSize: '1rem',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '0%',
    height: '2px',
    bottom: '5px',
    left: '50%',
    backgroundColor: '#00f5ef',
    transform: 'translateX(-50%)',
    transition: 'width 0.3s ease',
  },
  '&:hover::after': {
    width: '80%',
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 245, 239, 0.1)',
  }
}));

export default function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrollTrigger, setScrollTrigger] = useState(false);
  
  // Efecto para detectar el scroll y cambiar el estado del navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrollTrigger(true);
      } else {
        setScrollTrigger(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      handleClose();
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };
  
  // Función para verificar si una ruta está activa
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <TransparentAppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Fade in={true} timeout={800}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              {/* Logo con estilo institucional */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '120%',
                  height: '110%',
                  top: '-5%',
                  left: '-10%',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  zIndex: -1
                }
              }}>
                <img 
                  src={tesjoLogo}
                  alt="Logo TESJo" 
                  style={{ 
                    height: '70px', 
                    transition: 'all 0.4s ease',
                    transform: scrollTrigger ? 'scale(0.9)' : 'scale(1)',
                    filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))'
                  }} 
                />
              </Box>
              
              <Box sx={{ 
                ml: 2, 
                borderLeft: '2px solid rgba(255, 215, 0, 0.6)', 
                pl: 2,
                display: { xs: 'none', sm: 'block' } 
              }}>
                <Typography 
                  variant="h6" 
                  component="div" 
                  sx={{ 
                    fontWeight: 600,
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    color: '#ffffff',
                    textShadow: '0px 1px 3px rgba(0,0,0,0.3)',
                    letterSpacing: '0.5px'
                  }}
                >
                  Sistema Integral de Control de Servicio Social
                </Typography>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    fontSize: { xs: '0.7rem', sm: '0.8rem' },
                    color: 'rgba(255, 255, 255, 0.85)',
                    fontWeight: 400,
                    mt: 0.2
                  }}
                >
                  Tecnológico de Estudios Superiores de Jocotitlán
                </Typography>
              </Box>
            </Box>
          </Fade>
          
          <Box sx={{ flexGrow: 1 }} />
          
          {currentUser ? (
            <>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Fade in={true} timeout={1200}>
                  <NavButton 
                    sx={{ 
                      mr: 1, 
                      backgroundColor: isActive('/') ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                      '&::after': isActive('/') ? { width: '90%', backgroundColor: '#FFD700' } : {},
                      boxShadow: isActive('/') ? '0 2px 5px rgba(0, 0, 0, 0.1)' : 'none',
                    }}
                    onClick={() => navigate('/')}
                  >
                    Inicio
                  </NavButton>
                </Fade>
                <Fade in={true} timeout={1400}>
                  <NavButton 
                    sx={{ 
                      mr: 1, 
                      backgroundColor: isActive('/history') ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                      '&::after': isActive('/history') ? { width: '90%', backgroundColor: '#FFD700' } : {},
                      boxShadow: isActive('/history') ? '0 2px 5px rgba(0, 0, 0, 0.1)' : 'none',
                    }}
                    onClick={() => navigate('/history')}
                  >
                    Historial
                  </NavButton>
                </Fade>
                <Fade in={true} timeout={1600}>
                  <NavButton 
                    sx={{ 
                      mr: 1, 
                      backgroundColor: isActive('/summary') ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                      '&::after': isActive('/summary') ? { width: '90%', backgroundColor: '#FFD700' } : {},
                      boxShadow: isActive('/summary') ? '0 2px 5px rgba(0, 0, 0, 0.1)' : 'none',
                    }}
                    onClick={() => navigate('/summary')}
                  >
                    Resumen
                  </NavButton>
                </Fade>
                <Fade in={true} timeout={1800}>
                  <Button 
                    onClick={handleLogout}
                    variant="contained"
                    sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)',
                      color: '#ffffff',
                      fontWeight: 500,
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                      }
                    }}
                  >
                    Cerrar Sesión
                  </Button>
                </Fade>
              </Box>
              
              {/* Menú para pantallas pequeñas - mejorado */}
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="menu"
                  onClick={handleMenu}
                  sx={{ 
                    color: '#ffffff',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    }
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                  PaperProps={{
                    sx: {
                      bgcolor: 'rgba(0, 51, 102, 0.95)',
                      backgroundImage: 'linear-gradient(135deg, rgba(0, 51, 102, 0.95) 0%, rgba(0, 76, 153, 0.95) 100%)',
                      color: '#ffffff',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                      mt: 1,
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      backdropFilter: 'blur(8px)',
                      minWidth: '200px',
                    }
                  }}
                >
                  <MenuItem 
                    onClick={() => { navigate('/'); handleClose(); }}
                    sx={{
                      my: 0.5,
                      mx: 1,
                      borderRadius: '4px',
                      backgroundColor: isActive('/') ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                      '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
                      borderLeft: isActive('/') ? '4px solid #FFD700' : 'none',
                      pl: isActive('/') ? 2 : 3,
                      fontWeight: isActive('/') ? 600 : 400,
                    }}
                  >
                    Inicio
                  </MenuItem>
                  <MenuItem 
                    onClick={() => { navigate('/history'); handleClose(); }}
                    sx={{
                      my: 0.5,
                      mx: 1,
                      borderRadius: '4px',
                      backgroundColor: isActive('/history') ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                      '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
                      borderLeft: isActive('/history') ? '4px solid #FFD700' : 'none',
                      pl: isActive('/history') ? 2 : 3,
                      fontWeight: isActive('/history') ? 600 : 400,
                    }}
                  >
                    Historial
                  </MenuItem>
                  <MenuItem 
                    onClick={() => { navigate('/summary'); handleClose(); }}
                    sx={{
                      my: 0.5,
                      mx: 1,
                      borderRadius: '4px',
                      backgroundColor: isActive('/summary') ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                      '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
                      borderLeft: isActive('/summary') ? '4px solid #FFD700' : 'none',
                      pl: isActive('/summary') ? 2 : 3,
                      fontWeight: isActive('/summary') ? 600 : 400,
                    }}
                  >
                    Resumen
                  </MenuItem>
                  <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', my: 1 }} />
                  <MenuItem 
                    onClick={handleLogout}
                    sx={{
                      my: 0.5,
                      mx: 1,
                      borderRadius: '4px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
                      fontWeight: 'bold',
                      color: '#ffffff',
                      textAlign: 'center',
                      py: 1,
                    }}
                  >
                    Cerrar Sesión
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : null}
        </Toolbar>
      </Container>
    </TransparentAppBar>
  );
}