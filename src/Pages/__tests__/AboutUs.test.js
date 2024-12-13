import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutUs from '../AboutUs';

describe('AboutUs Component', () => {
  test('renders about us content', () => {
    render(<AboutUs />);
    
    // Test for heading
    expect(screen.getByText(/about us/i)).toBeInTheDocument();
  });

  test('renders about us information', () => {
    render(<AboutUs />);
    
    // The component should contain some descriptive text
    const aboutSection = screen.getByRole('main');
    expect(aboutSection).toBeInTheDocument();
  });
});
