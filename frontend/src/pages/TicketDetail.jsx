import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { getTicket } from '../features/tickets/ticketSlice';

const TicketDetail = () => {
  const { ticket, message, isLoading, isError } = useSelector(
    // @ts-ignore
    (state) => state.ticketState
  );

  const { ticketId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }

    // @ts-ignore
    dispatch(getTicket(ticketId));
  }, [dispatch, isError, message, ticketId]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/tickets' />

        <h2>
          {ticket.title}{' '}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>

        <h3>Ticket ID: {ticket._id}</h3>

        <h4>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h4>

        <hr />

        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          {ticket.description}
        </div>
      </header>
    </div>
  );
};

export default TicketDetail;
