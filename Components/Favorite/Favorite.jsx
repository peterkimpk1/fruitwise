import React, { useContext }from 'react'
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
        <CardContainer nutritiousFruits={favFruits} nutritionNames={nutritionNames} toggleFavorite={toggleFavorite}/>
      </>}
    </div>
  )
}

export default Favorite
