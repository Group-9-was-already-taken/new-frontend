import React from 'react';
import './App.css';
import Header from './Pages/Header';
import Footer from './Pages/Footer';
import Frontpage from './Pages/Frontpage';
import Exercises from './Pages/Exercises';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
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
import MoodLogHistory from './Pages/MoodLogHistory';
import ExerciseLogHistory from './Pages/ExerciseLogHistory';
import ExerciseLog from './Pages/ExerciseLog';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './Pages/Dashboard';
import HelpSites from './Pages/Helpsites';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import QuizSelection from './Pages/Quiz/QuizSelection';
import PHQ9Quiz from './Pages/Quiz/PHQ9Quiz';
import GAD7Quiz from './Pages/Quiz/GAD7Quiz';
import QuizHistory from './Pages/Quiz/QuizHistory';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Frontpage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/exercises" element={<Exercises />} />
      <Route path="/exerciselog" element={<ExerciseLog />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/signlogin" element={<SignLogin />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/quiz" element={<QuizSelection />} />
      <Route path="/quiz/phq9" element={<PHQ9Quiz />} />
      <Route path="/quiz/gad7" element={<GAD7Quiz />} />
      <Route path="/quiz/history" element={<QuizHistory />} />
      <Route path="/officeexercises" element={<OfficeExercise />} />
      <Route path="/yogaexercise" element={<YogaExercise />} />
      <Route path="/muscleexercise" element={<MuscleExercise />} />
      <Route path="/userinfo" element={<UserInfo />} />
      <Route path="/moodlog" element={<MoodLog />} />
      <Route path="/moodloghistory" element={<MoodLogHistory />} />
      <Route path="/exerciseloghistory" element={<ExerciseLogHistory />} />
      <Route path="/helpsites" element={<HelpSites />} />
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter future={{ 
      v7_relativeSplatPath: true,
      v7_startTransition: true 
    }}>
      <AuthProvider>
        <div>
          <Header />
          <main>
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;