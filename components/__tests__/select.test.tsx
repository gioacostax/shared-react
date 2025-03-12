/**
 * Shared UI Components
 */

import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import Select from '../select';

describe('<Select />', () => {
  test('renders', () => {
    render(
      <Select
        options={[
          { id: '1', value: 'Option A' },
          { id: '2', value: 'Option B' },
        ]}
        renderKey="value"
        valueKey="id"
      />,
    );

    /* Assertions */
    screen.getByText('seleccionar...');
  });

  test('renders and open menu', () => {
    render(
      <Select
        options={[
          { id: '1', value: 'Option A' },
          { id: '2', value: 'Option B' },
        ]}
        renderKey="value"
        valueKey="id"
      />,
    );

    /* Actions */
    fireEvent.click(screen.getByText('seleccionar...'));

    /* Actions */
    fireEvent.click(screen.getByText('seleccionar...'));

    /* Assertions */
    expect(screen.queryByText('Option B')).toBeNull();
  });

  test('renders disabled and open menu', () => {
    render(
      <Select
        disabled
        options={[
          { id: '1', value: 'Option A' },
          { id: '2', value: 'Option B' },
        ]}
        renderKey="value"
        valueKey="id"
      />,
    );

    /* Actions */
    fireEvent.click(screen.getByText('seleccionar...'));

    /* Assertions */
    expect(screen.queryByText('Option B')).toBeNull();
  });

  test('renders and click on container', () => {
    render(
      <Select
        isSearchable
        options={[
          { id: '1', value: 'Option A' },
          { id: '2', value: 'Option B' },
        ]}
        renderKey="value"
        valueKey="id"
      />,
    );

    /* Actions */
    fireEvent.click(screen.getByText('seleccionar...'));
    fireEvent.mouseDown(screen.getByPlaceholderText('buscar...'));

    /* Assertions */
    screen.getByText('Option B');
  });

  test('renders and select option with property "renderKey"', () => {
    const onChange = vi.fn();
    render(
      <Select
        onChange={onChange}
        options={[
          { id: '1', value: 'Option A' },
          { id: '2', value: 'Option B' },
        ]}
        renderKey="value"
        valueKey="id"
      />,
    );

    /* Actions */
    fireEvent.click(screen.getByText('seleccionar...'));
    fireEvent.click(screen.getByText('Option B'));

    /* Assertions */
    expect(onChange).toHaveBeenCalled();
  });

  test('renders and focus', () => {
    render(
      <Select
        data-testid="select"
        options={[
          { id: '1', value: 'Option A' },
          { id: '2', value: 'Option B' },
        ]}
        renderKey="value"
        valueKey="id"
      />,
    );

    /* Actions */
    fireEvent.focus(screen.getByTestId('select'));

    /* Assertions */
    expect(document.activeElement).toEqual(document.querySelector('button'));
  });

  test('renders and blur-xs', () => {
    render(
      <Select
        data-testid="select"
        options={[
          { id: '1', value: 'Option A' },
          { id: '2', value: 'Option B' },
        ]}
        renderKey="value"
        valueKey="id"
      />,
    );

    /* Actions */
    fireEvent.blur(screen.getByTestId('select'));

    /* Assertions */
    expect(document.activeElement).not.toEqual(document.querySelector('button'));
  });

  test('renders with property: "id"', () => {
    render(
      <Select
        id="id"
        options={[
          { id: '1', value: 'Option A' },
          { id: '2', value: 'Option B' },
        ]}
        renderKey="value"
        valueKey="id"
      />,
    );

    /* Assertions */
    expect(document.getElementById('id')).toBeDefined();
    expect(document.getElementById('id-clear')).toBeDefined();
  });

  test('renders with property: "leading"', () => {
    render(
      <Select
        leading="leading"
        options={[
          { id: '1', value: 'Option A' },
          { id: '2', value: 'Option B' },
        ]}
        renderKey="value"
        valueKey="id"
      />,
    );

    /* Assertions */
    screen.getByText('leading');
  });

  test('renders with property: "emptyLabel"', () => {
    render(<Select emptyLabel="Empty" options={[]} renderKey="value" valueKey="id" />);
    fireEvent.click(screen.getByText('seleccionar...'));
    screen.getByText('Empty');
  });

  test('renders with property: "isSearchable"', () => {
    render(
      <Select
        isSearchable
        options={[
          { id: '1', value: 'Option A' },
          { id: '2', value: 'Option B' },
        ]}
        renderKey="value"
        valueKey="id"
      />,
    );

    /* Actions */
    fireEvent.click(screen.getByText('seleccionar...'));
    fireEvent.input(screen.getByPlaceholderText('buscar...'), { target: { value: 'Option AC' } });
    fireEvent.keyDown(screen.getByPlaceholderText('buscar...'), { code: 'Space' });
    fireEvent.keyDown(screen.getByPlaceholderText('buscar...'), { code: 'Enter' });
    fireEvent.input(screen.getByPlaceholderText('buscar...'), { target: { value: 'Option A' } });
    fireEvent.keyDown(screen.getByPlaceholderText('buscar...'), { code: 'Enter' });

    /* Assertions */
    expect(screen.queryByText('Option B')).toBeNull();
  });

  test('renders with property: "isSearchable" and "searchKey"', () => {
    render(
      <Select
        isSearchable
        options={[
          { id: '1', value: 'Option A' },
          { id: '2', value: 'Option B' },
        ]}
        renderKey="value"
        valueKey="id"
      />,
    );

    /* Actions */
    fireEvent.click(screen.getByText('seleccionar...'));
    fireEvent.input(screen.getByPlaceholderText('buscar...'), { target: { value: 'Option A' } });

    /* Assertions */
    expect(screen.queryByText('Option B')).toBeNull();
  });
});
