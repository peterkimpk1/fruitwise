import './App.css'
import moment from 'moment'
import { useState, useEffect } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { getFruit } from './APICall'
import { seasonsData, allSeasonalFruitsData } from './seasonsData'
import PopFruit from '../Components/PopFruit/PopFruit'
import Header from '../Components/Header/Header'
import MainPage from '../Components/MainPage/MainPage'
import FruitDetail from '../Components/FruitDetail/FruitDetail'
function App() {
  const [fruits, setFruits] = useState([]);
  const [results, setResults] = useState('');
  const [seasonFruits, setSeasonFruits] = useState([]);
  const [seasonFruitCards, setSeasonFruitCards] = useState('');
  const [nutritionNames, setNutritionNames] = useState([]);
  const [error, setError] = useState('')
  useEffect(() => {
    getFruit()
    .then(data => {
      getCurrentMonthFruits(data)
      setFruits(data)
    })
    .catch(err => setError(err.message))
  },[])
  let currentDate = moment().format('MMMM')
  
  function searchFruits(query) {
    const filteredFruits = [];
    fruits.forEach(fruit => {
      if (fruit.name.toLowerCase().includes(query.toLowerCase())) {
        filteredFruits.push(fruit)
      }
    })
    if(filteredFruits.length > 0) {
      let results = filteredFruits.map(({id,family,genus,name}) => {
        return (
          <NavLink to={`/details/${id}`} className='search-link' key={id}>
            <div className='result-card' >
              <img className='fruit-img' src={`/src/assets/${name.toLowerCase()}.jpg`} alt={`Picture of ${name}`}/>
              <div className='fruit-info'>
                <p>Name: {name}</p>
                <p>Family: {family}</p>
                <p>Genus: {genus}</p>
              </div>
            </div>
          </NavLink>
        )
      })
      setResults(<div className='query-result'>{results}</div>)
    }
  };

  function getCurrentMonthFruits(data) {
    let currentSeason;
    seasonsData.forEach(season => {
        let seasonKey = Object.keys(season)
        if(season[seasonKey].includes(currentDate)) {
            currentSeason = seasonKey[0]
        }
    })
    const currentSeasonFruits = allSeasonalFruitsData.find(seasonalFruits => 
        Object.keys(seasonalFruits)[0] === currentSeason
    )
    const seasonFruitsInfo = currentSeasonFruits[currentSeason].map(seasonFruit => {
      let singleFruit = data.find(fruit => (fruit.name === seasonFruit) || (fruit.name === seasonFruit.split(' ').join(''))
      )
      return {...singleFruit}
    })
    const fruitNutrition = Object.keys(seasonFruitsInfo[0].nutritions).slice(1).map(nutrition => nutrition.charAt(0).toUpperCase() + nutrition.slice(1))
    var fruitCards = seasonFruitsInfo.map(fruit => {
      let singleFruitNutrition = Object.values(fruit.nutritions).slice(1)
      let lowestNutrition = Math.min(...singleFruitNutrition)
      let lowestNutritionIndex = singleFruitNutrition.findIndex((e) => e === lowestNutrition)
      let highestNutrition = Math.max(...singleFruitNutrition)
      let highestNutritionIndex = singleFruitNutrition.findIndex((e) => e === highestNutrition)
      return (
        <div className='season-card' key={fruit.id}>    
          <h3>{fruit.name}</h3>
          <div className='season-card-image-container'>
           <img src={`/src/assets/${fruit.name.toLowerCase()}.jpg`}/>
          </div>
          <p className='high-nutrition' id='top-nutrition-text'>High in: <span className='nutrition-text'>{`${fruitNutrition[highestNutritionIndex]}`}&nbsp;{`${highestNutrition}g`}</span></p>
          <p className='low-nutrition'>Low in: <span className='nutrition-text'>{`${fruitNutrition[lowestNutritionIndex]}`}&nbsp;{`${lowestNutrition}g`}</span></p>
        </div>  
      )
    })
    setSeasonFruitCards(fruitCards)
    setSeasonFruits(seasonFruitsInfo);
    setNutritionNames(Object.keys(seasonFruitsInfo[0].nutritions));
  };

  return (
    <>
    <Header/>
    {!error && <p>{error}</p>}
    <Routes>
      <Route path='/' element={<MainPage searchFruits={searchFruits} results={results} seasonFruits={seasonFruits} seasonFruitCards={seasonFruitCards}/>}/>
      <Route path='/nutritiousfruits' element={<PopFruit fruits={fruits} nutritionNames={nutritionNames}/>}/>
      <Route path='/details/:id' element={<FruitDetail fruits={fruits}/>}/>
    </Routes>
    </>
  )
}

export default App
 