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
  theme?: 'green' | 'primary' | 'red' | 'secondary';
  variant?: 'box' | 'ghost' | 'outline' | 'text';
}

/**
 * Renders a customizable button component.
 */
const Button: ForwardRefRenderFunction<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'> & Props
> = ({ children, className, theme = 'primary', variant = 'box', ...rest }, ref) => (
  <button
    className={[
      `z-[1] box-border flex w-fit cursor-pointer items-center justify-center gap-2 whitespace-nowrap text-sm font-bold transition-all focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-50`,
      variant === 'text' ? 'min-h-fit p-0' : 'min-h-10 rounded-lg px-3 py-2',
      variant === 'outline' && 'border-2',
      variant === 'box' && theme === 'primary' && 'bg-blue-500 text-slate-50 hover:bg-blue-600',
      variant === 'box' &&
        theme === 'secondary' &&
        'bg-slate-300 text-slate-800 hover:bg-slate-200 dark:bg-slate-50',
      variant === 'box' && theme === 'green' && 'bg-green-400 text-green-950 hover:bg-green-500',
      variant === 'box' && theme === 'red' && 'bg-red-400 text-red-950 hover:bg-red-500',
      variant === 'ghost' &&
        theme === 'primary' &&
        'text-blue-500 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-gray-800',
      variant === 'ghost' &&
        theme === 'secondary' &&
        'text-slate-700 hover:bg-slate-200 dark:text-slate-100 dark:hover:bg-gray-800',
      variant === 'ghost' &&
        theme === 'green' &&
        'text-green-400 hover:bg-green-100 dark:hover:bg-gray-800',
      variant === 'ghost' &&
        theme === 'red' &&
        'text-red-400 hover:bg-red-100 dark:hover:bg-gray-800',
      variant === 'outline' &&
        theme === 'primary' &&
        'border-blue-500 text-blue-500 hover:border-blue-600 dark:text-blue-400',
      variant === 'outline' &&
        theme === 'secondary' &&
        `border-slate-700 text-slate-700 hover:border-slate-950 dark:border-slate-100 dark:text-slate-100 dark:hover:border-slate-300`,
      variant === 'outline' &&
        theme === 'green' &&
        'border-green-400 text-green-400 hover:border-green-500',
      variant === 'outline' &&
        theme === 'red' &&
        'border-red-400 text-red-400 hover:border-red-500',
      variant === 'text' &&
        theme === 'primary' &&
        'text-blue-500 hover:text-blue-600 dark:text-blue-400',
      variant === 'text' &&
        theme === 'secondary' &&
        'text-slate-800 hover:text-slate-950 dark:text-slate-100 dark:hover:text-slate-300',
      variant === 'text' && theme === 'green' && 'text-green-400 hover:text-green-500',
      variant === 'text' && theme === 'red' && 'text-red-400 hover:text-red-500',
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
