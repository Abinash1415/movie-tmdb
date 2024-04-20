import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './style.css';
import CardM from "./CardM";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const base_url = "https://api.themoviedb.org/3";

const Home = () => {
    const [movieData, setMovieData] = useState([]);
    const [search, setSearch] = useState('');

    const searchMovie = (evt) => {
        if (evt.key === "Enter" && search.trim() !== '') {
            const searchUrl = `${base_url}/search/movie?language=fr-FR&include_null_first_air_dates=false&page=1&sort_by=popularity.desc${API_KEY}&query=${search}`;
            fetch(searchUrl)
                .then(res => res.json())
                .then(data => {
                    setMovieData(data.results);
                });
        }
    };

    const clearSearch = () => {
        setSearch('');
    }

    return (
        <>
            <div className="header">

                <nav className="home">
                    <p>Naviguer dans l'immense catalogue de films et séries de TMDB</p>
                </nav>

                <form>
                    <div className="search-btn">
                        <input type="text" placeholder="Recherche de Films" className="inputText"
                               onChange={(e) => setSearch(e.target.value)} value={search} onKeyPress={searchMovie}
                               onFocus={clearSearch}/>
                        <button type="submit" onClick={(e) => e.preventDefault()}><i className="fas fa-search"></i>
                        </button>
                    </div>
                </form>
            </div>

            <div className="home">
                <Link to="/movies">
                    <button>Découvrir des Films</button>
                </Link>
                <Link to="/series">
                    <button>Découvrir des Séries</button>
                </Link>
            </div>

            <div className="container">
                {movieData && movieData.length > 0 && movieData.map((movie, index) => (
                    <CardM key={index} info={movie}/>
                ))}
            </div>

        </>
    );
}

export default Home;