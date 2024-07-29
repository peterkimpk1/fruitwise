import React from 'react'
import './MainPage.css'
import SearchContainer from '../SearchContainer/SearchContainer'
import SeasonFruitContainer from '../SeasonFruitContainer/SeasonFruitContainer'
const MainPage = ({searchFruits}) => {
  return (
    <div>
      <SearchContainer searchFruits={searchFruits}/>
      <SeasonFruitContainer/>
      <h2>Why Fruits?</h2>
    </div>
  )
}

export default MainPage
