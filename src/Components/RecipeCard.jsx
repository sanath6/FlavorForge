import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ meal }) => {
  return (
    <Link to={`/recipe/${meal.idMeal}`}>
      <div className="bg-white rounded-xl shadow hover:scale-105 transition p-3">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="rounded-lg"
        />

        <h2 className="text-lg font-bold mt-2">
          {meal.strMeal}
        </h2>

        <p className="text-gray-500">
          {meal.strCategory}
        </p>
      </div>
    </Link>
  );
};

export default RecipeCard;