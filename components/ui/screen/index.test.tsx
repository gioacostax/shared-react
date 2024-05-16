/**
 * Project vite
 */

import { fireEvent, render, screen } from '@testing-library/react';

import Screen from './index';

describe('<Screen />', () => {
  beforeEach(() => {
    render(<div id="root" />);
  });

  test('renders', () => {
    render(<Screen>Children</Screen>);

    /* Assertions */
    expect(screen.queryByText('Children')).toBeNull();
  });

  test('renders with property: "isVisible"', () => {
    render(<Screen isVisible>Children</Screen>);

    /* Assertions */
    screen.getByText('Children');
  });

  test('renders and click outside', () => {
    const onClose = vi.fn();
    render(
      <Screen isVisible onClose={onClose} data-testid="screen">
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
      <Screen isVisible closeOnClickOutside onClose={onClose} data-testid="screen">
        Children
      </Screen>,
    );

    /* Actions */
    fireEvent.click(screen.getByTestId('screen'));

    /* Assertions */
    expect(onClose).toHaveBeenCalledOnce();
  });
});
