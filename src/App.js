import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import MovieMain from './Components/MovieMain';
import SerieMain from "./Components/SerieMain";
import CardM from './Components/CardM';
import CardS from './Components/CardS';
import './Components/style.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movies" element={<MovieMain />} />
                <Route path="/movie/:id" element={<CardM />} />
                <Route path="/series" element={<SerieMain />} />
                <Route path="/series/:id" element={<CardS />} />
            </Routes>
        </Router>
    );
}

export default App;
