import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    studentId: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (studentData.password !== studentData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (studentData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await register({
        name: studentData.name,
        email: studentData.email,
        studentId: studentData.studentId,
        password: studentData.password
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Error al registrar. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Registro de Alumno</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre Completo:</label>
          <input
            type="text"
            name="name"
            value={studentData.name}
            onChange={handleChange}
            required
            placeholder="Ej. Juan Pérez López"
          />
        </div>
        <div>
          <label>Matrícula:</label>
          <input
            type="text"
            name="studentId"
            value={studentData.studentId}
            onChange={handleChange}
            required
            placeholder="Ej. A01234567"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={studentData.email}
            onChange={handleChange}
            required
            placeholder="Ej. alumno@dominio.com"
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={studentData.password}
            onChange={handleChange}
            required
            placeholder="Mínimo 6 caracteres"
          />
        </div>
        <div>
          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            name="confirmPassword"
            value={studentData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Repite tu contraseña"
          />
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={isSubmitting ? 'submitting' : ''}
        >
          {isSubmitting ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
      <p className="auth-link">
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
      </p>
    </div>
  );
};

export default Register;