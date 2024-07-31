import React from 'react'
import CardContainer from '../CardContainer/CardContainer';
import { useState, useEffect } from 'react';
import {v4 as uuidv4} from 'uuid'
const PopFruit = ({fruits,nutritionNames}) => {
  const [nutritiousFruits, setNutritiousFruits] = useState([]);
  const [nutrition, setNutrition] = useState('');
  useEffect(() => {
    getNutritiousFruits(fruits,nutrition.toLowerCase())
    console.log(fruits)
    console.log(nutrition.toLowerCase())
  },[nutrition])
  function getNutritiousFruits(fruits, nutritionSelection) {
    let selectNutritiousFruits = [];
    let fruitData = fruits.slice();
    for (var i = 0; i < 11; i++) {
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
      return (
        <option key={uuidv4()} value={nutrition}>{nutrition}</option>
      )
    })
  }

  return (
    <div>
      <label htmlFor='nutritions'>Select a nutrition to sort by: </label>
      <select name='nutritions' value={nutrition} onChange={(e) => setNutrition(e.target.value)}>
        <option key={uuidv4()} value=''></option>
        {selections}
      </select>
      {nutrition? <CardContainer nutritiousFruits={nutritiousFruits}/>: <CardContainer/>}
    </div>
  )
}

export default PopFruit
