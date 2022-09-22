import React, {useState, useEffect} from 'react'
import axios from 'axios'
import "../static/style.css"
const key = "0ccadca8559e41c28c1b8abfcefed3f4"

const SearchGame = (props) => {
    const [searchTerm, setSearchTerm] = useState()
    const [gameResults, setGameResults] = useState([])
    const [loading, setLoading] = useState(false)

    const handleSearch = (e)=>{
        e.preventDefault()
        setLoading(true)
        let slug = searchTerm.split(' ').join('-').toLowerCase()
        setGameResults([])
        axios.get(`https://rawg.io/api/games?search=${slug}&key=${key}`)
        .then(res=> {
            console.log(res.data.results)
            setGameResults(res.data.results)
            setLoading(false)
        })
    }
    const getOne = (id) =>{
        const oneGame = gameResults.filter(g=>g.id === id)
        props.viewOne(id,oneGame)
    }
  return (
    <div>
        <form onSubmit={handleSearch}>
            <input type = "text" onChange={(e)=>setSearchTerm(e.target.value)}/>
            <button type = "submit">Search</button>
        </form>
        {
            gameResults?
                gameResults.map((game,i) =>{
                    return (
                        <div key = {game.name} className = "game">
                            <h1 className=' center-text '>{game.name}</h1>
                            <div className='d-flex'>
                                <div className='info-box'>
                                    <h3>Rating: {game.rating} </h3>
                                    <div>Released: {game.released}</div>
                                    <button className = "btn" onClick={()=>getOne(game.id)}>More Details</button>
                                    
                                </div>
                                <div><img src ={game.short_screenshots[0].image}  className="small-img"  id={`game${game.id}`}/></div>
                            </div>
                        </div>
                    )
                }):
                <div> type in a search and click search</div>
        }
        <div>{loading&&"loading..."}</div>
        
    </div>
  )
}

export default SearchGame