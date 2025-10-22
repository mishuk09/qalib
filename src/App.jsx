import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AuthForm from './pages/AuthForm';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './utills/ProtectedRoute';
import ProfileCard from './components/users/ProfileCard';
import Navbar from './pages/Navbar';
import Offer from './components/Offer/Offer';
import AdminHome from './components/Home/AdminHome';
import Layout from './pages/Home/Layout';
import AdminProtectedRoute from './utills/AdminProtectedRoute';
import UserRegister from './pages/UserRegister';
import Qeqprofile from './components/users/Qeqprofile';
import DreamTeam from './components/users/Dreamteam';

function App() {
  return (
    <>
      <Navbar />
      <Routes>

        <Route path='/' element={<Home />} />
        {/* <Route path='/login' element={<LoginForm />} /> */}

        <Route path='/user-register' element={<UserRegister />} />
        <Route path='/register' element={<AuthForm />} />
        <Route path='/profile' element={<ProfileCard />} />
        <Route path='/qeq-profile' element={<Qeqprofile />} />
        <Route path='/dream-team' element={<DreamTeam />} />

        {/* Protect the Dash-board route */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={Dashboard} />}
        />




        {/* admin route */}


        <Route path='/layout' element={<AdminProtectedRoute element={Layout} />} />
        <Route path='/adminhome' element={<AdminProtectedRoute element={AdminHome} />} />



        <Route path="/offer" element={<Offer />} />


      </Routes>
    </>

  );
}

export default App;
