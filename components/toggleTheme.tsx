/**
 * Shared UI Components
 */

import React, { type FC, type HTMLAttributes, useEffect, useState } from 'react';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  element?: HTMLElement;
  storageKey?: string;
}

const ToggleTheme: FC<Props> = ({
  element = document.documentElement,
  storageKey = 'theme',
  title = 'Alternar entre tema claro y oscuro',
  ...rest
}) => {
  const [theme, setTheme] = useState<string | null>(
    localStorage.getItem(storageKey) ??
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'),
  );

  useEffect(() => {
    const event = () => {
      setTheme(
        localStorage.getItem(storageKey) ??
          (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'),
      );
    };

    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', event);
    window.addEventListener('storage', event);

    return () => {
      window.matchMedia('(prefers-color-scheme: light)').removeEventListener('change', event);
      window.removeEventListener('storage', event);
    };
  }, [storageKey]);

  return (
    <button
      aria-label={title}
      className="hover:text-primary-main cursor-pointer"
      onClick={() => {
        if (
          localStorage.getItem(storageKey)
            ? localStorage[storageKey] === 'dark'
            : window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
          element.classList.remove('dark');
          localStorage.setItem(storageKey, 'light');
          setTheme('light');
        } else {
          element.classList.add('dark');
          localStorage.setItem(storageKey, 'dark');
          setTheme('dark');
        }
        window.dispatchEvent(new Event('storage'));
      }}
      title={title}
      type="button"
      {...rest}
    >
      {theme === 'dark' ? (
        <svg
          data-testid="moon"
          fill="none"
          height="1.5rem"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="1.5rem"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0z" fill="none" stroke="none"></path>
          <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
        </svg>
      ) : (
        <svg
          data-testid="sun"
          fill="none"
          height="1.5rem"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="1.5rem"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0z" fill="none" stroke="none"></path>
          <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
          <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"></path>
        </svg>
      )}
    </button>
  );
};

export default ToggleTheme;
