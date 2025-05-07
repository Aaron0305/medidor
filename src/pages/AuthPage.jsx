import { Routes, Route } from 'react-router-dom'
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'
import './AuthPage.css'

const AuthPage = () => (
  <div className="auth-page">
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  </div>
)

export default AuthPage