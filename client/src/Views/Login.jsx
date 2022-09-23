import React, {useEffect, useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email:"",
        password:"",
    })

    const handleChange =(e) =>{
        let {name, value} = e.target
        setUser({
            ...user,
            [name] : value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post(`http://localhost:8000/api/login`, user, {withCredentials:true})
            .then(res=>navigate("/browse/all"))
            .catch(err => console.log(err.response))
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="text" name="email" value={user.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={user.password} onChange={handleChange} />
                </div>
               
                <button> Login </button>
            </form>
        </div>
    )
}

export default Login