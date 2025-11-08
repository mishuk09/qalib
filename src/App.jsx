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
import Qeqprofile from './components/users/Qeqprofile';
import DreamTeam from './components/users/Dreamteam';
import RegisterForm from './pages/RegisterForm';
import SurveyForm from './components/users/SurveyForm';
import DreamTeamData from './components/users/DreamTeamData';
import BigFive from './components/users/BigFive';
import BigFiveData from './components/users/BigFiveData';

function App() {
  return (
    <>
      <Navbar />
      <Routes>

        <Route path='/' element={<Home />} />
        {/* <Route path='/login' element={<LoginForm />} /> */}

        <Route path='/user-register' element={<RegisterForm />} />
        <Route path='/register' element={<AuthForm />} />
        <Route path='/profile' element={<ProfileCard />} />
        <Route path='/qeq-profile' element={<Qeqprofile />} />
        <Route path='/dream-team' element={<DreamTeam />} />


        <Route path='/survey-form' element={<SurveyForm />} />
        <Route path='/dream-team-add' element={<DreamTeamData />} />
        <Route path='/big-five' element={<BigFive />} />
        <Route path='/big-five-add' element={<BigFiveData />} />



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
