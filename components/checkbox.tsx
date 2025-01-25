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
      'flex w-fit cursor-pointer items-center gap-3 text-slate-800 transition-all has-disabled:cursor-not-allowed has-disabled:opacity-50 dark:text-slate-300',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    style={style}
  >
    <input
      className={[
        'border-primary-main flex min-h-5 min-w-5 cursor-pointer appearance-none items-center justify-center rounded-md border-2 bg-transparent outline-hidden focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-50',
        indeterminate
          ? 'data-[indeterminate="true"]:bg-primary-main data-[indeterminate="true"]:border-0 data-[indeterminate="true"]:after:min-w-[0.7rem] data-[indeterminate="true"]:after:border-[0.1rem] checked:[&:not([data-indeterminate="true"])]:after:border-slate-50'
          : 'checked:[&:not([data-indeterminate="true"])]:bg-primary-main checked:[&:not([data-indeterminate="true"])]:border-0 checked:[&:not([data-indeterminate="true"])]:after:mt-[-0.2rem] checked:[&:not([data-indeterminate="true"])]:after:min-h-[0.35rem] checked:[&:not([data-indeterminate="true"])]:after:min-w-[0.75rem] checked:[&:not([data-indeterminate="true"])]:after:rotate-[-45deg] checked:[&:not([data-indeterminate="true"])]:after:border-[0.15rem] checked:[&:not([data-indeterminate="true"])]:after:border-t-0 checked:[&:not([data-indeterminate="true"])]:after:border-r-0 checked:[&:not([data-indeterminate="true"])]:after:border-slate-50 checked:[&:not([data-indeterminate="true"])]:after:content-[""]',
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
