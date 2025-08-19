import React, { useState } from 'react';
import type { DataTableProps, Column } from '../types/DataTable.types';

function DataTable<T>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  selectionMode = 'multiple',
}: DataTableProps<T> & { selectionMode?: 'single' | 'multiple' }) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'ascending' | 'descending' } | null>(null);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const requestSort = (key: keyof T) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleSelect = (row: T, checked: boolean) => {
    let next = selectedRows;
    if (selectionMode === 'single') {
      next = checked ? [row] : [];
    } else {
      next = checked ? [...selectedRows, row] : selectedRows.filter((r) => r !== row);
    }
    setSelectedRows(next);
    onRowSelect?.(next);
  };

  if (loading)
    return (
      <div className="text-center py-4 text-gray-500 dark:text-gray-400" role="status" aria-live="polite">
        Loading...
      </div>
    );
  if (!data.length)
    return (
      <div className="text-center py-4 text-gray-500 dark:text-gray-400" role="status" aria-live="polite">
        No data available
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {selectable && (
              <th scope="col" className="px-6 py-3 w-12">
                <span className="sr-only">Select</span>
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                onClick={() => col.sortable && requestSort(col.dataIndex)}
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${col.sortable ? 'cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 outline-none' : ''}`}
                aria-sort={sortConfig?.key === col.dataIndex ? sortConfig.direction : 'none'}
                tabIndex={col.sortable ? 0 : -1}
                onKeyDown={(e) => col.sortable && e.key === 'Enter' && requestSort(col.dataIndex)}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
          {sortedData.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              {selectable && (
                <td className="px-6 py-4 w-12">
                  <input
                    type={selectionMode === 'single' ? 'radio' : 'checkbox'}
                    name={selectionMode === 'single' ? 'row-select' : undefined}
                    onChange={(e) => handleSelect(row, e.target.checked)}
                    checked={selectedRows.includes(row)}
                    aria-label={`Select row ${index + 1}`}
                  />
                </td>
              )}
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {row[col.dataIndex] as React.ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;