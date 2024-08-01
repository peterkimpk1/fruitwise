import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({id, name,family,order,genus,nutritions,highestNutrition,lowestNutrition,highestNutritionIndex,lowestNutritionIndex, nutritionNames}) => {
    const capitalNutritionNames = nutritionNames.map(nutrition => nutrition.charAt(0).toUpperCase() + nutrition.slice(1))
    return (
        <div className='card'>
        <h3>{name}</h3>
        <div className='image-container'>
            <img src={`../../../src/assets/${name}.jpg`} alt={`Picture of ${name}`}/>
        </div>
        <p>Good for: </p>
        <p className='high-nutrition'>{`High in: ${capitalNutritionNames[highestNutritionIndex+1]} ${highestNutrition}g`} </p>
        <p className='low-nutrition'>{`Low in: ${capitalNutritionNames[lowestNutritionIndex+1]} ${lowestNutrition}g`} </p>
        <Link to={`/details/${id}`}>
            <button>More Info?</button>
        </Link>
        </div>
    )
}

export default Card
