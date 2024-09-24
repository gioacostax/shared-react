/**
 * Shared UI Components
 */

import React from 'react';

import { render, screen } from '@testing-library/react';

import Shimmer from '../shimmer';

describe('<Shimmer />', () => {
  test('renders', () => {
    render(<Shimmer data-testid="shimmer" />);

    /* Assertions */
    screen.getByTestId('shimmer');
  });
});
