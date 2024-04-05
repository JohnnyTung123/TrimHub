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
    <div>
      <h1>Search Salons</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded-md"
        placeholder="Search for salons..."
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((salon) => (
          <SalonContainer key={salon._id} salon={salon} />
        ))}
      </ul>
    </div>
  );
}
