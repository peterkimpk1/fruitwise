import React, { useContext, useEffect, useState, useRef } from 'react'
import moment from 'moment'
import './FruitInfo.css'
import AppContext from '../../Contexts/AppContext'
import {v4 as uuidv4} from 'uuid'
const FruitInfo = ({nutritionNames,saveFruitLogs, saveLogFruits,saveLogDate, saveLogNutrition, saveDateDisable, saveDate, saveEditIndex}) => {
    const {fruits} = useContext(AppContext)
    const {fruitLogs} = useContext(AppContext)
    const {logFruits} = useContext(AppContext)
    const {dailyLogDate} = useContext(AppContext)
    const {logNutrition} = useContext(AppContext)
    const {dateDisable} = useContext(AppContext)
    const {date} = useContext(AppContext)
    const {editIndex} = useContext(AppContext)
    const [amount, setAmount] = useState(0);
    const [unit, setUnit] = useState('g')
    const [fruitName, setFruitName] = useState('')
    const [inputError, setInputError] = useState(false)
    const [logFruitsNode, setLogFruitsNode] = useState('')
    const [fruitNumber, setFruitNumber] = useState(0);
    const [secondFruitNumber, setSecondFruitNumber] = useState(4);
    const dateRef = useRef(null)
    useEffect(() => {
      setMax()
    },[])
    useEffect(() => {
      const fruitsNode = logFruits.map(({fruitName, amount, unit, id}) => {
        return (
          <div className='daily-fruit' key={id} >
              <p>{fruitName}</p><span>&nbsp;&nbsp;&nbsp;{amount}&nbsp;{unit}</span>
              <div>
                <button className='card-btn'onClick={() => deleteDailyFruit(fruitName, amount, unit, id)}>🗑️</button>
              </div>
            </div>
        )
      })
      setLogFruitsNode(fruitsNode)
    },[logFruits])
    function changeFruitNumber(e) {
      if (e.target.className === 'lbtn-1' && fruitNumber !== 0) {
        const newNumber = fruitNumber - 4
        const secondNewNumber = secondFruitNumber - 4
        setFruitNumber(newNumber)
        setSecondFruitNumber(secondNewNumber)
      }
      else if (e.target.className === 'rbtn-1' && logFruits.length > secondFruitNumber) {
        const newNumber = fruitNumber + 4;
        const secondNewNumber = secondFruitNumber + 4;
        setFruitNumber(newNumber)
        setSecondFruitNumber(secondNewNumber)
      }
    }
    const fruitNames = fruits.sort((a,b) => a.name.localeCompare(b.name)).map(fruit => {
      return (
          <option value={fruit.name} key={uuidv4()}>{fruit.name}</option>
      )
    })
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
      saveDate(`${year}-${month}-${day}`)
    }

    function editFruitLog(date,id,loggedFruits) {
      const editLog = fruitLogs.findIndex((log) => log.id === id)
      saveDateDisable(true)
      saveLogDate(`Edit Log: ${moment(date).format('MMM Do YY')}`)
      const totalNutrition = loggedFruits.reduce((acc,loggedFruit,i)=> {
        const singleFruit = fruits.find(fruit => 
          fruit.name === loggedFruit.fruitName
        )
        const fruitKeys = Object.keys(singleFruit.nutritions)
        const singleFruitNutrition = fruitKeys.map(key => {
          if (loggedFruit.unit === 'g') {
            return +(+singleFruit.nutritions[key] / +loggedFruit.amount).toFixed(2)
          }
          else if (loggedFruit.unit === 'oz') {
            return +(+singleFruit.nutritions[key] / 100 * (+loggedFruit.amount * 28.35)).toFixed(2)
          }
        })
        const updateNutrition = singleFruitNutrition.map((nutrition,i) => +(nutrition += acc[i]).toFixed(2))
        return [...updateNutrition]
      },[0,0,0,0,0])
      saveEditIndex(editLog)
      saveDate(date)
      saveLogFruits(loggedFruits)
      saveLogNutrition(totalNutrition)
    }
    
    function saveLog() {
      const fruitLog = {date: date, fruitLog: [...logFruits], id: uuidv4()}
      saveDateDisable(false)
      saveLogFruits([])
      setFruitNumber(0);
      setSecondFruitNumber(4);
      if (editIndex !== null) {
        const newLogs = fruitLogs.slice()
        newLogs[editIndex] = fruitLog
        saveFruitLogs(newLogs)
        saveEditIndex(null)
        saveLogNutrition([])
        return;
      }
      const updateLogs = [...fruitLogs, fruitLog]
      let sortedLogs = updateLogs.sort((a,b) => 
        new Date(b.date) - new Date(a.date)
      )
      saveFruitLogs(sortedLogs);
      saveLogNutrition([])
    }

    function deleteDailyFruit(fruitName, amount, unit, id) {
      const filterFruits = logFruits.filter((fruit) => fruit.id !== id) 
      if (filterFruits.length === 0) {
        saveDateDisable(false)
      }
      if (editIndex !== null && filterFruits.length === 0) {
        const allLogs = fruitLogs.slice()
        allLogs.splice(editIndex,1)
        saveFruitLogs(allLogs)
        saveEditIndex(null)
        saveLogDate('')
      }
      const singleFruit = fruits.find(fruit => 
        fruit.name.toLowerCase() === fruitName.toLowerCase()
      )
      const fruitKeys = Object.keys(singleFruit.nutritions)
      const singleFruitNutrition = fruitKeys.map(key => {
        if (unit === 'g') {
          return +(+singleFruit.nutritions[key] / +amount).toFixed(2)
        }
        else if (unit === 'oz') {
          return +(+singleFruit.nutritions[key] / 100 * (+amount * 28.35)).toFixed(2)
        }
      })
      const updateLogNutrition = logNutrition.map((log,i) => {
        return +(log - singleFruitNutrition[i]).toFixed(2)
      })
      if (filterFruits.length === 4) {
        setFruitNumber(0);
        setSecondFruitNumber(4);
      }
      if (filterFruits.length === 8) {
        setFruitNumber(4);
        setSecondFruitNumber(8);
      }
      if (filterFruits.length === 12) {
        setFruitNumber(8);
        setSecondFruitNumber(12);
      }
      if (filterFruits.length === 16) {
        setFruitNumber(12);
        setSecondFruitNumber(16);
      }
      saveLogFruits(filterFruits)
      saveLogNutrition(updateLogNutrition)
    }
    function deleteFruitLog(id) {
      const filterLogs = fruitLogs.filter((log) => log.id !== id)
      saveFruitLogs(filterLogs)
    }
    function addFruitInput() {
        if (amount && unit && fruitName && date) {
            const newFruit = {fruitName, amount, unit, id: uuidv4()}
            saveDateDisable(true)
            const singleFruit = fruits.find(fruit => 
              fruit.name.toLowerCase() === newFruit.fruitName.toLowerCase()
            )
            const fruitKeys = Object.keys(singleFruit.nutritions)
            const singleFruitNutrition = fruitKeys.map(key => {
              if (newFruit.unit === 'g') {
                return +(+singleFruit.nutritions[key] / +newFruit.amount).toFixed(2)
              }
              else if (newFruit.unit === 'oz') {
                return +(+singleFruit.nutritions[key] / 100 * (+newFruit.amount * 28.35)).toFixed(2)
              }
            })
            if (logNutrition.length > 0) {
              const updateLogNutrition = logNutrition.map((log,i) => {
                return +(log + singleFruitNutrition[i]).toFixed(2)
              })
              saveLogNutrition(updateLogNutrition)
            }
            else {
              saveLogNutrition(singleFruitNutrition)
            }
            const updatedLogFruits = [...logFruits,newFruit]
            saveLogFruits(updatedLogFruits)
            if (editIndex === null) {
              saveLogDate(`Log Date: ${moment(date).format('MMM Do YY')}`)
            }
            setInputError(false)
        }
        else {
          setInputError(true)
        }
    }
  return (
    <>
    <div className='fruit-info-page'>
      <div className='fruit-log-container'>
        <h3>Select fruit(s)</h3>
        {inputError && <span style={{color: 'red'}}>*Please fill out all inputs</span>}
        <label htmlFor='fruitnames'></label>
        <select name='fruitnames' id='fruitnames' value={fruitName} onChange={(e) => setFruitName(e.target.value)} size='15'>
            {fruitNames}
        </select>
        <div className='form-container'>
          <label htmlFor='fruit-date'></label>
          <input type='date' id='fruit-date' min={"2024-01-01"} disabled={!dateDisable? false: true} ref={dateRef} onChange={(e) => saveDate(e.target.value)}></input><br></br>
          <label htmlFor="amount"></label>
          <div>
            <input type='number' id='amount' min={0} max={250} onChange={(e) => setAmount(e.target.value)}></input>
            <label htmlFor='unit'></label>
            <select name='unit' id='unit' value={unit} onChange={(e) => setUnit(e.target.value)}>
                <option value='g'>g</option>
                <option value='oz'>oz</option>
            </select>
            <button id='add-fruit-btn' onClick={addFruitInput}>Add fruit</button>
          </div>
      </div>
      </div>
      <section className='daily-section'>
        <h3>Daily Fruits</h3>
        {!logFruits.length > 0? <p className='log-date' style={{visibility:'hidden'}}>{'01/01'}</p> : <p className='log-date'style={{visibility:'visible'}}>{dailyLogDate}</p> }
        <div className={!logFruits.length > 0 ? 'daily-fruit-container':'daily-fruit-container-open'}>
        {!logFruits.length > 0? <p>Log a fruit to start tracking!</p> : <div className='log-fruit-container'>{logFruitsNode.slice(fruitNumber,secondFruitNumber)}</div>}
        {logFruits.length > 0 && <div className='nutrition-breakdown'>
          {logFruits.length > 4 && <><button className='lbtn-1' onClick={changeFruitNumber}>{`<`}</button> <button className='rbtn-1' onClick={changeFruitNumber}>{`>`}</button></>}
          <h4>Total Nutrition</h4>
          <p className='nutrition-log'>{nutritionNames[0].charAt(0).toUpperCase() + nutritionNames[0].slice(1)}: {logNutrition[0]}</p>
          <p className='nutrition-log'>{nutritionNames[1].charAt(0).toUpperCase() + nutritionNames[1].slice(1)}: {logNutrition[1]}g</p>
          <p className='nutrition-log'>{nutritionNames[2].charAt(0).toUpperCase() + nutritionNames[2].slice(1)}: {logNutrition[2]}g</p>
          <p className='nutrition-log'>{nutritionNames[3].charAt(0).toUpperCase() + nutritionNames[3].slice(1)}: {logNutrition[3]}g</p>
          <p className='nutrition-log'>{nutritionNames[4].charAt(0).toUpperCase() + nutritionNames[4].slice(1)}: {logNutrition[4]}g</p>
          </div>}
        {logFruits.length > 0 && <button onClick={saveLog}>Save Log</button>}
        </div>
      </section>
      <section className='daily-nutrition-days-container'>
        <h3>Nutrition Logs</h3>
        <div className='nutrition-log-container'>
          {!fruitLogs.length > 0? <p>Save log to track your nutrition!</p> : <>{fruitLogs.map(({date, fruitLog, id}) => {
            return (
            <div className='fruit-log' key={id}>
                <p>Date: {moment(date).format('MMM Do YY')}</p>
                  <button className='card-btn' id='log-edit-btn' onClick={() => editFruitLog(date,id,fruitLog)}>📖</button>
                  <button className='card-btn' id='delete-btn' onClick={() => deleteFruitLog(id)}>🗑️</button>
            </div>)
          })}</>}
        </div>
      </section>
    </div>
    </>
  )
}

export default FruitInfo
