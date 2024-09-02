import React from 'react'
import './MainPage.css'
import SearchContainer from '../SearchContainer/SearchContainer'
import SeasonFruitContainer from '../SeasonFruitContainer/SeasonFruitContainer'
import PropTypes from 'prop-types'

const MainPage = ({searchFruits, results, seasonFruits, toggleFavorite, nutritionNames}) => {
  return (
    <>
      <div className='main'>
        <div className='eat-fruit-season-wrapper'>
          <div className='eat-fruit-section'>
            <i>FIND THE FRUIT FOR YOU.</i>
            <div className='main-header-wrapper'>
              <h1>Eat Fruits, Be Healthy.</h1>
            </div>
            <p id='fruit-reason'>Fruits should be an important part of your daily diet. Find fruits based on nutrition to fill your needs.</p>
          </div>
          <SearchContainer searchFruits={searchFruits} results={results}/>
        </div>
        <div className='search-reason-wrapper'>
          {seasonFruits.length > 0 ? <SeasonFruitContainer seasonFruits={seasonFruits} toggleFavorite={toggleFavorite} nutritionNames={nutritionNames}/>: null}
          <section className='reason-section'>
            <h2 className='main-header'>Why fruits?</h2>
            <div className='reason-container'>
              <div className='reason-card'>
                <p className='reason-fruit'>            
                  Eating fruits as part of your diet are likely to have a reduced risk of some chronic diseases, such as heart disease, including heart attack and stroke and certain types of cancers.
                  </p>
              </div>
              <div className='reason-card'>
                <p className='reason-fruit'>               
                  Fruits provide nutrients vital for health and maintenance of your body, such as fiber, vitamin C, potassium, and folate. 
                  </p>
              </div>
              <div className='reason-card'>
                <p className='reason-fruit'> 
                  Fruits that are lower in calories instead of higher-calorie foods may be useful in helping to lower calorie intake.
                  </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default MainPage
MainPage.propTypes = {
  searchFruits: PropTypes.func.isRequired,
  results: PropTypes.node.isRequired,
  seasonFruits: PropTypes.arrayOf(PropTypes.shape({
    family: PropTypes.string.isRequired,
    genus: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    nutritions: PropTypes.shape({
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      sugar: PropTypes.number,
      protein: PropTypes.number,
      fat: PropTypes.number,
    }),
    order: PropTypes.string.isRequired
  })),
  toggleFavorite: PropTypes.func.isRequired
}