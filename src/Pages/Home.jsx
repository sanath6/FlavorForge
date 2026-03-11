// import React, { useEffect, useState } from "react";
// import { searchMeals } from "../Services/api";
// import RecipeCard from "../Components/RecipeCard";

// const Home = () => {

//   const [query, setQuery] = useState("");
//   const [meals, setMeals] = useState([]);
//   const [randomMeals, setRandomMeals] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch random meals on page load
//   useEffect(() => {
//     fetchRandomMeals();
//   }, []);

//   const fetchRandomMeals = async () => {
//     try {

//       const requests = Array.from({ length: 16 }, () =>
//         fetch("https://www.themealdb.com/api/json/v1/1/random.php")
//       );

//       const responses = await Promise.all(requests);

//       const data = await Promise.all(
//         responses.map((res) => res.json())
//       );

//       const meals = data.map((item) => item.meals[0]);

//       setRandomMeals(meals);

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Debounced search
//   useEffect(() => {

//     const delay = setTimeout(async () => {

//       if (!query) {
//         setMeals([]);
//         return;
//       }

//       setLoading(true);

//       const data = await searchMeals(query);

//       setMeals(data || []);

//       setLoading(false);

//     }, 500);

//     return () => clearTimeout(delay);

//   }, [query]);

//   return (
//     <div className="p-6">

//       {/* Search Input */}
//       <p className="font-semibold mb-2">Search</p>

//       <input
//         type="text"
//         placeholder="Search by id, name or ingredient..."
//         className="border p-2 w-full mb-6 rounded"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />

//       {loading && <p>Loading...</p>}

//       {/* Search Results */}
//       {query && (
//         <div className="grid md:grid-cols-6 gap-6">

//           {meals?.length > 0 ? (
//             meals.map((meal) => (
//               <RecipeCard key={meal.idMeal} meal={meal} />
//             ))
//           ) : (
//             <p>No recipes found</p>
//           )}

//         </div>
//       )}

//       {/* Random Recipes */}
//       {!query && (
//         <>
//           <h2 className="text-xl font-bold mb-4">
//             🍽 Popular Recipes
//           </h2>

//           <div className="grid md:grid-cols-6 gap-6">

//             {randomMeals.map((meal) => (
//               <RecipeCard key={meal.idMeal} meal={meal} />
//             ))}

//           </div>
//         </>
//       )}

//     </div>
//   );
// };

// export default Home;

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
      const data = await Promise.all(responses.map((res) => res.json()));
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
    <div className="w-full min-h-screen px-2 sm:px-4 md:px-6 lg:px-8 py-4">
      {/* Search Input */}
      <p className="font-semibold mb-2 text-sm sm:text-base lg:text-lg">Search</p>
      <input
        type="text"
        placeholder="Search by id, name or ingredient..."
        className="border p-2 sm:p-3 w-full mb-6 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p className="text-center mb-4">Loading...</p>}

      {/* Search Results */}
      {query && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 w-full">
          {meals?.length > 0 ? (
            meals.map((meal) => <RecipeCard key={meal.idMeal} meal={meal} />)
          ) : (
            <p className="col-span-full text-center">No recipes found</p>
          )}
        </div>
      )}

      {/* Random Recipes */}
      {!query && (
        <>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4">🍽 Popular Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 w-full">
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