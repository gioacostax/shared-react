/**
 * Shared UI Components
 */

import { render, screen } from '@testing-library/react';

import Checkbox from '../checkbox';

describe('<Checkbox />', () => {
  test('renders', () => {
    render(<Checkbox>Label</Checkbox>);

    /* Assertions */
    screen.getByText('Label');
  });
});
