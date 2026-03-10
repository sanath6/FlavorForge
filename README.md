# React + Vite

<!-- This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project. -->

## Project Setup

This is a Vite + React project with Tailwind CSS configured for styling.

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

### Features
- **Vite**: Fast build tool with HMR (Hot Module Replacement)
- **React**: UI library for building components
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **PostCSS & Autoprefixer**: CSS processing and vendor prefixes


## Intialization of Tailwind css for UI 
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

## change in tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

## change in index.css for autoadapt csss properties
@tailwind base;
@tailwind components;
@tailwind utilities;

## Folder structure creation  and  features addition
Components
Pages
Services -- basic url general

## Addition of code and readme file steps
## Initailazation of react-router and axios 
npm install react-router-dom
npm install axios

## Favourites page
Given an favouirte button to list any item and given an page to list and remove if not required

## Intallization of react icons for icons for UI
npm install react-icons