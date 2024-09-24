/**
 * Shared UI Components
 */

import React, { act, render, renderHook, screen } from '@testing-library/react';

import useToast from '../useToast';

describe('useToast hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      vi.runAllTimers();
    });
  });

  test('renders', () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ({ children }) => <div id="root">{children}</div>,
    });

    /* Actions */
    act(() => {
      result.current.addToast('key', 'Content');
    });

    /* Assertions */
    screen.getByText('Content');

    /* Actions */
    act(() => {
      vi.runAllTimers();
    });

    /* Assertions */
    expect(screen.queryByText('Content')).toBeNull();
  });

  test('renders with "toast-container" defined', () => {
    render(<div id="toast-container" />);
    const { result } = renderHook(() => useToast());

    /* Actions */
    act(() => {
      result.current.addToast('key', 'Content');
      result.current.addToast('key2', 'Content2');
    });

    /* Assertions */
    screen.getByText('Content');

    /* Actions */
    act(() => {
      vi.runAllTimers();
    });

    /* Assertions */
    expect(screen.queryByText('Content')).toBeNull();
  });
});
