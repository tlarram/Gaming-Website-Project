import React, {useState,useEffect, useRef, useCallback} from 'react'
import {Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ListGenres from './ListGenres'
import "../static/style.css"
const key = "0ccadca8559e41c28c1b8abfcefed3f4"

const BrowseAll = (props) => {
    const [currentPageUrl, setCurrentPageUrl] = useState(`https://api.rawg.io/api/games?key=${key}`)
    const [nextPageUrl, setnextPageUrl] = useState()
    const [currentGames, setCurrentGames] = useState(null)
    const [loading, setLoading] = useState(true)
    

    useEffect(()=>{
    
        axios.get(currentPageUrl)
        .then(res=>{
        setnextPageUrl(res.data.next)
        
        if(currentGames === null){
            setCurrentGames(res.data.results)
            props.updateGameList(res.data.results)
            console.log("hi")
            setLoading(false)
        }
        else{
            console.log('yo')
            const newerList = props.gameList
            for(let i=0;i<res.data.results.length; i++){
                newerList.push(res.data.results[i])
            }
            console.log(newerList)
            props.updateGameList(newerList)
            console.log("updating game list")
            setCurrentGames(newerList)
            setLoading(false)
        }

        console.log(res.data.results)
        })
        .catch(err=>console.log(err))

    },[currentPageUrl])

    const handleNext = () =>{
        if (nextPageUrl != null){
            setCurrentPageUrl(nextPageUrl)
            setLoading(true)
        }
    }
    
    
    const getOne = (id) =>{
        const oneGame = currentGames.filter(g=>g.id === id)
        props.viewOne(id,oneGame)
    }

    // this is used to detect if the last game is visible. if it is it will load another 20
    const observer = useRef()
    const lastGameRef = useCallback(node =>{
        if(loading) return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                console.log("visible")
                handleNext()
            }
        })
        if(node) observer.current.observe(node)
        console.log(node)
    }, [loading])

    return (
    <div>
        <ListGenres/>
        {
        currentGames&&
            currentGames.map((game,i) =>{
                if (currentGames.length === i +1 ){
                    return (
                        <div key = {game.name} className = "d-flex game" ref={lastGameRef}>
                            <div className='info-box'>
                                <div>Title: {game.name}</div>
                                <div>Rating: {game.rating} </div>
                                <div>Released: {game.released}</div>
                                <div>ID: {game.id}</div>
                                <div> Genres: </div>
                                {
                                game.genres.map((genre,i)=>{
                                    return(
                                    <div>{genre.name}</div>
                                    )
                                })
                                }
                                
                            </div>
                            <div><img src ={game.short_screenshots[0].image}  className="small-img" onClick={()=>getOne(game.id)} id={`game${game.id}`}/></div>
                        </div>
                    )
                }
                else{
                    return (
                        <div key = {game.name} className = " game">
                            <h1 className='text-center '>{game.name}</h1>
                            <div className='d-flex'>
                                <div className='info-box'>
                                    <h3>Rating: {game.rating} </h3>
                                    <div>Released: {game.released}</div>
                                    <button className = "btn btn-warning" onClick={()=>getOne(game.id)}>More Details</button>
                                    
                                </div>
                                <div><img src ={game.short_screenshots[0].image}  className="small-img"  id={`game${game.id}`}/></div>
                            </div>
                        </div>
                    )

                }
            })
        }
        <div>{loading&& "Loading..."}</div>
        
        </div>
    )

}

export default BrowseAll