/**
 * Project vite
 */

import type { FC, PropsWithChildren } from 'react';

import styles from './styles.module.scss';

/**
 * Label component
 */

interface Props {
  type?: 'danger' | 'info' | 'warning';
}

const Label: FC<PropsWithChildren<Props>> = ({ children, type = 'info' }) => {
  return (
    <div className={styles.label} data-type={type} data-theme>
      <p>{children}</p>
    </div>
  );
};

export default Label;
