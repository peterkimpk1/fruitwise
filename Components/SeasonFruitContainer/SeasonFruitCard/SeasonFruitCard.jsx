import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import './SeasonFruitCard.css'
const SeasonFruitCard = ({seasonFruits,season}) => {
  if (seasonFruits[season]) {
    var fruitCards = seasonFruits[season].map(fruit => {
      let uniqueKey = uuidv4();
      return (
        <div className='season-card' key={uniqueKey}>    
          <h3>{fruit}</h3>
          <img src={`../../src/assets/${fruit.toLowerCase()}.jpg`}/>
        </div>  
      )
    })
  }
  return (
    <div className='season-cards-container'>
    {fruitCards}
    </div>
  )
}

export default SeasonFruitCard
