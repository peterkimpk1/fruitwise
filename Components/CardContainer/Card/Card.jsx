import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Card.css'
const Card = ({id, name, highestNutrition, lowestNutrition, highestNutritionIndex, lowestNutritionIndex, nutritionNames,toggleFavorite, isFavorite}) => {
    const capitalNutritionNames = nutritionNames.map(nutrition => nutrition.charAt(0).toUpperCase() + nutrition.slice(1))
    return (
        <div className='card' id={id}>
            <div className={isFavorite? 'favorite-icon-container':'not-favorite-icon-container'} onClick={toggleFavorite}>
                <img className={'not-favorite-icon-container'} src={'../../../assets/star.svg'}/>
            </div>
            <div className='card-info-wrapper'>
                <h3>{name}</h3>
                <div className='image-container'>
                    <img className='card-image' src={`../../../assets/${name.toLowerCase()}.jpg`} alt={`Picture of ${name}`}/>
                </div>
                <div className='nutrition-btn-wrapper'>
                    <p className='high-nutrition'>{`High in: ${capitalNutritionNames[highestNutritionIndex]} ${highestNutrition}g`} </p>
                    <p className='low-nutrition'>{`Low in: ${capitalNutritionNames[lowestNutritionIndex]} ${lowestNutrition}g`} </p>
                    <Link to={`/details/${id}`}>
                        <button className='detail-btn'>More Info</button>
                    </Link>
                </div>
            </div>
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
    nutritionNames: PropTypes.array.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
    isFavorite: PropTypes.bool.isRequired
}