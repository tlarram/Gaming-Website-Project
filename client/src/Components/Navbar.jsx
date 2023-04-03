
import {Container, Button, Nav,Navbar as NavbarBs} from "react-bootstrap"
import { NavLink, Link } from 'react-router-dom'
import {useShoppingCart} from "../Context/ShoppingCartContext.tsx"
import React, { useState, useEffect } from 'react'
import axios from "axios"

const Navbar = () => {
    const { openCart, cartQuantity } = useShoppingCart()
    const [user, setUser] = useState()
    const [refresh, setRefresh] = useState(false)


    useEffect(()=>{
        axios.get(`http://localhost:8000/api/getUser`, {withCredentials: true})
            .then(res=> setUser(res.data))
            .catch()
    },[refresh]) 

    const handleDeleteCookie = () => {
        setUser('')
        setRefresh(!refresh)
        axios.get(`http://localhost:8000/api/logout`,{withCredentials:true})
            .then(res=>console.log("success"))
            .catch()
    }

  return (
    <NavbarBs sticky="top" className="bg-black shadow-lg mb-3 text-white text-decoration-none">
        <Container>
            <Nav className="me-auto text-white text-decoration-none">
                {/* <Nav.Link to="/" as={NavLink} className=" text-white text-decoration-none " >Home</Nav.Link> */}
                {/* <Nav.Link to="/shoppingcart" as={NavLink} className=" text-white text-decoration-none ">Shopping Cart Feature</Nav.Link> */}
                <Nav.Link to="/browse/all" as={NavLink} className=" text-white text-decoration-none ">Browse Games</Nav.Link>
                <Nav.Link to="/search" as={NavLink} className=" text-white text-decoration-none ">Search</Nav.Link>
                <Nav.Link to="/users" as={NavLink} className=" text-white text-decoration-none ">Users</Nav.Link>
                <Nav.Link to="/userinfo" as={NavLink} className=" text-white text-decoration-none ">Current User</Nav.Link>
            </Nav>
            { user? <div>{user.firstName} <Button onClick= {()=> handleDeleteCookie()}className='btn btn-danger size:sm'>Logout</Button></div>:
            <Nav>
            <Nav.Link to="/register" as={NavLink} className=" text-white text-decoration-none ">Register</Nav.Link>
            <Nav.Link to="/login" as={NavLink} className=" text-white text-decoration-none ">Login</Nav.Link>
            </Nav>
            }
            {/* {cartQuantity > 0 && (
            <Button onClick={openCart} style={{width: "3rem", height:"3rem", position: "relative"}}
            variant="outline-primary"
            className="rounded-circle"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    fill="currentColor"
                >
                    <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                </svg>
                <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center" 
                style={{color: "white", width: "1.5rem", height :"1.5rem", position:'absolute', bottom:0, right:0, transform:"translate(25%,25%)",}}>{cartQuantity}</div>
            </Button> */}
            {/* )} */}
        </Container>
    </NavbarBs>
  )
}

export default Navbar