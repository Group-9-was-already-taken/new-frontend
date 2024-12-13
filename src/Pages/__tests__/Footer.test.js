import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer Component', () => {
  test('renders footer content', () => {
    render(<Footer />);
    
    // Test for copyright text or any other footer content
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });
});
