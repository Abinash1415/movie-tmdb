import React from "react";

const CardS=(tv)=>{
    console.log(tv.info)
    let img_path="https://image.tmdb.org/t/p/w500"
    return(
        <>
            <div className="movie">
                <img src={img_path + tv.info.poster_path} className="poster"></img>
                <div className="movie-details">
                    <div className="box">
                        <h4 className="title">{tv.info.name}</h4>
                        <p className="rating">{tv.info.vote_average.toFixed(1)}</p>
                    </div>
                    <div className="overview">
                        <h1>Détails</h1>
                        {tv.info.overview}
                    </div>
                </div>
            </div>
        </>
    )
}
export default CardS;
