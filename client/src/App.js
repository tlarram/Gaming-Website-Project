import React, {useState} from "react"
import {Routes, Route, Link, useNavigate} from "react-router-dom"
import Register from './Views/Register'
import Login from './Views/Login'
import UserInfo from "./Views/UserInfo"
import DisplayUsers from "./Views/DisplayUsers"
import {Container} from "react-bootstrap"
import Navbar from "./Components/Navbar"
import Home from "./Views/Home"
import StoreItem from "./Components/StoreItem.tsx"
import { ShoppingCartProvider } from "./Context/ShoppingCartContext.tsx"
import BrowseAll from "./Components/BrowseAll"
import BrowseGenre from "./Components/BrowseGenre"
import ListGenres from "./Components/ListGenres"
import SearchGame from "./Components/SearchGame"
import ViewOne from "./Components/ViewOne"

function App() {
  const [gameList, setGameList] = useState([])
  const [oneGame, setOneGame] = useState()
  const navigate = useNavigate()
  const [cart, setCart] = useState()

  const updateGameList = (newList)  =>{
    setGameList(newList)
  }

  const viewOne = (id, Game) => {
    setOneGame(Game)
    navigate(`/view/${id}`)
  }
  const updateCart = (game) => {
    setCart(game)
    alert(`Adding ${game.name}`)
  }
  return (
    <>
    
    <ShoppingCartProvider>
    <Navbar/>
    <Container style={{backgroundColor: "black"}}>
        {/* <p><Link to="/">Test Cookie</Link>|
        <Link to="/register">Register</Link>|
        <Link to="/login">Login</Link>|
        <p>
        <Link to="/users">All users</Link>
        <Link to="/userInfo"> User info</Link>
        </p> */}


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shoppingcart" element={cart?<StoreItem id={cart.id} name={cart.name} imgUrl = {cart.short_screenshots[0].image} price= "49.99" game={cart}/>:<StoreItem/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<DisplayUsers />} />  
          <Route path="/userInfo" element={<UserInfo />} />    
          <Route path="/browse/all" element={<BrowseAll gameList ={gameList} updateGameList={updateGameList} viewOne={viewOne}/>} />
          <Route path="/browse/:genre" element={<BrowseGenre gameList={gameList} updateGameList = {updateGameList} viewOne={viewOne}/>} />
          <Route path="/search" element={<SearchGame viewOne={viewOne}/>} />
          <Route path="/view/:id" element={<ViewOne oneGame={oneGame} updateCart={updateCart}/>} />
          
        </Routes>
    </Container>
    </ShoppingCartProvider>
    </>
  );
}

export default App;
