import React from 'react';
import { render, screen } from '@testing-library/react';
import Auth from './pages/Auth/Auth';

test('renders auth page', () => {
  render(<Auth />);
  const linkElement = screen.getByText(/re-enter password/i);
  expect(linkElement).toBeInTheDocument();
});
