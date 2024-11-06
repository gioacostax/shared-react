/**
 * Shared UI Components
 */

import React from 'react';

import { render, screen } from '@testing-library/react';

import Checkbox from '../checkbox';

describe('<Checkbox />', () => {
  test('renders', () => {
    render(<Checkbox>Label</Checkbox>);

    /* Assertions */
    screen.getByText('Label');
  });

  test('renders with property: "indeterminate"', () => {
    render(
      <Checkbox data-testid="test" indeterminate>
        Label
      </Checkbox>,
    );

    /* Assertions */
    expect(screen.getByTestId('test').getAttribute('data-indeterminate')).toBe('true');
  });
});
