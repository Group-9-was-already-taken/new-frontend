import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuizSelection() {
  const navigate = useNavigate();

  const quizzes = [
    {
      id: 'phq9',
      title: 'Depression Screening (PHQ-9)',
      description: 'This quiz helps assess symptoms of depression over the past two weeks.',
      time: '5-10 minutes'
    },
    {
      id: 'gad7',
      title: 'Anxiety Screening (GAD-7)',
      description: 'This quiz helps assess symptoms of anxiety over the past two weeks.',
      time: '5-10 minutes'
    }
  ];

  return (
    <div className="quiz-selection-container">
      <div className="quiz-selection-content">
        <div className="quiz-header">
          <h1>Mental Health Assessments</h1>
          <button 
            className="view-history-btn"
            onClick={() => navigate('/quiz/history')}
          >
            View Assessment History
          </button>
        </div>
        
        <div className="quiz-disclaimer">
          <p>
            <strong>Important Note:</strong> These assessments are for screening purposes only 
            and are not meant to diagnose any mental health condition. Please consult with a 
            mental health professional for proper evaluation and diagnosis.
          </p>
        </div>

        <div className="quiz-grid">
          {quizzes.map(quiz => (
            <div 
              key={quiz.id} 
              className="quiz-card"
              onClick={() => navigate(`/quiz/${quiz.id}`)}
            >
              <h2>{quiz.title}</h2>
              <p>{quiz.description}</p>
              <div className="quiz-time">
                <span>Estimated time: {quiz.time}</span>
              </div>
              <button className="start-quiz-btn">
                Start Assessment
              </button>
            </div>
          ))}
        </div>

        <div className="quiz-help-section">
          <h3>Need Immediate Help?</h3>
          <p>
            If you're experiencing severe distress or having thoughts of self-harm, 
            please reach out for immediate support:
          </p>
          <button 
            className="emergency-help-btn"
            onClick={() => window.open('https://mieli.fi/en/support-and-help/crisis-helpline/', '_blank')}
          >
            Get Emergency Help
          </button>
        </div>

        <div className="quiz-button" onClick={() => navigate('/dashboard')}>
          <h1>Return to Dashboard</h1>
        </div>
      </div>
    </div>
  );
}
