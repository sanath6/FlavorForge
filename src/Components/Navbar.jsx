import React from "react";
import { Link } from "react-router-dom";
import { FaKitchenSet } from "react-icons/fa6";
import CountrySearch from "../Components/CountrySearch";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-4 py-4 flex justify-between items-center">

      <Link to="/" className="flex items-center gap-2 ml-10">
        <FaKitchenSet className="text-4xl text-blue-400" />
        <p className="text-xl font-bold text-green-500">
          FalourForge
        </p>
      </Link>

      {/* Country Search Component */}
      <CountrySearch />

      <div className="flex gap-6">

        <Link to="/" className="hover:text-yellow-400">
          Home
        </Link>

        <Link to="/favorites" className="hover:text-yellow-400">
          Favorites
        </Link>

      </div>

    </nav>
  );
};

export default Navbar;