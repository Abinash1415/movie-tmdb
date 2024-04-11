import React, {useEffect, useState} from "react";
import Card from "./Card";

let API_KEY="&api_key=845d04171a3586fd8e40f94e2e5efdd1";
let base_url="https://api.themoviedb.org/3";
let url=base_url+"/discover/movie?sort_by=popularity.desc"+API_KEY;
let arr=["Populaire","Horreur","Enfants","Comédie","Drame"];

const Main=()=>{

    const [movieData,setData]=useState([]);
    const [url_set,setUrl]=useState(url);
    const [search,setSearch]=useState();

    useEffect(()=>{
        fetch(url_set).then(res=>res.json()).then(data=>{
            //test api
            //console.log(data.results);
            setData(data.results);
        });
    },[url_set])

    //Redirection
    const getData=(movieType)=>
    {
        if(movieType=="Populaire") {
            url=base_url+"/discover/movie?include_adult=true&include_video=false&language=fr-US&page=1&sort_by=popularity.desc"+API_KEY;
        }
        if(movieType=="Horreur") {
            url=base_url+"/discover/movie?include_adult=true&include_video=false&language=fr-US&page=1&sort_by=popularity.desc&with_genres=27"+API_KEY;
        }
        if(movieType=="Enfants") {
            url=base_url+"/discover/movie?include_adult=false&include_video=false&language=fr-US&page=1&sort_by=popularity.desc&with_genres=16"+API_KEY;
        }
        if(movieType=="Drame") {
            url=base_url+"/discover/movie?include_adult=true&include_video=false&language=fr-US&page=1&sort_by=popularity.desc&with_genres=18"+API_KEY;
        }
        if(movieType=="Comédie") {
            url=base_url+"/discover/movie?include_adult=true&include_video=false&language=fr-US&page=1&sort_by=popularity.desc&with_genres=35"+API_KEY;
        }
        setUrl(url);
    }

    const searchMovie=(evt)=>{
        if(evt.key=="Enter")
        {
            url=base_url+"/search/movie?api_key=845d04171a3586fd8e40f94e2e5efdd1&query="+search;
            setUrl(url);
            setSearch(" ");
        }
    }

    return (
        <>
            <div className="header">
                <div className="home">
                    <i className="fas fa-home" onClick={() => getData('Populaire')} style={{cursor: 'pointer'}}></i>
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
                        <input type="text" placeholder="Recherche"
                               className="inputText" onChange={(e) => {
                            setSearch(e.target.value)
                        }}
                               value={search} onKeyPress={searchMovie}>
                        </input>
                        <button>
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </form>
            </div>

            <div className="container">
                {
                    (movieData.length == 0) ?
                        <p className="notfound">Film introuvable</p> : movieData.map((res, pos) => {
                            return (
                                <Card info={res} key={pos}/>
                            )
                        })
                }
            </div>
        </>
    )
}
export default Main;