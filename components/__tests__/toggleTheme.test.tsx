/**
 * Shared UI Components
 */

import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { matchMediaMock } from '@shared/vitest/utils/dom.utils';

import ToggleTheme from '../toggleTheme';

describe('<ToggleTheme />', () => {
  test('renders', () => {
    matchMediaMock();
    render(<ToggleTheme />);

    /* Assertions */
    screen.getByTitle('Alternar entre tema claro y oscuro');
  });

  test('renders with props', () => {
    matchMediaMock(true);
    render(<ToggleTheme element={document.body} storageKey="test" title="Test" />);

    /* Assertions */
    screen.getByTitle('Test');
  });

  test('renders and clic button', () => {
    matchMediaMock();
    render(<ToggleTheme />);

    /* Assertions */
    screen.getByTestId('moon');

    /* Actions */
    fireEvent.click(screen.getByTitle('Alternar entre tema claro y oscuro'));

    /* Assertions */
    screen.getByTestId('moon');
  });

  test('renders and clic button variant', () => {
    matchMediaMock();
    localStorage.setItem('theme', 'dark');
    render(<ToggleTheme />);

    /* Assertions */
    screen.getByTestId('moon');

    /* Actions */
    fireEvent.click(screen.getByTitle('Alternar entre tema claro y oscuro'));

    /* Assertions */
    screen.getByTestId('sun');
  });
});
