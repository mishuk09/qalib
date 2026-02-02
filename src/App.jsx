import { Route, Routes } from "react-router-dom";
import AdminHome from "./components/Home/AdminHome";
import Offer from "./components/Offer/Offer";
import BigFive from "./components/users/BigFive";
import BigFiveData from "./components/users/BigFiveData";
import DreamTeam from "./components/users/Dreamteam";
import DreamTeamData from "./components/users/DreamTeamData";
import ProfileCard from "./components/users/ProfileCard";
import Qeqprofile from "./components/users/Qeqprofile";
import QeqprofileOriginal from "./components/users/QeqprofileOriginal";
import SurveyForm from "./components/users/SurveyForm";
import SurveyViewer from "./components/users/SurveyViewer";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Layout from "./pages/Home/Layout";
import LoginForm from "./pages/LoginForm ";
import Navbar from "./pages/Navbar";
import RegisterForm from "./pages/RegisterForm";
import Resources from "./pages/Resources";
import AdminProtectedRoute from "./utills/AdminProtectedRoute";
import ProtectedRoute from "./utills/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />

        <Route path="/user-register" element={<RegisterForm />} />
        {/* <Route path="/profile" element={<ProfileCard />} /> */}
        <Route path="/qeq-profile" element={<QeqprofileOriginal />} />
        <Route path="/qeq-profile-original" element={<Qeqprofile />} />
        <Route path="/dream-team" element={<DreamTeam />} />

        <Route path="/survey-form" element={<SurveyForm />} />
        <Route path="/dream-team-add" element={<DreamTeamData />} />
        <Route path="/big-five" element={<BigFive />} />
        <Route path="/big-five-add" element={<BigFiveData />} />
        <Route path="/survey" element={<SurveyViewer />} />
        <Route path="/resources" element={<Resources />} />

        {/* Protect the Dash-board route */}
        <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
        <Route path="/profile" element={<ProtectedRoute element={ProfileCard} />} />
        {/* <Route
          path="/post-up"
          element={<ProtectedRoute element={Dashboard} />}
        /> */}

        {/* admin route */}

        <Route path="/layout" element={<AdminProtectedRoute element={Layout} />} />
        <Route path="/adminhome" element={<AdminProtectedRoute element={AdminHome} />} />

        <Route path="/offer" element={<Offer />} />
      </Routes>
    </>
  );
}

export default App;
