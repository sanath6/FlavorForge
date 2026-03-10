import React, { useEffect, useState } from "react";
import RecipeCard from "../Components/RecipeCard";

const Favorites = () => {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {

    const storedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(storedFavorites);

  }, []);

  const removeFavorite = (id) => {

    const updatedFavorites =
      favorites.filter((item) => item.idMeal !== id);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );

    setFavorites(updatedFavorites);
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        ❤️ Favorite Recipes
      </h1>

      {favorites.length === 0 && (
        <p>No favorites added</p>
      )}

      <div className="grid md:grid-cols-6 gap-6">

        {favorites.map((meal) => (

          <div key={meal.idMeal}>

            <RecipeCard meal={meal} />

            <button
              onClick={() => removeFavorite(meal.idMeal)}
              className="bg-gray-800 text-white px-3 py-1 rounded mt-2"
            >
              Remove
            </button>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Favorites;