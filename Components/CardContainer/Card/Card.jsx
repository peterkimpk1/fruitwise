import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Card.css'
import AppContext from '../../../Contexts/AppContext'
const Card = ({id, name, highestNutrition, lowestNutrition, highestNutritionIndex, lowestNutritionIndex, nutritionNames,toggleFavorite}) => {
    const isFavorite = useContext(AppContext)
    const capitalNutritionNames = nutritionNames.map(nutrition => nutrition.charAt(0).toUpperCase() + nutrition.slice(1))
    return (
        <div className='card'>
            <span className={isFavorite? 'not-favorite-icon-container':'favorite-icon-container'} onClick={toggleFavorite}>
                <img className='favorite-icon' src={'../../../assets/star.svg'}/>
            </span>
            <div className='card-info-wrapper'>
                <h3>{name}</h3>
                <div className='image-container'>
                    <img className='card-image' src={`../../../assets/${name.toLowerCase()}.jpg`} alt={`Picture of ${name}`}/>
                </div>
                <div className='nutrition-btn-wrapper'>
                    <p className='high-nutrition'>{`High in: ${capitalNutritionNames[highestNutritionIndex+1]} ${highestNutrition}g`} </p>
                    <p className='low-nutrition'>{`Low in: ${capitalNutritionNames[lowestNutritionIndex+1]} ${lowestNutrition}g`} </p>
                    <Link to={`/details/${id}`}>
                        <button className='detail-btn'>More Info?</button>
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
    nutritionNames: PropTypes.array.isRequired
}