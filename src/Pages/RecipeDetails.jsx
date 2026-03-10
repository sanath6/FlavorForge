import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const RecipeDetails = () => {

    const { id } = useParams();
    const [meal, setMeal] = useState(null);

    useEffect(() => {

        const fetchMeal = async () => {

            const res = await axios.get(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            );

            setMeal(res.data.meals[0]);
        };

        fetchMeal();

    }, [id]);

    const saveFavorite = () => {

        const favorites =
            JSON.parse(localStorage.getItem("favorites")) || [];

        const exists = favorites.find(
            (item) => item.idMeal === meal.idMeal
        );

        if (!exists) {
            favorites.push(meal);

            localStorage.setItem(
                "favorites",
                JSON.stringify(favorites)
            );
        }
    };

    if (!meal) return <p>Loading...</p>;

    return (
        <div className="p-6">

            <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w- md:w-1/2 rounded-lg"
            />
            <button
                onClick={saveFavorite}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 
  text-white px-4 py-2 rounded-lg mt-4 transition duration-200"
            >
                <FaHeart />
                Add to Favorites
            </button>

            <h1 className="text-2xl font-bold mt-4">
                {meal.strMeal}
            </h1>

            <p className="text-gray-500">
                {meal.strCategory}
            </p>

            <p className="mt-4">
                {meal.strInstructions}
            </p>

        </div>
    );
};

export default RecipeDetails;