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
  variant?: 'ghost' | 'outline' | 'primary' | 'secondary' | 'text';
}

/**
 * Renders a customizable button component.
 */
const Button: ForwardRefRenderFunction<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'> & Props
> = ({ children, className, variant = 'primary', ...rest }, ref) => (
  <button
    className={[
      `z-[1] box-border flex w-fit cursor-pointer items-center justify-center gap-2 whitespace-nowrap text-sm font-bold transition-all focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-50`,
      variant === 'text' ? 'min-h-fit p-0' : 'min-h-10 rounded-lg px-3 py-2',
      variant === 'primary' && 'bg-blue-500 text-slate-50 hover:bg-blue-600',
      variant === 'secondary' &&
        'bg-slate-300 text-slate-800 hover:bg-slate-200 dark:bg-slate-100 dark:hover:bg-slate-300',
      variant === 'ghost' &&
        'text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-gray-800 dark:hover:text-slate-50',
      variant === 'outline' &&
        `border-2 border-slate-700 text-slate-700 hover:border-slate-950 dark:border-slate-100 dark:text-slate-100 dark:hover:border-slate-300 dark:hover:text-slate-300`,
      variant === 'text' &&
        'text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    ref={ref}
    type="button"
    {...rest}
  >
    {children}
  </button>
);

export default memo(forwardRef(Button));
