import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout, reset } from '../features/auth/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(
    // @ts-ignore
    (state) => state.authState
  );

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>SupportDesk</Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <Link to='/'>
                <FaUser />
                {user.name}
              </Link>
            </li>
            <li>
              <button
                type='button'
                className='btn btn-reverse'
                onClick={onLogout}
              >
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
