import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import {
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  InputAdornment,
} from '@mui/material'
import { Email, Lock } from '@mui/icons-material'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError('Credenciales incorrectas')
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <TextField
        fullWidth
        margin="normal"
        label="Correo electrónico"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
        }}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
        }}
      />
      
      <Button
        fullWidth
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2, py: 1.5 }}
      >
        Ingresar
      </Button>
      
      <Typography align="center">
        ¿No tienes cuenta?{' '}
        <Link to="/auth/register" style={{ textDecoration: 'none' }}>
          Regístrate aquí
        </Link>
      </Typography>
    </Box>
  )
}

export default Login