import React, {useEffect, useState} from 'react'
import axios from "axios"

const Register = () => {
    const [user, setUser] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
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
        axios.post(`http://localhost:8000/api/register`, user, {withCredentials:true})
            .then(res=>console.log(res.data))
            .catch(err => console.log(err.response))
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Firstname</label>
                    <input type="text" name="firstName" value={user.firstName} onChange={handleChange} />
                </div>
                <div>
                    <label>Lastname</label>
                    <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" name="email" value={user.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={user.password} onChange={handleChange} />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} />
                </div>
                <button> Register </button>
            </form>
        </div>
    )
}

export default Register