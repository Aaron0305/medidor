// services/auth.js
const mockUsers = [
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan@example.com",
      studentId: "A01234567",
      password: "password123"
    }
  ];
  
  export const auth = {
    async login(email, password) {
      // Simular llamada a API
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const user = mockUsers.find(u => u.email === email && u.password === password);
          if (user) {
            resolve({ ...user, password: undefined });
          } else {
            reject(new Error('Credenciales incorrectas'));
          }
        }, 500);
      });
    },
  
    async register(studentData) {
      // Simular llamada a API
      return new Promise((resolve) => {
        setTimeout(() => {
          const newUser = {
            id: mockUsers.length + 1,
            ...studentData,
            password: undefined
          };
          mockUsers.push({ ...studentData });
          resolve(newUser);
        }, 500);
      });
    }
  };