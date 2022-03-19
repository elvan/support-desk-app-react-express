import { Link } from 'react-router-dom';

const TicketItem = ({ ticket }) => {
  return (
    <div className='ticket'>
      <div>{new Date(ticket.createdAt).toLocaleString('en-us')}</div>
      <div>{ticket.title}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>

      <Link to={`/tickets/${ticket._id}`}>View</Link>
    </div>
  );
};

export default TicketItem;
