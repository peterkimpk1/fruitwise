import React, { useContext, useState } from 'react'
import moment from 'moment'
import './FruitInfo.css'
import AppContext from '../../Contexts/AppContext'
import {v4 as uuidv4} from 'uuid'
const FruitInfo = () => {
    const {fruits} = useContext(AppContext)
    const [amount, setAmount] = useState(0);
    const [unit, setUnit] = useState('g')
    const [fruitName, setFruitName] = useState('')
    const [logFruits, setLogFruits] = useState([])

    const fruitNames = fruits.map(fruit => {
        return (
            <option value={fruit.name} key={uuidv4()}>{fruit.name}</option>
        )
    })
    function addFruitInput(e) {
        e.preventDefault();
        if (amount && unit && fruitName) {
            var newFruit = {fruitName, amount, unit}
        }
        setLogFruits(newFruit)
    }

  return (
    <div className='fruit-info-page'>
        <label htmlFor='fruitnames'>Choose a fruit to log</label>
      <form className='fruit-log-container' onSubmit={addFruitInput}>
        <select name='fruitnames' id='fruitnames' value={fruitName} onChange={(e) => setFruitName(e.target.value)} size='20'>
            {fruitNames}
        </select>
        <label htmlFor="amount"></label>
        <input type='number' id='amount' placeholder='Amount'min={1} max={500} onChange={(e) => setAmount(e.target.value)}></input>
        <label htmlFor='unit'></label>
        <select name='unit' id='unit' value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value='g'>g</option>
            <option value='oz'>oz</option>
            <option value='count'>count</option>
        </select>
        <button type='submit'>Add fruit</button>
      </form>
    
      <p><sup>*</sup>Based on a fruit portion size of 80g<sup>*</sup></p>
      <i>Source: U.S. FOOD & DRUG ADMINISTRATION, HOLLAND & BARRETT</i>
    </div>
  )
}

export default FruitInfo
