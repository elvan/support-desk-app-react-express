import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackButton from '../components/BackButton';
import { createTicket, reset } from '../features/tickets/ticketSlice';

const NewTicket = () => {
  // @ts-ignore
  const { user } = useSelector((state) => state.authState);

  const { isLoading, isSuccess, isError, message } = useSelector(
    // @ts-ignore
    (state) => state.ticketState
  );

  const [product, setProduct] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    // @ts-ignore
    dispatch(createTicket({ product, description }));
  };

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success('Ticket created successfully');
      dispatch(reset());
      navigate('/tickets');
    }

    dispatch(reset());
  }, [isSuccess, isError, message, dispatch, navigate]);

  return (
    <>
      <BackButton url='/tickets' />

      <section className='heading'>
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input id='name' type='text' value={user.name} disabled />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Customer Email</label>
          <input id='email' type='text' value={user.email} disabled />
        </div>

        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='product'>Product</label>
            <select
              id='product'
              name='product'
              value={product}
              disabled={isLoading}
              onChange={(event) => setProduct(event.target.value)}
            >
              <option value=''>Select Product</option>
              <option value='Books'>Books</option>
              <option value='Movies'>Movies</option>
              <option value='Music'>Music</option>
              <option value='Games'>Games</option>
              <option value='Electronics'>Electronics</option>
              <option value='Computers'>Computers</option>
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input
              id='title'
              name='title'
              type='text'
              value={title}
              disabled={isLoading}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              name='description'
              rows={3}
              value={description}
              disabled={isLoading}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className='form-group'>
            <button
              type='submit'
              className='btn btn-block'
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewTicket;
