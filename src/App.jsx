import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import RecipeDetails from "./Pages/RecipeDetails";
import Favorites from "./Pages/Favorites";
import Navbar from "./Components/Navbar";
import CountryRecipes from "./Pages/CountrywiseRecipes";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/recipe/:id" element={<RecipeDetails />} />

        <Route path="/favorites" element={<Favorites />} />
        <Route path="/country/:country" element={<CountryRecipes />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;