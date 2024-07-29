import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import './SeasonFruitCard.css'
const SeasonFruitCard = ({seasonFruits,currentSeason}) => {
  if (seasonFruits[currentSeason]) {
    var fruitCards = seasonFruits[currentSeason].map(fruit => {
      let uniqueKey = uuidv4();
      return (
        <div className='season-card' key={uniqueKey}>    
          <h3>{fruit}</h3>
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
