/**
 * This file can be used to define Components test utils
 */

import { fireEvent, screen } from '@testing-library/dom';
import { act } from '@testing-library/react';

//////////////////////////////////////////////////////////////

export const testSelect = (
  element: Document | Element | Node | Window,
  option: string,
  click?: boolean,
  search?: string,
  searchPlaceholder?: string,
) => {
  act(() => {
    fireEvent.click(element);
  });

  let optionElement: HTMLOptionElement;

  if (!search) optionElement = screen.getByText(option);
  else {
    act(() => {
      fireEvent.input(screen.getByPlaceholderText(searchPlaceholder ?? 'buscar...'), {
        target: { value: search },
      });
    });
    optionElement = screen.getByText(option);
  }

  if (click) {
    act(() => {
      fireEvent.click(optionElement);
    });
  }

  return optionElement;
};
