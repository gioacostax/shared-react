/**
 * Shared UI Components
 */

import React, { type FC, type PropsWithChildren, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  bgClassName?: string;
  childrenClassName?: string;
  className?: string;
  closeOnClickOutside?: boolean;
  'data-testid'?: string;
  isVisible?: boolean;
  onClose?: () => void;
}

/**
 * Renders a customizable screen component.
 */
const Screen: FC<PropsWithChildren<Props>> = ({
  bgClassName,
  children,
  childrenClassName,
  className,
  closeOnClickOutside,
  isVisible,
  onClose,
  ...rest
}) => {
  const childRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDialogElement>(null);

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
        <>
          <span
            className={[
              'animate-fadeIn fixed top-0 left-0 z-30 h-full w-full bg-black/5 backdrop-blur-xs',
              bgClassName,
            ]
              .filter(Boolean)
              .join(' ')}
            data-testid="bg-screen"
          />
          <dialog
            className={[
              'animate-fadeIn fixed top-0 left-0 z-30 flex h-full w-full items-center justify-center bg-transparent p-6',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            data-screen
            data-testid={rest['data-testid']}
            open
            ref={screenRef}
          >
            <div className={childrenClassName} ref={childRef}>
              {children}
            </div>
          </dialog>
        </>,
        document.body,
      )
    : null;
};

export default Screen;
