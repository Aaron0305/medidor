import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './pages/Home'
import Mediciones from './pages/AdminDashboard'
import Historial from './pages/Dashboard'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/src/pages/AdminDashboard" element={<Mediciones />} />
            <Route path="/src/pages/Dashboard.jsx" element={<Mediciones />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App