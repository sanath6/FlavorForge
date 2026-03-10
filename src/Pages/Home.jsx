import React, { useEffect, useState } from "react";
import { searchMeals } from "../Services/api";
import RecipeCard from "../Components/RecipeCard";

const Home = () => {

  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [randomMeals, setRandomMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch random meals on load
  useEffect(() => {
    fetchRandomMeals();
  }, []);

  const fetchRandomMeals = async () => {

    try {

      const requests = [];

      for (let i = 0; i < 16; i++) {
        requests.push(
          fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        );
      }

      const responses = await Promise.all(requests);

      const data = await Promise.all(
        responses.map(res => res.json())
      );

      const meals = data.map(item => item.meals[0]);

      setRandomMeals(meals);

    } catch (error) {
      console.log(error);
    }

  };

  const handleSearch = async (e) => {

    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setMeals([]);
      return;
    }

    setLoading(true);

    const data = await searchMeals(value);

    setMeals(data || []);
    setLoading(false);
  };

  return (
    <div className="p-6">

      <p className="font-semibold mb-2">Search</p>

      <input
        type="text"
        placeholder="Search meals..."
        className="border p-2 w-full mb-6 rounded"
        value={query}
        onChange={handleSearch}
      />

      {loading && <p>Loading...</p>}

      {/* Search Results */}
      {query && (
        <div className="grid md:grid-cols-6 gap-6">
          {meals?.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
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