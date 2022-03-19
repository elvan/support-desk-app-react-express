import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { listTickets, reset } from '../features/tickets/ticketSlice';

const TicketDashboard = () => {
  const { tickets, isLoading, isSuccess, isError } = useSelector(
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

    return () => {};
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url='/' />
      <section>TicketDashboard</section>
    </>
  );
};

export default TicketDashboard;
