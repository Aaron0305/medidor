import { AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c7be5' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Registro de Horas de Servicio
        </Typography>
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Avatar sx={{ bgcolor: '#e63757' }}>
              {user.name?.charAt(0) || 'U'}
            </Avatar>
            <Button 
              color="inherit" 
              onClick={handleLogout}
              sx={{ textTransform: 'none' }}
            >
              Cerrar sesión
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;