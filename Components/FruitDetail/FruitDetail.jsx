import React from 'react'
import { useParams } from 'react-router-dom'
import './FruitDetail.css'
const FruitDetail = ({fruits}) => {
  const {id} = useParams();

  const singleFruit = fruits.find(fruit => fruit.id === +id)

  const { name,family, genus, order, nutritions }= singleFruit
  const {calories, fat, sugar, carbohydrates, protein} = nutritions
  return (
    <>

      <section className='detail-page'>
        <div className='detail-wrapper'>
          <div className='detail-container'>
            <h3>Fruit Name: {name}</h3>
            <div className='detail-image'>
              <img src={`../../src/assets/${name}.jpg`} alt={`Picture of ${name}`}/><span>*Picture may not reflect fruit details*</span>
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
