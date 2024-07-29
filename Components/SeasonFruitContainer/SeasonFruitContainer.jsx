import React from 'react'
import './SeasonFruitContainer.css'
import SeasonFruitCard from './SeasonFruitCard/SeasonFruitCard'
import {useState, useEffect } from 'react'
import moment from 'moment'
const SeasonFruitContainer = ({allSeasonalFruits}) => {
    const [currentSeason, setCurrentSeason] = useState('')
    const [seasonFruits, setSeasonFruits] = useState([]);
    const seasons = [
        { Winter: ['December', 'January', 'February'] },
        { Spring: ['March', 'April', 'May'] },
        { Summer: ['June', 'July', 'August'] },
        { Fall: ['September', 'October', 'November'] }];
    useEffect(() => {
        setCurrentMonth();
        getCurrentMonthFruits();
    },[])
    function setCurrentMonth() {
        seasons.find(season => {
            let seasonKey = Object.keys(season);
            if (season[seasonKey].includes(moment().format('MMMM'))) {
                setCurrentSeason(seasonKey)
            }
        });
    }
    function getCurrentMonthFruits() {
        const currentSeasonFruits = allSeasonalFruits.find(seasonFruit => {
            return Object.keys(seasonFruit)[0] === currentSeason[0]
        });
        setSeasonFruits(currentSeasonFruits)
    }
  return (
    <div className='season-fruit-container'>
      <h3>{moment().format('MMMM')}'s Seasonal Fruits</h3>
      <SeasonFruitCard seasonFruits={seasonFruits} currentSeason={currentSeason}/>
    </div>
  )
}

export default SeasonFruitContainer
