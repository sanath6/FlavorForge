import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ meal }) => {
  return (
    <Link to={`/recipe/${meal.idMeal}`}>
      <div className="bg-white rounded-xl shadow hover:scale-105 transition overflow-hidden h-[300px] flex flex-col">

        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="h-48 w-full object-cover"
        />

        <div className="p-3 flex flex-col justify-between flex-grow">

          <h2 className="text-md font-bold line-clamp-2">
            {meal.strMeal}
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            {meal.strCategory}
          </p>

        </div>

      </div>
    </Link>
  );
};

export default RecipeCard;