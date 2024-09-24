/**
 * Shared UI Components
 */

import React from 'react';

import { render, screen } from '@testing-library/react';

import Button from '../button';

describe('<Button />', () => {
  test('renders', () => {
    render(<Button>Action</Button>);

    /* Assertions */
    screen.getByText('Action');
  });
});
