// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { FaHeart } from "react-icons/fa";
// import { getMealById } from "../Services/api";

// const RecipeDetails = () => {

//     const { id } = useParams();
//     const [meal, setMeal] = useState(null);

//     useEffect(() => {

//         const fetchMeal = async () => {
//             const data = await getMealById(id);
//             setMeal(data[0]);
//         };

//         fetchMeal();

//     }, [id]);

//     const saveFavorite = () => {

//         const favorites =
//             JSON.parse(localStorage.getItem("favorites")) || [];

//         const exists = favorites.find(
//             (item) => item.idMeal === meal.idMeal
//         );

//         if (!exists) {

//             favorites.push(meal);

//             localStorage.setItem(
//                 "favorites",
//                 JSON.stringify(favorites)
//             );

//         }

//     };

//     if (!meal) return <p className="p-6">Loading...</p>;

//     const ingredients = [];

//     for (let i = 1; i <= 20; i++) {

//         const ingredient = meal[`strIngredient${i}`];
//         const measure = meal[`strMeasure${i}`];

//         if (ingredient && ingredient.trim() !== "") {

//             ingredients.push({
//                 name: ingredient,
//                 measure: measure
//             });

//         }

//     }
//     const youtubeEmbed = meal.strYoutube
//         ? meal.strYoutube.replace("watch?v=", "embed/")
//         : null;

//     return (
//         <div className="p-8 max-w-7xl mx-auto">
//             <h1 className="text-3xl font-bold ">
//                 {meal.strMeal}
//             </h1>

//             <p className="text-gray-500">
//                 {meal.strCategory} • {meal.strArea}
//             </p>
//             <h2 className="text-2xl font-bold mb-6">
//                 Ingredients
//             </h2>
//             <div className="grid md:grid-cols-2 gap-10 items-start">

//                 <div className="h-[500px] overflow-y-auto pr-2">

//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

//                         {ingredients.map((item, index) => (

//                             <div
//                                 key={index}
//                                 className="bg-gray-200 text-center rounded-xl p-2
//         hover:scale-105 transition duration-300"
//                             >
//                                 <img
//                                     src={`https://www.themealdb.com/images/ingredients/${encodeURIComponent(item.name)}.png`}
//                                     alt={item.name}
//                                     className="w-20 h-20 mx-auto object-contain mb-3"
//                                 />

//                                 <p className="text-black text-base font-medium">
//                                     {item.measure} {item.name}
//                                 </p>

//                             </div>

//                         ))}

//                     </div>

//                 </div>

//                 <div className="relative h-[500px]">

//                     <img
//                         src={meal.strMealThumb}
//                         alt={meal.strMeal}
//                         className="w-full h-full object-cover rounded-lg shadow-lg"
//                     />

//                     <button
//   onClick={saveFavorite}
//   className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 active:animate-bounce active:scale-110
//   text-white p-3 rounded-full shadow-lg transition-all duration-200"
// >
//   <FaHeart />
// </button>


//                 </div>

//             </div>
//             <div className="mt-6 bg-gray-200 p-6 rounded-lg ">

//                 <h2 className="text-2xl font-bold mb-2">
//                     Instructions
//                 </h2>

//                 <p className="leading-relaxed whitespace-pre-line">
//                     {meal.strInstructions}
//                 </p>

//             </div>

//             {youtubeEmbed && (
//                 <>
//                     <h2 className="text-xl font-bold mt-8">
//                         Video Tutorial
//                     </h2>

//                     <div className="mt-4">

//                         <iframe
//                             width="100%"
//                             height="400"
//                             src={youtubeEmbed}
//                             title="Recipe Video"
//                             allowFullScreen
//                             className="rounded-lg"
//                         />

//                     </div>
//                 </>
//             )}
//         </div>
//     );

// };

// export default RecipeDetails;

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getMealById } from "../Services/api";

