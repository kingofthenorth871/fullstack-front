import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../layout/Navbar';

describe('Navbar component', () => {
  test('renders navbar correctly', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const navbarBrandElement = screen.getByText('Full Stack Application');
    expect(navbarBrandElement).toBeInTheDocument();

    const addUserButton = screen.getByText('Add User');
    expect(addUserButton).toBeInTheDocument();
  });

  test('navbar brand links to home page', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const navbarBrandLink = screen.getByText('Full Stack Application');
    expect(navbarBrandLink).toHaveAttribute('href', '/');
  });

  test('add user button links to add user page', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const addUserButton = screen.getByText('Add User');
    expect(addUserButton).toHaveAttribute('href', '/adduser');
  });
});
