import React, { useState } from 'react';
import DetailsModal from './ModalM';

// const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const CardM = (movie) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [actors, setActors] = useState([]);
    const img_path = "https://image.tmdb.org/t/p/w500";
    const apiKey = 'c3f4d68c8ebc94ed3bd64b8325b39e35';
    const fetchActors = async () => {
        const url = `https://api.themoviedb.org/3/movie/${movie.info.id}/credits?api_key=${apiKey}&language=en-US`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)
            setActors(data.cast);
        } catch (error) {
            console.error('error:', error);
            setActors([]);
        }
    };

    const openModal = () => {
        fetchActors();
        setModalIsOpen(true);
    };
    const closeModal = () => setModalIsOpen(false);

    return (
        <>
            <div className="movie" onClick={openModal}>
                <img src={img_path + movie.info.poster_path} alt={movie.info.title} className="poster"></img>
                <div className="movie-details">
                    <div className="box">
                        <h4 className="title">{movie.info.title}</h4>
                        <p className="rating">{movie.info.vote_average.toFixed(1)}</p>
                    </div>
                </div>
            </div>
            <DetailsModal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <img src={img_path + movie.info.poster_path} alt={movie.info.title} className="modal-poster"></img>
                <div className="box">
                    <h3 className="modal-title">Title: {movie.info.title}</h3>
                    <h5 className="moda-release">Date de sortie : {movie.info.release_date}</h5>
                    <h5 className="modal-rating">Note : {movie.info.vote_average.toFixed(1)}</h5>
                    <div className="modal-overview">
                        <h1>Synopsis</h1>{movie.info.overview}
                    </div>
                    <div className="actor-list">
                        <h2>Actors</h2>
                        {actors.map(actor => (
                            <a href={`/actor/${actor.id}`} target="_blank" rel="noopener noreferrer" key={actor.cast_id}>
                                <div>
                                    <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
                                    <p>{actor.name}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </DetailsModal>
        </>
    );
};

export default CardM;
