import React, { useState, useEffect } from 'react';
import type { InputFieldProps } from '../types/InputField.types';

const InputField: React.FC<InputFieldProps> = ({
  id,
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  showClear = false,
  showToggle = false,
  loading = false,
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [inputType, setInputType] = useState(type);
  const inputId = id ?? (label ? label.replace(/\s+/g, '-').toLowerCase() : undefined);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e);
  };

  const clearInput = () => {
    setInternalValue('');
    onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
  };

  const togglePassword = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  const baseStyles = 'w-full rounded transition-colors duration-200';
  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };
  const variantStyles = {
    filled: 'bg-gray-200 dark:bg-gray-700 border-0',
    outlined: 'bg-transparent border border-gray-300 dark:border-gray-600',
    ghost: 'bg-transparent border-0',
  };
  const invalidStyles = invalid ? 'border-red-500 dark:border-red-400' : '';
  const disabledStyles = disabled || loading ? 'opacity-50 cursor-not-allowed' : '';
  const loadingStyles = loading ? 'animate-pulse' : '';

  return (
    <div className="flex flex-col gap-1 w-full max-w-md mx-auto">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          type={inputType}
          value={internalValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${invalidStyles} ${disabledStyles} ${loadingStyles} focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400`}
          aria-invalid={invalid}
          aria-busy={loading}
          aria-label={label || placeholder}
          aria-describedby={helperText ? `${inputId}-helper` : undefined}
        />
        {showClear && internalValue && !disabled && !loading && (
          <button
            onClick={clearInput}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            aria-label="Clear input"
          >
            ×
          </button>
        )}
        {showToggle && type === 'password' && !loading && (
          <button
            onClick={togglePassword}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            aria-label="Toggle password visibility"
          >
            {inputType === 'password' ? 'Show' : 'Hide'}
          </button>
        )}
        {loading && (
          <div
            className="absolute right-2 top-1/2 -translate-y-1/2 border-t-2 border-blue-500 rounded-full w-4 h-4 animate-spin"
            role="status"
            aria-label="Loading"
          />
        )}
      </div>
      {helperText && (
        <p id={`${inputId}-helper`} className="text-xs text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
      {errorMessage && invalid && (
        <p className="text-xs text-red-500 dark:text-red-400">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;