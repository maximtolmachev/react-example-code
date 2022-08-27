import React, { FC } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.scss'
import List from './components/List'
import ListItemDetails from './components/ListItemDetails'

const App: FC = () => {
  return (
    <div className="wrapper">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navigate to="/users" />} />
        <Route path="/users" element={<List/>}/>
        <Route path="/users/:loginParam" element={<ListItemDetails />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
