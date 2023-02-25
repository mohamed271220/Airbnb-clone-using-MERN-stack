import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'

function App() {
  const [count, setCount] = useState(0)

  return (

    //routing
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

    </Routes>


  )
}

export default App
