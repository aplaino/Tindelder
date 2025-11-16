import './App.css'
import {Routes, Route} from "react-router-dom"
import Layout from './components/Layout'
import Home from './pages/Home'
import Deck from './pages/Deck'
import Matches from './pages/Matches'
import Profile from './pages/Profile'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element = {<Home />}/>
        <Route path = "deck" element={<Deck />} />
        <Route path = "match" element={<Matches />} />
        <Route path = "profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App
