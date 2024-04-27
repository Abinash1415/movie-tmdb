import React, { useState } from 'react';
import DetailsModal from './ModalM';

const CardM=(movie)=>{

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    
    const img_path="https://image.tmdb.org/t/p/w500"
    
    return(
        <>
            {/*Poster*/}
            <div className="movie" onClick={openModal} >
                <img src={img_path + movie.info.poster_path} alt="Erreur" className="poster"></img>
                <div className="movie-details">
                    <div className="box">
                        <h4 className="title">{movie.info.title}</h4>
                        <p className="rating">{movie.info.vote_average.toFixed(1)}</p>
                    </div>
                </div>
            </div>
            {/*Modal*/}
            <DetailsModal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <img src={img_path + movie.info.poster_path} alt="Erreur" className="modal-poster"></img>
                <div className="box">
                    <h4 className="modal-title">Titre : {movie.info.title}</h4>
                    <h3 className='modal-release-date'>Date de sortie : {movie.info.release_date}</h3>
                    <p className="modal-rating">vote : {movie.info.vote_average.toFixed(1)}</p>
                    <div className='modal-overview'><h1>Synopsis</h1>{movie.info.overview}</div>
                </div>
            </DetailsModal>
        </>
    )
}

export default CardM;
