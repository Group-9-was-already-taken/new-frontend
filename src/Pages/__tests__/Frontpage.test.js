import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Frontpage from '../Frontpage';

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Frontpage Component', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  const renderFrontpage = () => {
    render(
      <BrowserRouter>
        <Frontpage />
      </BrowserRouter>
    );
  };

  test('renders all section headings', () => {
    renderFrontpage();
    
    expect(screen.getByText('Exercises')).toBeInTheDocument();
    expect(screen.getByText('List of professional help sites')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Go to your profile')).toBeInTheDocument();
  });

  test('displays section descriptions', () => {
    renderFrontpage();
    
    expect(screen.getByText(/These exercises are meant to clear your mind and help you build up muscle and help you relax and clear your mind./i)).toBeInTheDocument();
    expect(screen.getByText(/If you want to look up more information on things, this is where you go!/i)).toBeInTheDocument();
  });

  test('renders all section images with correct alt text', () => {
    renderFrontpage();
    
    expect(screen.getByAltText('Exercise section thumbnail')).toBeInTheDocument();
    expect(screen.getByAltText('Help section thumbnail')).toBeInTheDocument();
    expect(screen.getByAltText('About Us section thumbnail')).toBeInTheDocument();
    expect(screen.getByAltText('Profile section thumbnail')).toBeInTheDocument();
  });

  test('navigates to correct routes when clicking section links', () => {
    renderFrontpage();
    
    // Find and click all navigation elements
    const links = screen.getAllByText('Click here to find out more!');
    
    // Click Exercises link
    fireEvent.click(links[0]);
    expect(mockedNavigate).toHaveBeenCalledWith('/exercises');
    
    // Click Help Sites link
    fireEvent.click(links[1]);
    expect(mockedNavigate).toHaveBeenCalledWith('/helpsites');
    
    // Click About Us link
    fireEvent.click(links[2]);
    expect(mockedNavigate).toHaveBeenCalledWith('/aboutus');
    
    // Click Profile link
    fireEvent.click(links[3]);
    expect(mockedNavigate).toHaveBeenCalledWith('/profile');
  });

  test('verifies image sources', () => {
    renderFrontpage();
    
    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', 'https://as1.ftcdn.net/v2/jpg/01/41/86/02/1000_F_141860204_UWGjTQLGs0feOoBojJ5NLVpeJUL8TFMn.jpg');
    expect(images[1]).toHaveAttribute('src', 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg');
    expect(images[2]).toHaveAttribute('src', './Placeholder.jpg');
    expect(images[3]).toHaveAttribute('src', 'https://media.istockphoto.com/id/1352519860/fi/valokuva/verkonk%C3%A4ytt%C3%A4jien-henkil%C3%B6tietojen-turvallinen-k%C3%A4ytt%C3%B6-tietosuoja-ja-suojattu-internetyhteys.jpg?s=2048x2048&w=is&k=20&c=uR7TVsieN3pAkukJ2SViGTQB7gqeBmQrM5HpePHYMZo=');
  });
});
