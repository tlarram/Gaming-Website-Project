import React, {useState,useEffect, useRef, useCallback} from 'react'
import {Link, useNavigate , useParams} from 'react-router-dom'
import axios from 'axios'
import ListGenres from './ListGenres'
import "../static/style.css"
const key = "0ccadca8559e41c28c1b8abfcefed3f4"

const BrowseGenre = (props) => {
    const {genre} = useParams()
    const [currentPageUrl, setCurrentPageUrl] = useState(`https://api.rawg.io/api/genres?key=${key}`)
    const [nextPageUrl, setnextPageUrl] = useState()
    const [currentGames, setCurrentGames] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        axios.get(currentPageUrl)
        .then(res=> {
            console.log(res.data.results)
            let allGenreData = res.data.results
            for(let i = 0; i < allGenreData.length; i++){
                if(allGenreData[i].name === genre) {
                    console.log("found it!")
                    setCurrentGames(allGenreData[i])
                }
            }
        })
    },[])
    return (
        <div>
            <Link to="/">Browse All</Link>
            {
                currentGames&&
                    currentGames.games.map((game,i) =>{
                        return (
                            <div>
                                <p>{game.name}</p>
                            </div>
                        )
                    })
            }
        </div>
    )
}
export default BrowseGenre