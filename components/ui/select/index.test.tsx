/**
 * Project vite
 */

import { act, fireEvent, render, screen } from '@testing-library/react';

import Select from './index';

const testSelect = (
  element: Document | Element | Node | Window,
  option: string,
  click?: boolean,
) => {
  act(() => {
    fireEvent.click(element);
  });
  const optionElement = screen.getByText(option);
  if (click) {
    act(() => {
      fireEvent.click(optionElement);
    });
  }
  return optionElement;
};

describe('<Select />', () => {
  test('renders', () => {
    render(
      <Select
        options={[
          { id: '1', value: 'Option A' },
          { id: '2', value: 'Option B' },
        ]}
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
    testSelect(screen.getByText('seleccionar...'), 'Option A');
  });

  test('renders, open menu and click outside', () => {
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
    testSelect(screen.getByText('seleccionar...'), 'Option A');
    fireEvent.mouseDown(document.body);

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
    testSelect(screen.getByText('seleccionar...'), 'Option A');
    fireEvent.mouseDown(screen.getByPlaceholderText('buscar...'));

    /* Assertions */
    screen.getByText('Option B');
  });

  test('renders and keyUp on container', () => {
    render(
      <Select
        isSearchable
        label="label"
        options={[
          { id: '1', value: 'Option A' },
          { id: '2', value: 'Option B' },
        ]}
        renderKey="value"
        valueKey="id"
      />,
    );

    /* Actions */
    fireEvent.keyUp(screen.getByText('seleccionar...'), { code: 'Enter' });

    /* Assertions */
    expect(screen.queryByText('Option B')).toBeNull();

    /* Actions */
    fireEvent.keyUp(screen.getByText('seleccionar...'), { code: 'Space' });

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
        valueKey="id"
      />,
    );

    /* Actions */
    testSelect(screen.getByText('seleccionar...'), '1', true);

    /* Assertions */
    expect(onChange).toHaveBeenCalled();
  });

  test('renders and select option with property "getOptionRender"', () => {
    const onChange = vi.fn();
    render(
      <Select
        getOptionRender={({ value }) => value}
        onChange={onChange}
        options={[
          { id: '1', value: 'Option A' },
          { id: '2', value: 'Option B' },
        ]}
        valueKey="id"
      />,
    );

    /* Actions */
    testSelect(screen.getByText('seleccionar...'), 'Option B', true);

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

  test('renders and blur', () => {
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
    fireEvent.blur(screen.getByTestId('select-button'));

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

  test('renders with property: "helper"', () => {
    render(
      <Select
        helper="helper"
        options={[
          { id: '1', value: 'Option A' },
          { id: '2', value: 'Option B' },
        ]}
        renderKey="value"
        valueKey="id"
      />,
    );

    /* Assertions */
    screen.getByText('helper');
  });

  test('renders with property: "error"', () => {
    render(
      <Select
        error="error"
        options={[
          { id: '1', value: 'Option A' },
          { id: '2', value: 'Option B' },
        ]}
        renderKey="value"
        valueKey="id"
      />,
    );

    /* Assertions */
    screen.getByText('error');
  });

  test('renders with property: "emptyLabel"', () => {
    render(<Select emptyLabel="Empty" options={[]} valueKey="id" />);
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
    fireEvent.input(screen.getByPlaceholderText('buscar...'), { target: { value: 'Option A' } });

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
        searchKey="value"
        valueKey="id"
      />,
    );

    /* Actions */
    fireEvent.click(screen.getByText('seleccionar...'));
    fireEvent.input(screen.getByPlaceholderText('buscar...'), { target: { value: 'Option A' } });

    /* Assertions */
    expect(screen.queryByText('Option B')).toBeNull();
  });

  test('renders with property: "isSearchable" and "getOptionSearch"', () => {
    render(
      <Select
        getOptionSearch={({ value }) => value}
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

  test('renders with property: "isClearable"', () => {
    render(
      <Select
        data-testid="select"
        isClearable
        options={[
          { id: '1', value: 'Option A' },
          { id: '2', value: 'Option B' },
        ]}
        renderKey="value"
        valueKey="id"
      />,
    );

    /* Actions */
    testSelect(screen.getByText('seleccionar...'), 'Option A', true);

    /* Assertions */
    screen.getByText('Option A');

    /* Actions */
    fireEvent.click(screen.getByTestId('select-clear'));

    /* Assertions */
    expect(screen.queryByText('Option A')).toBeNull();
  });
});
