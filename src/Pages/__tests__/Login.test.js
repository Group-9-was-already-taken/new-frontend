import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';
import { useAuth } from '../contexts/AuthContext';
import { login } from '../services/auth';

// Mock the auth context and login service
jest.mock('../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../services/auth', () => ({
  login: jest.fn(),
}));

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Login Component', () => {
  const mockSetUser = jest.fn();
  
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    useAuth.mockImplementation(() => ({ setUser: mockSetUser }));
  });

  const renderLogin = () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  };

  test('renders login form elements', () => {
    renderLogin();
    
    // Check for form elements
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  test('handles input changes', () => {
    renderLogin();
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('handles successful login', async () => {
    const mockUser = { id: 1, email: 'test@example.com' };
    login.mockResolvedValueOnce(mockUser);
    
    renderLogin();
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    // Verify login was called with correct credentials
    expect(login).toHaveBeenCalledWith('test@example.com', 'password123');
    
    // Wait for async actions to complete
    await screen.findByRole('button', { name: 'Login' });
    
    // Verify user was set and navigation occurred
    expect(mockSetUser).toHaveBeenCalledWith(mockUser);
    expect(mockedNavigate).toHaveBeenCalledWith('/dashboard');
  });

  test('handles login error', async () => {
    const errorMessage = 'Invalid credentials';
    login.mockRejectedValueOnce({ response: { data: { error: errorMessage } } });
    
    renderLogin();
    
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginButton);

    // Wait for error message to appear
    const errorElement = await screen.findByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });

  test('navigates to signup page', () => {
    renderLogin();
    
    const signupLink = screen.getByText('Sign up');
    fireEvent.click(signupLink);
    
    expect(mockedNavigate).toHaveBeenCalledWith('/signup');
  });
});
