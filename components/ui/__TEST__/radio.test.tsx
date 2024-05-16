/**
 * Shared UI Components
 */

import { render, screen } from '@testing-library/react';

import Radio from '../radio';

describe('<Radio />', () => {
  test('renders', () => {
    render(<Radio>Label</Radio>);

    /* Assertions */
    screen.getByText('Label');
  });
});
