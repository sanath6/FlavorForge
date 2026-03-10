import React, { useState } from "react";
import { searchMeals } from "../Services/api";
import RecipeCard from "../Components/RecipeCard";

const Home = () => {

  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {

    const value = e.target.value;
    setQuery(value);

    if (!value) return;

    setLoading(true);

    const data = await searchMeals(value);

    setMeals(data || []);
    setLoading(false);
  };

  return (
    <div className="p-6">
    <p>Search</p>
      <input
        type="text"
        placeholder="Search meals..."
        className="border p-2 w-full mb-6"
        value={query}
        onChange={handleSearch}
      />

      {loading && <p>Loading...</p>}

      <div className="grid md:grid-cols-3 gap-6">

        {meals?.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}

      </div>

    </div>
  );
};

export default Home;