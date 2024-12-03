/**
 * Shared UI Components
 */

import { type ReactNode, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

/**
 * Create a customizable toast element.
 */
const useToast = (parentId = 'root') => {
  const addToast = useCallback(
    (key: string, content: ReactNode) => {
      const parent = document.getElementById(parentId);
      let container = document.getElementById('toast-container');

      if (!container) {
        container = document.createElement('div');
        container.setAttribute('id', 'toast-container');
        container.setAttribute('class', 'z-100 fixed top-6 right-6 flex flex-col gap-4');
        parent?.appendChild(container);
      }

      const toast = document.createElement('div');
      toast.setAttribute('id', key);
      toast.setAttribute('class', 'animate-toast relative');

      container.appendChild(toast);

      const body = createRoot(document.getElementById(key)!);
      body.render(content);

      setTimeout(() => {
        body.unmount();
        container.removeChild(toast);

        if (!container.children.length) {
          parent?.removeChild(container);
        }
      }, 5000);
    },
    [parentId],
  );

  return { addToast };
};

export default useToast;
