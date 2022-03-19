import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import TicketItem from '../components/TicketItem';
import { listTickets, reset } from '../features/tickets/ticketSlice';

const Tickets = () => {
  const { tickets, isLoading, isSuccess } = useSelector(
    // @ts-ignore
    (state) => state.ticketState
  );

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(listTickets());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url='/' />

      <h1>Tickets</h1>

      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Title</div>
          <div>Status</div>
          <div></div>
        </div>

        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  );
};

export default Tickets;
