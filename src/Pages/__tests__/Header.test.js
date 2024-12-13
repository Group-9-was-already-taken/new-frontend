import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';

// Wrap component with BrowserRouter since it likely contains Links
const renderHeader = () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

describe('Header Component', () => {
  test('renders header navigation', () => {
    renderHeader();
    
    // Test for navigation links
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });
});
