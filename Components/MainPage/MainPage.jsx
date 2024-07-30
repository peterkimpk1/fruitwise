import React from 'react'
import './MainPage.css'
import SearchContainer from '../SearchContainer/SearchContainer'
import SeasonFruitContainer from '../SeasonFruitContainer/SeasonFruitContainer'
const MainPage = ({searchFruits, seasonsData, allSeasonalFruitsData, results}) => {
  return (
    <div className='main'>
      <SearchContainer searchFruits={searchFruits} results={results}/>
      <SeasonFruitContainer seasonsData={seasonsData} allSeasonalFruitsData={allSeasonalFruitsData}/>
    </div>
  )
}

export default MainPage
