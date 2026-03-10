import React, { useEffect, useState } from "react";
import { searchMeals } from "../Services/api";
import RecipeCard from "../Components/RecipeCard";

const Home = () => {

  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [randomMeals, setRandomMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch random meals on page load
  useEffect(() => {
    fetchRandomMeals();
  }, []);

  const fetchRandomMeals = async () => {
    try {

      const requests = Array.from({ length: 16 }, () =>
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      );

      const responses = await Promise.all(requests);

      const data = await Promise.all(
        responses.map((res) => res.json())
      );

      const meals = data.map((item) => item.meals[0]);

      setRandomMeals(meals);

    } catch (error) {
      console.log(error);
    }
  };

  // Debounced search
  useEffect(() => {

    const delay = setTimeout(async () => {

      if (!query) {
        setMeals([]);
        return;
      }

      setLoading(true);

      const data = await searchMeals(query);

      setMeals(data || []);

      setLoading(false);

    }, 500);

    return () => clearTimeout(delay);

  }, [query]);

  return (
    <div className="p-6">

      {/* Search Input */}
      <p className="font-semibold mb-2">Search</p>

      <input
        type="text"
        placeholder="Search by id, name or ingredient..."
        className="border p-2 w-full mb-6 rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p>Loading...</p>}

      {/* Search Results */}
      {query && (
        <div className="grid md:grid-cols-6 gap-6">

          {meals?.length > 0 ? (
            meals.map((meal) => (
              <RecipeCard key={meal.idMeal} meal={meal} />
            ))
          ) : (
            <p>No recipes found</p>
          )}

        </div>
      )}

      {/* Random Recipes */}
      {!query && (
        <>
          <h2 className="text-xl font-bold mb-4">
            🍽 Popular Recipes
          </h2>

          <div className="grid md:grid-cols-6 gap-6">

            {randomMeals.map((meal) => (
              <RecipeCard key={meal.idMeal} meal={meal} />
            ))}

          </div>
        </>
      )}

    </div>
  );
};

export default Home;