import { useState } from 'react';
import { useSelector } from 'react-redux';

const NewTicket = () => {
  // @ts-ignore
  const { user } = useSelector((state) => state.auth);
  const [product, setProduct] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();

    console.log(product, description);
  };

  return (
    <>
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
              value={product}
              name='product'
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
            <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              name='description'
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewTicket;
