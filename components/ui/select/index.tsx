/**
 * Project vite
 */

import {
  type ComponentPropsWithRef,
  type CSSProperties,
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

import styles from './styles.module.scss';

export type Props<Option extends Record<string, unknown>> = {
  className?: string;
  'data-testid'?: string;
  emptyLabel?: ReactNode;
  error?: ReactNode;
  getOptionRender?: (option: Option) => ReactNode;
  getOptionSearch?: (option: Option) => string;
  helper?: ReactNode;
  isClearable?: boolean;
  isSearchable?: boolean;
  label?: ReactNode;
  leading?: ReactNode;
  noResultsLabel?: ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: Option[];
  renderKey?: keyof Option;
  searchKey?: keyof Option;
  style?: CSSProperties;
  valueKey: keyof Option;
} & Pick<
  ComponentPropsWithRef<'input'>,
  | 'defaultValue'
  | 'disabled'
  | 'id'
  | 'name'
  | 'onBlur'
  | 'placeholder'
  | 'ref'
  | 'required'
  | 'value'
>;

const Select = <Option extends Record<string, unknown>>(
  {
    className,
    emptyLabel = 'Lista vacía',
    error,
    getOptionRender,
    getOptionSearch,
    helper,
    isClearable,
    isSearchable,
    label,
    leading,
    noResultsLabel = 'Sin resultados',
    options,
    placeholder = 'seleccionar...',
    renderKey,
    searchKey,
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
  const searchRef = useRef<HTMLInputElement>(null);

  const [selectedOption, setSelectedOption] = useState<Option | undefined>();
  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState('');

  const id = useId().replace(/:/g, '');

  // Get input node because we can't manipulate fowarded ref
  const getInputNode = useCallback(
    () => document.querySelector<HTMLInputElement>(input.id ? `#${input.id}` : `#${id}`),
    [id, input.id],
  );

  const handleOptionClick = useCallback(
    (option?: Option) => {
      setSelectedOption(option);
      // Set new input value to trigger change event succcessfully
      (
        Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set as (
          v: unknown,
        ) => void
      ).call(getInputNode(), option ? option[valueKey] : '');

      // Trigger change event to emulate an input onChange event
      getInputNode()?.dispatchEvent(new Event('change', { bubbles: true }));

      // Hide menu
      setShowMenu(false);

      // Set visible focus after selected option
      buttonRef.current?.focus();
    },
    [getInputNode, valueKey],
  );

  // Hide menu when clicked outside from label context
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (
        !selectRef.current?.contains(event.target as Node) &&
        !menuRef.current?.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, []);

  // Set selectedOption state from input value/defaultValue (useful in react-hook-form)
  useEffect(() => {
    const option = options.find((_option) => _option[valueKey] === getInputNode()?.value);
    setSelectedOption(option);
  }, [options, valueKey, getInputNode]);

  const matchSearch = useCallback(
    (option: Option) =>
      (
        getOptionSearch?.(option) ??
        (searchKey ? String(option[searchKey as string]) : String(option[valueKey]))
      )
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .match(new RegExp(search.normalize('NFD').replace(/[^\w ]/g, ''), 'i')),
    [getOptionSearch, valueKey, searchKey, search],
  );

  const renderOptions = useMemo(
    () =>
      options
        .filter((option) => matchSearch(option))
        .map((option, index) => (
          <button
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={index === 0 && !isSearchable}
            type="button"
            key={String(option[valueKey])}
            onClick={() => {
              handleOptionClick(option);
            }}
            className={styles.option}
            data-selected={option === selectedOption}
          >
            {getOptionRender?.(option) ??
              (renderKey ? String(option[renderKey as string]) : String(option[valueKey]))}
          </button>
        )),
    [
      isSearchable,
      getOptionRender,
      valueKey,
      renderKey,
      handleOptionClick,
      matchSearch,
      options,
      selectedOption,
    ],
  );

  const renderOption = useMemo(() => {
    if (selectedOption) {
      return (
        getOptionRender?.(selectedOption) ??
        (renderKey ? String(selectedOption[renderKey as string]) : String(selectedOption[valueKey]))
      );
    }
    return <span className={styles.placeholder}>{placeholder}</span>;
  }, [getOptionRender, renderKey, selectedOption, valueKey, placeholder]);

  return (
    <label
      ref={selectRef}
      style={style}
      className={[styles.select, className].filter(Boolean).join(' ')}
      onBlur={({ currentTarget, relatedTarget }) => {
        if (!currentTarget.contains(relatedTarget)) setShowMenu(false);
      }}
      data-error={!!error}
      data-disabled={!!input.disabled}
      data-theme
    >
      <input
        id={id}
        ref={ref}
        {...input}
        type="text"
        onFocus={() => buttonRef.current?.focus()} // Pass focus, useful in react-hook-form
        autoComplete="off"
        tabIndex={-1}
        data-testid={input['data-testid']}
      />
      {label && <span className={styles.label}>{label}</span>}
      <button
        ref={buttonRef}
        className={styles.container}
        onKeyUp={({ code, target }) => {
          if (
            code === 'Space' &&
            !clearRef.current?.contains(target as Node) &&
            !menuRef.current?.contains(target as Node)
          ) {
            setShowMenu((prev) => !prev);
            setSearch('');
          }
        }}
        onClick={({ target }) => {
          if (
            !clearRef.current?.contains(target as Node) &&
            !menuRef.current?.contains(target as Node)
          ) {
            setShowMenu((prev) => !prev);
            setSearch('');
          }
        }}
        disabled={input.disabled}
        data-testid={`${input['data-testid']}-button`}
      >
        {leading && <span className={styles.leading}>{leading}</span>}
        <span className={styles.value}>{renderOption}</span>
        <span className={styles.trailing}>
          {isClearable && (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <span
              role="button"
              ref={clearRef}
              title="Borrar selección"
              className={styles.clear}
              tabIndex={-1}
              // onKeyDown={({ code }) => {
              //   if (code === 'Enter') handleOptionClick();
              // }}
              onClick={() => {
                handleOptionClick();
              }}
              data-disabled={!!input.disabled}
              data-testid={`${input['data-testid']}-clear`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="1.2em"
                height="1.2em"
              >
                <path
                  d="M13.4244 12.0005L17.8813 7.54384C18.0396 7.38558 18.0396 7.12947 17.8813 6.97126L17.0295 6.11915C16.9537 6.04334 16.8507 6.00066 16.7433 6.00066C16.6358 6.00066 16.5328 6.04334 16.457 6.11915L12 10.5762L7.54306 6.11915C7.46719 6.04334 7.36425 6.00066 7.25677 6.00066C7.14931 6.00066 7.04634 6.04334 6.9705 6.11915L6.11871 6.97126C5.96045 7.12947 5.96045 7.38558 6.11871 7.54384L10.5757 12.0005L6.11915 16.4567C5.96097 16.615 5.96097 16.8711 6.11915 17.0293L6.971 17.8814C7.04681 17.9572 7.14978 17.9999 7.25726 17.9999C7.36474 17.9999 7.46769 17.9572 7.54358 17.8814L12 13.4249L16.4564 17.8814C16.5323 17.9572 16.6352 17.9999 16.7427 17.9999C16.8502 17.9999 16.9532 17.9572 17.029 17.8814L17.8808 17.0293C18.039 16.8711 18.039 16.615 17.8808 16.4567L13.4244 12.0005Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1.2em"
            height="1.2em"
            className={styles.arrow}
          >
            <path
              d="M5.30816 8.30816C5.50554 8.11085 5.7732 8 6.05229 8C6.33138 8 6.59904 8.11085 6.79641 8.30816L12.0064 13.5181L17.2163 8.30816C17.4148 8.11644 17.6807 8.01035 17.9566 8.01275C18.2326 8.01515 18.4966 8.12584 18.6917 8.32098C18.8869 8.51613 18.9976 8.78011 19 9.05608C19.0024 9.33204 18.8963 9.59791 18.7045 9.79641L12.7505 15.7505C12.5531 15.9478 12.2854 16.0586 12.0064 16.0586C11.7273 16.0586 11.4596 15.9478 11.2622 15.7505L5.30816 9.79641C5.11085 9.59904 5 9.33138 5 9.05229C5 8.7732 5.11085 8.50554 5.30816 8.30816Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </button>
      {showMenu && !input.disabled && (
        <div ref={menuRef} className={styles.menu} style={{ top: buttonRef.current?.offsetTop }}>
          {isSearchable && (
            <input
              ref={searchRef}
              className={styles['search-input']}
              placeholder="buscar..."
              value={search}
              onChange={({ currentTarget }) => {
                setSearch(currentTarget.value);
              }}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              data-testid={`${input['data-testid']}-search`}
            />
          )}
          <div className={styles.options} tabIndex={-1}>
            {renderOptions.length ? (
              renderOptions
            ) : (
              <span className={styles.empty}>{!options.length ? emptyLabel : noResultsLabel}</span>
            )}
          </div>
        </div>
      )}
      {(error ?? helper) && <div className={styles.helper}>{error ?? helper}</div>}
    </label>
  );
};

export default memo(forwardRef(Select)) as typeof Select;
