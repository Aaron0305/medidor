import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { checkNetworkConnection, logHours } from '../../services/hours';

export default function ActiveSession() {
  const { currentUser } = useContext(AuthContext);
  const [isConnected, setIsConnected] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [dailyHours, setDailyHours] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const connected = await checkNetworkConnection();
        setIsConnected(connected);
        
        if (connected && isTracking) {
          const now = new Date();
          const diff = (now - startTime) / (1000 * 60 * 60); // Horas
          setElapsedTime(diff);
        }
      } catch (err) {
        setError('Error verificando conexión');
      }
    };

    const interval = setInterval(checkConnection, 5000);
    return () => clearInterval(interval);
  }, [isTracking, startTime]);

  const startTracking = () => {
    if (!isConnected) {
      setError('Debes estar conectado a la red específica para iniciar');
      return;
    }
    
    setIsTracking(true);
    setStartTime(new Date());
    setError('');
  };

  const stopTracking = async () => {
    setIsTracking(false);
    const endTime = new Date();
    const hours = (endTime - startTime) / (1000 * 60 * 60); // Horas
    
    try {
      await logHours(currentUser.uid, {
        date: new Date().toISOString().split('T')[0],
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        hours: parseFloat(hours.toFixed(2))
      });
      setDailyHours(prev => prev + hours);
      setElapsedTime(0);
    } catch (err) {
      setError('Error guardando horas');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Registro de Horas de Servicio
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Estado de Conexión
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {isConnected ? (
                  <>
                    <Box sx={{ 
                      width: 12, 
                      height: 12, 
                      bgcolor: 'success.main', 
                      borderRadius: '50%',
                      mr: 1
                    }} />
                    <Typography>Conectado a la red</Typography>
                  </>
                ) : (
                  <>
                    <Box sx={{ 
                      width: 12, 
                      height: 12, 
                      bgcolor: 'error.main', 
                      borderRadius: '50%',
                      mr: 1
                    }} />
                    <Typography>Fuera de la red</Typography>
                  </>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sesión Actual
              </Typography>
              {isTracking ? (
                <>
                  <Typography variant="body1">
                    Horas acumuladas hoy: {dailyHours.toFixed(2)}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    Tiempo actual: {elapsedTime.toFixed(2)} horas
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={stopTracking}
                    sx={{ mt: 2 }}
                    fullWidth
                  >
                    Detener Registro
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {dailyHours > 0 ? `Hoy has registrado ${dailyHours.toFixed(2)} horas` : 'No hay registro activo'}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={startTracking}
                    disabled={!isConnected}
                    fullWidth
                  >
                    Iniciar Registro
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}