/**
 * Shared UI Components
 */

import React from 'react';

import { render, screen } from '@testing-library/react';

import Radio from '../radio';

describe('<Radio />', () => {
  test('renders', () => {
    render(<Radio>Label</Radio>);

    /* Assertions */
    screen.getByText('Label');
  });

  test('renders with property: "indeterminate"', () => {
    render(
      <Radio data-testid="test" indeterminate>
        Label
      </Radio>,
    );

    /* Assertions */
    expect(screen.getByTestId('test').getAttribute('data-indeterminate')).toBe('true');
  });
});
