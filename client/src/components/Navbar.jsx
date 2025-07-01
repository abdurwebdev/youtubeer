// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });
      setUser(null);
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <nav className="p-4 flex justify-between items-center border-b">
      <Link to="/" className="text-xl font-bold">MyTube</Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
           <img
  src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}`}
  alt="avatar"
  className="w-8 h-8 rounded-full"
/>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/signin"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
