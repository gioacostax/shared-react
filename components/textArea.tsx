/**
 * Shared UI Components
 */

import React, {
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  type ForwardRefRenderFunction,
  forwardRef,
  memo,
  useRef,
} from 'react';

interface Props {
  'data-testid'?: string;
  inputClassName?: string;
  keyPattern?: RegExp;
  resolver?: (value: string) => string;
}

/**
 * Renders a customizable textArea component.
 */
const TextArea: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  ComponentPropsWithoutRef<'textarea'> & Props
> = (
  { children, className, inputClassName, keyPattern, onInput, resolver, style, ...rest },
  ref,
) => {
  const prevValue = useRef(rest.value ?? '');

  // Validate keyPattern/resolver when input changes
  const handleOnInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (keyPattern && event.currentTarget.value) {
      if (keyPattern.test(event.currentTarget.value)) {
        if (resolver) {
          event.currentTarget.value = resolver(event.currentTarget.value);
        }
        prevValue.current = event.currentTarget.value;
      } else {
        event.currentTarget.value = prevValue.current as string;
      }
    } else {
      if (resolver) {
        event.currentTarget.value = resolver(event.currentTarget.value);
      }
      prevValue.current = event.currentTarget.value;
    }
    onInput?.(event);
  };

  return (
    <label
      className={[
        'flex h-fit flex-col gap-2 leading-5 text-slate-800 transition-all dark:text-slate-300',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {children}
      <textarea
        className={[
          'm-0 min-h-20 w-full rounded-md bg-slate-200 px-3 py-3 text-slate-900 outline-hidden transition-all focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-700 dark:text-slate-50',
          inputClassName,
        ]
          .filter(Boolean)
          .join(' ')}
        onInput={handleOnInput}
        ref={ref}
        {...rest}
      />
    </label>
  );
};

export default memo(forwardRef(TextArea));
