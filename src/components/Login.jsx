    import React, { useState } from 'react';
    import { Box, Button, TextField, Typography, Paper } from '@mui/material';

    const Login = ({ onLogin }) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación simple (puedes reemplazar por lógica real)
        if (userId && password) {
        const isAdmin = userId === 'admin' && password === 'admin123';
        onLogin({ userId, role: isAdmin ? 'admin' : 'student' });
        } else {
        alert('Por favor completa todos los campos.');
        }
    };

    return (
        <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#f5f5f5"
        >
        <Paper elevation={3} sx={{ padding: 4, width: 320 }}>
            <Typography variant="h5" align="center" gutterBottom>
            Iniciar Sesión
            </Typography>

            <form onSubmit={handleSubmit}>
            <TextField
                label="Usuario o ID"
                fullWidth
                margin="normal"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <TextField
                label="Contraseña"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
            >
                Iniciar sesión
            </Button>
            </form>
        </Paper>
        </Box>
    );
    };

    export default Login;
