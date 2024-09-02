import React from 'react'
import Card from './Card/Card'
import './CardContainer.css'
import PropTypes from 'prop-types'

const CardContainer = ({nutritiousFruits, nutritionNames,toggleFavorite}) => {
  console.log(nutritiousFruits)
  if (nutritiousFruits.length > 0) {
    var nutritionCards = nutritiousFruits.map(({name,id,family,order,genus,nutritions,isFavorite}) => {
      console.log(typeof nutritions)
      console.log(nutritions)
      var singleFruitNutrition = Object.values(nutritions)
      var lowestNutrition = Math.min(...singleFruitNutrition)
      var lowestNutritionIndex = singleFruitNutrition.findIndex((e) => e === lowestNutrition)
      var highestNutrition = Math.max(...singleFruitNutrition)
      var highestNutritionIndex = singleFruitNutrition.findIndex((e) => e === highestNutrition)
      

      return (
        <Card
        key={id}
        id={id}
        name={name}
        family={family}
        order={order}
        genus={genus}
        highestNutrition={highestNutrition}
        highestNutritionIndex={highestNutritionIndex}
        lowestNutrition={lowestNutrition}
        lowestNutritionIndex={lowestNutritionIndex}
        nutritions={nutritions}
        nutritionNames={nutritionNames}
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
        />
      )
    })
  }
  return (nutritiousFruits.length > 0 && nutritionCards)
  
}

export default CardContainer
CardContainer.propTypes = {
  nutritionNames: PropTypes.array.isRequired,
  nutritiousFruits: PropTypes.arrayOf(PropTypes.shape({
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
  })),
  toggleFavorite: PropTypes.func.isRequired
}