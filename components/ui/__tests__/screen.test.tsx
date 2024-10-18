/**
 * Shared UI Components
 */

import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import Screen from '../screen';

describe('<Screen />', () => {
  test('renders', () => {
    render(<Screen>Test</Screen>);

    /* Assertions */
    expect(screen.queryByText('Test')).toBeNull();
  });

  test('renders with props: isVisible', () => {
    render(<Screen isVisible>Test</Screen>);

    /* Assertions */
    screen.getByText('Test');
  });

  test('renders and click outside', () => {
    const onClose = vi.fn();
    render(
      <Screen data-testid="screen" isVisible onClose={onClose}>
        Children
      </Screen>,
    );

    /* Actions */
    fireEvent.click(screen.getByTestId('screen'));

    /* Assertions */
    expect(onClose).not.toHaveBeenCalled();
  });

  test('renders with property: "closeOnClickOutside" -> click outside', () => {
    const onClose = vi.fn();
    render(
      <Screen closeOnClickOutside data-testid="screen" isVisible onClose={onClose}>
        Children
      </Screen>,
    );

    /* Actions */
    fireEvent.click(screen.getByTestId('screen'));

    /* Assertions */
    expect(onClose).toHaveBeenCalledOnce();
  });
});
