import React from 'react'
import CardContainer from '../CardContainer/CardContainer';
import { useState, useEffect, useContext} from 'react';
import {v4 as uuidv4} from 'uuid'
import './PopFruit.css'
import AppContext from '../../Contexts/AppContext';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const PopFruit = ({fruits,nutritionNames, nutritionSelection, changeNutrition, toggleFavorite}) => {
  const [nutritiousFruits, setNutritiousFruits] = useState([]);
  const [allFruitCards, setAllFruitCards] = useState(false);
  const [fruitCards, setFruitCards] = useState(20);
  const {nutrition} = useContext(AppContext)
  useEffect(() => {
    getNutritiousFruits(fruits,nutrition.toLowerCase())
  },[nutritionSelection])
  if (nutritionNames.length > 0) {
    var selections = nutritionNames.map(nutrition => {
      let capitalNutrition = nutrition.charAt(0).toUpperCase() + nutrition.slice(1)
      return (
        <option key={uuidv4()} value={capitalNutrition}>{capitalNutrition}</option>
      )
    })
  }
  function getNutritiousFruits(fruits, nutritionSelection) {
    let selectNutritiousFruits = [];
    let fruitData = fruits.slice();
    for (var i = 0; i < fruits.length; i++) {
      let highestNutritionFruit = fruitData.reduce((acc,fruit,index) => {
        if (!acc.nutritions) {
          acc = {...fruit}
        }
        if (acc.nutritions[nutritionSelection] < fruit.nutritions[nutritionSelection]) {
          acc = {...fruit, index}
        }
        return acc
      },{})
      selectNutritiousFruits.push(highestNutritionFruit)
      fruitData.splice(highestNutritionFruit.index,1)
    }
    setAllFruitCards(false)
    setFruitCards(20)
    setNutritiousFruits(selectNutritiousFruits)
  }
  function showMore() {
    setAllFruitCards(true)
    setFruitCards(fruits.length)
  }
  return (
    <div className='nutrition-page'>
      <div>
        <label htmlFor='nutritions'>Select a nutrition to sort by </label>
        <select name='nutritions' id='nutritions'value={nutrition} onChange={(e) => changeNutrition(e.target.value)}>
          <option key={uuidv4()} value=''></option>
          {selections}
        </select>
      </div>
      {nutrition? <p className='fruitcard-number'>{`Showing ${fruitCards}/${fruits.length} Fruits`}</p> : null}
      {nutrition? <CardContainer nutritiousFruits={nutritiousFruits.slice(0,fruitCards)} nutritionNames={nutritionNames} toggleFavorite={toggleFavorite}/>: <p className='no-selection-message'>Choose a nutrition from the drop-down</p>}
      {!allFruitCards? <button className='show-more-btn' onClick={showMore}>Show More..</button> : <p id='end-list-msg'>You've reached the end of the list.</p>}
    </div>
  )
}

export default PopFruit
PopFruit.propTypes = {
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
  changeNutrition: PropTypes.func.isRequired,
  nutritionNames: PropTypes.array.isRequired,
  nutritionSelection: PropTypes.string,
}