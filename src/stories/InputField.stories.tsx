import type { Meta, StoryObj } from '@storybook/react';
import InputField from '../components/InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['filled', 'outlined', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    type: { control: 'select', options: ['text', 'password', 'email'] },
    showClear: { control: 'boolean' },
    showToggle: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter email',
  },
};

export const Invalid: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter email',
    invalid: true,
    errorMessage: 'Invalid email',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter email',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter email',
    loading: true,
  },
};

export const PasswordWithToggle: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    type: 'password',
    showToggle: true,
  },
};

export const WithClearButton: Story = {
  args: {
    id: 'search-input',
    label: 'Search',
    placeholder: 'Enter search term',
    showClear: true,
    value: 'Example',
  },
};

export const DarkMode: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter email',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};