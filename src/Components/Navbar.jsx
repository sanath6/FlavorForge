import React from "react";
import { Link } from "react-router-dom";
import { FaKitchenSet } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-4 py-4 flex justify-between items-center">

      <Link to="/" className="flex items-center gap-2  ml-10 rounded-lg  transition duration-200 text-xl font-bold">
        <FaKitchenSet className="text-4xl text-blue-400" /> 
        <p className="text-xl font-bold text-green-500">FalourForge</p>
      </Link>

      <div className="flex gap-6">

        <Link
          to="/"
          className="hover:text-yellow-400 transition"
        >
          Home
        </Link>

        <Link
          to="/favorites"
          className="hover:text-yellow-400 transition"
        >
          Favorites
        </Link>

      </div>

    </nav>
  );
};

export default Navbar;