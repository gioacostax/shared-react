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
 * Renders a customizable checkbox component.
 */
const Checkbox: ForwardRefRenderFunction<
  HTMLInputElement,
  ComponentPropsWithoutRef<'input'> & Props
> = (
  { children, className, indeterminate, inputClassName, inputStyle, isError, style, ...rest },
  ref,
) => (
  <label
    className={[
      `flex w-fit cursor-pointer items-center gap-2 text-xs font-bold text-slate-700 transition-all has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 dark:text-slate-100`,
      isError && 'underline decoration-rose-500 decoration-solid decoration-2',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    data-error={Boolean(isError)}
    style={style}
  >
    <input
      className={[
        `flex min-h-5 min-w-5 cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-blue-500 bg-transparent focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-50`,
        indeterminate
          ? `data-[indeterminate=true]:border-0 data-[indeterminate=true]:bg-blue-500 after:data-[indeterminate=true]:min-w-[0.7rem] after:data-[indeterminate=true]:border-[0.1rem] after:checked:[&:not([data-indeterminate="true"])]:border-slate-50`
          : `checked:[&:not([data-indeterminate="true"])]:border-0 checked:[&:not([data-indeterminate="true"])]:bg-blue-500 after:checked:[&:not([data-indeterminate="true"])]:mt-[-0.2rem] after:checked:[&:not([data-indeterminate="true"])]:min-h-[0.35rem] after:checked:[&:not([data-indeterminate="true"])]:min-w-[0.75rem] after:checked:[&:not([data-indeterminate="true"])]:rotate-[-45deg] after:checked:[&:not([data-indeterminate="true"])]:border-[0.15rem] after:checked:[&:not([data-indeterminate="true"])]:border-r-0 after:checked:[&:not([data-indeterminate="true"])]:border-t-0 after:checked:[&:not([data-indeterminate="true"])]:border-slate-50 after:checked:[&:not([data-indeterminate="true"])]:content-['']`,
        inputClassName,
      ]
        .filter(Boolean)
        .join(' ')}
      data-indeterminate={indeterminate}
      ref={ref}
      style={inputStyle}
      type="checkbox"
      {...rest}
    />
    {children}
  </label>
);

export default memo(forwardRef(Checkbox));
