import Shimmer from '@shared/react/components/shimmer';
// biome-ignore lint/correctness/noUnusedImports: <react>
import React, {
  type ComponentPropsWithoutRef,
  type FC,
  Fragment,
  type MouseEvent,
  type PropsWithChildren,
  type ReactNode,
} from 'react';

export const Th: FC<ComponentPropsWithoutRef<'th'>> = ({ children, className, ...rest }) => (
  <th
    className={`sticky -top-px w-0 bg-slate-700/50 px-6 py-2 text-left backdrop-blur-sm ${className}`}
    scope="col"
    {...rest}
  >
    {children}
  </th>
);

export const Td: FC<ComponentPropsWithoutRef<'td'>> = ({ children, className, ...rest }) => (
  <td className={`px-6 py-2 ${className}`} {...rest}>
    {children}
  </td>
);

interface Props<Row extends object> {
  className?: string;
  columns?: { key: keyof Row; th: ReactNode }[];
  data?: Row[];
  dataKey: keyof Row;
  emptyLabel?: string;
  isLoading?: boolean;
  onRowClick?: (row: Row, e: MouseEvent<HTMLTableRowElement>) => void;
  renderRow: (row: Row) => Partial<Record<keyof Row, ReactNode>>;
}

const Table = <Row extends object>({
  children,
  className,
  columns,
  data,
  dataKey,
  emptyLabel = 'No se encontraron resultados',
  isLoading,
  onRowClick,
  renderRow,
}: PropsWithChildren<Props<Row>>) => (
  <div className={`relative w-full overflow-auto bg-slate-800 ${className}`}>
    <table className="w-full">
      {children && <caption className="p-4">{children}</caption>}
      <thead className="text-slate-50">
        <tr>
          {columns?.map(({ key, th }) => (
            <Fragment key={String(key)}>{th}</Fragment>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-700/50 bg-slate-800">
        {isLoading && (
          <>
            <tr>
              <td className="px-6 py-4 text-center" colSpan={columns?.length}>
                <Shimmer height={14} />
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center" colSpan={columns?.length}>
                <Shimmer height={14} />
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center" colSpan={columns?.length}>
                <Shimmer height={14} />
              </td>
            </tr>
          </>
        )}
        {!isLoading && !data?.length && (
          <tr>
            <td className="h-44 px-6 text-center" colSpan={columns?.length}>
              {emptyLabel}
            </td>
          </tr>
        )}
        {!isLoading &&
          data?.map((row) => (
            <tr
              className={`has-[:hover]:bg-slate-700/30 ${onRowClick ? 'cursor-pointer' : ''}`}
              key={String(row[dataKey] as number | string)}
              onClick={(e) => onRowClick?.(row, e)}
            >
              {columns?.map(({ key }) => (
                <Fragment key={`${String(row[dataKey] as number | string)}-${String(key)}`}>
                  {renderRow(row)[key]}
                </Fragment>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);

export default Table;
