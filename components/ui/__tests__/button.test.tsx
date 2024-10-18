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

  test('renders with property variant: "text"', () => {
    render(<Button variant="text">Action</Button>);

    /* Assertions */
    screen.getByText('Action');
  });

  test('renders with property variant: "secondary"', () => {
    render(<Button variant="secondary">Action</Button>);

    /* Assertions */
    screen.getByText('Action');
  });

  test('renders with property variant: "ghost"', () => {
    render(<Button variant="ghost">Action</Button>);

    /* Assertions */
    screen.getByText('Action');
  });

  test('renders with property variant: "outline"', () => {
    render(<Button variant="outline">Action</Button>);

    /* Assertions */
    screen.getByText('Action');
  });
});
