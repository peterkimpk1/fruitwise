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
import Loading from '../Components/Loading/Loading'
import Favorite from '../Components/Favorite/Favorite'

function App() {
  const [fruits, setFruits] = useState([]);
  const [results, setResults] = useState('');
  const [seasonFruits, setSeasonFruits] = useState([]);
  const [nutritionNames, setNutritionNames] = useState([]);
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false);
  const [nutrition, setNutrition] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getFruit()
    .then(data => {
      const favFruits = data.map(fruit => {
        return {...fruit,isFavorite: false}
      })
      getCurrentMonthFruits(favFruits)
      setFruits(favFruits)
      setIsLoading(false)
    })
    .catch(err => setError(err.message))
  },[])
  let currentDate = moment().format('MMMM')
  
  function changeNutrition(nutrition) {
    setNutrition(nutrition)
  }
  
  function toggleFavorite(e) {
    console.log(e.target.parentNode.parentNode)
    const updateFruits = fruits.slice()
    const seasonUpdateFruits = seasonFruits.slice()
    const favIndex = updateFruits.findIndex(fruit => fruit.id === +e.target.parentNode.parentNode.id)
    const seasonFavIndex = seasonUpdateFruits.findIndex(fruit => fruit.id === +e.target.parentNode.parentNode.id)
    if (seasonFavIndex !== -1) {
      const newSeasonFavorite = seasonUpdateFruits[seasonFavIndex].isFavorite === false ? true : false;
      seasonUpdateFruits[seasonFavIndex].isFavorite = newSeasonFavorite;
      setSeasonFruits(seasonUpdateFruits)
    }
    const newFavorite = updateFruits[favIndex].isFavorite === false ? true : false;
    updateFruits[favIndex].isFavorite = newFavorite;
    setFruits(updateFruits)
    let toggleClass;
    if (newFavorite) {
      toggleClass = 'favorite-icon-container' 
    } 
    else {
      toggleClass = 'not-favorite-icon-container'
    }
    e.target.className = toggleClass
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
    setSeasonFruits(seasonFruitsInfo);
    setNutritionNames(Object.keys(seasonFruitsInfo[0].nutritions));
  };

  return (
    <>
      <AppContext.Provider value={{nutrition,submitted,fruits}}>
        <Header/>
        {error && <p className='error-msg'>{error}</p>}
        {isLoading? <Loading/> : 
        <Routes>
          <Route path='/' element={<MainPage searchFruits={searchFruits} results={results} seasonFruits={seasonFruits} nutritionNames={nutritionNames} toggleFavorite={toggleFavorite}/>}/>
          <Route path='/nutritiousfruits' element={<PopFruit nutritionNames={nutritionNames} nutritionSelection={nutrition} changeNutrition={changeNutrition} toggleFavorite={toggleFavorite}/>}/>
          <Route path='/details/:id' element={<FruitDetail fruits={fruits} toggleFavorite={toggleFavorite}/>}/>
          <Route path='/favorites' element={<Favorite nutritionNames={nutritionNames} toggleFavorite={toggleFavorite}/>}/>
          <Route path='*' element={<h2 className='error-path-message'>Error 404: Route does not exist.</h2>}/>
        </Routes>}
      </AppContext.Provider>
    </>
  )
}

export default App
 