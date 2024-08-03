import React from 'react'
import Card from './Card/Card'
import './CardContainer.css'
const CardContainer = ({nutritiousFruits, nutritionNames}) => {
  if (nutritiousFruits.length > 0) {
    var nutritionCards = nutritiousFruits.map(({name,id,family,order,genus,nutritions}) => {
      let singleFruitNutrition = Object.values(nutritions).slice(1)
      let lowestNutrition = Math.min(...singleFruitNutrition)
      let lowestNutritionIndex = singleFruitNutrition.findIndex((e) => e === lowestNutrition)
      let highestNutrition = Math.max(...singleFruitNutrition)
      let highestNutritionIndex = singleFruitNutrition.findIndex((e) => e === highestNutrition)
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
        />
      )
    })
  }
  return (

    <div className='card-container'>
      {nutritionCards}
    </div>

  )
}

export default CardContainer
