/**
 * Shared UI Components
 */

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
    render(<TextArea keyPattern={/^\d*$/} data-testid="input" />);

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
    render(<TextArea resolver={(value) => `${value}-static`} data-testid="input" />);

    /* Actions */
    fireEvent.input(screen.getByTestId<HTMLInputElement>('input'), { target: { value: 'text' } });

    /* Assertions */
    expect(screen.getByTestId<HTMLInputElement>('input').value).toBe('text-static');
  });

  test('renders with property: "keyPattern" & "resolver"', () => {
    render(
      <TextArea keyPattern={/^\d*$/} resolver={(value) => `${value}.00`} data-testid="input" />,
    );

    /* Actions */
    fireEvent.input(screen.getByTestId<HTMLInputElement>('input'), { target: { value: '1234' } });

    /* Assertions */
    expect(screen.getByTestId<HTMLInputElement>('input').value).toBe('1234.00');
  });
});
