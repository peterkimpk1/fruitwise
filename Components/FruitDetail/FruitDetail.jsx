import React from 'react'
import { useParams } from 'react-router-dom'
import './FruitDetail.css'
import PropTypes from 'prop-types'

const FruitDetail = ({fruits, toggleFavorite}) => {
  const {id} = useParams();
  const singleFruit = fruits.find(fruit => fruit.id === +id)
  const {name, family, genus, order, nutritions, isFavorite}= singleFruit
  const {calories, fat, sugar, carbohydrates, protein} = nutritions
  return (
    <>
      <section className='detail-page'>
        <div className='detail-wrapper' >
          <div className='detail-container' id={id}>
            <h1 className='detail-name'>{name}</h1>
            <div className='detail-image'>
              <img src={`../../../assets/${name.toLowerCase()}.jpg`} alt={`Picture of ${name}`}/><span><sup>*</sup>Picture may not reflect fruit details<sup>*</sup></span>
            </div>
            <div className={isFavorite? 'favorite-icon-container':'not-favorite-icon-container'} onClick={toggleFavorite}>
                <img className={'not-favorite-icon-container'} src={'../../../assets/star.svg'}/>
            </div>
          </div>
        </div>
        <div className='all-info-wrapper'>
          <div className='info-wrapper'>
            <h3>{`Nutrient Content (/100g)`}</h3>
            <p>Calories: {calories}</p>
            <p>Fat: {fat}g</p>
            <p>Sugar: {sugar}g</p>
            <p>Carbohydrates: {carbohydrates}g</p>
            <p>Protein: {protein}g</p>
          </div>
          <div className='info-wrapper'>
            <h3>{`Popular Classification`}</h3>
            <p>Family: {family}</p>
            <p>Genus: {genus}</p>
            <p>Order: {order}</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default FruitDetail
FruitDetail.propTypes = {
  fruits: PropTypes.arrayOf(PropTypes.shape({
    family: PropTypes.string.isRequired,
    genus: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    nutritions: PropTypes.shape({
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      sugar: PropTypes.number.isRequired,
      protein: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
    }),
    order: PropTypes.string.isRequired
  })),
}