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
      'z-[1] box-border flex w-fit cursor-pointer items-center justify-center gap-2 whitespace-nowrap text-sm font-bold leading-4 outline-none transition-all focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-50',
      variant === 'text' ? 'min-h-fit p-0' : 'min-h-10 rounded-lg px-4 py-2',
      variant === 'primary' && 'bg-primary-main text-slate-50 hover:bg-primary-dark',
      variant === 'secondary' &&
        'bg-slate-300 text-slate-800 hover:bg-slate-200 dark:bg-slate-300 dark:hover:bg-slate-200',
      variant === 'ghost' &&
        'text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-gray-800 dark:hover:text-slate-50',
      variant === 'outline' &&
        'border border-slate-700 text-slate-700 hover:border-slate-900 dark:border-slate-300 dark:text-slate-300 dark:hover:border-slate-200 dark:hover:text-slate-200',
      variant === 'text' &&
        'text-primary-main hover:text-primary-dark dark:text-primary-light dark:hover:text-primary-main',
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
