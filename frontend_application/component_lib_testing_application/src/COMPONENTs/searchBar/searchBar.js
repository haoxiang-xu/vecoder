// searchBar.js

import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import './searchBar.css';

const SearchBar = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isHovered, setHovered] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div className="search-bar">
      {isSearchVisible && (
        <div className="search-input-container">
          <input type="text" placeholder="搜索..." />
          <button onClick={toggleSearch} className="search-icon-inside active">
            <IoSearch />
          </button>
        </div>
      )}
      {!isSearchVisible && (
        <button
          onClick={toggleSearch}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`search-icon-outside ${isHovered ? 'hovered' : ''}`}
        >
          <IoSearch />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
