    import { Link } from 'react-router-dom'

    const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-white text-xl font-bold">
            Medidor App
            </Link>
            <div className="flex space-x-4">
            <Link to="/" className="text-white hover:text-gray-300">
                Inicio
            </Link>
            <Link to="/mediciones" className="text-white hover:text-gray-300">
                Mediciones
            </Link>
            <Link to="/historial" className="text-white hover:text-gray-300">
                Historial
            </Link>
            </div>
        </div>
        </nav>
    )
    }

    export default Navbar