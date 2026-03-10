import axios from "axios";

const API = "https://www.themealdb.com/api/json/v1/1";

// Search by ID
export const getMealById = async (id) => {
  const res = await axios.get(`${API}/lookup.php?i=${id}`);
  return res.data.meals || [];
};

// Search by Name
export const searchMealByName = async (name) => {
  const res = await axios.get(`${API}/search.php?s=${name}`);
  return res.data.meals || [];
};

// Search by Ingredient
export const searchMealByIngredient = async (ingredient) => {
  const res = await axios.get(`${API}/filter.php?i=${ingredient}`);
  return res.data.meals || [];
};

// Smart Search (used in Home page)
export const searchMeals = async (query) => {

  let data = [];

  if (!query) return [];

  // If number → ID search
  if (!isNaN(query)) {
    data = await getMealById(query);
  } else {

    // Try name
    data = await searchMealByName(query);

    // If not found → ingredient
    if (!data || data.length === 0) {
      data = await searchMealByIngredient(query);
    }
  }

  return data;
};


