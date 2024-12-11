import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './QuizHistory.css';
import Chart from 'chart.js/auto';

const QuizHistory = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [expandedRows, setExpandedRows] = useState(new Set());
  
  const scoreChartRef = useRef(null);
  const moodChartRef = useRef(null);
  const scoreChartInstance = useRef(null);
  const moodChartInstance = useRef(null);

  const fetchQuizResults = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/quiz-results');
      setQuizResults(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch quiz results');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizResults();
  }, []);

  useEffect(() => {
    if (quizResults.length > 0) {
      updateCharts();
    }
    return () => {
      if (scoreChartInstance.current) {
        scoreChartInstance.current.destroy();
      }
      if (moodChartInstance.current) {
        moodChartInstance.current.destroy();
      }
    };
  }, [quizResults, filterType]);

  const updateCharts = () => {
    const filteredData = filterType === 'all'
      ? quizResults
      : quizResults.filter(result => result.quiz_type === filterType);

    const dates = filteredData.map(result =>
      new Date(result.created_at).toLocaleDateString()
    ).reverse();

    const scores = filteredData.map(result => result.score).reverse();
    const moodRatings = filteredData.map(result => result.mood_rating || 0).reverse();
    const stressLevels = filteredData.map(result => result.stress_level || 0).reverse();

    // Destroy existing charts
    if (scoreChartInstance.current) {
      scoreChartInstance.current.destroy();
    }
    if (moodChartInstance.current) {
      moodChartInstance.current.destroy();
    }

    // Create Score Progress Chart
    const scoreCtx = scoreChartRef.current.getContext('2d');
    scoreChartInstance.current = new Chart(scoreCtx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Quiz Score',
          data: scores,
          borderColor: '#2196F3',
          tension: 0.4,
          fill: false
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Score Progress Over Time'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: Math.max(...scores) + 5
          }
        }
      }
    });

    // Create Mood & Stress Chart
    const moodCtx = moodChartRef.current.getContext('2d');
    moodChartInstance.current = new Chart(moodCtx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Mood Rating',
            data: moodRatings,
            borderColor: '#4CAF50',
            tension: 0.4,
            fill: false
          },
          {
            label: 'Stress Level',
            data: stressLevels,
            borderColor: '#F44336',
            tension: 0.4,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Mood & Stress Levels Over Time'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 5
          }
        }
      }
    });
  };

  const toggleRow = (id) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  const getQuizTypeLabel = (type) => {
    switch (type) {
      case 'phq9':
        return 'PHQ-9 (Depression)';
      case 'gad7':
        return 'GAD-7 (Anxiety)';
      default:
        return type;
    }
  };

  const getSeverityLabel = (score, quizType) => {
    if (quizType === 'phq9') {
      if (score >= 20) return 'Severe';
      if (score >= 15) return 'Moderately Severe';
      if (score >= 10) return 'Moderate';
      if (score >= 5) return 'Mild';
      return 'None-Minimal';
    } else if (quizType === 'gad7') {
      if (score >= 15) return 'Severe';
      if (score >= 10) return 'Moderate';
      if (score >= 5) return 'Mild';
      return 'None-Minimal';
    }
    return 'Unknown';
  };

  if (loading) {
    return <div className="loading">Loading quiz results...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const filteredResults = filterType === 'all'
    ? quizResults
    : quizResults.filter(result => result.quiz_type === filterType);

  const totalAssessments = filteredResults.length;
  const averageScore = totalAssessments > 0
    ? Math.round(filteredResults.reduce((sum, result) => sum + result.score, 0) / totalAssessments)
    : 0;
  const latestScore = filteredResults[0]?.score || 0;

  return (
    <div className="quiz-history-page">
      <div className="quiz-history-container">
        <div className="header-section">
          <h2>Quiz History</h2>
          <div className="filter-section">
            <label>Filter by type: </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Assessments</option>
              <option value="phq9">PHQ-9 (Depression)</option>
              <option value="gad7">GAD-7 (Anxiety)</option>
            </select>
          </div>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Assessments</h3>
            <p>{totalAssessments}</p>
          </div>
          <div className="stat-card">
            <h3>Average Score</h3>
            <p>{averageScore}</p>
          </div>
          <div className="stat-card">
            <h3>Latest Score</h3>
            <p>{latestScore}</p>
          </div>
        </div>

        <div className="charts-container">
          <div className="chart-card">
            <canvas ref={scoreChartRef}></canvas>
          </div>
          <div className="chart-card">
            <canvas ref={moodChartRef}></canvas>
          </div>
        </div>

        <div className="table-container">
          <table className="results-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Score</th>
                <th>Severity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result) => (
                <React.Fragment key={result._id}>
                  <tr>
                    <td>{new Date(result.created_at).toLocaleDateString()}</td>
                    <td>{getQuizTypeLabel(result.quiz_type)}</td>
                    <td>{result.score}</td>
                    <td>{getSeverityLabel(result.score, result.quiz_type)}</td>
                    <td>
                      <button
                        onClick={() => toggleRow(result._id)}
                        className="toggle-button"
                      >
                        {expandedRows.has(result._id) ? 'Hide Details' : 'Show Details'}
                      </button>
                    </td>
                  </tr>
                  {expandedRows.has(result._id) && (
                    <tr className="expanded-row">
                      <td colSpan="5">
                        <div className="expanded-content">
                          <div className="details-section">
                            <h4>Recommendations</h4>
                            <p>{result.recommendations || 'No recommendations available'}</p>
                          </div>
                          <div className="details-section">
                            <h4>Notes</h4>
                            <p>{result.notes || 'No notes recorded'}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuizHistory;
