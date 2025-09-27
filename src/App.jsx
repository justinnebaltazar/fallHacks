import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

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
