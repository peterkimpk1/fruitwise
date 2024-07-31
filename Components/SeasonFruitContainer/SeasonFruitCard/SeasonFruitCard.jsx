import React from 'react'

import './SeasonFruitCard.css'
const SeasonFruitCard = ({seasonFruitCards}) => {
  return (
    <div className='season-cards-container'>
      {seasonFruitCards}
    </div>
  )
}

export default SeasonFruitCard
