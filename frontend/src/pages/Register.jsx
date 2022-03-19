import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { register, reset } from '../features/auth/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, message, isLoading, isSuccess, isError } = useSelector(
    // @ts-ignore
    (state) => state.authState
  );

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        name: name,
        email: email,
        password: password,
      };
      // @ts-ignore
      dispatch(register(userData));
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
      toast.success('Registered successfully');
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
          <FaUser /> Register
        </h1>
        <p>Please fill in this form to create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              id='name'
              type='text'
              name='name'
              className='form-control'
              required
              value={name}
              onChange={onChange}
              disabled={isLoading}
            />
          </div>

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
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password2'>Confirm Password</label>
            <input
              id='password2'
              type='password'
              name='password2'
              className='form-control'
              required
              value={password2}
              onChange={onChange}
              disabled={isLoading}
            />
          </div>

          <div className='form-group'>
            <button
              type='submit'
              className='btn btn-block'
              disabled={isLoading}
            >
              Register
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
