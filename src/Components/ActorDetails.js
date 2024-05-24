import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const ActorDetails = () => {

    const { id } = useParams();
    const [actorDetails, setActorDetails] = useState({});
    const [movieCredits, setMovieCredits] = useState([]);
    const [tvCredits, setTvCredits] = useState([]);
    const imgPath = "https://image.tmdb.org/t/p/w500";
    const apiKey = '################################';

    useEffect(() => {
        const fetchActorDetails = async () => {
            const detailsUrl = `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=fr-FR`;
            const creditsUrl = `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${apiKey}&language=fr-FR`;
            try {
                const responses = await Promise.all([
                    fetch(detailsUrl).then(res => res.json()),
                    fetch(creditsUrl).then(res => res.json())
                ]);
                setActorDetails(responses[0]);
                setMovieCredits(responses[1].cast.filter(credit => credit.media_type === 'movie'));
                setTvCredits(responses[1].cast.filter(credit => credit.media_type === 'tv'));
            } catch (error) {
                console.error('Failed to fetch actor details:', error);
            }
        };
        fetchActorDetails();
    }, [id, apiKey]);
    

    if (!actorDetails.name) {
        return <p>Chargement...</p>;
    }

    return (
        <div>
            <h1>{actorDetails.name}</h1>
            <img src={`${imgPath}${actorDetails.profile_path}`} alt={actorDetails.name} />
            <p>{actorDetails.biography}</p>
            <h2>Films</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {movieCredits.map((credit, index) => (
                    <div key={index} style={{ margin: '10px' }}>
                        <img src={`${imgPath}${credit.poster_path}`} alt={credit.title} style={{ width: '150px', height: '225px' }} />
                        <h4>{credit.title}</h4>
                        <p>Character: {credit.character}</p>
                    </div>
                ))}
            </div>
            <h2>Séries</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {tvCredits.map((credit, index) => (
                    <div key={index} style={{ margin: '10px' }}>
                        <img src={`${imgPath}${credit.poster_path}`} alt={credit.name} style={{ width: '150px', height: '225px' }} />
                        <h4>{credit.name}</h4>
                        <p>Character: {credit.character}</p>
                    </div>
                ))}
            </div>
        </div>
    );
    
};

export default ActorDetails;
