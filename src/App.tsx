import InputField from './components/InputField';
import DataTable from './components/DataTable';
import type { Column } from './types/DataTable.types';

interface SampleData {
  id: number;
  name: string;
  age: number;
}

const sampleData: SampleData[] = [
  { id: 1, name: 'John', age: 28 },
  { id: 2, name: 'Jane', age: 34 },
];
const columns: Column<SampleData>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
];

function App() {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">React Components Demo</h1>
      <InputField
        id="email-input"
        label="Email"
        placeholder="Enter email"
        helperText="Enter a valid email"
        showClear
        loading={false}
      />
      <div className="mt-8">
        <DataTable
          data={sampleData}
          columns={columns}
          selectable
          selectionMode="single"
          onRowSelect={(rows) => console.log('Selected:', rows)}
        />
      </div>
    </div>
  );
}

export default App;