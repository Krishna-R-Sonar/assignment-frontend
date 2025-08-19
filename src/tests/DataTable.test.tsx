import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import DataTable from '../components/DataTable';
import type { Column } from '../types/DataTable.types';

interface SampleData {
  name: string;
  age: number;
}

const sampleData: SampleData[] = [
  { name: 'Test', age: 30 },
  { name: 'Another', age: 25 },
];
const columns: Column<SampleData>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
];

test('renders DataTable with data', () => {
  render(<DataTable data={sampleData} columns={columns} />);
  expect(screen.getByText('Test')).toBeInTheDocument();
});

test('displays loading state', () => {
  render(<DataTable data={[]} columns={columns} loading />);
  expect(screen.getByText('Loading...')).toHaveRole('status');
});

test('displays empty state', () => {
  render(<DataTable data={[]} columns={columns} />);
  expect(screen.getByText('No data available')).toHaveRole('status');
});

test('selects multiple rows when checkbox is clicked', () => {
  const onRowSelect = vi.fn();
  render(<DataTable data={sampleData} columns={columns} selectable selectionMode="multiple" onRowSelect={onRowSelect} />);
  const checkbox = screen.getByLabelText('Select row 1');
  fireEvent.click(checkbox);
  expect(onRowSelect).toHaveBeenCalledWith([sampleData[0]]);
});

test('selects single row when radio is clicked', () => {
  const onRowSelect = vi.fn();
  render(<DataTable data={sampleData} columns={columns} selectable selectionMode="single" onRowSelect={onRowSelect} />);
  const radio1 = screen.getByLabelText('Select row 1');
  const radio2 = screen.getByLabelText('Select row 2');
  fireEvent.click(radio1);
  expect(onRowSelect).toHaveBeenCalledWith([sampleData[0]]);
  fireEvent.click(radio2);
  expect(onRowSelect).toHaveBeenCalledWith([sampleData[1]]);
});