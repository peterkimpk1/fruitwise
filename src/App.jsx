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
import AppContext from '../Contexts/AppContext'
function App() {
  const [fruits, setFruits] = useState([]);
  const [results, setResults] = useState('');
  const [seasonFruits, setSeasonFruits] = useState([]);
  const [seasonFruitCards, setSeasonFruitCards] = useState('');
  const [nutritionNames, setNutritionNames] = useState([]);
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false);
  const [nutrition, setNutrition] = useState('');

  useEffect(() => {
    getFruit()
    .then(data => {
      getCurrentMonthFruits(data)
      setFruits(data)
    })
    .catch(err => setError(err.message))
  },[])
  let currentDate = moment().format('MMMM')
  
  function changeNutrition(nutrition) {
    setNutrition(nutrition)
  }
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
              <img className='fruit-img' src={`/assets/${name.toLowerCase()}.jpg`} alt={`Picture of ${name}`}/>
              <div className='fruit-info'>
                <p>Name: {name}</p>
                <p>Family: {family}</p>
                <p>Genus: {genus}</p>
              </div>
            </div>
          </NavLink>
        )
      })
      setSubmitted(true)
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
           <img src={`/assets/${fruit.name.toLowerCase()}.jpg`} alt={`Picture of ${fruit.name}`}/>
          </div>
          <p className='high-nutrition' id='top-nutrition-text'>High in: {`${fruitNutrition[highestNutritionIndex]}`}&nbsp;{`${highestNutrition}g`}</p>
          <p className='low-nutrition'>Low in: {`${fruitNutrition[lowestNutritionIndex]}`}&nbsp;{`${lowestNutrition}g`}</p>
          <NavLink to={`/details/${fruit.id}`}>
            <button>More info</button>
          </NavLink>
        </div>  
      )
    })
    setSeasonFruitCards(fruitCards)
    setSeasonFruits(seasonFruitsInfo);
    setNutritionNames(Object.keys(seasonFruitsInfo[0].nutritions));
  };

  return (
    <>
      <AppContext.Provider value={{nutrition,submitted}}>
        <Header/>
        {error && <p>{error}</p>}
        <Routes>
          <Route path='/' element={<MainPage searchFruits={searchFruits} results={results} seasonFruits={seasonFruits} seasonFruitCards={seasonFruitCards}/>}/>
          <Route path='/nutritiousfruits' element={<PopFruit fruits={fruits} nutritionNames={nutritionNames} nutritionSelection={nutrition} changeNutrition={changeNutrition}/>}/>
          <Route path='/details/:id' element={<FruitDetail fruits={fruits}/>}/>
          <Route path='*' element={<h2 className='error-path-message'>Error 404: Route does not exist.</h2>}/>
        </Routes>
      </AppContext.Provider>
    </>
  )
}

export default App
 