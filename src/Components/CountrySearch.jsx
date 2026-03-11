import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import countryFlags from "../Services/Country flags";

const CountrySearch = () => {

  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setShowDropdown(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const fetchCountries = async () => {

    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );

    const data = await res.json();
    setCountries(data.meals);
  };

  const filteredCountries =
    search === ""
      ? countries
      : countries.filter((c) =>
        c.strArea.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <div className="relative"

    //   onMouseEnter={() => setShowDropdown(true)}
    //   onMouseLeave={() => setShowDropdown(false)}
    >

      <input
        type="text"
        placeholder="Search Country..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        onMouseEnter={() => setShowDropdown(true)}
        // onMouseLeave={() => setShowDropdown(false)}

        className="px-3 py-1 rounded text-black"
      />

      {showDropdown && (
        <div className="absolute bg-white text-black w-56 mt-2 rounded shadow max-h-64 overflow-y-auto">

          {filteredCountries.map((country) => {

            const code = countryFlags[country.strArea];

            return (
              <Link
                key={country.strArea}
                to={`/country/${country.strArea}`}
                onClick={() => {
                  setSearch("");
                  setShowDropdown(false);
                }}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100"
              >

                {code && (
                  <img
                    src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
                    alt={country.strArea}
                    className="w-6 h-4 object-cover"
                  />
                )}

                {country.strArea}

              </Link>
            );
          })}

        </div>
      )}

    </div>
  );
};

export default CountrySearch;