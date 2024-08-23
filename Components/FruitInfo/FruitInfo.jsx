import React, { useContext, useEffect, useState, useRef } from 'react'
import moment from 'moment'
import './FruitInfo.css'
import AppContext from '../../Contexts/AppContext'
import {v4 as uuidv4} from 'uuid'
const FruitInfo = () => {
    const {fruits} = useContext(AppContext)
    const [amount, setAmount] = useState(0);
    const [unit, setUnit] = useState('ct')
    const [fruitName, setFruitName] = useState('')
    const [logFruits, setLogFruits] = useState([])
    const dateRef = useRef(null)
    const today = `${moment().month()+1}/${moment().date()}/${moment().year()}`
    useEffect(() => {
      setMax()
    },[])
    const setMax = () => {
      let day = moment().date()
      let month = moment().month() + 1;
      let year = moment().year()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      dateRef.current.setAttribute('max',`${year}-${month}-${day}`)
    }
    const fruitNames = fruits.map(fruit => {
        return (
            <option value={fruit.name} key={uuidv4()}>{fruit.name}</option>
        )
    })
    function deleteDailyFruit(id) {
      const filterFruits = logFruits.filter((fruit) => fruit.id !== id)
      setLogFruits(filterFruits)
    }

    function addFruitInput(e) {
      e.preventDefault();
        if (amount && unit && fruitName) {
            const newFruit = {fruitName, amount, unit, id: uuidv4()}
            setLogFruits([...logFruits,newFruit])
        }
    }
  return (
    <>
    <div className='fruit-info-page'>
      <div className='fruit-log-container'>
        <h3>Select fruit(s)</h3>
        <label htmlFor='fruitnames'></label>
        <select name='fruitnames' id='fruitnames' value={fruitName} onChange={(e) => setFruitName(e.target.value)} size='15'>
            {fruitNames}
        </select>
        <div>
          <label htmlFor='fruit-date'></label>
          <input type='date' id='fruit-date' min={"2024-01-01"} ref={dateRef}></input><br></br>
          <label htmlFor="amount"></label>
          <input type='number' id='amount' min={0} max={250} onChange={(e) => setAmount(e.target.value)}></input>
          <label htmlFor='unit'></label>
          <select name='unit' id='unit' value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value='ct'>ct</option>
              <option value='g'>g</option>
              <option value='oz'>oz</option>
          </select>
        <button id='add-fruit-btn'type='submit' onClick={addFruitInput}>Add fruit</button>
        <p><sup>*</sup>Based on a fruit portion size of 80g<sup>*</sup></p>
        <i>Source: U.S. FOOD & DRUG ADMINISTRATION, HOLLAND & BARRETT</i>
      </div>
      </div>
      <section className={!logFruits.length > 0 ? 'daily-fruit-container':'daily-fruit-container-open'}>
        <h3>Daily Fruits</h3>
        {!logFruits.length > 0? <p>Log a fruit to start tracking!</p> : <>{logFruits.map(({fruitName, amount, unit, id}) => {
          return (
              <div className='daily-fruit' key={id} >
                <p>{fruitName}</p><span>&nbsp;&nbsp;&nbsp;{amount}&nbsp;{unit}</span>
                <div>
                  <button onClick={() => deleteDailyFruit(id)}>x</button>
                </div>
              </div>
          )
        })}</>}
        {logFruits.length > 0 && <p></p>}
        {/*If nutrition level >  */}
      </section>
      <section className='daily-nutrition-days-container'>
        <h3>Nutrition Logs</h3>
      </section>
    </div>
    </>
  )
}

export default FruitInfo
