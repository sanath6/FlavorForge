import axios from "axios";

const API = "https://www.themealdb.com/api/json/v1/1";

export const getMealById = async (id) => {
  const res = await axios.get(`${API}/lookup.php?i=${id}`);
  return res.data.meals || [];
};

export const searchMealByName = async (name) => {
  const res = await axios.get(`${API}/search.php?s=${name}`);
  return res.data.meals || [];
};

export const searchMealByIngredient = async (ingredient) => {
  const res = await axios.get(`${API}/filter.php?i=${ingredient}`);
  return res.data.meals || [];
};

export const searchMeals = async (query) => {

  let data = [];

  if (!query) return [];

  if (!isNaN(query)) {
    data = await getMealById(query);
  } else {

    data = await searchMealByName(query);

    if (!data || data.length === 0) {
      data = await searchMealByIngredient(query);
    }
  }

  return data;
};


