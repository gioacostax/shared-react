/**
 * Shared UI Components
 */

import React, {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ForwardRefRenderFunction,
  forwardRef,
  memo,
} from 'react';

interface Props {
  'data-testid'?: string;
  indeterminate?: boolean;
  inputClassName?: string;
  inputStyle?: CSSProperties;
  isError?: boolean;
}

/**
 * Renders a customizable radio component.
 */
const Radio: ForwardRefRenderFunction<
  HTMLInputElement,
  ComponentPropsWithoutRef<'input'> & Props
> = (
  { children, className, indeterminate, inputClassName, inputStyle, isError, style, ...rest },
  ref,
) => (
  <label
    className={[
      'flex w-fit cursor-pointer items-center gap-2 text-xs font-bold text-slate-700 transition-all has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 dark:text-slate-100',
      isError && 'underline decoration-rose-500 decoration-solid decoration-2',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    data-error={!!isError}
    style={style}
  >
    <input
      className={[
        'flex min-h-5 min-w-5 cursor-pointer appearance-none items-center justify-center rounded-full border-2 border-blue-500 bg-transparent focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-50',
        indeterminate
          ? 'data-[indeterminate=true]:border-0 data-[indeterminate=true]:bg-blue-500 after:data-[indeterminate=true]:min-w-[0.7rem] after:data-[indeterminate=true]:border-[0.1rem] after:checked:[&:not([data-indeterminate="true"])]:border-slate-50'
          : 'after:checked:[&:not([data-indeterminate="true"])]:position-absolute checked:[&:not([data-indeterminate="true"])]:border-0 checked:[&:not([data-indeterminate="true"])]:bg-blue-500 after:checked:[&:not([data-indeterminate="true"])]:min-h-[0.5rem] after:checked:[&:not([data-indeterminate="true"])]:min-w-[0.5rem] after:checked:[&:not([data-indeterminate="true"])]:rounded-full after:checked:[&:not([data-indeterminate="true"])]:bg-slate-50 after:checked:[&:not([data-indeterminate="true"])]:content-[""]',
        inputClassName,
      ]
        .filter(Boolean)
        .join(' ')}
      data-indeterminate={!!indeterminate}
      ref={ref}
      style={inputStyle}
      type="radio"
      {...rest}
    />
    {children}
  </label>
);

export default memo(forwardRef(Radio));
