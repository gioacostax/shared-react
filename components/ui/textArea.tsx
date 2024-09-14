/**
 * Shared UI Components
 */

import {
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ForwardRefRenderFunction,
  type ReactNode,
  forwardRef,
  memo,
  useRef,
} from 'react';

interface Props {
  'data-testid'?: string;
  helper?: ReactNode;
  inputClassName?: string;
  inputStyle?: CSSProperties;
  keyPattern?: RegExp;
  resolver?: (value: string) => string;
}

/**
 * Renders a customizable textAield component.
 */
const TextArea: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  ComponentPropsWithoutRef<'textarea'> & Props
> = (
  {
    children,
    className,
    helper,
    inputClassName,
    inputStyle,
    keyPattern,
    onInput,
    resolver,
    style,
    ...rest
  },
  ref,
) => {
  const prevValue = useRef(rest.value),
    // Validate keyPattern/resolver when input changes
    handleOnInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
      style={style}
      className={[
        `flex h-fit flex-col gap-1 font-bold text-slate-800 transition-all has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 dark:text-slate-300`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
      <textarea
        ref={ref}
        style={inputStyle}
        onInput={handleOnInput}
        className={[
          `m-0 min-h-20 w-full rounded-md border-slate-200 bg-slate-200 bg-transparent px-3 py-2 font-normal text-slate-950 outline-none transition-all placeholder:opacity-70 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-600 dark:text-slate-50`,
          inputClassName,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      />
      {helper}
    </label>
  );
};

export default memo(forwardRef(TextArea));
