import React, { useState } from 'react';
import DetailsModal from './ModalM';

const CardS=(tv)=>{

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    
    const img_path="https://image.tmdb.org/t/p/w500"

    return(
        <>
            {/*Poster*/}
            <div className="movie" onClick={openModal} >
                <img src={img_path + tv.info.poster_path} alt="Erreur" className="poster"></img>
                <div className="movie-details">
                    <div className="box">
                        <h4 className="title">{tv.info.name}</h4>
                        <p className="rating">{tv.info.vote_average.toFixed(1)}</p>
                    </div>
                </div>
            </div>
            {/*Modal*/}
            <div>
                <DetailsModal isOpen={modalIsOpen} onRequestClose={closeModal}>
                    <img src={img_path + tv.info.poster_path} alt="Erreur" className="poster"></img>
                    <div className="movie-details">
                        <div className="box">
                            <h4 className="title">{tv.info.name}</h4>
                            <p className="rating">{tv.info.vote_average.toFixed(1)}</p>
                            <div className='overview'><h1>Synopsis</h1>{tv.info.overview}</div>
                        </div>
                    </div>
                </DetailsModal>
            </div>
        </>
    )
}

export default CardS;
