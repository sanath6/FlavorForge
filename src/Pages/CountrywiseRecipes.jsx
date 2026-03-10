import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "../Components/RecipeCard";

const CountryRecipes = () => {

  const { country } = useParams();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchMeals();
  }, [country]);

  const fetchMeals = async () => {

    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`
    );

    const data = await res.json();
    setMeals(data.meals || []);

  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        {country} Recipes
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {meals.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}

      </div>

    </div>
  );
};

export default CountryRecipes;