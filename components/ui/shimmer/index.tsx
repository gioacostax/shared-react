/**
 * Project vite
 */

import { type CSSProperties, type FC, memo } from 'react';

import styles from './styles.module.scss';

interface Props {
  className?: string;
  'data-testid'?: string;
  height?: number | string;
  style?: CSSProperties;
  width?: number | string;
}

/**
 * Shimmer component
 */
const Shimmer: FC<Props> = ({ height = '2em', style, width = '100%', ...rest }) => (
  <div
    className={[styles.shimmer, rest.className].filter(Boolean).join(' ')}
    data-testid={rest['data-testid']}
    data-theme
    style={{ height, width, ...style }}
  />
);

export default memo(Shimmer);
