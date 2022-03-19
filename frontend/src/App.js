import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TicketAdd from './pages/TicketAdd';
import TicketDashboard from './pages/TicketDashboard';
import TicketDetail from './pages/TicketDetail';

const App = () => {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/tickets' element={<PrivateRoute />}>
              <Route path='/tickets' element={<TicketDashboard />} />
            </Route>
            <Route path='/tickets' element={<PrivateRoute />}>
              <Route path='/tickets/:ticketId' element={<TicketDetail />} />
            </Route>
            <Route path='/new-ticket' element={<PrivateRoute />}>
              <Route path='/new-ticket' element={<TicketAdd />} />
            </Route>
          </Routes>
        </div>
      </Router>

      <ToastContainer
        position='bottom-right'
        theme='colored'
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        rtl={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
