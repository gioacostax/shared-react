/**
 * Shared UI Components
 */

import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import TextArea from '../textArea';

describe('<TextArea />', () => {
  test('renders', () => {
    render(<TextArea data-testid="input" />);

    /* Assertions */
    screen.getByTestId('input');
  });

  test('renders with property: "label"', () => {
    render(<TextArea>Label</TextArea>);

    /* Assertions */
    screen.getByText('Label');
  });

  test('renders with property: "helper"', () => {
    render(<TextArea helper="Helper" />);

    /* Assertions */
    screen.getByText('Helper');
  });

  test('renders with property: "keyPattern"', () => {
    render(<TextArea data-testid="input" keyPattern={/^\d*$/} />);

    /* Actions */
    fireEvent.input(screen.getByTestId<HTMLInputElement>('input'), { target: { value: '1234' } });

    /* Assertions */
    expect(screen.getByTestId<HTMLInputElement>('input').value).toBe('1234');

    /* Actions */
    fireEvent.input(screen.getByTestId<HTMLInputElement>('input'), { target: { value: 'x' } });

    /* Assertions */
    expect(screen.getByTestId<HTMLInputElement>('input').value).toBe('1234');

    /* Actions */
    fireEvent.input(screen.getByTestId<HTMLInputElement>('input'), { target: { value: '' } });

    /* Assertions */
    expect(screen.getByTestId<HTMLInputElement>('input').value).toBe('');
  });

  test('renders with property: "resolver"', () => {
    render(<TextArea data-testid="input" resolver={(value) => `${value}-static`} />);

    /* Actions */
    fireEvent.input(screen.getByTestId<HTMLInputElement>('input'), { target: { value: 'text' } });

    /* Assertions */
    expect(screen.getByTestId<HTMLInputElement>('input').value).toBe('text-static');
  });

  test('renders with property: "keyPattern" & "resolver"', () => {
    render(
      <TextArea data-testid="input" keyPattern={/^\d*$/} resolver={(value) => `${value}.00`} />,
    );

    /* Actions */
    fireEvent.input(screen.getByTestId<HTMLInputElement>('input'), { target: { value: '1234' } });

    /* Assertions */
    expect(screen.getByTestId<HTMLInputElement>('input').value).toBe('1234.00');
  });
});
