import React from 'react'
import './SeasonFruitContainer.css'
import SeasonFruitCard from './SeasonFruitCard/SeasonFruitCard'
import {useState, useEffect } from 'react'
import moment from 'moment'
const SeasonFruitContainer = ({seasonsData, allSeasonalFruitsData}) => {
    const [season, setSeason] = useState('');
    const [seasonFruits, setSeasonFruits] = useState([]);
    let currentDate = moment().format('MMMM')
    useEffect(() => {
        getCurrentMonthFruits();
    },[])
    function getCurrentMonthFruits() {
        let currentSeason;
        seasonsData.forEach(season => {
            let seasonKey = Object.keys(season)
            if(season[seasonKey].includes(currentDate)) {
                currentSeason = seasonKey[0]
            }
        })
        const currentSeasonFruits = allSeasonalFruitsData.find(seasonalFruits => 
            Object.keys(seasonalFruits)[0] === currentSeason
        )
        setSeason(Object.keys(currentSeasonFruits))
        setSeasonFruits(currentSeasonFruits)
    };
  return (
    <div className='season-fruit-container'>
      <h3>{currentDate}'s Seasonal Fruits</h3>
      <SeasonFruitCard seasonFruits={seasonFruits} season={season}/>
    </div>
  )
}

export default SeasonFruitContainer
