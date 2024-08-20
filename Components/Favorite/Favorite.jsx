import React, { useContext }from 'react'
import PropTypes from 'prop-types'
import CardContainer from '../CardContainer/CardContainer'
import AppContext from '../../Contexts/AppContext'
import './Favorite.css'
const Favorite = ({nutritionNames, toggleFavorite}) => {
  const {fruits} = useContext(AppContext)
  if (fruits.length > 0) {
    var favFruits = fruits.filter(fruit => fruit.isFavorite === true)
  }
  return (
    <div className='favorite-container'>
      {favFruits.length === 0? <h3>You have no favorites yet..</h3> : 
      <>
        <h3>Favorited Fruits</h3>
        <div className='card-container'>
          <CardContainer nutritiousFruits={favFruits} nutritionNames={nutritionNames} toggleFavorite={toggleFavorite}/>
        </div>
      </>}
    </div>
  )
}

export default Favorite

Favorite.propTypes = {
  nutritionNames: PropTypes.array.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  fruits: PropTypes.arrayOf(PropTypes.shape({
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
    order: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired
  }))
}
