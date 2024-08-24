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
    const [logDate, setLogDate] = useState('01/01')
    const [logFruits, setLogFruits] = useState([])
    const [fruitLogs, setFruitLogs] = useState([])
    const [editIndex, setEditIndex] = useState(null);
    const dateRef = useRef(null)
    const today = `${moment().month()+1}/${moment().date()}/${moment().year()}`
    useEffect(() => {
      setMax()
      // if (localStorage.getItem('fruitlog') !== null) {
      //   setFruitLogs()
      // }
    },[])
    const fruitNames = fruits.map(fruit => {
      return (
          <option value={fruit.name} key={uuidv4()}>{fruit.name}</option>
      )
    })
    function editFruitLog(date,id,loggedFruits) {
      const editLog = fruitLogs.findIndex((log) => log.id === id)
      dateRef.current.setAttribute('disabled','true')
      setEditIndex(editLog)
      setLogDate(date)
      setLogFruits(loggedFruits)
    }

    function setMax() {
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
    function saveLog() {
      const fruitLog = {date: logDate, nutritionScore: '30%', fruits: [...logFruits], id: uuidv4()}
      dateRef.current.removeAttribute('disabled')
      setLogFruits([])
      if (editIndex !== null) {
        const newLogs = fruitLogs.slice()
        newLogs[editIndex] = fruitLog
        setFruitLogs(newLogs)
        setEditIndex(null)
        return;
      }
      setFruitLogs(() => {
        const updateLogs = [...fruitLogs, fruitLog]
        return updateLogs
      });

      // localStorage.setItem('fruitlog',JSON.stringify(fruitLog))
    }
    function changeDateSyntax(date) {
      setLogDate(moment(date).format('MMM Do YY'))
    }
 
    function deleteDailyFruit(id) {
      const filterFruits = logFruits.filter((fruit) => fruit.id !== id) 
      if (filterFruits.length === 0) {
        dateRef.current.removeAttribute('disabled')
      }
      setLogFruits(filterFruits)
    }
    function deleteFruitLog(id) {
      const filterLogs = fruitLogs.filter((log) => log.id !== id)
      setFruitLogs(filterLogs)
    }
    function addFruitInput() {
        if (amount && unit && fruitName && logDate) {
            const newFruit = {fruitName, amount, unit, id: uuidv4()}
            dateRef.current.setAttribute('disabled','true')
            setLogFruits(() => {
              const updatedLogFruits = [...logFruits,newFruit]
              return updatedLogFruits
            })
        }
    }
  return (
    <>
    <div className='fruit-info-page'>
      <div className='fruit-log-container'>
        <h3>Select fruit(s)</h3>
        {/* <span>Please fill out all inputs</span> */}
        <label htmlFor='fruitnames'></label>
        <select name='fruitnames' id='fruitnames' value={fruitName} onChange={(e) => setFruitName(e.target.value)} size='15'>
            {fruitNames}
        </select>
        <div className='form-container'>
          <label htmlFor='fruit-date'></label>
          <input type='date' id='fruit-date' min={"2024-01-01"} ref={dateRef} onChange={(e) => changeDateSyntax(e.target.value)}></input><br></br>
          <label htmlFor="amount"></label>
          <div>
            <input type='number' id='amount' min={0} max={250} onChange={(e) => setAmount(e.target.value)}></input>
            <label htmlFor='unit'></label>
            <select name='unit' id='unit' value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value='ct'>ct</option>
                <option value='g'>g</option>
                <option value='oz'>oz</option>
            </select>
            <button id='add-fruit-btn' onClick={addFruitInput}>Add fruit</button>
          </div>
        <p><sup>*</sup>Based on a fruit portion size of 80g<sup>*</sup></p>
        <i>Source: U.S. FOOD & DRUG ADMINISTRATION, HOLLAND & BARRETT</i>
      </div>
      </div>
      <section className='daily-section'>
        <h3>Daily Fruits</h3>
        {!logFruits.length > 0? <p className='log-date' style={{visibility:'hidden'}}>{logDate}</p> : <p className='log-date'style={{visibility:'visible'}}>Log date: {logDate}</p> }
        <div className={!logFruits.length > 0 ? 'daily-fruit-container':'daily-fruit-container-open'}>
        {!logFruits.length > 0? <p>Log a fruit to start tracking!</p> : <>{logFruits.map(({fruitName, amount, unit, id}) => {
          return (
            <div className='daily-fruit' key={id} >
                <p>{fruitName}</p><span>&nbsp;&nbsp;&nbsp;{amount}&nbsp;{unit}</span>
                <div>
                  <button className='card-btn'onClick={() => deleteDailyFruit(id)}>🗑️</button>
                </div>
              </div>
          )
        })}</>}
        {logFruits.length > 0 && <button onClick={saveLog}>Save Log</button>}
        {/*If nutrition level >  */}
        </div>
      </section>
      <section className='daily-nutrition-days-container'>
        <h3>Nutrition Logs</h3>
        <div className='nutrition-log-container'>
          {!fruitLogs.length > 0 ? <p>Save log to get your nutrition score!</p> : <>{fruitLogs.map(({date, nutritionScore, fruits, id}) => {
            return (
            <div className='fruit-log' key={id}>
                <p>Date: {date}<br></br>Nutrition Score: {nutritionScore}</p>
                  <button className='card-btn' id='log-edit-btn'  onClick={() => editFruitLog(date,id,fruits)}>📖</button>
                  <button className='card-btn' id='delete-btn' onClick={() => deleteFruitLog(id)}>🗑️</button>
            </div>)
          })}</>}
        </div>
      </section>
    </div>
    {/* <div className='edit-msg' anchor='log-edit-btn' visibility='hidden'>Edit</div> */}
    </>
  )
}

export default FruitInfo
