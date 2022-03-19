import { useEffect, useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { login, reset } from '../features/auth/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, message, isLoading, isSuccess, isError } = useSelector(
    // @ts-ignore
    (state) => state.auth
  );

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    // @ts-ignore
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (user) {
      navigate('/');
      toast.success('Logged in successfully');
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, dispatch, navigate]);

  if (user) {
    navigate('/');
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login with your email and password.</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>Email Address</label>
            <input
              id='email'
              type='email'
              name='email'
              className='form-control'
              required
              value={email}
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              name='password'
              className='form-control'
              required
              value={password}
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
