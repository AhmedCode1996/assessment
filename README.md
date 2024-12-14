# Image Management Platform

A modern web application for managing images and categories built with Next.js, Material UI, and React Query.

## Features

### Image Management

- Upload images with metadata (name, category, size, resolution)
- View images in a responsive gallery layout
- Delete images with confirmation
- Image preview during upload
- File information display (size, resolution)

### Category Management

- Create new categories with name and description
- View all categories in a grid layout
- Edit existing categories
- Delete categories with confirmation dialog

### Search and Filtering

- Search images by name with debounced input
- Filter images by category
- Client-side filtering for smooth user experience

### UI/UX Features

- Responsive design for all screen sizes
- Loading states with skeleton placeholders
- Error handling with user-friendly messages
- Modal dialogs for forms and confirmations
- Tab-based navigation between images and categories

### Technical Features

- Server-side rendering with Next.js App Router
- Efficient data fetching and caching with React Query
- Material UI components for consistent design
- TypeScript for type safety
- Husky for git hooks
- ESLint and Prettier for code quality

## Prerequisites

- Node.js (v18 or higher)
- pnpm package manager

## Installation

1. Clone the repository:

```bash
git clone https://github.com/AhmedCode1996/assessment.git
```

2. Install dependencies:

```bash
pnpm install
```

## Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## Dependencies

### Core

- Next.js v15.1.0
- React v19.0.0
- React DOM v19.0.0

### UI

- Material UI v6.2.0
- MUI Icons v6.2.0
- Material UI Pigment CSS v6.2.0

### State Management & Data Fetching

- TanStack React Query v5.62.7

### Development Tools

- TypeScript v5
- ESLint v9
- Prettier v3.4.2
- Husky v9.1.7

## Project Structure

```
src/
├── app/
│   ├── actions.ts        # Server actions
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/          # React components
├── hooks/              # Custom hooks
│   ├── common/         # Common/shared hooks
│   ├── mutations/      # React Query mutations
│   └── queries/        # React Query queries
├── lib/               # Library code
│   ├── api/           # API related code
│   ├── providers/     # React providers
│   ├── services/      # Service layer
│   ├── types/         # TypeScript types
│   └── utils/         # Utility functions
```
