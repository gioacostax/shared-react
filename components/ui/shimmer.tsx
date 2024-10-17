/**
 * Shared UI Components
 */

import React from 'react';
import { type CSSProperties, type FC, memo } from 'react';

interface Props {
  className?: string;
  'data-testid'?: string;
  height?: number | string;
  style?: CSSProperties;
  width?: number | string;
}

/**
 * Renders a customizable shimmer component.
 */
const Shimmer: FC<Props> = ({ height = '1.5rem', style, width = '100%', ...rest }) => (
  <div
    className={[
      'animate-pulse rounded-md bg-gradient-to-r from-slate-200 to-slate-300 opacity-20',
      rest.className,
    ]
      .filter(Boolean)
      .join(' ')}
    data-testid={rest['data-testid']}
    style={{ height, width, ...style }}
  />
);

export default memo(Shimmer);
