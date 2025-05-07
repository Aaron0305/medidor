import React, { useContext } from 'react';
import { TimerContext } from '../../context/TimerContext';

const Summary = () => {
  const { totalHours, history } = useContext(TimerContext);
  const totalDays = Math.floor(totalHours / 8); // Asumiendo 8 horas por día

  return (
    <div className="summary-container">
      <h2>Resumen de Horas</h2>
      <div className="summary-stats">
        <div className="stat-item">
          <h3>Total Horas</h3>
          <p>{totalHours.toFixed(2)} horas</p>
        </div>
        <div className="stat-item">
          <h3>Total Días</h3>
          <p>{totalDays} días</p>
        </div>
        <div className="stat-item">
          <h3>Sesiones</h3>
          <p>{history.length} registros</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;