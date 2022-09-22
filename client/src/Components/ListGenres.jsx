import React, {useState,useEffect, useRef, useCallback} from 'react'
import {Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import "../static/style.css"
const key = "0ccadca8559e41c28c1b8abfcefed3f4"

const ListGenres = () => {

    const [getGenres, setGetGenres] = useState(`https://api.rawg.io/api/genres?key=${key}`)
    const [genres, setGenres] = useState()
    useEffect(()=>{
        axios.get(getGenres)
        .then(res=> {
            console.log("getting genres")
            console.log(res.data.results)
            setGenres(res.data.results)
        })
        .catch(err=>console.log(err))
    },[])

  return (
    <div>
        
        {
            genres&&
                genres.map((genre,i) =>{
                    return (
                        <Link style={{textDecoration: "none", color: "white"}} className="font-weight-bold" to={`/genre/${genre.name}`}> {genre.name} | </Link>
                        
                    )
                })
            
        }
    </div>
  )
}

export default ListGenres