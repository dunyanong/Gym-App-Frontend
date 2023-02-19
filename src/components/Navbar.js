import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout()
  }

  return (
    <nav className='bg-black py-5 text-white'>
      <div className="flex justify-between items-center mx-6">
        <Link to="/">
          <h1 className='text-3xl'>Workout Buddy</h1>
        </Link>
          { user && (
            <div className='flex justify-between gap-3'>
            <span>{user.email}</span>
            <button onClick={handleClick}>Logout</button>
            </div>
          )}          
          { !user && (
            <div className='flex justify-between gap-3'>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>  
            </div>
          )}
      </div>
    </nav>
  )
}

export default Navbar