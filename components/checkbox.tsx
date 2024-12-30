/**
 * Shared UI Components
 */

import React, {
  type ComponentPropsWithoutRef,
  type ForwardRefRenderFunction,
  forwardRef,
  memo,
} from 'react';

interface Props {
  'data-testid'?: string;
  indeterminate?: boolean;
  inputClassName?: string;
}

/**
 * Renders a customizable checkbox component.
 */
const Checkbox: ForwardRefRenderFunction<
  HTMLInputElement,
  ComponentPropsWithoutRef<'input'> & Props
> = ({ children, className, indeterminate, inputClassName, style, ...rest }, ref) => (
  <label
    className={[
      'flex w-fit cursor-pointer items-start gap-3 text-slate-800 transition-all has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 dark:text-slate-300',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    style={style}
  >
    <input
      className={[
        'flex min-h-5 min-w-5 cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-primary-main bg-transparent outline-none focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-50',
        indeterminate
          ? 'data-[indeterminate="true"]:border-0 data-[indeterminate="true"]:bg-primary-main after:data-[indeterminate="true"]:min-w-[0.7rem] after:data-[indeterminate="true"]:border-[0.1rem] after:checked:[&:not([data-indeterminate="true"])]:border-slate-50'
          : 'checked:[&:not([data-indeterminate="true"])]:border-0 checked:[&:not([data-indeterminate="true"])]:bg-primary-main after:checked:[&:not([data-indeterminate="true"])]:mt-[-0.2rem] after:checked:[&:not([data-indeterminate="true"])]:min-h-[0.35rem] after:checked:[&:not([data-indeterminate="true"])]:min-w-[0.75rem] after:checked:[&:not([data-indeterminate="true"])]:rotate-[-45deg] after:checked:[&:not([data-indeterminate="true"])]:border-[0.15rem] after:checked:[&:not([data-indeterminate="true"])]:border-r-0 after:checked:[&:not([data-indeterminate="true"])]:border-t-0 after:checked:[&:not([data-indeterminate="true"])]:border-slate-50 after:checked:[&:not([data-indeterminate="true"])]:content-[""]',
        inputClassName,
      ]
        .filter(Boolean)
        .join(' ')}
      data-indeterminate={!!indeterminate}
      ref={ref}
      type="checkbox"
      {...rest}
    />
    {children}
  </label>
);

export default memo(forwardRef(Checkbox));
