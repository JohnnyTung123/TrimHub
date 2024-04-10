import React, { useState, useEffect } from "react";
import SalonContainer from "./SalonContainer";

export default function SearchSalonPage() {
  const API_URL = "http://localhost:8080";
  const [salons, setSalons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/salon-info/all`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSalons(data);
        setSearchResults(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearch = () => {
    const results = salons.filter((salon) =>
      salon.salonname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="p-8 bg-gray-200 min-h-screen h-full">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <span className="w-2 h-6 bg-green-700 mr-2"></span>
        Search Salons
      </h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="text-lg mr-4 p-2 rounded-md"
        placeholder="Search for salons..."
      />
      <button
        onClick={handleSearch}
        className="bg-green-700 text-white"
      >
        Search
      </button>
      <ul>
        {searchResults.map((salon) => (
          <SalonContainer key={salon._id} salon={salon} />
        ))}
      </ul>
    </div>
  );
}
