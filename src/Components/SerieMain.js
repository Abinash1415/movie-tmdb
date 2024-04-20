import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import CardS from "./CardS";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const base_url= "https://api.themoviedb.org/3";

let url= base_url + "/discover/tv?language=fr-FR&include_null_first_air_dates=false&sort_by=popularity.desc" + API_KEY;
let arr= ["Populaire","Action","Science-Fiction","Animation","Comédie","Documentaire"];

const SerieMain=()=>{

    const navigate = useNavigate();
    const [serieData,setData]=useState([]);
    const [url_set,setUrl]=useState(url);
    const [search,setSearch]=useState('');

    useEffect(()=>{
        fetch(url_set).then(res=>res.json()).then(data=>{
            setData(data.results);
        });
    },[url_set])

    const getData = (serieType) => {

        let newUrl;

        switch (serieType) {
            case "Populaire":
                newUrl = `${base_url}/discover/tv?include_adult=false&include_null_first_air_dates=false&language=fr-FR&page=1&sort_by=popularity.desc${API_KEY}`;
                break;
            case "Action":
                newUrl = `${base_url}/discover/tv?language=fr-FR&include_null_first_air_dates=false&page=1&sort_by=popularity.desc&with_genres=10759${API_KEY}`;
                break;
            case "Science-Fiction":
                newUrl = `${base_url}/discover/tv?include_adult=true&language=fr-FR&sort_by=popularity.desc&with_genres=10765${API_KEY}`;
                break;
            case "Animation":
                newUrl = `${base_url}/discover/tv?include_adult=false&language=fr-FR&include_null_first_air_dates=false&page=1&sort_by=popularity.desc&with_genres=16${API_KEY}`;
                break;
            case "Documentaire":
                newUrl = `${base_url}/discover/tv?language=fr-FR&include_null_first_air_dates=false&page=1&sort_by=popularity.desc&with_genres=99${API_KEY}`;
                break;
            case "Comédie":
                newUrl = `${base_url}/discover/tv?language=fr-FR&include_null_first_air_dates=false&page=1&sort_by=popularity.desc&with_genres=35${API_KEY}`;
                break;
            default:
                newUrl = `${base_url}/discover/tv?include_adult=false&include_null_first_air_dates=false&language=fr-FR&page=1&sort_by=popularity.desc${API_KEY}`;
        }
        setUrl(newUrl);
    };

    const searchSerie = (evt) => {
        if (evt.key === "Enter") {
            const searchUrl = `${base_url}/search/tv?language=fr-FR&include_null_first_air_dates=false&page=1&sort_by=popularity.desc${API_KEY}&query=${search}`;
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
                        <input type="text" placeholder="Recherche" className="inputText" onChange={(e) => setSearch(e.target.value)} value={search} onKeyPress={searchSerie} onFocus={clearSearch}></input>
                        <button><i className="fas fa-search"></i></button>
                    </div>
                </form>
            </div>

            <div className="container">
                {
                    (serieData.length === 0) ?
                        <p className="notfound">Erreur</p> : serieData.map((res, pos) => {
                            return (
                                <CardS info={res} key={pos}/>
                            )
                        })
                }
            </div>
        </>
    )
}
export default SerieMain;
