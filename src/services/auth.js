export const auth = {
    onAuthStateChanged: (callback) => {
      const user = JSON.parse(localStorage.getItem('user')) || null;
      callback(user);
      return () => {};
    },
    login: (email, password) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const user = { uid: '123', email };
          localStorage.setItem('user', JSON.stringify(user));
          resolve(user);
        }, 500);
      });
    },
    register: (email, password, studentData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const user = { uid: Date.now().toString(), email, ...studentData };
          localStorage.setItem('user', JSON.stringify(user));
          resolve(user);
        }, 500);
      });
    },
    logout: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          localStorage.removeItem('user');
          resolve();
        }, 500);
      });
    }
  };