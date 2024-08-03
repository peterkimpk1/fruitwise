import React from 'react'
import { useState } from 'react'
import './SearchContainer.css'
const SearchContainer = ({searchFruits, results}) => {
  const [query, setQuery] = useState('');
  return (
    <div className='search-container'>
      <div>
        <input className='search-bar' placeholder='Search Fruit Names' value={query} onChange={(e) => setQuery(e.target.value)} autoFocus></input>
        <button className='search-btn' onClick={() => searchFruits(query)}>Search</button>
      </div>
      {results}
    </div>
  )
}

export default SearchContainer
