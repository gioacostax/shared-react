import React from 'react';

import { render, screen } from '@testing-library/react';

import AxiosProvider from '../index';

test('AxiosProvider', () => {
  render(<AxiosProvider>Children</AxiosProvider>);

  /* Assertions */
  screen.getByText('Children');
});
