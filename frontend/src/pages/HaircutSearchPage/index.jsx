import React, { useState } from 'react';

function HaircutSearchPage() {

  const [selectedValues, setSelectedValues] = useState({
    dropdown1: '',
    dropdown2: '',
  });
  const [dateValue, setDateValue] = useState('');
  const [textValue, setTextValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleDropdownChange = (event) => {
    const { name, value } = event.target;
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleDateChange = (event) => {
    setDateValue(event.target.value);
  };

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleSearch = () => {
    // Perform search based on selectedValues, dateValue, and textValue
    // Fetch data from API or use any other data source
    // Update searchResults state with the retrieved data
    // Example: setSearchResults([{ name: 'John Doe', photo: 'john.jpg' }, { name: 'Jane Smith', photo: 'jane.jpg' }]);
  };

  return (
    <div className="flex flex-col items-center pb-20 bg-gray-200 text-black text-opacity-70">
      <section className="flex gap-3 mt-28 w-full text-3xl max-w-[1002px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-auto gap-1.5 whitespace-nowrap max-md:flex-wrap">
          <select
            name="dropdown1"
            value={selectedValues.dropdown2}
            onChange={handleDropdownChange}
          >
            <option value="">Select Option 2</option>
            <option value="option2">Option 2</option>
            {/* Add more options for dropdown2 */}
          </select>
        </div>
        <select
          name="dropdown2"
          value={selectedValues.dropdown2}
          onChange={handleDropdownChange}
        >
          <option value="">Select Option 2</option>
          <option value="option2">Option 2</option>
          {/* Add more options for dropdown2 */}
        </select>
      </section>
      <section className="flex gap-3 mt-4 w-full text-3xl max-w-[1002px] max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-auto gap-1 max-md:flex-wrap">
          <select
            name="dropdown2"
            value={selectedValues.dropdown2}
            onChange={handleDropdownChange}
          >
            <option value="">Select Option 2</option>
            <option value="option2">Option 2</option>
            {/* Add more options for dropdown2 */}
          </select>

        </div>
        <input
          type="date"
          value={dateValue}
          onChange={handleDateChange}
          className="mr-2"
        />
        <input
          type="text"
          value={textValue}
          onChange={handleTextChange}
          placeholder="Enter text"
        />
      </section>
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Search
      </button>
    </div>
  );
}

export default HaircutSearchPage;
