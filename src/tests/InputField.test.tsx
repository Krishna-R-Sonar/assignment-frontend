import { render, screen, fireEvent } from '@testing-library/react';
import InputField from '../components/InputField';

test('renders InputField with label', () => {
  render(<InputField label="Test Label" />);
  expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
});

test('displays error message when invalid', () => {
  render(<InputField label="Test" invalid errorMessage="Invalid input" />);
  expect(screen.getByText('Invalid input')).toBeInTheDocument();
});

test('clears input when clear button is clicked', () => {
  render(<InputField label="Test" showClear value="Example" />);
  const clearButton = screen.getByLabelText('Clear input');
  fireEvent.click(clearButton);
  expect(screen.getByLabelText('Test')).toHaveValue('');
});

test('displays loading state', () => {
  render(<InputField label="Test" loading />);
  expect(screen.getByRole('status')).toBeInTheDocument();
});