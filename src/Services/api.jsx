import axios from "axios";

const API = "https://www.themealdb.com/api/json/v1/1";

export const searchMeals = async (query) => {
  const res = await axios.get(`${API}/search.php?s=${query}`);
  return res.data.meals;
};