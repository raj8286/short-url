import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/axios'

const Navbar = () => {
  const { authUser, setAuthUser } = useAuth()

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout')
      setAuthUser(null)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <nav className="bg-gray-400 border-b border-gray-100 pattern">
      <div className="w-full mx-auto px-4 md:px-8">
        <div className="h-24 flex items-center justify-between">
          <Link to="/" className="block">
            <img src="/logo.png" alt="ShortURL logo" className="h-12 w-20 object-contain" />
          </Link>

          <div className="flex items-center gap-3">
            {authUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-2 lg:px-5 py-2.5 rounded-full bg-accent text-white hover:bg-accent/90 transition font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-2 lg:px-5 py-2.5 rounded-full bg-accent text-white hover:bg-accent/90 transition hover:cursor-pointer font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-2 lg:px-5 py-2.5 rounded-full bg-accent text-white hover:bg-accent/90 transition font-medium"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="px-2 lg:px-5 py-2.5 rounded-full bg-accent text-white hover:bg-accent/90 transition font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar