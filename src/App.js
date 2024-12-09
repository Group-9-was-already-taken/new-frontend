import './App.css';
import Header from './Pages/Header';
import Footer from './Pages/Footer';
import Frontpage from './Pages/Frontpage';
import Exercises from './Pages/Exercises';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './Pages/Profile';
import AboutUs from './Pages/AboutUs';
import SignLogin from './Pages/signLogin';
import Login from './Pages/Login';
import SignUp from './Pages/Signup';
import OfficeExercise from './Pages/ExercisePages/OfficeExercise';
import YogaExercise from './Pages/ExercisePages/YogaExercise';
import MuscleExercise from './Pages/ExercisePages/MuscleExercise';
import UserInfo from './Pages/UserInfo';
import MoodLog from './Pages/MoodLog';
import MoodLogHistory from './Pages/MoodlLogHistory';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './Pages/Dashboard';

export default function App() {
  return(
    <AuthProvider>
      <Router>
        <div>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Frontpage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/exercises" element={<Exercises />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/signlogin" element={<SignLogin />}/>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/officeexercises" element={<OfficeExercise />} />
              <Route path="/yogaexercise" element={<YogaExercise />} />
              <Route path="/muscleexercise" element={<MuscleExercise />} />
              <Route path="/userinfo" element={<UserInfo />} />
              <Route path="/moodlog" element={<MoodLog />} />
              <Route path="/moodloghistory" element={<MoodLogHistory />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
