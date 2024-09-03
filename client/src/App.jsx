import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Users from './Users'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
import RegisterUser from './RegisterUser'
import Login from './Login'
import Dashboard from './Dashboard'
import Home from './Home'
import Chatbot from './Chatbot'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Users />}></Route>
        <Route path='/register' element={<RegisterUser />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/chatbot' element={<Chatbot />}></Route>
        <Route path='/create' element={<CreateUser />}></Route>
        <Route path='/update/:id' element={<UpdateUser />}></Route>

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
