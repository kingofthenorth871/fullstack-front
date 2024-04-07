import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AddUser from '../users/AddUser';
import axios from 'axios';

jest.mock('axios');

const renderWithRouter = (component) => {
  return render(
    <Router>
      {component}
    </Router>
  );
};

describe('AddUser component', () => {
  beforeEach(() => {
    axios.post.mockResolvedValue({});
    window.alert = jest.fn(); // Mock window.alert
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  test('renders the form fields correctly', () => {
    renderWithRouter(<AddUser />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Country Code')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Birthdate')).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    renderWithRouter(<AddUser />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Address'), { target: { value: '123 Street' } });
    fireEvent.change(screen.getByLabelText('Country Code'), { target: { value: '47' } }); // Corrected label text
    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('Birthdate'), { target: { value: '2000-01-01' } });
  
    fireEvent.click(screen.getByText('Submit'));
  
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/user', {
        name: 'John Doe',
        address: '123 Street',
        countrycode: '47',
        phonenumber: '1234567890',
        birthdate: '2000-01-01',
      });
    });
  });

  test('displays an alert when submitting with invalid data', async () => {
    renderWithRouter(<AddUser />);
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('All input fields are required');
    });
  });
});