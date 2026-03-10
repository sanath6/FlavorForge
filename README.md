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

## Favorites page
Given an favorites button to list any item and given an page to list and remove if not required

## Intallization of react icons for icons for UI
npm install react-icons

## Implemented country search and component 
Implemnted country wise search and display recipes according to country search

## Feature
I have add an feature to select all  or indivisual recipe to remove from favorites from your bucket list.
Remove button appears atomaticaally when u select any one of recipe and it shows count on right side 

## Addition of Country Flags 
I have added flags for Api list and render according to flag code where the code are seperatly in Country flags.jsx file under Services Folder
Implmented a some userexperience features

Uses an separate website for flags images  https://flagcdn.com/
I've have rendered country flag images for the countries available on TheMealDB.com using their API data.

## Implemented Elastic search property in search 
user can search by id/name/categroy/ingredians it will sow according it


## elastic search another way like creating another comapnent


import React, { useState } from "react";
import {
  getMealById,
  searchMealByName,
  searchMealByIngredient
} from "../Services/api";

const RecipeSearch = () => {

  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState([]);

  const handleSearch = async () => {

    let data = [];

    if (!search) return;

    if (!isNaN(search)) {
      data = await getMealById(search);
    } else {
      
      data = await searchMealByName(search);

      if (!data || data.length === 0) {
        data = await searchMealByIngredient(search);
      }
    }

    setMeals(data);
  };

  return (
    <div className="p-6">

      <input
        type="text"
        placeholder="Search recipe..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mr-2"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>

      <div className="grid grid-cols-3 gap-4 mt-6">

        {meals?.map((meal) => (
          <div key={meal.idMeal} className="border p-3 rounded">

            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="rounded"
            />

            <h3 className="font-bold mt-2">
              {meal.strMeal}
            </h3>

          </div>
        ))}

      </div>

    </div>
  );
};

export default RecipeSearch;

## Details of item---Recipe Deatils.jsx
when the user click an item it render the Food steps and recipe and instructions and iamge of item and u ahve choice to add to favourite section at top .It shows of measurements and ingredients.

## Features --- Added/Embeded Youtube video for eachrecipe of an item for reference
## Improve UI the RecipeDetails page
in this i have added some new scrollable effect and you see the ingredians in lesss pace to avoid memory space consumption and u can see added the favoute of item

## Added Animation effect to Favouirte button 
It shows animation effect and it shows an millisecound messege whether it is removed or added to favourites section
