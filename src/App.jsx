import { Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import Dashboard from './components/dashboard/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthPage />} />
      <Route path="/*" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App