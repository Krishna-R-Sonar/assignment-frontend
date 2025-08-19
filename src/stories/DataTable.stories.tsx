import type { Meta, StoryObj } from '@storybook/react';
import DataTable from '../components/DataTable';
import type { Column } from '../types/DataTable.types';

interface SampleData {
  id: number;
  name: string;
  age: number;
}

const sampleData: SampleData[] = [
  { id: 1, name: 'Nikhil Rane', age: 28 },
  { id: 2, name: 'Arpit Desai', age: 34 },
];

const columns: Column<SampleData>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
];

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    selectionMode: { control: 'select', options: ['single', 'multiple'] },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable<SampleData>>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
  },
};

export const SelectableMultiple: Story = {
  args: {
    data: sampleData,
    columns,
    selectable: true,
    selectionMode: 'multiple',
    onRowSelect: (rows) => console.log('Selected rows:', rows),
  },
};

export const SelectableSingle: Story = {
  args: {
    data: sampleData,
    columns,
    selectable: true,
    selectionMode: 'single',
    onRowSelect: (rows) => console.log('Selected rows:', rows),
  },
};

export const Sorted: Story = {
  args: {
    data: sampleData,
    columns,
  },
  play: async ({ canvasElement }) => {
    const headers = canvasElement.querySelectorAll('th');
    headers[1]?.click();
  },
};