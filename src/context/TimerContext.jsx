import React, { createContext, useState, useEffect } from 'react';
import { hoursService } from '../services/hours';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [history, setHistory] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [networkStatus, setNetworkStatus] = useState(false);

  // Verificar conexión a red específica
  const checkNetwork = () => {
    // Implementación real debería verificar la red WiFi específica
    const isCorrectNetwork = true; // Simulación - cambiar por lógica real
    setNetworkStatus(isCorrectNetwork);
    return isCorrectNetwork;
  };

  // Cargar historial al iniciar
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const historyData = await hoursService.getHistory();
        setHistory(historyData.sessions || []);
        setTotalHours(historyData.totalHours || 0);
      } catch (error) {
        console.error('Error loading history:', error);
      }
    };
    loadHistory();
  }, []);

  // Efecto para el temporizador
  useEffect(() => {
    let interval = null;

    if (isActive && networkStatus) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    } else if (!isActive && elapsedTime !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, elapsedTime, networkStatus]);

  const startTimer = () => {
    if (checkNetwork()) {
      setIsActive(true);
      setStartTime(new Date());
    } else {
      alert('Debes conectarte a la red autorizada para registrar horas');
    }
  };

  const stopTimer = async () => {
    setIsActive(false);
    if (elapsedTime > 0) {
      const session = {
        date: new Date().toISOString().split('T')[0],
        startTime: startTime.toISOString(),
        endTime: new Date().toISOString(),
        duration: elapsedTime,
      };

      try {
        await hoursService.saveSession(session);
        setHistory([...history, session]);
        setTotalHours(totalHours + elapsedTime / 3600);
        setElapsedTime(0);
        setStartTime(null);
      } catch (error) {
        console.error('Error saving session:', error);
      }
    }
  };

  return (
    <TimerContext.Provider
      value={{
        isActive,
        startTime,
        elapsedTime,
        history,
        totalHours,
        networkStatus,
        startTimer,
        stopTimer,
        checkNetwork,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};