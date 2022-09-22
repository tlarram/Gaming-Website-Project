import {Routes, Route, Link} from "react-router-dom"
import Register from './Views/Register'
import Login from './Views/Login'
import UserInfo from "./Views/UserInfo"
import DisplayUsers from "./Views/DisplayUsers"
import {Container} from "react-bootstrap"
import Navbar from "./Components/Navbar"
import Home from "./Views/Home"
import StoreItem from "./Components/StoreItem.tsx"
import { ShoppingCartProvider } from "./Context/ShoppingCartContext.tsx"
function App() {


  return (
    <>
    <ShoppingCartProvider>
    <Navbar/>
    <Container>
        {/* <p><Link to="/">Test Cookie</Link>|
        <Link to="/register">Register</Link>|
        <Link to="/login">Login</Link>|
        <Link to="/users">All users</Link>
        <Link to="/userInfo"> User info</Link>
        </p> */}


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<StoreItem />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<DisplayUsers />} />  
          <Route path="/userInfo" element={<UserInfo />} />    
            
        </Routes>
    </Container>
    </ShoppingCartProvider>
    </>
  );
}

export default App;
