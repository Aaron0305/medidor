import React, { useContext } from 'react';
import { TimerContext } from '../../context/TimerContext';

const formatDuration = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return `${hrs}h ${mins}m`;
};

const History = () => {
  const { history } = useContext(TimerContext);

  return (
    <div className="history-container">
      <h2>Historial de Servicio</h2>
      {history.length === 0 ? (
        <p>No hay registros de horas aún.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora Inicio</th>
              <th>Hora Fin</th>
              <th>Duración</th>
            </tr>
          </thead>
          <tbody>
            {history.map((session, index) => (
              <tr key={index}>
                <td>{new Date(session.startTime).toLocaleDateString()}</td>
                <td>{new Date(session.startTime).toLocaleTimeString()}</td>
                <td>{new Date(session.endTime).toLocaleTimeString()}</td>
                <td>{formatDuration(session.duration)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;