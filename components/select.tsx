/**
 * Shared UI Components
 */

import React, {
  type ChangeEvent,
  type ComponentPropsWithRef,
  type ForwardedRef,
  type PropsWithChildren,
  type ReactNode,
  type Ref,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

export type Props<Option extends Record<string, unknown>> = {
  'data-testid'?: string;
  emptyLabel?: ReactNode;
  findPlaceholder?: string;
  isSearchable?: boolean;
  leading?: ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  options: Option[];
  renderKey: keyof Option;
  valueKey: keyof Option;
} & PropsWithChildren<
  Pick<
    ComponentPropsWithRef<'input'>,
    | 'className'
    | 'defaultValue'
    | 'disabled'
    | 'id'
    | 'name'
    | 'onBlur'
    | 'placeholder'
    | 'ref'
    | 'required'
    | 'style'
    | 'value'
  >
>;

const Select = <Option extends Record<string, unknown>>(
  {
    children,
    className,
    emptyLabel = 'Lista vacía',
    findPlaceholder = 'buscar...',
    isSearchable,
    leading,
    options,
    placeholder = 'seleccionar...',
    renderKey,
    style,
    valueKey,
    ...input
  }: Props<Option>,
  ref: Ref<HTMLInputElement>,
) => {
  const selectRef = useRef<HTMLLabelElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [selectedOption, setSelectedOption] = useState<Option>();
  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState('');
  const [isClient, setIsClient] = useState(false); // Check if browser is client side

  // Generate random id to get input node
  const id = useId().replace(/:/g, '');

  // Get input node because we can't manipulate fowarded ref
  const getInputNode = useCallback(
    () => (isClient ? (document.getElementById(input.id ?? id) as HTMLInputElement) : null),
    [id, input, isClient],
  );

  const handleOptionClick = useCallback(
    (option: Option) => {
      setSelectedOption(option);
      // Set new input value to trigger change event succcessfully
      (
        Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set as (
          v: unknown,
        ) => void
      ).call(getInputNode(), option[valueKey]);

      // Trigger change event to emulate an input onChange event
      getInputNode()?.dispatchEvent(new Event('change', { bubbles: true }));

      // Hide menu
      setShowMenu(false);

      // Reset search input
      setSearch('');

      // Set visible focus after selected option
      buttonRef.current?.focus();
    },
    [getInputNode, valueKey],
  );

  const matchSearch = useCallback(
    (option: Option) =>
      new RegExp(search.normalize('NFD').replace(/[^\w ]/g, ''), 'i').exec(
        String(option[renderKey])
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, ''),
      ),
    [renderKey, search],
  );

  const filteredOptions = useMemo(
    () => options.filter((option) => (search ? matchSearch(option) : true)),
    [matchSearch, options, search],
  );

  const renderOptions = useMemo(
    () => [
      ...filteredOptions.map((option, index) => (
        <button
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={
            !isSearchable &&
            (index === 0 || (selectedOption && selectedOption[valueKey] === option[valueKey]))
          }
          className={[
            'flex w-full cursor-pointer items-center gap-2 p-3 text-left last:rounded-b-md focus:outline-hidden',
            filteredOptions.length === 1 && 'bg-slate-200 dark:bg-slate-600',
            index === 0 && !isSearchable && 'rounded-t-md',
            option === selectedOption
              ? 'bg-primary-main hover:bg-primary-dark focus:bg-primary-dark text-slate-50'
              : 'hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-600 dark:focus:bg-slate-600',
          ]
            .filter(Boolean)
            .join(' ')}
          key={String(option[valueKey])}
          onClick={() => {
            handleOptionClick(option);
          }}
          type="button"
        >
          {String(option[renderKey])}
        </button>
      )),
    ],
    [filteredOptions, handleOptionClick, isSearchable, renderKey, selectedOption, valueKey],
  );

  const renderSelectedOption = useMemo(
    () => selectedOption && String(selectedOption[renderKey]),
    [renderKey, selectedOption],
  );

  // Set selectedOption state from input value/defaultValue (useful in react-hook-form)
  useEffect(() => {
    const option = options.find((_option) => String(_option[valueKey]) === getInputNode()?.value);
    setSelectedOption(option);
    setIsClient(true);
  }, [options, valueKey, getInputNode]);

  return (
    <label
      className={[
        'flex h-fit min-w-48 flex-col gap-2 leading-5 text-slate-800 transition-all dark:text-slate-300',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onBlur={({ currentTarget, relatedTarget }) => {
        if (!currentTarget.contains(relatedTarget)) {
          setShowMenu(false);
          setSearch('');
        }
      }}
      ref={selectRef}
      style={style}
    >
      <input
        id={id}
        ref={ref}
        {...input}
        autoComplete="off"
        className="hidden"
        data-testid={input['data-testid']}
        onFocus={() => buttonRef.current?.focus()} // Pass focus, useful in react-hook-form
        tabIndex={-1}
        type="text"
      />

      {children}

      <button
        className={[
          'flex min-h-10 items-center gap-2 rounded-md bg-slate-200 px-3 py-2 leading-4 outline-hidden transition-all focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-700',
        ]
          .filter(Boolean)
          .join(' ')}
        disabled={input.disabled}
        onClick={() => {
          setShowMenu((prev) => !prev);
        }}
        ref={buttonRef}
        type="button"
      >
        {leading}

        <span
          className={[
            'm-0 w-full p-0 text-left',
            !selectedOption && !getInputNode()?.value
              ? 'text-gray-400 dark:text-gray-400'
              : 'text-slate-900 dark:text-slate-50',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {selectedOption ? renderSelectedOption : placeholder}
        </span>

        <svg height="1.3em" viewBox="0 0 24 24" width="1.3em" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.30816 8.30816C5.50554 8.11085 5.7732 8 6.05229 8C6.33138 8 6.59904 8.11085 6.79641 8.30816L12.0064 13.5181L17.2163 8.30816C17.4148 8.11644 17.6807 8.01035 17.9566 8.01275C18.2326 8.01515 18.4966 8.12584 18.6917 8.32098C18.8869 8.51613 18.9976 8.78011 19 9.05608C19.0024 9.33204 18.8963 9.59791 18.7045 9.79641L12.7505 15.7505C12.5531 15.9478 12.2854 16.0586 12.0064 16.0586C11.7273 16.0586 11.4596 15.9478 11.2622 15.7505L5.30816 9.79641C5.11085 9.59904 5 9.33138 5 9.05229C5 8.7732 5.11085 8.50554 5.30816 8.30816Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {showMenu && !input.disabled && (
        <div
          className="absolute z-10 flex flex-col rounded-md bg-white shadow-md dark:bg-slate-700"
          ref={menuRef}
          style={{
            left: buttonRef.current!.offsetLeft,
            maxHeight: `${document.body.clientHeight - buttonRef.current!.offsetTop - 24}px`,
            top: buttonRef.current!.offsetTop + buttonRef.current!.offsetHeight + 8,
            width: `${buttonRef.current!.offsetWidth}px`,
          }}
        >
          {isSearchable && (
            <>
              <input
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                className="w-full rounded-t-md border-2 border-transparent bg-transparent p-3 outline-hidden focus:border-2 focus:border-blue-500 dark:border-slate-700"
                onChange={({ currentTarget }) => {
                  setSearch(currentTarget.value);
                }}
                onKeyDown={(e) => {
                  if (e.code === 'Enter') {
                    if (filteredOptions.length) {
                      handleOptionClick(filteredOptions.at(0)!);
                    }
                    e.preventDefault();
                  }
                }}
                placeholder={findPlaceholder}
                value={search}
              />
              <span className="w-full border-b border-slate-200 dark:border-slate-400" />
            </>
          )}
          <div className="max-h-44 overflow-y-auto" tabIndex={-1}>
            {renderOptions.length ? (
              renderOptions
            ) : (
              <div className="flex items-center justify-center p-4 text-slate-400">
                {emptyLabel}
              </div>
            )}
          </div>
        </div>
      )}
    </label>
  );
};

const SelectRef = forwardRef(Select) as <Option extends Record<string, unknown>>(
  props: { ref?: ForwardedRef<HTMLInputElement> } & Props<Option>,
) => ReturnType<typeof Select>;

export default memo(SelectRef) as typeof SelectRef;
