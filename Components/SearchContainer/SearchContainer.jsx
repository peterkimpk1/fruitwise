import React, { useContext } from 'react'
import { useState } from 'react'
import './SearchContainer.css'
import AppContext from '../../Contexts/AppContext'
import PropTypes from 'prop-types'
const SearchContainer = ({searchFruits, results}) => {
  const [query, setQuery] = useState('');
  const submitCheck = useContext(AppContext)
  return (
      <div className={!submitCheck.submitted ? "search-container":"search-container-submitted"}>
        <div>
          <input className='search-bar' placeholder='Search Fruit Names' value={query} onChange={(e) => setQuery(e.target.value)} autoFocus></input>
          <button className='search-btn' onClick={() => searchFruits(query)}>Search</button>
        </div>
        {results}
      </div>
     
  )
}

export default SearchContainer

SearchContainer.propTypes = {
  searchFruits: PropTypes.func.isRequired,
  results: PropTypes.node.isRequired
}
