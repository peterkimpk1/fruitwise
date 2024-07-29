import React, { useEffect } from 'react'
import PopFruit from '../Components/PopFruit/PopFruit'
import Header from '../Components/Header/Header'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { getFruit } from './APICall'
import MainPage from '../Components/MainPage/MainPage'
function App() {
  const [fruits, setFruits] = useState([])
  const allSeasonalFruits = [
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
    setFruits(filteredFruits)
  }
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<MainPage searchFruits={searchFruits} allSeasonalFruits={allSeasonalFruits}/>}/>
      <Route path='/nutritiousfruits' element={<PopFruit/>}/>
    </Routes>
    </>
  )
}

export default App
 