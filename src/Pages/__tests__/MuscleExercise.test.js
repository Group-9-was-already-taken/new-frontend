import React from 'react';
import { render, screen } from '@testing-library/react';
import MuscleExercise from '../MuscleExercise';

describe('MuscleExercise Component', () => {
  test('renders main headings', () => {
    render(<MuscleExercise />);
    
    // Check if main headings are present
    expect(screen.getByText('Muscle Building Exercises')).toBeInTheDocument();
    expect(screen.getByText('Upper Body')).toBeInTheDocument();
    expect(screen.getByText('Lower Body')).toBeInTheDocument();
  });

  test('renders exercise instructions', () => {
    render(<MuscleExercise />);
    
    // Check if some exercise titles are present
    expect(screen.getByText('Knee Push Up')).toBeInTheDocument();
    expect(screen.getByText('Arm Extensions')).toBeInTheDocument();
    expect(screen.getByText('Forward Lunges')).toBeInTheDocument();
  });

  test('images have alt text for accessibility', () => {
    render(<MuscleExercise />);
    
    // Check if images have alt text
    const images = screen.getAllByRole('img');
    images.forEach(img => {
      expect(img).toHaveAttribute('alt');
    });
  });
});
