import React, { useEffect } from 'react'
import PopFruit from '../Components/PopFruit/PopFruit'
import Header from '../Components/Header/Header'
import { NavLink, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { getFruit } from './APICall'
import MainPage from '../Components/MainPage/MainPage'
import './App.css'

function App() {
  const [fruits, setFruits] = useState([]);
  const [results, setResults] = useState('');
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
  useEffect(() => {
    getFruit()
    .then(data => {
      setFruits(data)
    })
    .catch(err => console.log(err))
  },[])
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
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<MainPage searchFruits={searchFruits} seasonsData={seasonsData} allSeasonalFruitsData={allSeasonalFruitsData} results={results}/>}/>
      <Route path='/nutritiousfruits' element={<PopFruit/>}/>
    </Routes>
    </>
  )
}

export default App
 