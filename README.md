# React Components Assignment

## Overview
This project implements two React components (`InputField` and `DataTable`) using React, TypeScript, TailwindCSS, and Storybook with Vite. The components are documented in Storybook, tested with Vitest, and styled for responsiveness and accessibility.

## Features
- **InputField**:
  - Supports text, password, and email inputs.
  - Variants: filled, outlined, ghost.
  - Sizes: small, medium, large.
  - States: disabled, invalid, loading.
  - Optional: clear button, password toggle, light/dark theme support.
  - Accessible with ARIA labels, `aria-busy`, and `aria-describedby`.
- **DataTable**:
  - Displays tabular data with column sorting and row selection (single/multiple).
  - States: loading, empty.
  - Generic typing for flexible data.
  - Responsive with horizontal scrolling.
  - Accessible with ARIA labels, `aria-sort`, `role="status"`, and `aria-live`.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repo-url>
2. Install dependencies:
   ```bash
    npm install
3. Run the development server
   ```bash
    npm run dev
4. Run Storybook:
   ```bash
    npm run storybook
5. Run tests:
   ```bash
    npm run test         
