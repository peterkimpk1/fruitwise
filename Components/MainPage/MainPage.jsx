import React from 'react'
import './MainPage.css'
import SearchContainer from '../SearchContainer/SearchContainer'
import SeasonFruitContainer from '../SeasonFruitContainer/SeasonFruitContainer'
const MainPage = ({searchFruits, seasonsData, allSeasonalFruitsData}) => {
  return (
    <div className='main'>
      <SearchContainer searchFruits={searchFruits} />
      <SeasonFruitContainer seasonsData={seasonsData} allSeasonalFruitsData={allSeasonalFruitsData}/>
      <h2>Why Fruits?</h2>
    </div>
  )
}

export default MainPage
