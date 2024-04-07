import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Home from '../pages/Home';

jest.mock('axios');

const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    address: '123 Street',
    countrycode: '47',
    phonenumber: '1234567890',
    birthdate: '2000-01-01',
  },
  {
    id: '2',
    name: 'Jane Doe',
    address: '456 Avenue',
    countrycode: '49',
    phonenumber: '9876543210',
    birthdate: '2001-02-02',
  }
];

describe('Home component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValueOnce({ data: mockUsers });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders user list correctly', async () => {
    render(<Router><Home /></Router>);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });
  });

  test('displays correct number of users', async () => {
    render(<Router><Home /></Router>);

    await waitFor(() => {
      expect(screen.getByText('Number of Users: 2')).toBeInTheDocument();
    });
  });

  test('displays correct number of people born in a leap year', async () => {
    render(<Router><Home /></Router>);

    await waitFor(() => {
      expect(screen.getByText('Number of People Born in a Leap Year: 0')).toBeInTheDocument();
    });
  });

  test('displays correct average name length', async () => {
    render(<Router><Home /></Router>);

    await waitFor(() => {
      expect(screen.getByText('Average Name Length: 7.00')).toBeInTheDocument();
    });
  });

  // Add more test cases as needed
});
