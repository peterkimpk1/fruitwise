import React from 'react'
import './SeasonFruitContainer.css'
import SeasonFruitCard from './SeasonFruitCard/SeasonFruitCard'
import {useState, useEffect } from 'react'
import moment from 'moment'
const SeasonFruitContainer = ({seasonFruitCards, seasonFruits}) => {
  return (
    <div className='season-fruit-container'>
      <h2>{moment().format('MMMM')}'s Seasonal Fruits</h2>
      <SeasonFruitCard seasonFruits={seasonFruits} seasonFruitCards={seasonFruitCards}/>
    </div>
  )
}

export default SeasonFruitContainer
