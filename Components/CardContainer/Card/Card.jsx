import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Card = ({id, name, highestNutrition, lowestNutrition, highestNutritionIndex, lowestNutritionIndex, nutritionNames}) => {
    const capitalNutritionNames = nutritionNames.map(nutrition => nutrition.charAt(0).toUpperCase() + nutrition.slice(1))
    return (
        <div className='card'>
        <h3>{name}</h3>
        <div className='image-container'>
            <img src={`../../../assets/${name.toLowerCase()}.jpg`} alt={`Picture of ${name}`}/>
        </div>
        <p className='high-nutrition'>{`High in: ${capitalNutritionNames[highestNutritionIndex+1]} ${highestNutrition}g`} </p>
        <p className='low-nutrition'>{`Low in: ${capitalNutritionNames[lowestNutritionIndex+1]} ${lowestNutrition}g`} </p>
        <Link to={`/details/${id}`}>
            <button>More Info?</button>
        </Link>
        </div>
    )
}

export default Card

Card.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    highestNutrition: PropTypes.number.isRequired,
    lowestNutrition: PropTypes.number.isRequired,
    highestNutritionIndex: PropTypes.number.isRequired,
    lowestNutritionIndex: PropTypes.number.isRequired,
    nutritionNames: PropTypes.array.isRequired
}