import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar' 
import { Home } from './components/Home'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { WeatherCard } from './components/WeatherCard'
import { About } from './components/About'


function App() {

  return (
    <BrowserRouter>
      <div>
        <Routes>
          {/* home page */}
          <Route path="/" element={
            <>
              <Navbar/>
              <Home/>
              <About/>
            </>
          }>
          </Route>
          
          {/* login */}
          <Route path="/login" element={
            <>
              <Login/>
            </>
          }>
          </Route>

          <Route path="/register" element={
            <>
              <Register/>
            </>
          }>
          </Route>

          {/* test route for widgets */}
          <Route path="test" element={
            <>
              <Navbar/>
              <WeatherCard/>
            </>
          }>

          </Route>
      
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
