/**
 * Shared UI Components
 */

import { render, screen } from '@testing-library/react';
import React from 'react';

import Shimmer from '../shimmer';

describe('<Shimmer />', () => {
  test('renders', () => {
    render(<Shimmer data-testid="shimmer" />);

    /* Assertions */
    screen.getByTestId('shimmer');
  });
});