const RecipeDetails = () => {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [message, setMessage] = useState("");
    const timeoutRef = useRef(null);

    useEffect(() => {
        const fetchMeal = async () => {
            const data = await getMealById(id);
            setMeal(data[0]);
        };
        fetchMeal();
    }, [id]);

    useEffect(() => {
        if (meal) {
            const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
            const exists = favorites.find(item => item.idMeal === meal.idMeal);
            setIsFavorite(!!exists);
        }
    }, [meal]);

    const showMessage = (text) => {
        setMessage(text);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setMessage(""), 2000);
    };

    const toggleFavorite = (e) => {
        e.stopPropagation();
        const button = e.currentTarget;
        button.style.transform = 'scale(0.9)';
        
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const exists = favorites.find(item => item.idMeal === meal.idMeal);
        
        if (exists) {
            const updatedFavorites = favorites.filter(item => item.idMeal !== meal.idMeal);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            setIsFavorite(false);
            showMessage("Removed from favorites!");
        } else {
            favorites.push(meal);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            setIsFavorite(true);
            showMessage("Added to favorites section!");
        }
        
        setTimeout(() => button.style.transform = '', 150);
    };

    if (!meal) return <p className="p-6">Loading...</p>;

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            ingredients.push({ name: ingredient, measure: measure });
        }
    }
    
    const youtubeEmbed = meal.strYoutube
        ? meal.strYoutube.replace("watch?v=", "embed/")
        : null;

    return (
        <div className="p-8 max-w-7xl mx-auto relative">
            {message && (
    <div className="fixed top-20 right-4 z-50 bg-white 
    text-black px-6 py-3 rounded-xl shadow-2xl transition-all duration-300 scale-100 
    border-4 border-gray-200">
        <span className="font-semibold">{message}</span>
    </div>
)}

            
            <h1 className="text-3xl font-bold mb-2">{meal.strMeal}</h1>
            <p className="text-gray-500 mb-8">{meal.strCategory} • {meal.strArea}</p>
            
            <h2 className="text-2xl font-bold mb-6">Ingredients</h2>
            <div className="grid md:grid-cols-2 gap-10 items-start">
                <div className="h-[500px] overflow-y-auto pr-2">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {ingredients.map((item, index) => (
                            <div key={index} className="bg-gray-200 text-center rounded-xl p-2 hover:scale-105 transition duration-300">
                                <img
                                    src={`https://www.themealdb.com/images/ingredients/${encodeURIComponent(item.name)}.png`}
                                    alt={item.name}
                                    className="w-20 h-20 mx-auto object-contain mb-3"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                                <p className="text-black text-base font-medium">{item.measure} {item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative h-[500px]">
                    <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                    <button
    onClick={toggleFavorite}
    className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur-sm 
     rounded-full  active:animate-ping
    transition-all duration-300 active:scale-95 hover:scale-105 flex items-center justify-center z-20
    group hover:shadow-red-500/25"
    title={isFavorite ? "Removed from favorites " : "Added to favorites "}
>
    {isFavorite ? (
        <FaHeart 
            className="text-2xl scale-100 transition-all duration-300"
            style={{ color: '#dc2626' }} // Perfect red heart
        />
    ) : (
        <FaRegHeart 
            className="text-2xl scale-100 transition-all duration-300"
            style={{ color: '#9ca3af' }} // Perfect gray outline
        />
    )}
</button>

                </div>
            </div>

            <div className="mt-12 bg-gray-100 p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Instructions</h2>
                <p className="leading-relaxed whitespace-pre-line text-gray-700 text-lg">
                    {meal.strInstructions}
                </p>
            </div>

            {youtubeEmbed && (
                <>
                    <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-800">Video Tutorial</h2>
                    <div className="w-full aspect-video">
                        <iframe
                            width="100%"
                            height="400"
                            src={youtubeEmbed}
                            title={`Video tutorial for ${meal.strMeal}`}
                            allowFullScreen
                            className="w-full h-full rounded-2xl shadow-2xl"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default RecipeDetails;
