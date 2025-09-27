import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar' 
import { Home } from './components/Home'
import { Login } from './components/Login'
import { Register } from './components/Register'

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
      
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
