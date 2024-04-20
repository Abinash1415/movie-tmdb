import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import CardM from "./CardM";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const base_url= "https://api.themoviedb.org/3";

let url= base_url + "/discover/movie?include_adult=false&language=fr-FR&include_null_first_air_dates=false&sort_by=popularity.desc" + API_KEY;
let arr= ["Populaire","Action","Horreur","Animation","Comédie","Crime"];

const MovieMain=()=>{

    const navigate = useNavigate();
    const [movieData,setData]=useState([]);
    const [url_set,setUrl]=useState(url);
    const [search,setSearch]=useState('');

    useEffect(()=>{
        fetch(url_set).then(res=>res.json()).then(data=>{
            setData(data.results);
        });
    },[url_set])

    const getData = (movieType) => {

        let newUrl;

        switch (movieType) {
            case "Populaire":
                newUrl = `${base_url}/discover/movie?include_adult=false&language=fr-FR&include_null_first_air_dates=false&page=1&sort_by=popularity.desc${API_KEY}`;
                break;
            case "Action":
                newUrl = `${base_url}/discover/movie?include_adult=false&language=fr-FR&include_null_first_air_dates=false&page=1&sort_by=popularity.desc&with_genres=28${API_KEY}`;
                break;
            case "Horreur":
                newUrl = `${base_url}/discover/movie?include_adult=true&language=fr-FR&include_null_first_air_dates=false&page=1&sort_by=popularity.desc&with_genres=27${API_KEY}`;
                break;
            case "Animation":
                newUrl = `${base_url}/discover/movie?include_adult=false&language=fr-FR&include_null_first_air_dates=false&page=1&sort_by=popularity.desc&with_genres=16${API_KEY}`;
                break;
            case "Crime":
                newUrl = `${base_url}/discover/movie?include_adult=false&language=fr-FR&include_null_first_air_dates=false&page=1&sort_by=popularity.desc&with_genres=80${API_KEY}`;
                break;
            case "Comédie":
                newUrl = `${base_url}/discover/movie?include_adult=false&language=fr-FR&include_null_first_air_dates=false&page=1&sort_by=popularity.desc&with_genres=35${API_KEY}`;
                break;
            default:
                newUrl = `${base_url}/discover/movie?include_adult=false&language=fr-FR&page=1&sort_by=popularity.desc${API_KEY}`;
        }
        setUrl(newUrl);
    };

    const searchMovie = (evt) => {
        if (evt.key === "Enter") {
            const searchUrl = `${base_url}/search/movie?language=fr-FR&include_null_first_air_dates=false&page=1&sort_by=popularity.desc${API_KEY}&query=${search}`;
            setUrl(searchUrl);
        }
    }
    const clearSearch = () => {
        setSearch('');
    }

    return (
        <>
            <div className="header">

                <div className="home">
                    <i className="fas fa-home" onClick={() => navigate('/')} style={{cursor: 'pointer'}}></i>
                </div>

                <nav>
                    <ul>
                        {
                            arr.map((value) => {
                                return (
                                    <li><a href="#" name={value} onClick={(e) => {
                                        getData(e.target.name)
                                    }}>{value}</a></li>
                                )
                            })
                        }
                    </ul>
                </nav>

                <form>
                    <div className="search-btn">
                        <input type="text" placeholder="Recherche" className="inputText" onChange={(e) => setSearch(e.target.value)} value={search} onKeyPress={searchMovie} onFocus={clearSearch}></input>
                        <button><i className="fas fa-search"></i></button>
                    </div>
                </form>
            </div>

            <div className="container">
                {
                    (movieData.length === 0) ?
                        <p className="notfound">Erreur</p> : movieData.map((res, pos) => {
                            return (
                                <CardM info={res} key={pos}/>
                            )
                        })
                }
            </div>
        </>
    )
}
export default MovieMain;
