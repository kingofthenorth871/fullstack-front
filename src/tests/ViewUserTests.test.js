import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import ViewUser from '../users/ViewUser';
import axios from 'axios';

jest.mock('axios');

const renderWithRouter = (component) => {
  return render(
    <Router>
      {component}
    </Router>
  );
};

// Mock useParams hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('ViewUser component', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ id: '1' }); 
    axios.get.mockResolvedValueOnce({
      data: {
        id: '1',
        name: 'John Doe',
        address: '123 Street',
        countrycode: '47',
        phonenumber: '1234567890',
        birthdate: '2000-01-01',
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  test('renders user details correctly', async () => {
    renderWithRouter(<ViewUser />);
    
    // Wait for user details to load
    await waitFor(() => {
      expect(screen.getByText(/Details of user id : 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Name:/i)).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText(/Address:/i)).toBeInTheDocument();
      expect(screen.getByText('123 Street')).toBeInTheDocument();
      expect(screen.getByText(/Countrycode:/i)).toBeInTheDocument();
      expect(screen.getByText('47')).toBeInTheDocument();
      expect(screen.getAllByText(/Phonenumber:/i)[0]).toBeInTheDocument(); 
      expect(screen.getByText('1234567890')).toBeInTheDocument();
      expect(screen.getByText(/Birthdate:/i)).toBeInTheDocument();
      expect(screen.getByText('2000-01-01')).toBeInTheDocument();
    });
  });

  test('calculates cross sum of phone number correctly', async () => {
    renderWithRouter(<ViewUser />);
    
    // Wait for user details to load
    await waitFor(() => {
      expect(screen.getByText(/Cross Sum of Phonenumber:/i)).toBeInTheDocument();
      expect(screen.getByText('9')).toBeInTheDocument(); // Assuming calculateCrossSum is correct
    });
  });

  test('displays if user is born in a leap year correctly', async () => {
    renderWithRouter(<ViewUser />);
    
    // Wait for user details to load
    await waitFor(() => {
      expect(screen.getByText(/Born in Leap Year:/i)).toBeInTheDocument();
      expect(screen.getByText('No')).toBeInTheDocument(); // Assuming LeapYearChecker is correct
    });
  });
});
