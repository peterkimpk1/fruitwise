import React from 'react'
import { useState } from 'react'
const SearchContainer = ({searchFruits}) => {
  const [query, setQuery] = useState('');
  return (
    <>
      <input placeholder='Search Fruit Names' value={query} onChange={(e) => setQuery(e.target.value)}></input>
      <button onClick={() => searchFruits(query)}></button>
    </>
  )
}

export default SearchContainer
