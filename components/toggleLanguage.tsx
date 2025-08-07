/**
 * Shared UI Components
 */

import React, { type FC, type HTMLAttributes, useEffect, useState } from 'react';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  element?: HTMLElement;
  storageKey?: string;
}

const ToggleLanguage: FC<Props> = ({ storageKey = 'lang', title = 'Change language', ...rest }) => {
  const [lang, setTheme] = useState<string | null>(document.documentElement.getAttribute('lang'));

  useEffect(() => {
    const event = () => {
      setTheme(localStorage.getItem(storageKey));
    };

    window.addEventListener('storage', event);

    return () => {
      window.removeEventListener('storage', event);
    };
  }, [storageKey]);

  return (
    <button
      aria-label={title}
      className="flex cursor-pointer items-center text-xl leading-none text-slate-500"
      onClick={() => {
        if (localStorage[storageKey] === 'es') {
          document.documentElement.setAttribute('lang', 'en');
          localStorage.setItem(storageKey, 'en');
          setTheme('en');
        } else {
          document.documentElement.setAttribute('lang', 'es');
          localStorage.setItem(storageKey, 'es');
          setTheme('es');
        }
        window.dispatchEvent(new Event('storage'));
      }}
      title={title}
      type="button"
      {...rest}
    >
      <span
        className={[
          'leading-none',
          lang === 'es' ? 'text-primary-main text-sm font-bold' : 'text-xs hover:text-slate-300',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        ES
      </span>
      /
      <span
        className={[
          'leading-none',
          lang === 'es' ? 'text-xs hover:text-slate-300' : 'text-primary-main text-sm font-bold',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        EN
      </span>
    </button>
  );
};

export default ToggleLanguage;
