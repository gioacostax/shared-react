/**
 * Shared UI Components
 */

import React, {
  type ChangeEvent,
  type ComponentPropsWithRef,
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
  helper?: ReactNode;
  isClearable?: boolean;
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
    helper,
    isClearable,
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
  const clearRef = useRef<HTMLSpanElement>(null);
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
    (option?: Option) => {
      setSelectedOption(option);
      // Set new input value to trigger change event succcessfully
      (
        Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set as (
          v: unknown,
        ) => void
      ).call(getInputNode(), option?.[valueKey] ?? '');

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
            'flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left last:rounded-b-lg focus:outline-none',
            filteredOptions.length === 1 && 'bg-slate-200',
            index === 0 && !isSearchable && 'rounded-t-lg',
            option === selectedOption
              ? 'bg-primary-500 text-slate-50 hover:bg-primary-600 focus:bg-primary-600'
              : 'hover:bg-slate-200 focus:bg-slate-200',
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
        'flex h-fit flex-col gap-1 text-slate-800 transition-all has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-80 dark:text-slate-300',
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
      onKeyDown={({ code }) => {
        if (isSearchable && !showMenu && code !== 'Tab' && code !== 'Space' && code !== 'Enter')
          setShowMenu(true);
      }}
      ref={selectRef}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
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
          'flex min-h-10 items-center gap-2 rounded-md border px-3 py-2 transition-all focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 dark:bg-slate-600',
          input.disabled
            ? 'cursor-not-allowed border-gray-200 bg-gray-200'
            : 'border-slate-400 bg-white',
        ]
          .filter(Boolean)
          .join(' ')}
        disabled={input.disabled}
        onClick={({ target }) => {
          if (!clearRef.current?.contains(target as Node)) {
            if (!showMenu) setShowMenu(true);
            else setShowMenu(false);
          }
        }}
        ref={buttonRef}
        type="button"
      >
        {leading}

        <span
          className={[
            'm-0 w-full bg-transparent p-0 text-left font-normal text-slate-950 outline-none placeholder:opacity-70 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-50',
            !selectedOption && !getInputNode()?.value && 'opacity-70',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {selectedOption ? renderSelectedOption : placeholder}
        </span>

        <span className="flex gap-1">
          {isClearable && !input.disabled && selectedOption && (
            <span
              className="rounded-full hover:bg-slate-200"
              data-testid="select-clear"
              onClick={() => {
                handleOptionClick();
              }}
              onKeyDown={undefined}
              ref={clearRef}
              role="button"
              tabIndex={-1}
              title="Borrar selección"
            >
              <svg
                height="1.2em"
                viewBox="0 0 24 24"
                width="1.2em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.4244 12.0005L17.8813 7.54384C18.0396 7.38558 18.0396 7.12947 17.8813 6.97126L17.0295 6.11915C16.9537 6.04334 16.8507 6.00066 16.7433 6.00066C16.6358 6.00066 16.5328 6.04334 16.457 6.11915L12 10.5762L7.54306 6.11915C7.46719 6.04334 7.36425 6.00066 7.25677 6.00066C7.14931 6.00066 7.04634 6.04334 6.9705 6.11915L6.11871 6.97126C5.96045 7.12947 5.96045 7.38558 6.11871 7.54384L10.5757 12.0005L6.11915 16.4567C5.96097 16.615 5.96097 16.8711 6.11915 17.0293L6.971 17.8814C7.04681 17.9572 7.14978 17.9999 7.25726 17.9999C7.36474 17.9999 7.46769 17.9572 7.54358 17.8814L12 13.4249L16.4564 17.8814C16.5323 17.9572 16.6352 17.9999 16.7427 17.9999C16.8502 17.9999 16.9532 17.9572 17.029 17.8814L17.8808 17.0293C18.039 16.8711 18.039 16.615 17.8808 16.4567L13.4244 12.0005Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          )}
          <svg height="1.2em" viewBox="0 0 24 24" width="1.2em" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.30816 8.30816C5.50554 8.11085 5.7732 8 6.05229 8C6.33138 8 6.59904 8.11085 6.79641 8.30816L12.0064 13.5181L17.2163 8.30816C17.4148 8.11644 17.6807 8.01035 17.9566 8.01275C18.2326 8.01515 18.4966 8.12584 18.6917 8.32098C18.8869 8.51613 18.9976 8.78011 19 9.05608C19.0024 9.33204 18.8963 9.59791 18.7045 9.79641L12.7505 15.7505C12.5531 15.9478 12.2854 16.0586 12.0064 16.0586C11.7273 16.0586 11.4596 15.9478 11.2622 15.7505L5.30816 9.79641C5.11085 9.59904 5 9.33138 5 9.05229C5 8.7732 5.11085 8.50554 5.30816 8.30816Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </button>

      {showMenu && !input.disabled && (
        <div
          className="absolute z-10 flex flex-col gap-2 rounded-lg border border-gray-200 bg-white shadow-lg"
          ref={menuRef}
          style={{
            left: buttonRef.current!.offsetLeft,
            maxHeight: `${document.body.clientHeight - buttonRef.current!.offsetTop - 24}px`,
            top: buttonRef.current!.offsetTop + buttonRef.current!.offsetHeight + 8,
            width: `${buttonRef.current!.offsetWidth}px`,
          }}
        >
          {isSearchable && (
            <input
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              className="w-full rounded-t-lg border-b border-gray-200 p-3 pb-1 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
              onChange={({ currentTarget }) => {
                setSearch(currentTarget.value);
              }}
              onKeyDown={(e) => {
                if (e.code === 'Enter') {
                  if (filteredOptions.length) {
                    handleOptionClick(filteredOptions.at(0));
                  }
                  e.preventDefault();
                }
              }}
              placeholder="buscar..."
              value={search}
            />
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
      {helper}
    </label>
  );
};

export default memo(forwardRef(Select)) as typeof Select;
