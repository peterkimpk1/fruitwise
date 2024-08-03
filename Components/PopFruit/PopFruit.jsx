import React from 'react'
import CardContainer from '../CardContainer/CardContainer';
import { useState, useEffect, useContext} from 'react';
import {v4 as uuidv4} from 'uuid'
import './PopFruit.css'
import AppContext from '../../Contexts/AppContext';
import PropTypes from 'prop-types'

const PopFruit = ({fruits,nutritionNames, nutritionSelection, changeNutrition}) => {
  const [nutritiousFruits, setNutritiousFruits] = useState([]);
  const {nutrition} = useContext(AppContext)
  useEffect(() => {
    getNutritiousFruits(fruits,nutrition.toLowerCase())
  },[nutritionSelection])
  function getNutritiousFruits(fruits, nutritionSelection) {
    let selectNutritiousFruits = [];
    let fruitData = fruits.slice();
    for (var i = 0; i < 20; i++) {
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
    setNutritiousFruits(selectNutritiousFruits)
  }
  if (nutritionNames.length > 0) {
    var selections = nutritionNames.map(nutrition => {
      let capitalNutrition = nutrition.charAt(0).toUpperCase() + nutrition.slice(1)
      return (
        <option key={uuidv4()} value={capitalNutrition}>{capitalNutrition}</option>
      )
    })
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
      {nutrition? <CardContainer nutritiousFruits={nutritiousFruits} nutritionNames={nutritionNames}/>: <p className='no-selection-message'>Choose a nutrition from the drop-down</p>}
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