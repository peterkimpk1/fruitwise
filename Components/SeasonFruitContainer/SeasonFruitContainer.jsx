import React from 'react'
import './SeasonFruitContainer.css'
import '../../Components/CardContainer/CardContainer.css'
import CardContainer from '../CardContainer/CardContainer'
import moment from 'moment'
import PropTypes from 'prop-types'
const SeasonFruitContainer = ({seasonFruits, nutritionNames, toggleFavorite}) => {
  return (
    <div className='season-fruit-container'>
      <h2>{moment().format('MMMM')}'s Seasonal Fruits</h2>
      <div className='season-cards-container'>
        <CardContainer nutritiousFruits={seasonFruits} nutritionNames={nutritionNames} toggleFavorite={toggleFavorite}/>
      </div>
      {/* <button className='direction-btn'>Left</button>
      <button className='direction-btn'>Right</button> */}
    </div>
  )
}

export default SeasonFruitContainer

SeasonFruitContainer.propTypes = {
  seasonFruits: PropTypes.arrayOf(PropTypes.shape({
    family: PropTypes.string.isRequired,
    genus: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    nutritions: PropTypes.shape({
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      sugar: PropTypes.number.isRequired,
      protein: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
    }),
    order: PropTypes.string.isRequired
  })),
  toggleFavorite: PropTypes.func.isRequired
}