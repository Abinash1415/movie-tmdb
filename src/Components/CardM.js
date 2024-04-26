import React, { useState } from 'react';
import DetailsModal from './ModalM';

const CardM=(movie)=>{

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    console.log(movie.info)
    
    let img_path="https://image.tmdb.org/t/p/w500"
    
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
            <div>
                <DetailsModal isOpen={modalIsOpen} onRequestClose={closeModal}>
                    <img src={img_path + movie.info.poster_path} alt="Erreur" className="poster"></img>
                    <div className="movie-details">
                        <div className="box">
                            <h4 className="title">{movie.info.title}</h4>
                            <h3 className='#'>{movie.info.release_date}</h3>
                            <p className="rating">{movie.info.vote_average.toFixed(1)}</p>
                            <div className='overview'><h1>Synopsis</h1>{movie.info.overview}</div>
                        </div>
                    </div>
                </DetailsModal>
            </div>
        </>
    )
}

export default CardM;
