/**
 * Shared UI Components
 */

import React, {
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  type ForwardRefRenderFunction,
  type KeyboardEvent,
  type ReactNode,
  forwardRef,
  memo,
  useRef,
} from 'react';

interface Props {
  'data-testid'?: string;
  inputClassName?: string;
  keyPattern?: RegExp;
  leading?: ReactNode;
  preventDefault?: boolean;
  resolver?: (value: string) => string;
  trailing?: ReactNode;
}

/**
 * Renders a customizable textField component.
 */
const TextField: ForwardRefRenderFunction<
  HTMLInputElement,
  ComponentPropsWithoutRef<'input'> & Props
> = (
  {
    children,
    className,
    inputClassName,
    keyPattern,
    leading,
    onInput,
    onKeyDown,
    preventDefault,
    resolver,
    style,
    trailing,
    ...rest
  },
  ref,
) => {
  const prevValue = useRef(rest.value ?? '');

  // Prevent default event when user presses enter
  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (preventDefault && event.code === 'Enter') event.preventDefault();
    onKeyDown?.(event);
  };

  // Validate keyPattern/resolver when input changes
  const handleOnInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (keyPattern && event.currentTarget.value) {
      if (keyPattern.test(event.currentTarget.value)) {
        if (resolver) event.currentTarget.value = resolver(event.currentTarget.value);
        prevValue.current = event.currentTarget.value;
      } else event.currentTarget.value = prevValue.current as string;
    } else {
      if (resolver) event.currentTarget.value = resolver(event.currentTarget.value);
      prevValue.current = event.currentTarget.value;
    }
    onInput?.(event);
  };

  return (
    <label
      className={[
        'flex h-fit flex-col gap-2 leading-none text-slate-800 transition-all dark:text-slate-300',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {children}
      <div className="flex min-h-10 items-center gap-2 rounded-md bg-slate-200 px-3 py-2 outline-hidden transition-all has-focus:outline-2 has-focus:outline-offset-2 has-focus:outline-blue-500 has-disabled:cursor-not-allowed has-disabled:opacity-50 dark:bg-slate-700">
        {leading}
        <input
          className={[
            'm-0 w-full bg-transparent p-0 text-slate-900 outline-hidden disabled:cursor-not-allowed dark:text-slate-50',
            inputClassName,
          ]
            .filter(Boolean)
            .join(' ')}
          onInput={handleOnInput}
          onKeyDown={handleOnKeyDown}
          ref={ref}
          {...rest}
        />
        {trailing}
      </div>
    </label>
  );
};

export default memo(forwardRef(TextField));
