import { Outlet } from 'react-router-dom'
import './Dashboard.css'
import Navbar from './Navbar'

const Dashboard = () => (
  <div className="dashboard-container">
    <Navbar />
    <div className="dashboard-content">
      <Outlet />
    </div>
  </div>
)

export default Dashboard