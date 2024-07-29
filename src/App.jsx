import React from 'react'
import PopFruit from '../Components/PopFruit/PopFruit'
import Header from '../Components/Header/Header'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/nutritiousfruits' element={<PopFruit/>}/>
    </Routes>
    </>
  )
}

export default App
 