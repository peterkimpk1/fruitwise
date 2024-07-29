import React, { useEffect } from 'react'
import PopFruit from '../Components/PopFruit/PopFruit'
import Header from '../Components/Header/Header'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { getFruit } from './APICall'
import MainPage from '../Components/MainPage/MainPage'
function App() {
  const [fruits, setFruits] = useState([])
  useEffect(() => {
    getFruit()
    .then(data => {
      setFruits(data)
      console.log(data)
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
    console.log(filteredFruits)
    setFruits(filteredFruits)
  }
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<MainPage searchFruits={searchFruits}/>}/>
      <Route path='/nutritiousfruits' element={<PopFruit/>}/>
    </Routes>
    </>
  )
}

export default App
 