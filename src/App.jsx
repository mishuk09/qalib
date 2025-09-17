import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AuthForm from './pages/AuthForm';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './utills/ProtectedRoute';
import ProfileCard from './components/users/ProfileCard';
import Navbar from './pages/Navbar';
import LoginForm from './pages/LoginForm ';

function App() {
  return (
    <>
      <Navbar />
      <Routes>

        <Route path='/' element={<Home />} />
        {/* <Route path='/login' element={<LoginForm />} /> */}
        <Route path='/register' element={<AuthForm />} />
        <Route path='/profile' element={<ProfileCard />} />

        {/* Protect the Dashboard route */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={Dashboard} />}
        />
      </Routes>
    </>

  );
}

export default App;
