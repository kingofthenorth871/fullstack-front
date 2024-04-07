import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import EditUser from '../users/EditUser';
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

describe('EditUser component', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ id: '1' }); // Mock useParams to return a user id
    axios.get.mockResolvedValueOnce({
      data: {
        name: 'John Doe',
        address: '123 Street',
        countrycode: '47',
        phonenumber: '1234567890',
        birthdate: '2000-01-01',
      }
    });
    window.alert = jest.fn(); // Mock window.alert
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  test('renders the form fields correctly and loads user data', async () => {
    renderWithRouter(<EditUser />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Country Code')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Birthdate')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toHaveValue('John Doe');
      expect(screen.getByLabelText('Address')).toHaveValue('123 Street');
      expect(screen.getByLabelText('Country Code')).toHaveValue('47');
      expect(screen.getByLabelText('Phone Number')).toHaveValue('1234567890');
      expect(screen.getByLabelText('Birthdate')).toHaveValue('2000-01-01');
    });
  });

  test('submits the form with valid data', async () => {
    renderWithRouter(<EditUser />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText('Address'), { target: { value: '456 Avenue' } });
    fireEvent.change(screen.getByLabelText('Country Code'), { target: { value: '49' } });
    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByLabelText('Birthdate'), { target: { value: '2001-02-02' } });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledTimes(1);
      expect(axios.put).toHaveBeenCalledWith('http://localhost:8080/user/1', {
        name: 'Jane Doe',
        address: '456 Avenue',
        countrycode: '49',
        phonenumber: '9876543210',
        birthdate: '2001-02-02',
      });
    });
  });

  test('displays an alert when submitting with invalid data', async () => {
    renderWithRouter(<EditUser />);
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('All input fields are required');
    });
  });
});
