import React from 'react'
import PropTypes from 'prop-types'

import './SeasonFruitCard.css'
const SeasonFruitCard = ({seasonFruitCards}) => {
  return (
    <div className='season-cards-container'>
      {seasonFruitCards}
    </div>
  )
}

export default SeasonFruitCard

SeasonFruitCard.propTypes = {
  seasonFruitCards: PropTypes.node.isRequired
}