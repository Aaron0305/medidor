// services/hours.js
let sessions = [
    {
      id: 1,
      userId: 1,
      date: "2023-05-01",
      startTime: "2023-05-01T09:00:00Z",
      endTime: "2023-05-01T12:30:00Z",
      duration: 12600 // 3.5 horas en segundos
    },
    {
      id: 2,
      userId: 1,
      date: "2023-05-02",
      startTime: "2023-05-02T10:00:00Z",
      endTime: "2023-05-02T15:00:00Z",
      duration: 18000 // 5 horas en segundos
    }
  ];
  
  export const hoursService = {
    async getHistory(userId = 1) {
      // Simular llamada a API
      return new Promise((resolve) => {
        setTimeout(() => {
          const userSessions = sessions.filter(s => s.userId === userId);
          const totalHours = userSessions.reduce((sum, session) => sum + (session.duration / 3600), 0);
          resolve({
            sessions: userSessions,
            totalHours
          });
        }, 500);
      });
    },
  
    async saveSession(session) {
      // Simular llamada a API
      return new Promise((resolve) => {
        setTimeout(() => {
          const newSession = {
            id: sessions.length + 1,
            userId: 1, // En una app real, obtendrías el ID del usuario autenticado
            ...session
          };
          sessions.push(newSession);
          resolve(newSession);
        }, 500);
      });
    },
  
    checkNetwork() {
      // En una implementación real, aquí verificarías la red WiFi
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true); // Simular que está conectado a la red correcta
        }, 200);
      });
    }
  };