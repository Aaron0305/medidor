import { useContext } from 'react'
import { TimerContext } from '../../context/TimerContext'
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  CircularProgress,
} from '@mui/material'
import { PlayArrow, Stop, Wifi, WifiOff } from '@mui/icons-material'

const Timer = () => {
  const {
    isActive,
    elapsedTime,
    startTimer,
    stopTimer,
    networkStatus,
  } = useContext(TimerContext)

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Temporizador de Servicio
        </Typography>
        
        <Typography variant="h2" align="center" sx={{ my: 3 }}>
          {formatTime(elapsedTime)}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Chip
            label={networkStatus ? 'Conectado' : 'Desconectado'}
            color={networkStatus ? 'success' : 'error'}
            icon={networkStatus ? <Wifi /> : <WifiOff />}
          />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          {!isActive ? (
            <Button
              variant="contained"
              startIcon={<PlayArrow />}
              onClick={startTimer}
              disabled={!networkStatus}
              size="large"
            >
              Iniciar
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Stop />}
              onClick={stopTimer}
              size="large"
            >
              Detener
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default Timer