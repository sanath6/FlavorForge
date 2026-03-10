import React, { useEffect, useState } from "react";
import RecipeCard from "../Components/RecipeCard";

const Favorites = () => {

  const [favorites, setFavorites] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(storedFavorites);
  }, []);

  const handleSelect = (id) => {

    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }

  };

  const handleSelectAll = () => {

    if (selected.length === favorites.length) {
      setSelected([]);
    } else {
      const allIds = favorites.map((meal) => meal.idMeal);
      setSelected(allIds);
    }

  };

  const removeSelected = () => {

    const updated =
      favorites.filter((meal) => !selected.includes(meal.idMeal));

    localStorage.setItem("favorites", JSON.stringify(updated));

    setFavorites(updated);
    setSelected([]);
  };

  return (
    <div className="p-6">

      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">

  <h1 className="text-2xl font-bold">
    ❤️ Favorite Recipes
  </h1>

  <button
    onClick={removeSelected}
    disabled={selected.length === 0}
    className={`px-4 py-2 rounded text-white transition
      ${selected.length > 0
        ? "bg-red-500 hover:bg-red-600"
        : "bg-gray-300 cursor-not-allowed opacity-0"
      }`}
  >
    Remove ({selected.length})
  </button>

</div>

      {/* Select All */}
      {favorites.length > 0 && (
        <div className="mb-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.length === favorites.length}
              onChange={handleSelectAll}
            />
            Select All
          </label>
        </div>
      )}

      {favorites.length === 0 && (
        <p>No favorites added</p>
      )}

      {/* Recipe Grid */}
      <div className="grid md:grid-cols-8 gap-6">

        {favorites.map((meal) => (

          <div
            key={meal.idMeal}
            className="relative group"
          >

            {/* Checkbox on image */}
            <input
              type="checkbox"
              checked={selected.includes(meal.idMeal)}
              onChange={() => handleSelect(meal.idMeal)}
              className="absolute top-3 right-3 z-10 w-5 h-5 bg-white rounded shadow"
            />

            <RecipeCard meal={meal} />

          </div>

        ))}

      </div>

    </div>
  );
};

export default Favorites;