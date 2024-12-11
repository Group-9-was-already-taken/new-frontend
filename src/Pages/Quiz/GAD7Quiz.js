import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

export default function GAD7Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const questions = [
    "Feeling nervous, anxious, or on edge?",
    "Not being able to stop or control worrying?",
    "Worrying too much about different things?",
    "Trouble relaxing?",
    "Being so restless that it's hard to sit still?",
    "Becoming easily annoyed or irritable?",
    "Feeling afraid as if something awful might happen?"
  ];

  const options = [
    { text: "Not at all", value: 0 },
    { text: "Several days", value: 1 },
    { text: "More than half the days", value: 2 },
    { text: "Nearly every day", value: 3 }
  ];

  const handleAnswer = async (value) => {
    const newAnswers = [...answers, { questionNumber: currentQuestion + 1, answer: value }];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const totalScore = newAnswers.reduce((sum, ans) => sum + ans.answer, 0);
      setScore(totalScore);
      await saveResults(totalScore, newAnswers);
      setShowResults(true);
    }
  };

  const getSeverity = (score) => {
    if (score >= 15) return "Severe";
    if (score >= 10) return "Moderate";
    if (score >= 5) return "Mild";
    return "Minimal";
  };

  const getRecommendations = (score) => {
    if (score >= 15) {
      return [
        "Immediate professional help is strongly recommended",
        "Contact your healthcare provider or mental health professional",
        "Consider therapy or counseling",
        "Learn and practice anxiety management techniques",
        "Establish a support network"
      ];
    } else if (score >= 10) {
      return [
        "Schedule an appointment with a mental health professional",
        "Practice regular relaxation techniques",
        "Consider counseling options",
        "Maintain regular exercise routine",
        "Practice stress management"
      ];
    } else if (score >= 5) {
      return [
        "Monitor your anxiety levels",
        "Practice mindfulness or meditation",
        "Maintain healthy lifestyle habits",
        "Consider talking to a counselor if symptoms persist",
        "Learn basic anxiety management techniques"
      ];
    } else {
      return [
        "Continue monitoring your mental health",
        "Maintain healthy habits",
        "Practice regular self-care",
        "Stay connected with support system"
      ];
    }
  };

  const saveResults = async (totalScore, finalAnswers) => {
    setSaving(true);
    try {
      const severity = getSeverity(totalScore);
      const recommendations = getRecommendations(totalScore);
      
      await axios.post('http://localhost:3001/api/quiz-results', {
        quizType: 'GAD7',
        score: totalScore,
        answers: finalAnswers,
        severity,
        recommendations,
        moodRating: 3, // Default value, you might want to add a mood rating input
        stressLevel: 3, // Default value, you might want to add a stress level input
        sleepHours: 7, // Default value, you might want to add a sleep hours input
        followUpDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 week follow-up
        notes: ''
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (error) {
      console.error('Error saving quiz results:', error);
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="quiz-container">
        <div className="quiz-content">
          <h2>Please log in to take the quiz</h2>
          <button className="start-quiz-btn" onClick={() => navigate('/login')}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-content">
        {!showResults ? (
          <>
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            
            <div className="question-section">
              <h2>Question {currentQuestion + 1} of {questions.length}</h2>
              <p className="question-text">Over the last 2 weeks, how often have you been bothered by:</p>
              <h3>{questions[currentQuestion]}</h3>
            </div>

            <div className="options-grid">
              {options.map((option) => (
                <button
                  key={option.value}
                  className="option-button"
                  onClick={() => handleAnswer(option.value)}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="result-section">
            <h2>Your GAD-7 Score: {score}</h2>
            <p>Severity: {getSeverity(score)}</p>
            
            <div className="feedback-section">
              <h3>Recommendations:</h3>
              <ul>
                {getRecommendations(score).map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>

            {score >= 10 && (
              <div className="emergency-section">
                <h3>Need immediate help?</h3>
                <p>If you're experiencing severe anxiety or need immediate support:</p>
                <p>National Crisis Helpline: 1-800-273-8255</p>
                <p>Available 24/7</p>
                <button 
                  className="emergency-help-btn"
                  onClick={() => window.location.href = 'tel:1-800-273-8255'}
                >
                  Call Now
                </button>
              </div>
            )}

            <button 
              className="start-quiz-btn"
              onClick={() => navigate('/quiz')}
              disabled={saving}
            >
              {saving ? 'Saving Results...' : 'Back to Quizzes'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}