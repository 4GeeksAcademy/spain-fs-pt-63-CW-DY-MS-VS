import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import "../../styles/search.css";

export const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="my-4 d-flex justify-content-center align-items-center">
      <input
        className="isearch w-25 py-2 text-center"
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search Artist..."
      />
      <button className='btsearch' onClick={handleSearch}>
        <FaSearch className='mb-1' />
      </button>
    </div>
  );
};
export default Search;

