import { render, screen } from '@testing-library/react';
import React from 'react';

import AxiosProvider from '../index';

test('AxiosProvider', () => {
  render(<AxiosProvider>Children</AxiosProvider>);

  /* Assertions */
  screen.getByText('Children');
});
