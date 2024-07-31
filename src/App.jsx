import './App.css'
import React, { useEffect } from 'react'
import PopFruit from '../Components/PopFruit/PopFruit'
import Header from '../Components/Header/Header'
import { NavLink, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { getFruit } from './APICall'
import MainPage from '../Components/MainPage/MainPage'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [fruits, setFruits] = useState([]);
  const [results, setResults] = useState('');
  const [seasonFruits, setSeasonFruits] = useState([]);
  const [seasonFruitCards, setSeasonFruitCards] = useState('');
  useEffect(() => {
    getFruit()
    .then(data => {
      getCurrentMonthFruits(data)
      setFruits(data)
    })
    .catch(err => console.log(err))
  },[])
  let currentDate = moment().format('MMMM')
  const seasonsData = [
    { Winter: ['December', 'January', 'February'] },
    { Spring: ['March', 'April', 'May'] },
    { Summer: ['June', 'July', 'August'] },
    { Fall: ['September', 'October', 'November'] }];
  const allSeasonalFruitsData = [
    { Spring: ['Strawberry', 'Kiwi', 'Pineapple', 'Apricot', 'Cherry']},
    { Summer: ['Blackberry', 'Raspberry', 'Blueberry', 'Watermelon', 
        'Peach', 'Melon', 'Plum', 'Mango', 'Passionfruit', 'Fig', 'Tomato', 'Green Apple' ]},
    { Fall: ['Persimmon', 'Pomegranate', 'Apple', 'Pear', 'Cranberry',
        'Grapes', 'Japanese Persimmon', 'Pumpkin']},
    { Winter: [
        'Orange', 'Tangerine', 'Lemon', 'Lime', 'Guava',
        'Feijoa', 'Pomelo']},
    { YearRound: ['Banana', 'Lychee', 'Durian', 'Pitahaya', 'Kiwifruit',
        'Avocado', 'Jackfruit', 'Horned Melon', 'Hazelnut', 'Papaya',
        'Mangosteen', 'Annona', 'Ceylon Gooseberry']}];

  function searchFruits(query) {
    const filteredFruits = [];
    fruits.forEach(fruit => {
      if (fruit.name.toLowerCase().includes(query.toLowerCase())) {
        filteredFruits.push(fruit)
      }
    })
    if(filteredFruits.length > 0) {
      let results = filteredFruits.map(({id,family,genus,name,nutritions,order}) => {
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
  }
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
      const uniqueKey = uuidv4();
      let singleFruitNutrition = Object.values(fruit.nutritions).slice(1)
      let lowestNutrition = Math.min(...singleFruitNutrition)
      let lowestNutritionIndex = singleFruitNutrition.findIndex((e) => e === lowestNutrition)
      let highestNutrition = Math.max(...singleFruitNutrition)
      let highestNutritionIndex = singleFruitNutrition.findIndex((e) => e === highestNutrition)
      return (
        <div className='season-card' key={uniqueKey}>    
          <h3>{fruit.name}</h3>
          <img src={`/src/assets/${fruit.name.toLowerCase()}.jpg`}/>
          <p className='high-nutrition'>{`High in: ${fruitNutrition[highestNutritionIndex]} ${highestNutrition}g `}</p>
          <p className='low-nutrition'>{`Low in: ${fruitNutrition[lowestNutritionIndex]} ${lowestNutrition}g `}</p>
        </div>  
      )
    })
    setSeasonFruitCards(fruitCards)
    setSeasonFruits(seasonFruitsInfo);
};
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<MainPage searchFruits={searchFruits} results={results} seasonFruits={seasonFruits} seasonFruitCards={seasonFruitCards}/>}/>
      <Route path='/nutritiousfruits' element={<PopFruit/>}/>
    </Routes>
    </>
  )
}

export default App
 