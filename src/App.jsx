import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import RecipeDetails from "./Pages/RecipeDetails";
import Favorites from "./Pages/Favorites";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/recipe/:id" element={<RecipeDetails />} />

        <Route path="/favorites" element={<Favorites />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;