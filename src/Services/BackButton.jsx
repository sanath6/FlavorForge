import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = ({ to = "/" }) => {
  return (
    <div className="mt-5 ml-4 p-2 w-max bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition-all">
      <Link
        to={to}
        className="flex items-center gap-2 text-black font-bold"
      >
        <FaArrowLeft />
        Back
      </Link>
    </div>
  );
};

export default BackButton;