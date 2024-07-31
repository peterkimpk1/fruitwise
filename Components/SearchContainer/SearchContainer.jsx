import React from 'react'
import { useState } from 'react'
import './SearchContainer.css'
const SearchContainer = ({searchFruits, results}) => {
  const [query, setQuery] = useState('');
  return (
    <div className='search-container'>
      <h2>Search by genus, family, nutritions</h2>
      <div>
        <input className='search-bar' placeholder='Search Fruit Names' value={query} onChange={(e) => setQuery(e.target.value)}></input>
        <button onClick={() => searchFruits(query)}>Search</button>
      </div>
      {results}
    </div>
  )
}

export default SearchContainer
