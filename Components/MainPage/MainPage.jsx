import React from 'react'
import './MainPage.css'
import SearchContainer from '../SearchContainer/SearchContainer'
import SeasonFruitContainer from '../SeasonFruitContainer/SeasonFruitContainer'
const MainPage = ({searchFruits, results, seasonFruits, seasonFruitCards}) => {
  return (
    <div className='main'>
      <SearchContainer searchFruits={searchFruits} results={results}/>
      
      <SeasonFruitContainer seasonFruits={seasonFruits} seasonFruitCards={seasonFruitCards}/>
      <section className='reason-section'>
        <h2>Why fruits?</h2>
        <div className='reason-container'>
          <div className='reason-card'>
            <p> <span className='reason-number'>1</span></p>
          </div>
          <div className='reason-card'>
            <p> <span className='reason-number'>2</span></p>
          </div>
          <div className='reason-card'>
            <p> <span className='reason-number'>3</span></p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MainPage
