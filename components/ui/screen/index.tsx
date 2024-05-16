/**
 * Project vite
 */

import { type FC, type PropsWithChildren, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './styles.module.scss';

interface Props {
  className?: string;
  closeOnClickOutside?: boolean;
  'data-testid'?: string;
  isVisible?: boolean;
  onClose?: () => void;
}

/**
 * Screen component
 */
const Screen: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  closeOnClickOutside,
  isVisible,
  onClose,
  ...rest
}) => {
  const childRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  // Close modal when clicked outside
  useEffect(() => {
    const _screenRef = screenRef;

    const listener = (event: MouseEvent | TouchEvent) => {
      if (!childRef.current?.contains(event.target as Node) && closeOnClickOutside) {
        onClose?.();
      }
    };
    _screenRef.current?.addEventListener('click', listener);
    _screenRef.current?.addEventListener('touchstart', listener);

    return () => {
      _screenRef.current?.removeEventListener('click', listener);
      _screenRef.current?.removeEventListener('touchstart', listener);
    };
  }, [childRef, onClose, closeOnClickOutside]);

  return isVisible
    ? createPortal(
        <div
          ref={screenRef}
          className={[styles.screen, className].filter(Boolean).join(' ')}
          data-testid={rest['data-testid']}
          data-theme
        >
          <div ref={childRef}>{children}</div>
        </div>,
        document.getElementById('root') as Element,
      )
    : null;
};
export default Screen;
